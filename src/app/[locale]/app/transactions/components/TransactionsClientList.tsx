'use client'

import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getTransactionsPaginated } from '../actions'
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Loader2 } from 'lucide-react'
import { getCategoryIcon } from '@/constants/category-icons'
import { TransactionActions } from './TransactionActions'
import type { Category, Account, Transaction } from '@/payload/payload-types'

interface Props {
  initialData: any
  searchParams: any
  accounts: Account[]
  categories: Category[]
}

export function TransactionsClientList({ initialData, searchParams, accounts, categories }: Props) {
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['transactions', searchParams],
    queryFn: async ({ pageParam = 1 }) => {
      // Fetch the next page using the Server Action
      return getTransactionsPaginated(searchParams, pageParam, 50)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    staleTime: 0,
  })

  // When intersection observer triggers, fetch next page
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const flattenDocs = data?.pages.flatMap((page) => page.docs) || []

  if (status === 'error') {
    return <div className="text-center py-10 text-red-500">Error loading transactions.</div>
  }

  if (flattenDocs.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No transactions found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {flattenDocs.map((tx: Transaction) => {
        const account = typeof tx.account === 'object' ? tx.account : null
        const category = typeof tx.category === 'object' ? tx.category : null

        let Icon = category ? getCategoryIcon(category.icon) : ArrowRightLeft
        let color = category?.color || '#6b7280'
        let colorClass = 'text-gray-500'
        let sign = ''

        if (tx.type === 'income') {
          if (!category) Icon = ArrowDownLeft
          if (!category?.color) color = '#16a34a'
          colorClass = 'text-green-600'
          sign = '+'
        } else if (tx.type === 'expense') {
          if (!category) Icon = ArrowUpRight
          if (!category?.color) color = '#dc2626'
          colorClass = 'text-red-600'
          sign = '-'
        }

        return (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className="p-2 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${color}20`,
                  color: color,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">{tx.description || 'No description'}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString()} • {category?.name || 'Uncategorized'} •{' '}
                  {account?.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`font-bold ${colorClass}`}>
                {sign}
                {(tx.amount / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
              <TransactionActions transaction={tx} accounts={accounts} categories={categories} />
            </div>
          </div>
        )
      })}

      {/* Loading Spinner at the bottom when fetching next page */}
      <div ref={ref} className="py-4 flex justify-center">
        {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
      </div>
    </div>
  )
}
