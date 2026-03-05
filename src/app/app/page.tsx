import React from 'react'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import type { Budget, Category } from '@/payload-types'
import { DashboardClient } from './components/DashboardClient'

export default async function DashboardPage() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    redirect('/login')
  }

  // Current Month for Budgets (YYYY-MM)
  const now = new Date()
  const yearMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  // Fetch Core Data
  const [accounts, categories, budgetsRaw, subscriptionsRaw] = await Promise.all([
    payload.find({
      collection: 'accounts',
      where: { owner: { equals: user.id } },
      pagination: false,
    }),
    payload.find({
      collection: 'categories',
      where: { or: [{ owner: { equals: user.id } }, { isDefault: { equals: true } }] },
      pagination: false,
    }),
    payload.find({
      collection: 'budgets',
      where: { and: [{ owner: { equals: user.id } }, { month: { equals: yearMonthStr } }] },
      pagination: false,
      depth: 1, // Get categories
    }),
    payload.find({
      collection: 'subscriptions',
      where: { owner: { equals: user.id } },
      sort: 'nextDueDate',
      pagination: false,
      limit: 10,
    }),
  ])

  const totalBalanceCents = accounts.docs.reduce((sum, acc) => sum + (acc.balance || 0), 0)
  const totalBalance = totalBalanceCents / 100

  // Fetch transactions for Recent Activity & Budget Calculation (Current Month)
  const firstDayOfMonth = new Date()
  firstDayOfMonth.setDate(1)
  firstDayOfMonth.setHours(0, 0, 0, 0)
  const currentMonthStr = firstDayOfMonth.toISOString()

  const recentTransactionsRaw = await payload.find({
    collection: 'transactions',
    where: {
      and: [{ owner: { equals: user.id } }],
    },
    sort: '-date',
    limit: 10,
    depth: 1,
  })

  // We need to calculate Budget Health.
  // We'll fetch all transactions for this month to calculate it accurately.
  const thisMonthTransactions = await payload.find({
    collection: 'transactions',
    where: {
      and: [{ owner: { equals: user.id } }, { date: { greater_than_equal: currentMonthStr } }],
    },
    pagination: false,
    limit: 2000,
  })

  // Calculate Budget Health for all active budgets
  const allBudgetsHealth = budgetsRaw.docs.map((budget: Budget) => {
    let spentCents = 0
    // The schema property is singular 'category' and allows multiple selections or single ref.
    // Because it's a relationship, Payload returns either ID, object, or an array of them.
    const categoriesArray = Array.isArray(budget.category)
      ? budget.category
      : budget.category
        ? [budget.category]
        : []
    const categoryIds = categoriesArray.map((c: string | Category) =>
      typeof c === 'string' ? c : c.id,
    )

    thisMonthTransactions.docs.forEach((tx) => {
      if (tx.type === 'expense') {
        const catId = typeof tx.category === 'object' ? tx.category?.id : tx.category
        if (catId && categoryIds.includes(catId)) {
          spentCents += tx.amount
        }
      }
    })

    const limitCents = budget.amount || 0
    const progress = limitCents > 0 ? (spentCents / limitCents) * 100 : 0
    const isOver = progress > 100

    const firstCat = categoriesArray[0] as Category | undefined
    const categoryColor = firstCat?.color || null

    return {
      ...budget,
      spent: spentCents / 100,
      limit: limitCents / 100,
      progress: Math.min(progress, 100),
      isOver,
      categoryColor,
    }
  })

  // Sort by highest spend first, then take the top 3
  const budgetHealth = allBudgetsHealth.sort((a, b) => b.spent - a.spent).slice(0, 3)

  const initialData = {
    totalBalance,
    budgetHealth,
    upcomingBills: subscriptionsRaw.docs,
    recentTransactions: recentTransactionsRaw.docs,
    categories: categories.docs,
    hasCompletedTour: (user as any).hasCompletedTour || false,
  }

  return <DashboardClient initialData={initialData} />
}
