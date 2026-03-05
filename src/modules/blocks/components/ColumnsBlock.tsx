import React from 'react'
import { cn } from '@/lib/utils/cn'
import { BlocksRenderer } from '../BlocksRenderer'
import {
  columnsVariants,
  getResponsiveGridClasses,
  getResponsiveColSpanClasses,
  type ResponsiveWidth,
} from '@/lib/variants/columnsVariants'
import type { ColumnsBlockType } from '@/payload/payload-types'

type ColumnsBlockProps = Omit<ColumnsBlockType, 'blockType' | 'blockName'>

/**
 * Columns layout block.
 * Renders a responsive CSS Grid with nested blocks inside each column.
 * Uses smart responsive defaults: stacks on mobile, progressively shows more columns.
 * Supports advanced per-column width when enabled.
 */
export function ColumnsBlock({ columns, design }: ColumnsBlockProps) {
  if (!columns || columns.length === 0) return null

  const colCount = columns.length as 1 | 2 | 3 | 4 | 5 | 6
  const gap = design?.gap || 'md'
  const verticalAlignment = design?.verticalAlignment || 'stretch'
  const advancedSettings = design?.advancedColumnSettings === true

  // Check if any column has custom widths
  const hasCustomWidths = advancedSettings && columns.some((col) => col.settings?.width?.base)

  // Base grid classes (gap + alignment)
  const baseClasses = columnsVariants({ gap, align: verticalAlignment })

  // Responsive grid classes
  const gridClasses = hasCustomWidths
    ? 'grid-cols-12' // 12-column grid for custom widths
    : getResponsiveGridClasses(colCount).join(' ') // Smart responsive defaults

  return (
    <div className={cn(baseClasses, gridClasses)}>
      {columns.map((column, index) => {
        // Per-column responsive span classes
        const colClasses = hasCustomWidths
          ? getResponsiveColSpanClasses(
              column.settings?.width as ResponsiveWidth | undefined,
              Math.floor(12 / colCount),
            )
          : undefined

        return (
          <div key={column.id || index} className={cn('min-w-0', colClasses)}>
            <BlocksRenderer blocks={column.blocks as any} nested />
          </div>
        )
      })}
    </div>
  )
}
