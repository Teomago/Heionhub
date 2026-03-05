import React from 'react'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Card, CardContent } from '@/components/display/Card'
import { Icon } from '@/components/display/Icon'
import type { FeaturesBlockType } from '@/payload/payload-types'

type FeaturesBlockProps = Omit<FeaturesBlockType, 'blockType' | 'blockName'>

/**
 * Features block component.
 * Renders a grid or list of feature items with icon, title, and description.
 */
export function FeaturesBlock({ heading, subheading, items, design }: FeaturesBlockProps) {
  if (!items || items.length === 0) return null

  const layout = design?.layout || 'grid'
  const columns = design?.columns || '3'

  const columnClass =
    layout === 'grid'
      ? cn(
          'grid gap-6',
          columns === '2' && 'sm:grid-cols-2',
          columns === '3' && 'sm:grid-cols-2 lg:grid-cols-3',
          columns === '4' && 'sm:grid-cols-2 lg:grid-cols-4',
        )
      : 'flex flex-col gap-6'

  return (
    <div className="flex flex-col gap-8">
      {(heading || subheading) && (
        <div className="text-center">
          {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">{heading}</h2>}
          {subheading && <p className="mt-2 text-lg text-muted-foreground dark:text-gray-300">{subheading}</p>}
        </div>
      )}

      <div className={columnClass}>
        {items.map((item, index) => {
          if (layout === 'list') {
            return (
              <div key={item.id || index} className="flex gap-6 items-start group p-4 rounded-2xl hover:bg-muted/50 transition-colors">
                {item.icon && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                    <Icon name={item.icon} size={24} />
                  </div>
                )}
                <div className="flex flex-col gap-1.5 mt-1">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                  {item.description && (
                    <div className="text-muted-foreground dark:text-gray-300">
                      <RichText data={item.description} enableProse enableGutter={false} />
                    </div>
                  )}
                </div>
              </div>
            )
          }

          return (
            <Card key={item.id || index} className="border border-border/60 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 bg-card/60 backdrop-blur-md relative overflow-hidden group rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="flex flex-col items-start gap-5 p-8 sm:p-10 relative z-10 h-full">
                {item.icon && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                    <Icon name={item.icon} size={32} />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold tracking-tight mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  {item.description && (
                    <div className="text-muted-foreground dark:text-gray-300 text-base leading-relaxed">
                      <RichText data={item.description} enableProse enableGutter={false} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
