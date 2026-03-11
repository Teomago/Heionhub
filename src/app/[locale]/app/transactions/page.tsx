import React from 'react'
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/buttons/Button'
import { Plus, ArrowUpRight, ArrowDownLeft, ArrowRightLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import { getCategoryIcon } from '@/constants/category-icons'

import { TransactionActions } from './components/TransactionActions'
import { TransactionFilter } from './components/TransactionFilter'
import { ExportCsvButton } from './components/ExportCsvButton'
import { TransactionsClientList } from './components/TransactionsClientList'
import { Where } from 'payload'
import type { Account, Category } from '@/payload/payload-types'

type SearchParams = Promise<{
  description?: string
  dateRange?: string
  type?: string
  category?: string
  account?: string
  sort?: string
}>

export default async function TransactionsPage(props: { searchParams: SearchParams }) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })
  const searchParams = await props.searchParams

  if (!user) {
    redirect('/login')
  }

  // Construct Where query
  const where: Where = {
    and: [
      {
        owner: {
          equals: user.id,
        },
      },
    ],
  }

  if (searchParams.description) {
    where.and?.push({
      description: {
        contains: searchParams.description,
      },
    })
  }

  if (searchParams.type && searchParams.type !== 'all') {
    where.and?.push({
      type: {
        equals: searchParams.type,
      },
    })
  }

  if (searchParams.category && searchParams.category !== 'all') {
    where.and?.push({
      category: {
        equals: searchParams.category,
      },
    })
  }

  if (searchParams.account && searchParams.account !== 'all') {
    where.and?.push({
      account: {
        equals: searchParams.account,
      },
    })
  }

  if (searchParams.dateRange && searchParams.dateRange !== 'all') {
    const now = new Date()
    let startDate: Date | undefined
    let endDate: Date | undefined

    switch (searchParams.dateRange) {
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case 'last3Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case 'thisYear':
        startDate = new Date(now.getFullYear(), 0, 1)
        endDate = new Date(now.getFullYear(), 11, 31)
        break
    }

    if (startDate && endDate) {
      where.and?.push({
        date: {
          greater_than_equal: startDate.toISOString(),
          less_than_equal: endDate.toISOString(),
        },
      })
    }
  }

  const transactions = await payload.find({
    collection: 'transactions',
    where,
    sort: searchParams.sort || '-date',
    limit: 50,
    depth: 1, // Fetch account details
  })

  // Fetch accounts and categories for the filter component
  const accounts = await payload.find({
    collection: 'accounts',
    where: {
      owner: {
        equals: user.id,
      },
    },
    pagination: false,
    sort: 'name',
  })

  const categories = await payload.find({
    collection: 'categories',
    where: {
      or: [{ owner: { equals: user.id } }, { isDefault: { equals: true } }],
    },
    pagination: false,
    sort: 'name',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex items-center gap-3">
          <Link href="/app/categories">
            <Button variant="outline">Categories</Button>
          </Link>
          <ExportCsvButton />
          <Link href="?addTx=true">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </Link>
        </div>
      </div>

      <TransactionFilter accounts={accounts.docs} categories={categories.docs} />

      <div className="space-y-4">
        <TransactionsClientList
          initialData={transactions}
          searchParams={searchParams}
          accounts={accounts.docs as Account[]}
          categories={categories.docs as Category[]}
        />
      </div>
    </div>
  )
}
