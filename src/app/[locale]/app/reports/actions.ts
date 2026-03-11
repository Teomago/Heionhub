'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { eq, and, gte, sum, sql, desc } from 'drizzle-orm'

// Internal function to do the actual Postgres/Drizzle aggregation
async function fetchAnalyticsAggregations(userId: string) {
  const payload = await getPayload({ config: configPromise })
  const txTable = payload.db.tables['transactions']
  const catTable = payload.db.tables['categories']

  if (!txTable || !payload.db.drizzle) {
    throw new Error('Transactions table or Drizzle adapter not found in Payload DB adapter')
  }

  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)
  twelveMonthsAgo.setDate(1)
  twelveMonthsAgo.setHours(0, 0, 0, 0)

  const twelveMonthsAgoStr = twelveMonthsAgo.toISOString()

  // 1. Income vs Expense Over Time ($group by month and type)
  const yearMonthSql = sql<string>`TO_CHAR(${txTable.date}, 'YYYY-MM')`

  const incomeExpenseResult = await payload.db.drizzle
    .select({
      yearMonth: yearMonthSql,
      type: txTable.type,
      totalAmount: sum(txTable.amount).mapWith(Number),
    })
    .from(txTable)
    .where(and(eq(txTable.owner, userId), gte(txTable.date, twelveMonthsAgoStr)))
    .groupBy(yearMonthSql, txTable.type)

  // 2. Spending Category Distribution ($group by category, join Category collection)
  const categoryResult = await payload.db.drizzle
    .select({
      categoryId: txTable.category,
      totalAmount: sum(txTable.amount).mapWith(Number),
      name: sql<string>`COALESCE(${catTable.name}, 'Uncategorized')`,
      color: sql<string>`COALESCE(${catTable.color}, '#9ca3af')`,
    })
    .from(txTable)
    .leftJoin(catTable, eq(txTable.category, catTable.id))
    .where(
      and(
        eq(txTable.owner, userId),
        gte(txTable.date, twelveMonthsAgoStr),
        eq(txTable.type, 'expense'),
      ),
    )
    .groupBy(txTable.category, catTable.name, catTable.color)
    .orderBy(desc(sum(txTable.amount)))

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
    const monthKey = doc.yearMonth
    const amountFloat = doc.totalAmount / 100

    if (monthlyDataMap[monthKey]) {
      if (doc.type === 'income') {
        monthlyDataMap[monthKey].income += amountFloat
        totalIncome += amountFloat
        if (monthKey === currentMonthKey) currentMonthIncome += amountFloat
      } else if (doc.type === 'expense') {
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

  const spendingChartData = categoryResult.map((doc) => ({
    name: doc.name as string,
    value: doc.totalAmount / 100,
    color: doc.color as string,
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

// Internal function to do the actual Postgres/Drizzle aggregation for the Dashboard
async function fetchDashboardAggregations(userId: string) {
  const payload = await getPayload({ config: configPromise })
  const txTable = payload.db.tables['transactions']

  if (!txTable || !payload.db.drizzle) {
    throw new Error('Transactions table or Drizzle adapter not found in Payload DB adapter')
  }

  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const categorySpendResult = await payload.db.drizzle
    .select({
      categoryId: txTable.category,
      spentCents: sum(txTable.amount).mapWith(Number),
    })
    .from(txTable)
    .where(
      and(
        eq(txTable.owner, userId),
        gte(txTable.date, firstDayOfMonth.toISOString()),
        eq(txTable.type, 'expense'),
      ),
    )
    .groupBy(txTable.category)

  // Convert to easy mapping object: { categoryId: spentFloat }
  const currentMonthCategorySpend: Record<string, number> = {}
  for (const doc of categorySpendResult) {
    if (doc.categoryId) {
      currentMonthCategorySpend[doc.categoryId.toString()] = (doc.spentCents as number) / 100
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
