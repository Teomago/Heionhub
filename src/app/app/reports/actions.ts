'use server'

import { assertUser } from '@/lib/auth/assertUser'
import mongoose from 'mongoose'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Internal function to do the actual MongoDB aggregation
async function fetchAnalyticsAggregations(userId: string) {
  const payload = await getPayload({ config: configPromise })
  const TransactionsModel = payload.db.collections['transactions']

  if (!TransactionsModel) {
    throw new Error('Transactions model not found in Payload DB adapter')
  }

  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)
  twelveMonthsAgo.setDate(1)
  twelveMonthsAgo.setHours(0, 0, 0, 0)

  const ownerId = new mongoose.Types.ObjectId(userId)

  // 1. Income vs Expense Over Time ($group by month and type)
  const incomeExpensePipeline = [
    {
      $match: {
        owner: ownerId,
        date: { $gte: twelveMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          yearMonth: { $dateToString: { format: '%Y-%m', date: '$date' } },
          type: '$type',
        },
        totalAmount: { $sum: '$amount' },
      },
    },
  ]

  // 2. Spending Category Distribution ($group by category, join Category collection)
  const categoryPipeline: any[] = [
    {
      $match: {
        owner: ownerId,
        date: { $gte: twelveMonthsAgo },
        type: 'expense',
      },
    },
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category_details',
      },
    },
    {
      $unwind: {
        path: '$category_details',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        categoryId: '$_id',
        totalAmount: 1,
        name: { $ifNull: ['$category_details.name', 'Uncategorized'] },
        color: { $ifNull: ['$category_details.color', '#9ca3af'] },
      },
    },
    {
      $sort: { totalAmount: -1 },
    },
  ]

  const [incomeExpenseResult, categoryResult] = await Promise.all([
    TransactionsModel.aggregate(incomeExpensePipeline),
    TransactionsModel.aggregate(categoryPipeline),
  ])

  // Format Income/Expense for Frontend chart
  const monthlyDataMap: Record<string, { income: number; expense: number }> = {}

  // Initialize last 12 months with zeros
  for (let i = 11; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    monthlyDataMap[key] = { income: 0, expense: 0 }
  }

  let totalIncome = 0
  let totalExpense = 0
  let currentMonthIncome = 0
  let currentMonthExpense = 0

  const now = new Date()
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  for (const doc of incomeExpenseResult) {
    const monthKey = doc._id.yearMonth
    const amountFloat = doc.totalAmount / 100

    if (monthlyDataMap[monthKey]) {
      if (doc._id.type === 'income') {
        monthlyDataMap[monthKey].income += amountFloat
        totalIncome += amountFloat
        if (monthKey === currentMonthKey) currentMonthIncome += amountFloat
      } else if (doc._id.type === 'expense') {
        monthlyDataMap[monthKey].expense += amountFloat
        totalExpense += amountFloat
        if (monthKey === currentMonthKey) currentMonthExpense += amountFloat
      }
    }
  }

  const incomeVsExpenseData = Object.entries(monthlyDataMap)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, val]) => {
      const [year, month] = key.split('-')
      const date = new Date(parseInt(year), parseInt(month) - 1)
      return {
        month: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        yearMonth: key,
        ...val,
      }
    })

  // Format Category Distribution
  const spendingChartData = categoryResult.map((doc) => ({
    name: doc.name,
    value: doc.totalAmount / 100,
    color: doc.color,
  }))

  return {
    analytics: {
      totalIncome,
      totalExpense,
      currentMonthIncome,
      currentMonthExpense,
      incomeVsExpenseData,
      spendingChartData,
    },
  }
}

// Internal function to do the actual MongoDB aggregation
async function fetchDashboardAggregations(userId: string) {
  const payload = await getPayload({ config: configPromise })
  const TransactionsModel = payload.db.collections['transactions']

  if (!TransactionsModel) {
    throw new Error('Transactions model not found in Payload DB adapter')
  }

  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const ownerId = new mongoose.Types.ObjectId(userId)

  // Aggregation for calculating spend per category this month
  const categorySpendPipeline = [
    {
      $match: {
        owner: ownerId,
        date: { $gte: firstDayOfMonth },
        type: 'expense',
      },
    },
    {
      $group: {
        _id: '$category',
        spentCents: { $sum: '$amount' },
      },
    },
  ]

  // Execute
  const categorySpendResult = await TransactionsModel.aggregate(categorySpendPipeline)

  // Convert to easy mapping object: { categoryId: spentFloat }
  const currentMonthCategorySpend: Record<string, number> = {}
  for (const doc of categorySpendResult) {
    if (doc._id) {
      currentMonthCategorySpend[doc._id.toString()] = doc.spentCents / 100
    }
  }

  return {
    dashboard: {
      currentMonthCategorySpend,
    },
  }
}

/**
 * Public Server Action wrapper utilizing Next.js unstable_cache
 * Uses strict zero blast-radius tags for cache invalidation
 */
export async function getAnalyticsAggregationsWithCache() {
  const { user } = await assertUser()

  const cachedFn = unstable_cache(
    async () => fetchAnalyticsAggregations(user.id),
    [`analytics_${user.id}`],
    { tags: [`transactions_user_${user.id}`], revalidate: 3600 },
  )

  return cachedFn()
}

export async function getDashboardAggregationsWithCache() {
  const { user } = await assertUser()

  const cachedFn = unstable_cache(
    async () => fetchDashboardAggregations(user.id),
    [`dashboard_${user.id}`],
    { tags: [`transactions_user_${user.id}`], revalidate: 3600 },
  )

  return cachedFn()
}
