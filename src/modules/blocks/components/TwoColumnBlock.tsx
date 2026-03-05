import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/components/display/Media'
import { RichText } from '@/modules/richText'
import type { TwoColumnBlockType } from '@/payload/payload-types'

type TwoColumnBlockProps = Omit<TwoColumnBlockType, 'blockType' | 'blockName'>

/**
 * Two Column block component.
 * Renders content alongside media in a two-column layout.
 */
export function TwoColumnBlock({ heading, content, media, design }: TwoColumnBlockProps) {
  if (!content) return null

  const mediaPosition = design?.mediaPosition || 'right'
  const verticalAlignment = design?.verticalAlignment || 'center'

  const alignClass = cn(
    verticalAlignment === 'top' && 'items-start',
    verticalAlignment === 'center' && 'items-center',
    verticalAlignment === 'bottom' && 'items-end',
  )

  return (
    <div className={cn('grid gap-8 lg:grid-cols-2 lg:gap-12', alignClass)}>
      <div className={cn(mediaPosition === 'left' && 'lg:order-2')}>
        {heading && (
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        )}
        <RichText data={content} enableProse enableGutter={false} />
      </div>
      {media && (
        <div className={cn(mediaPosition === 'left' && 'lg:order-1')}>
          <Media resource={media} className="rounded-lg" />
        </div>
      )}
    </div>
  )
}
