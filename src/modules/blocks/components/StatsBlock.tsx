import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Card, CardContent } from '@/components/display/Card'
import type { StatsBlockType, StatsBlockNestedType } from '@/payload/payload-types'

type StatsBlockProps =
  | Omit<StatsBlockType, 'blockType' | 'blockName'>
  | Omit<StatsBlockNestedType, 'blockType' | 'blockName'>

/**
 * Stats block component.
 * Renders a grid or inline row of statistics with value, label, prefix/suffix.
 */
export function StatsBlock({ heading, subheading, items, design }: StatsBlockProps) {
  if (!items || items.length === 0) return null

  const layout = design?.layout || 'grid'
  const columns = design?.columns || '4'

  return (
    <div className="flex flex-col gap-8">
      {(heading || subheading) && (
        <div className="text-center">
          {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
          {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      {layout === 'inline' ? (
        <div className="flex flex-wrap items-center justify-center divide-x">
          {items.map((item, index) => (
            <div key={item.id || index} className="flex flex-col items-center gap-1 px-6 py-2">
              <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                {item.prefix}
                {item.value}
                {item.suffix}
              </span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'grid gap-6',
            columns === '2' && 'sm:grid-cols-2',
            columns === '3' && 'sm:grid-cols-3',
            columns === '4' && 'sm:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {items.map((item, index) => (
            <Card key={item.id || index} className="border-0 shadow-none text-center">
              <CardContent className="flex flex-col items-center gap-1 p-6">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {item.prefix}
                  {item.value}
                  {item.suffix}
                </span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
