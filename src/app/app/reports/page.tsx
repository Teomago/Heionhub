import React from 'react'
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SpendingChart } from '@/components/charts/SpendingChart'
import { IncomeVsExpenseChart } from '@/components/charts/IncomeVsExpenseChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/display/Card'

export default async function ReportsPage() {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    redirect('/login')
  }

  // Fetch transactions for last 12 months
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)
  const twelveMonthsAgoStr = twelveMonthsAgo.toISOString().slice(0, 10)

  const historyTransactions = await payload.find({
    collection: 'transactions',
    where: {
      and: [{ owner: { equals: user.id } }, { date: { greater_than_equal: twelveMonthsAgoStr } }],
    },
    pagination: false,
    limit: 5000,
    depth: 1, // Need category for Spending Chart
  })

  // Prepare data for Income vs Expense Chart (Last 12 Months)
  const monthlyDataMap: Record<string, { income: number; expense: number }> = {}

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = d.toISOString().slice(0, 7) // YYYY-MM
    monthlyDataMap[key] = { income: 0, expense: 0 }
  }

  // Yearly Totals
  let totalIncome = 0
  let totalExpense = 0
  let currentMonthIncome = 0
  let currentMonthExpense = 0
  const currentMonthKey = new Date().toISOString().slice(0, 7)

  historyTransactions.docs.forEach((tx) => {
    const monthKey = tx.date.slice(0, 7)
    if (monthlyDataMap[monthKey]) {
      const amount = tx.amount / 100
      if (tx.type === 'income') {
        monthlyDataMap[monthKey].income += amount
        totalIncome += amount
        if (monthKey === currentMonthKey) currentMonthIncome += amount
      } else if (tx.type === 'expense') {
        monthlyDataMap[monthKey].expense += amount
        totalExpense += amount
        if (monthKey === currentMonthKey) currentMonthExpense += amount
      }
    }
  })

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

  // Prepare data for Spending Category Chart (Last 12 Months vs This Month)
  // Default to showing Last 12 Months distribution
  const spendingMap: Record<string, { value: number; color: string; name: string }> = {}

  historyTransactions.docs.forEach((tx) => {
    if (tx.type === 'expense') {
      const category = typeof tx.category === 'object' ? tx.category : null
      const catName = category?.name || 'Uncategorized'
      const catColor = category?.color || '#9ca3af'

      if (!spendingMap[catName]) {
        spendingMap[catName] = { value: 0, color: catColor, name: catName }
      }
      spendingMap[catName].value += tx.amount / 100
    }
  })

  const combinedSpendingChartData = Object.values(spendingMap).sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">12 Month Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">12 Month Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net 12 Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {(totalIncome - totalExpense).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthIncome > 0
                ? Math.round(
                    ((currentMonthIncome - currentMonthExpense) / currentMonthIncome) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Make this one span 2 columns since it's wider */}
        <div className="lg:col-span-2">
          <IncomeVsExpenseChart data={incomeVsExpenseData} />
        </div>
        <div>
          <SpendingChart data={combinedSpendingChartData} />
        </div>
      </div>
    </div>
  )
}
