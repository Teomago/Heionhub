'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/buttons/Button'
import { Search, X, Filter } from 'lucide-react'
import { Account, Category } from '@/payload-types'
import { useDebounce } from '@/hooks/use-debounce'

type TransactionFilterProps = {
  accounts: Account[]
  categories: Category[]
}

export function TransactionFilter({ accounts, categories }: TransactionFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // State for filters
  const [search, setSearch] = useState(searchParams.get('description') || '')
  const [dateRange, setDateRange] = useState(searchParams.get('dateRange') || 'all')
  const [type, setType] = useState(searchParams.get('type') || 'all')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [account, setAccount] = useState(searchParams.get('account') || 'all')
  const [sort, setSort] = useState(searchParams.get('sort') || '-date')

  const debouncedSearch = useDebounce(search, 500)

  // Sync state with URL when Search Params change (e.g. back button)
  useEffect(() => {
    setSearch(searchParams.get('description') || '')
    setDateRange(searchParams.get('dateRange') || 'all')
    setType(searchParams.get('type') || 'all')
    setCategory(searchParams.get('category') || 'all')
    setAccount(searchParams.get('account') || 'all')
    setSort(searchParams.get('sort') || '-date')
  }, [searchParams])

  // Effect to update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedSearch) {
      params.set('description', debouncedSearch)
    } else {
      params.delete('description')
    }

    if (dateRange && dateRange !== 'all') {
      params.set('dateRange', dateRange)
    } else {
      params.delete('dateRange')
    }

    if (type && type !== 'all') {
      params.set('type', type)
    } else {
      params.delete('type')
    }

    if (category && category !== 'all') {
      params.set('category', category)
    } else {
      params.delete('category')
    }

    if (account && account !== 'all') {
      params.set('account', account)
    } else {
      params.delete('account')
    }

    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }, [
    debouncedSearch,
    dateRange,
    type,
    category,
    account,
    sort,
    pathname,
    router,
    searchParams, // Include searchParams to strictly follow exhaustive-deps, though logic inside uses current state
  ])

  const clearFilters = () => {
    setSearch('')
    setDateRange('all')
    setType('all')
    setCategory('all')
    setAccount('all')
    setSort('-date')
    router.replace(pathname)
  }

  const hasActiveFilters =
    search !== '' ||
    dateRange !== 'all' ||
    type !== 'all' ||
    category !== 'all' ||
    account !== 'all' ||
    sort !== '-date'

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto h-8 px-2 text-xs"
          >
            <X className="mr-2 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Date Range */}
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger>
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="last3Months">Last 3 Months</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>

        {/* Type */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Account */}
        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger>
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            {accounts.map((acc) => (
              <SelectItem key={acc.id} value={acc.id}>
                {acc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-date">Newest First</SelectItem>
            <SelectItem value="date">Oldest First</SelectItem>
            <SelectItem value="-amount">Amount (High-Low)</SelectItem>
            <SelectItem value="amount">Amount (Low-High)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
