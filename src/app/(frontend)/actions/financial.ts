'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers, cookies } from 'next/headers'

export async function getFinancialSummary() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) {
    return { income: 0, expenses: 0, savings: 0 }
  }

  const { user } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!user) {
    return {
      income: 0,
      expenses: 0,
      savings: 0,
    }
  }

  // Calculate date ranges
  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  // Fetch Current Month Records
  const { docs: currentDocs } = await payload.find({
    collection: 'financial-records',
    where: {
      and: [
        { member: { equals: user.id } },
        { date: { greater_than_equal: currentMonthStart.toISOString() } },
      ],
    },
    limit: 10000,
  })

  // Fetch Previous Month Records
  const { docs: previousDocs } = await payload.find({
    collection: 'financial-records',
    where: {
      and: [
        { member: { equals: user.id } },
        { date: { greater_than_equal: previousMonthStart.toISOString() } },
        { date: { less_than: currentMonthStart.toISOString() } },
      ],
    },
    limit: 10000,
  })

  const calculateTotals = (docs: any[]) => {
    let income = 0
    let expenses = 0
    let savings = 0
    // Track savings that are deducted from balance
    let savingsDeductedFromBalance = 0

    docs.forEach((record) => {
      if (record.type === 'income') income += record.amount
      if (record.type === 'expense') expenses += record.amount
      if (record.type === 'saving') {
        savings += record.amount
        if (record.isFromBalance) {
          savingsDeductedFromBalance += record.amount
        }
      }
    })
    return { income, expenses, savings, savingsDeductedFromBalance }
  }

  const current = calculateTotals(currentDocs)
  const previous = calculateTotals(previousDocs)

  const calculateChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0
    return ((curr - prev) / prev) * 100
  }

  // Calculate Net Balance Change?
  // No, we return totals. The Client logic calculates Net.
  // Wait, Client logic uses: Net = Income - Expenses.
  // NOW: Net = Income - Expenses - Savings(where isFromBalance).
  // I need to pass 'savingsDeductedFromBalance' to client or assume 'savings' is all deducted?
  // User said: "isFromBalance... if checked, moves money from Wallet to Savings".
  // So I need to return `savingsDeductedFromBalance` separately or just adjust `expenses`?
  // Better to be explicit.

  return {
    income: current.income,
    expenses: current.expenses,
    savings: current.savings, // Total Savings (External + Internal)
    savingsDeducted: current.savingsDeductedFromBalance, // For Net Calc
    previous: {
      income: previous.income,
      expenses: previous.expenses,
      savings: previous.savings,
      savingsDeducted: previous.savingsDeductedFromBalance,
    },
    changes: {
      income: calculateChange(current.income, previous.income),
      expenses: calculateChange(current.expenses, previous.expenses),
      savings: calculateChange(current.savings, previous.savings),
    },
  }
}
