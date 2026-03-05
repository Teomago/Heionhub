'use client'

import React, { useState } from 'react'
import { Button } from '@/components/buttons/Button'
import { FileUp, Loader2 } from 'lucide-react'
import { exportFilteredTransactions } from '../actions'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Papa from 'papaparse'

export function ExportCsvButton() {
  const [isExporting, setIsExporting] = useState(false)
  const searchParams = useSearchParams()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const params = {
        description: searchParams.get('description') || undefined,
        type: searchParams.get('type') || undefined,
        category: searchParams.get('category') || undefined,
        account: searchParams.get('account') || undefined,
        dateRange: searchParams.get('dateRange') || undefined,
        sort: searchParams.get('sort') || '-date',
      }

      const result = await exportFilteredTransactions(params)

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to export transactions.')
        return
      }

      // 1. Unparse JSON -> CSV String
      const csvString = Papa.unparse(result.data)

      // 2. Trigger Download
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)

      // Smart naming based on today's date
      const today = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `TeomagoINC_Export_${today}.csv`)

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Successfully exported transactions!')
    } catch (error) {
      console.error(error)
      toast.error('A critical error occurred while exporting.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={isExporting}>
      {isExporting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FileUp className="mr-2 h-4 w-4" />
      )}
      Export CSV
    </Button>
  )
}
