'use client'

import * as React from 'react'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { getTagIcon } from '@/lib/tag-icons'

interface FinancialLineChartProps {
  data: { tag: string; value: number; fill: string; icon: string }[]
  title: string
  description?: string
  category: 'income' | 'expense' | 'saving'
}

export function FinancialLineChart({
  data,
  title,
  description,
}: FinancialLineChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Normalize data so bars are proportional (largest = 100, others scaled accordingly)
  const normalizedData = React.useMemo(() => {
    if (data.length === 0) return []
    
    const maxValue = Math.max(...data.map((item) => item.value))
    
    return data.map((item) => ({
      ...item,
      normalizedValue: (item.value / maxValue) * 100,
      originalValue: item.value,
    }))
  }, [data])

  // Generate chart config dynamically from data
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      normalizedValue: {
        label: 'Amount',
      },
    }
    data.forEach((item) => {
      config[item.tag] = {
        label: item.tag,
        color: item.fill,
      }
    })
    return config
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description || 'Current month breakdown by tags'}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
          <RadialBarChart data={normalizedData} startAngle={-90} endAngle={380} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="tag"
                  formatter={(value, name, props) => {
                    // Show the original value, not the normalized one
                    return formatCurrency(props.payload.originalValue)
                  }}
                />
              }
            />
            <RadialBar dataKey="normalizedValue" background>
              <LabelList
                position="insideStart"
                dataKey="tag"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className="grid grid-cols-2 gap-4 p-4 pt-0 sm:grid-cols-3">
        {normalizedData.map((item) => {
          const IconComponent = getTagIcon(item.icon)
          return (
            <div key={item.tag} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                  style={{ backgroundColor: item.fill }}
                >
                  <IconComponent className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-muted-foreground truncate">{item.tag}</span>
              </div>
              <span className="text-sm font-bold">{formatCurrency(item.originalValue)}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
