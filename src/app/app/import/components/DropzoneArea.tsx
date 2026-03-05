'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import { UploadCloud, FileSpreadsheet, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { tourSteps } from '@/lib/tour-constants'

export interface ParsedTransactionRow {
  Date: string
  Description: string
  Amount: string | number
  Type: string
  CategoryName: string
  AccountName: string
}

interface DropzoneAreaProps {
  onParsed: (data: ParsedTransactionRow[]) => void
  onError: (error: string) => void
}

export function DropzoneArea({ onParsed, onError }: DropzoneAreaProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Validate that the CSV has the required headers
          const firstRow = results.data[0] as Record<string, any>
          if (
            !firstRow ||
            firstRow.Date === undefined ||
            firstRow.Amount === undefined ||
            firstRow.Type === undefined
          ) {
            onError(
              'Invalid CSV format. Please ensure you are using the exact headers from the template: Date, Description, Amount, Type, CategoryName, AccountName.',
            )
            return
          }

          onParsed(results.data as ParsedTransactionRow[])
        },
        error: (error) => {
          onError(`Failed to parse CSV: ${error.message}`)
        },
      })
    },
    [onParsed, onError],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1,
  })

  return (
    <div
      data-tour-step-id={tourSteps.importDropzone}
      {...getRootProps()}
      className={cn(
        'relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-card text-card-foreground',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted hover:border-primary/50 hover:bg-muted/50',
        isDragReject && 'border-red-500 bg-red-50 dark:bg-red-950/20',
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center space-y-4">
        {isDragReject ? (
          <AlertCircle className="w-12 h-12 text-red-500" />
        ) : isDragActive ? (
          <FileSpreadsheet className="w-12 h-12 text-primary animate-bounce" />
        ) : (
          <UploadCloud className="w-12 h-12 text-muted-foreground" />
        )}

        <div className="space-y-1">
          <p className="text-base font-semibold">
            {isDragReject
              ? 'CSV files only, please.'
              : isDragActive
                ? 'Drop your CSV right here...'
                : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-muted-foreground">Strictly .csv format (Max 1 file)</p>
        </div>
      </div>
    </div>
  )
}
