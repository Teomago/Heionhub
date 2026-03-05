'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TransactionForm } from '../transactions/components/TransactionForm'
import type { Account, Category } from '@/payload-types'
import { useQueryClient } from '@tanstack/react-query'

export function TransactionModal({
  accounts,
  categories,
}: {
  accounts: Account[]
  categories: Category[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const isAddingTx = searchParams.get('addTx') === 'true'

  useEffect(() => {
    if (isAddingTx) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [isAddingTx])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Close modal out entirely and remove search params
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('addTx')
      newSearchParams.delete('type')
      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
    }
  }

  const handleSuccess = () => {
    handleOpenChange(false)
    queryClient.invalidateQueries({ queryKey: ['transactions'] })
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Log a new income, expense, or transfer.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TransactionForm accounts={accounts} categories={categories} onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
