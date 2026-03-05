import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Button } from '@/components/buttons'
import { getLinkProps } from '@/lib/utils/getLinkProps'
import type { CtaSectionBlockType, CtaSectionBlockNestedType } from '@/payload/payload-types'

type CtaSectionBlockProps =
  | Omit<CtaSectionBlockType, 'blockType' | 'blockName'>
  | Omit<CtaSectionBlockNestedType, 'blockType' | 'blockName'>

/**
 * CTA Section block component.
 * Renders a call-to-action section with heading, body text, and action buttons.
 */
export function CtaSectionBlock({ heading, body, links, design }: CtaSectionBlockProps) {
  if (!heading) return null

  const background = design?.background || 'default'
  const alignment = design?.alignment || 'center'

  const bgClass = cn(
    'rounded-2xl px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden backdrop-blur-md border shadow-xl transition-all duration-300 hover:shadow-2xl',
    background === 'muted' && 'bg-muted/90 border-border/50',
    background === 'primary' && 'bg-primary/95 text-primary-foreground border-primary/20 ring-1 ring-primary/10',
    background === 'default' && 'bg-card/90 border-border/50',
  )

  const alignClass = cn('flex flex-col gap-4', alignment === 'center' && 'items-center text-center')

  return (
    <div className={bgClass}>
      <div className={alignClass}>
        <h2
          className={cn(
            'text-3xl font-bold tracking-tight sm:text-4xl text-foreground',
            background === 'primary' && 'text-primary-foreground',
          )}
        >
          {heading}
        </h2>
        {body && (
          <div
            className={cn(
              'max-w-2xl text-muted-foreground dark:text-gray-300',
              background === 'primary' && '[&_*]:text-primary-foreground/80',
            )}
          >
            <RichText data={body} enableProse enableGutter={false} />
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {links.map((item, index) => {
              const linkData = item.link
              const props = getLinkProps(linkData)
              if (!props.href) return null

              // When on primary background, adjust button appearances
              const variant =
                background === 'primary'
                  ? ((linkData.appearance === 'default' ? 'secondary' : linkData.appearance) as any)
                  : (linkData.appearance as any) || 'default'

              return (
                <Button
                  key={item.id || index}
                  variant={variant}
                  size={(linkData.size as any) || 'lg'}
                  asChild
                >
                  <Link href={props.href} target={props.target} rel={props.rel}>
                    {linkData.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
