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
import { AccountForm } from './AccountForm'

export function AccountModal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const isAddingAccount = searchParams.get('addAccount') === 'true'

  useEffect(() => {
    if (isAddingAccount) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [isAddingAccount])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('addAccount')
      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
    }
  }

  const handleSuccess = () => {
    handleOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>Create a new financial account or wallet.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AccountForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
