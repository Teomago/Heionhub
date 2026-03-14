'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DropzoneArea, ParsedTransactionRow } from './DropzoneArea'
import { PreviewTable } from './PreviewTable'
import { Button } from '@/components/buttons/Button'
import { ImportTutorialTour } from './ImportTutorialTour'
import { AlertCircle, Download, FilePlus2, Loader2, CheckCircle2 } from 'lucide-react'
import { bulkImportTransactions } from '../actions'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { tourSteps } from '@/lib/tour-constants'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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
  const [importedCount, setImportedCount] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [importComplete, setImportComplete] = useState(false)

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
    link.setAttribute('download', 'miru_import_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const executeImport = async () => {
    if (!parsedData || parsedData.length === 0) return

    setTotalRows(parsedData.length)
    setImportedCount(0)
    setIsImporting(true)
    setImportComplete(false)

    try {
      const CHUNK_SIZE = 50
      
      // If dataset is small, run it all at once
      if (parsedData.length <= 59) {
        const result = await bulkImportTransactions(parsedData)
        if (result.success) {
          setImportedCount(parsedData.length)
        } else {
          toast.error(result.error || 'Failed to import transactions.')
          setIsImporting(false)
          return
        }
      } else {
        // Run chunky batch imports
        for (let i = 0; i < parsedData.length; i += CHUNK_SIZE) {
          const chunk = parsedData.slice(i, i + CHUNK_SIZE)
          const result = await bulkImportTransactions(chunk)
          
          if (!result.success) {
             toast.error(result.error || `Failed to import batch starting at row ${i + 1}`)
             setIsImporting(false)
             return
          }
          
          // Wait so user sees UI update properly and gives DB breathing room
          await new Promise(resolve => setTimeout(resolve, 300))
          setImportedCount(Math.min(i + CHUNK_SIZE, parsedData.length))
        }
      }

      setImportComplete(true)
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })

    } catch (err) {
      toast.error('A critical error occurred during the import process.')
      console.error(err)
      setIsImporting(false)
    }
  }

  const handleFinish = () => {
    setIsImporting(false)
    setImportComplete(false)
    router.refresh()
    router.push('/app/transactions')
  }

  return (
    <div className="space-y-8">
      {/* Importer Blocking Modal */}
      <Dialog 
        open={isImporting} 
        onOpenChange={(isOpen) => {
          // Do not allow the user to close the modal if still actively importing
          if (!isOpen && !importComplete) return; 
          setIsImporting(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-md [&>button:last-child]:hidden" 
          onEscapeKeyDown={(e) => !importComplete && e.preventDefault()}
          onInteractOutside={(e) => !importComplete && e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {importComplete ? "Import Sequence Complete!" : "Importing Transactions"}
            </DialogTitle>
            <DialogDescription>
              {importComplete ? (
                 "Your legacy data is safely inserted."
              ) : (
                 "Please do not close this window or refresh the browser."
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            {importComplete ? (
               <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
            ) : (
               <Loader2 className="w-12 h-12 animate-spin text-primary mb-2" />
            )}
            
            <div className="text-center font-medium">
              {importComplete ? (
                 <span>Successfully imported {totalRows} transactions.</span>
              ) : (
                 <span>Importing {importedCount} of {totalRows} transactions...</span>
              )}
            </div>

            {importComplete && (
               <Button onClick={handleFinish} className="w-full mt-4">
                 Continue to Dashboard
               </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>


      <ImportTutorialTour tutorialUrl={tutorialUrl} hasCompleted={hasCompletedImportTour} />

      <div className="flex justify-end gap-2" data-tour-step-id="tour-download-btn">
        <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download .csv Template
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-destructive/15 text-destructive flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

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
                <FilePlus2 className="mr-2 h-4 w-4" />
                Confirm & Import
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
