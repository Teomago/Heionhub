'use client'

import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/buttons'
import type { PaginationInfo } from './types'

interface PaginationProps {
  pagination: PaginationInfo
  className?: string
}

/**
 * Pagination controls for listing pages.
 * Updates the `page` search param for navigation.
 */
export function Pagination({ pagination, className }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { page, totalPages, hasPrevPage, hasNextPage } = pagination

  if (totalPages <= 1) return null

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pageNum <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(pageNum))
    }
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  const navigate = (pageNum: number) => {
    router.push(createPageUrl(pageNum))
  }

  // Window of page numbers to display
  const getPageNumbers = (): number[] => {
    const delta = 2
    const range: number[] = []

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i)
    }

    // Add first page
    if (range[0] > 2) {
      range.unshift(-1) // ellipsis marker
    }
    range.unshift(1)

    // Add last page
    if (range[range.length - 1] < totalPages - 1) {
      range.push(-2) // ellipsis marker
    }
    if (totalPages > 1) {
      range.push(totalPages)
    }

    return range
  }

  const pages = getPageNumbers()

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevPage}
        onClick={() => navigate(page - 1)}
        aria-label="Previous page"
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((pageNum, idx) => {
          if (pageNum < 0) {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                &hellip;
              </span>
            )
          }

          return (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === page ? 'page' : undefined}
              className="min-w-9"
            >
              {pageNum}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => navigate(page + 1)}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  )
}
