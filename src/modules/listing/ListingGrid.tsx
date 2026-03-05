import React from 'react'
import { cn } from '@/lib/utils/cn'

interface ListingGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

/**
 * Responsive grid layout for listing items.
 */
export function ListingGrid({ children, columns = 3, className }: ListingGridProps) {
  return <div className={cn('grid gap-6', columnClasses[columns], className)}>{children}</div>
}
