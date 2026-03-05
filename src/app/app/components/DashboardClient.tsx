'use client'

import React, { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, CircleHelp } from 'lucide-react'
import { Button } from '@/components/buttons/Button'
import { useTour } from '@/components/ui/tour'
import { getCategoryIcon } from '@/constants/category-icons'
import { TransactionActions } from '../transactions/components/TransactionActions'
import type { Budget, Category, Subscription, Transaction } from '@/payload-types'
import { tourSteps } from '@/lib/tour-constants'

interface DashboardData {
  totalBalance: number
  budgetHealth: Array<
    Budget & {
      spent: number
      limit: number
      progress: number
      isOver: boolean
      categoryColor: string | null
    }
  >
  upcomingBills: Subscription[]
  recentTransactions: Transaction[]
  categories: Category[]
  hasCompletedTour: boolean
}

export function DashboardClient({ initialData }: { initialData: DashboardData }) {
  // We'll set up a query to refetch this exact dataset every 30 seconds
  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    // We provide the initial data so the page renders instantly on the server without loading states
    initialData,
  })

  const tour = useTour()
  const startedRef = useRef(false)

  useEffect(() => {
    // Rely exclusively on the database flag returned from the server via initialData
    if (!dashboard.hasCompletedTour && !startedRef.current) {
      const timeout = setTimeout(() => {
        tour.start('dashboard-onboarding')
        startedRef.current = true
      }, 500) // Small delay to let animations/layout settle

      return () => clearTimeout(timeout)
    }
  }, [dashboard.hasCompletedTour, tour])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div data-tour-step-id={tourSteps.quickAdd} className="flex items-center gap-2">
          <Link href="?addTx=true&type=income">
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-900/20"
            >
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Income
            </Button>
          </Link>
          <Link href="?addTx=true&type=expense">
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Expense
            </Button>
          </Link>
          <Link href="?addTx=true&type=transfer">
            <Button size="sm" variant="outline">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Transfer
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full text-muted-foreground hover:text-foreground ml-2"
            onClick={() => tour.start('dashboard-onboarding')}
            title="Take a Tour"
          >
            <CircleHelp className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div
          data-tour-step-id={tourSteps.totalBalance}
          className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
          <div className="text-2xl font-bold">
            {dashboard.totalBalance.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {/* Budget Health */}
        <div
          data-tour-step-id={tourSteps.budgetHealth}
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Budget Health</h3>
          <div className="space-y-4">
            {dashboard.budgetHealth.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active budgets.</p>
            ) : (
              dashboard.budgetHealth.map((b) => (
                <div key={b.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{b.name}</span>
                    <span className={b.isOver ? 'text-red-600 font-bold' : ''}>
                      ${b.spent.toFixed(2)} / ${b.limit.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full ${b.isOver ? 'bg-red-600' : 'bg-primary'}`}
                      style={{
                        width: `${b.progress}%`,
                        backgroundColor: b.isOver ? undefined : b.categoryColor || undefined,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">Upcoming Bills</h3>
          <div className="space-y-4">
            {dashboard.upcomingBills.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming bills.</p>
            ) : (
              dashboard.upcomingBills.map((sub) => {
                const amount = sub.amount / 100
                return (
                  <div key={sub.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{sub.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {sub.frequency} - Due {new Date(sub.nextDueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-bold text-sm">
                      {amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold" data-tour-step-id={tourSteps.recentTransactions}>
          Recent Activity
        </h2>
        <div className="space-y-4">
          {dashboard.recentTransactions.length === 0 ? (
            <p className="text-muted-foreground">No recent transactions.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {dashboard.recentTransactions.map((tx) => {
                const amount = tx.amount / 100
                const isExpense = tx.type === 'expense'
                const isTransfer = tx.type === 'transfer'
                const sign = isExpense ? '-' : isTransfer ? '' : '+'
                const colorClass = isExpense
                  ? 'text-red-600 dark:text-red-500'
                  : isTransfer
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-green-600 dark:text-green-500'

                // Resolve category name and icon
                let catName = 'Uncategorized'
                let catColor = undefined
                let Icon = getCategoryIcon('default')

                if (tx.category && typeof tx.category === 'object' && 'name' in tx.category) {
                  catName = tx.category.name as string
                  catColor = tx.category.color

                  // If the category has a saved string icon, try to resolve it directly.
                  // Otherwise, fall back to resolving by the category name.
                  if ('icon' in tx.category && typeof tx.category.icon === 'string') {
                    Icon = getCategoryIcon(tx.category.icon)
                  } else {
                    Icon = getCategoryIcon(catName)
                  }
                }

                return (
                  <div
                    key={tx.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-2 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: catColor ? `${catColor}20` : 'rgba(156, 163, 175, 0.2)', // 20% opacity matching original design
                          color: catColor || '#6b7280',
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{tx.description || 'No description'}</div>
                        <div className="text-sm text-muted-foreground">
                          {catName} • {new Date(tx.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <div className={`font-bold ${colorClass}`}>
                        {sign}
                        {amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>

                      <TransactionActions
                        transaction={tx}
                        accounts={[]} // We aren't doing the edit form here for now, handled by modal
                        categories={dashboard.categories}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
