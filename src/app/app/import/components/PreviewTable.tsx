import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ParsedTransactionRow } from './DropzoneArea'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { tourSteps } from '@/lib/tour-constants'

interface PreviewTableProps {
  data: ParsedTransactionRow[]
}

export function PreviewTable({ data }: PreviewTableProps) {
  // We only preview the first 50 rows to keep the UI snappy
  const previewData = data.slice(0, 50)
  const isTruncated = data.length > 50

  return (
    <div className="space-y-4" data-tour-step-id={tourSteps.importPreview}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Successfully read {data.length} transactions
        </h3>
        {isTruncated && (
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Showing first 50 rows
          </span>
        )}
      </div>

      <div className="rounded-md border bg-card max-h-[500px] overflow-auto relative">
        <Table>
          <TableHeader className="sticky top-0 bg-secondary z-10 shadow-sm">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Account</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row, index) => {
              // Basic runtime validation for the preview
              const hasMissingData = !row.Amount || !row.Date || !row.Type

              return (
                <TableRow
                  key={index}
                  className={hasMissingData ? 'bg-red-50/50 dark:bg-red-900/10' : ''}
                >
                  <TableCell className={!row.Date ? 'text-red-500 font-bold' : ''}>
                    {row.Date || 'Missing'}
                  </TableCell>
                  <TableCell>{row.Description || 'None'}</TableCell>
                  <TableCell className={!row.Amount ? 'text-red-500 font-bold' : ''}>
                    {row.Amount || 'Missing'}
                  </TableCell>
                  <TableCell className={!row.Type ? 'text-red-500 font-bold' : ''}>
                    {row.Type || 'Missing'}
                  </TableCell>
                  <TableCell className={!row.CategoryName ? 'text-muted-foreground italic' : ''}>
                    {row.CategoryName || 'Will create "Uncategorized"'}
                  </TableCell>
                  <TableCell className={!row.AccountName ? 'text-muted-foreground italic' : ''}>
                    {row.AccountName || 'Will create "Default Account"'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
