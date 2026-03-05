import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/components/display/Media'
import { RichText } from '@/modules/richText'
import { Button } from '@/components/buttons'
import { getLinkProps } from '@/lib/utils/getLinkProps'
import type { HeroBlockType } from '@/payload/payload-types'

type HeroBlockProps = Omit<HeroBlockType, 'blockType' | 'blockName'>

/**
 * Hero block component.
 * Supports four layouts: contentLeft, contentRight, contentCenter, overlay.
 */
export function HeroBlock({ heading, subheading, body, links, media, design }: HeroBlockProps) {
  if (!heading) return null

  const layout = design?.layout || 'contentLeft'
  const hasMedia = !!media

  const content = (
    <div
      className={cn(
        'flex flex-col gap-6',
        layout === 'contentCenter' && 'items-center text-center',
        layout === 'overlay' && 'items-center text-center text-white dark:text-foreground',
      )}
    >
      {subheading && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary/80 dark:text-white">
          {subheading}
        </p>
      )}
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl leading-[1.1] drop-shadow-sm text-foreground">{heading}</h1>
      {body && (
        <div className="max-w-2xl text-lg text-muted-foreground dark:text-gray-300">
          <RichText data={body} enableProse enableGutter={false} />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-4">
          {links.map((item, index) => {
            const linkData = item.link
            const props = getLinkProps(linkData)
            if (!props.href) return null

            const isPrimary = Number(index) === 0
            const variant = isPrimary ? ((linkData.appearance as any) || 'default') : 'outline'

            return (
              <Button
                key={item.id || index}
                variant={variant}
                size={(linkData.size as any) || 'lg'}
                className={cn(isPrimary && 'shadow-md shadow-primary/20 hover:shadow-primary/30 transition-shadow', 'rounded-full px-8')}
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
  )

  // Center layout — stacked content, optional media below
  if (layout === 'contentCenter') {
    return (
      <div className="flex flex-col items-center gap-8">
        {content}
        {hasMedia && (
          <div className="w-full max-w-5xl">
            <Media resource={media} className="rounded-2xl shadow-2xl ring-1 ring-border/50" />
          </div>
        )}
      </div>
    )
  }

  // Overlay layout — media as background with content overlay
  if (layout === 'overlay') {
    return (
      <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
        {hasMedia && (
          <div className="absolute inset-0">
            <Media resource={media} fill className="object-cover transition-transform duration-1000 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-[2px]" />
          </div>
        )}
        <div className="relative z-10 px-6 py-24 w-full max-w-6xl mx-auto backdrop-blur-sm bg-black/10 rounded-2xl border border-white/10 p-8 sm:p-12 shadow-2xl my-8">
          {content}
        </div>
      </div>
    )
  }

  // Two-column layout (contentLeft / contentRight)
  const mediaFirst = layout === 'contentRight'

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={cn(mediaFirst && 'lg:order-2')}>{content}</div>
      {hasMedia && (
        <div className={cn(mediaFirst && 'lg:order-1')}>
          <Media resource={media} className="rounded-3xl shadow-2xl ring-1 ring-border/50 rotate-[-1deg] hover:rotate-0 transition-all duration-500" />
        </div>
      )}
    </div>
  )
}
