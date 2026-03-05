'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DropzoneArea, ParsedTransactionRow } from './DropzoneArea'
import { PreviewTable } from './PreviewTable'
import { Button } from '@/components/buttons/Button'
import { ImportTutorialTour } from './ImportTutorialTour'
import { AlertCircle, Download, FilePlus2, Loader2 } from 'lucide-react'
import { bulkImportTransactions } from '../actions'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { tourSteps } from '@/lib/tour-constants'

export function ImportClient({
  tutorialUrl,
  hasCompletedImportTour,
}: {
  tutorialUrl: string
  hasCompletedImportTour: boolean
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [parsedData, setParsedData] = useState<ParsedTransactionRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const handleParsed = (data: ParsedTransactionRow[]) => {
    setParsedData(data)
    setError(null)
  }

  const handleError = (errMsg: string) => {
    setError(errMsg)
    setParsedData(null)
  }

  const handleDownloadTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Date,Description,Amount,Type,CategoryName,AccountName\n2024-03-01,Starbucks,5.50,expense,Coffee,Chase Checking\n2024-03-02,Paycheck,2500.00,income,Salary,Chase Checking'
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'teomagoinc_import_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const executeImport = async () => {
    if (!parsedData || parsedData.length === 0) return

    setIsImporting(true)
    try {
      const result = await bulkImportTransactions(parsedData)
      if (result.success) {
        toast.success(
          `Successfully imported ${result.count} transactions in ${result.timeElapsed}s!`,
        )
        queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        queryClient.invalidateQueries({ queryKey: ['transactions'] })
        router.push('/app/transactions')
      } else {
        toast.error(result.error || 'Failed to import transactions.')
      }
    } catch (err) {
      toast.error('A critical error occurred during the import process.')
      console.error(err)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Global Shadcn Tour for Import Page */}
      <ImportTutorialTour tutorialUrl={tutorialUrl} hasCompleted={hasCompletedImportTour} />

      {/* 2. Download Template Option */}
      <div className="flex justify-end gap-2" data-tour-step-id="tour-download-btn">
        <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download .csv Template
        </Button>
      </div>

      {/* 3. Errors */}
      {error && (
        <div className="p-4 rounded-md bg-destructive/15 text-destructive flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {/* 4. Dropzone vs Preview State */}
      {!parsedData ? (
        <DropzoneArea onParsed={handleParsed} onError={handleError} />
      ) : (
        <div className="space-y-6 fade-in animate-in">
          <PreviewTable data={parsedData} />

          <div
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
            data-tour-step-id={tourSteps.importConfirm}
          >
            <div className="text-sm text-muted-foreground">
              Please review the rows above. If you notice mismatched columns, you can cancel and
              upload a corrected file.
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setParsedData(null)} disabled={isImporting}>
                Cancel
              </Button>
              <Button onClick={executeImport} disabled={isImporting}>
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Confirm & Import
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
