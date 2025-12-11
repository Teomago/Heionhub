'use client'

import { useQuery } from '@tanstack/react-query'
import { getFinancialSummary } from '@/app/(frontend)/actions/financial'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, PiggyBank, Plus, Wallet } from 'lucide-react'

export function FinancialSummary() {
  const { data, isLoading } = useQuery({
    queryKey: ['financial-summary'],
    queryFn: async () => await getFinancialSummary(),
    refetchInterval: 5000,
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const income = data?.income || 0
  const expenses = data?.expenses || 0
  const savings = data?.savings || 0
  const savingsDeducted = data?.savingsDeducted || 0

  const incomeChange = data?.changes?.income || 0
  const expensesChange = data?.changes?.expenses || 0
  const savingsChange = data?.changes?.savings || 0

  // Net Balance: Income - Expenses - Deducted Savings
  const netBalance = income - expenses - savingsDeducted
  const previousNet =
    (data?.previous?.income || 0) -
    (data?.previous?.expenses || 0) -
    (data?.previous?.savingsDeducted || 0)
  const netChange =
    previousNet === 0
      ? netBalance > 0
        ? 100
        : 0
      : ((netBalance - previousNet) / previousNet) * 100

  const formatPercentage = (val: number) => {
    const sign = val > 0 ? '+' : ''
    return `${sign}${val.toFixed(1)}% from last month`
  }

  const Trend = ({ value, invert = false }: { value: number; invert?: boolean }) => {
    if (isLoading) return null
    // Standard: Green if > 0, Red if < 0.
    // Invert (Expenses): Red if > 0, Green if < 0.

    let _isGood = value > 0
    if (invert) _isGood = !_isGood
    if (value === 0) _isGood = true // Neutral

    // Actually, "Expenses Up" is usually Bad (Red). "Expenses Down" is Good (Green).
    // "Income Up" is Good (Green).

    let colorClass = value > 0 ? 'text-emerald-500' : 'text-red-500' // Default Up=Green, Down=Red

    if (invert) {
      colorClass = value > 0 ? 'text-red-500' : 'text-emerald-500'
    }

    if (value === 0) colorClass = 'text-muted-foreground'

    return <p className={`text-xs ${colorClass}`}>{formatPercentage(value)}</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <Plus className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(income)}</div>
          <Trend value={incomeChange} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Minus className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(expenses)}</div>
          <Trend value={expensesChange} invert />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(savings)}</div>
          <Trend value={savingsChange} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          <Wallet className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(netBalance)}</div>
          <Trend value={netChange} />
        </CardContent>
      </Card>
    </div>
  )
}
