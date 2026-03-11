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

  // FETCH ACCELERATED ANALYTICS FROM DB AGGREGATIONS
  const { getAnalyticsAggregationsWithCache } = await import('./actions')
  const { analytics } = await getAnalyticsAggregationsWithCache()

  const totalIncome = analytics.totalIncome
  const totalExpense = analytics.totalExpense
  const currentMonthIncome = analytics.currentMonthIncome
  const currentMonthExpense = analytics.currentMonthExpense
  const incomeVsExpenseData = analytics.incomeVsExpenseData
  const combinedSpendingChartData = analytics.spendingChartData

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
