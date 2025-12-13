'use client'

import * as React from 'react'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// This component expects aggregated data passed from the server action
interface DashboardInteractiveChartProps {
  data: {
    date: string
    income: number
    expense: number
    saving: number
    net: number
  }[]
}

const chartConfig = {
  amount: {
    label: 'Amount',
  },
  income: {
    label: 'Income',
    color: 'hsl(142, 76%, 36%)',
  },
  expense: {
    label: 'Expenses',
    color: 'hsl(0, 84%, 60%)',
  },
  saving: {
    label: 'Savings',
    color: 'hsl(217, 91%, 60%)',
  },
  net: {
    label: 'Net Balance',
    color: 'hsl(271, 91%, 65%)',
  },
} satisfies ChartConfig

export function DashboardInteractiveChart({ data }: DashboardInteractiveChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get the LATEST value (current balance), not the sum of all days
  const latestData = React.useMemo(() => {
    if (data.length === 0) {
      return { net: 0, income: 0, expense: 0, saving: 0 }
    }
    return data[data.length - 1]
  }, [data])

  const chartData = React.useMemo(
    () => [
      {
        category: 'income',
        amount: latestData.income,
        fill: chartConfig.income.color,
      },
      {
        category: 'expense',
        amount: latestData.expense,
        fill: chartConfig.expense.color,
      },
      {
        category: 'saving',
        amount: latestData.saving,
        fill: chartConfig.saving.color,
      },
      {
        category: 'net',
        amount: latestData.net,
        fill: chartConfig.net.color,
      },
    ],
    [latestData],
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Current month snapshot</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
          <RadialBarChart data={chartData} startAngle={-90} endAngle={380} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(value) => formatCurrency(value as number)}
                />
              }
            />
            <RadialBar dataKey="amount" background>
              <LabelList
                position="insideStart"
                dataKey="category"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className="grid grid-cols-2 gap-4 p-4 pt-0 sm:grid-cols-4">
        {chartData.map((item) => (
          <div key={item.category} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {chartConfig[item.category as keyof typeof chartConfig].label}
              </span>
            </div>
            <span className="text-sm font-bold">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
