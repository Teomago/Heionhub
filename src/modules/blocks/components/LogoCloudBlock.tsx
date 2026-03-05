import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Media as MediaComponent } from '@/components/display/Media'
import type { LogoCloudBlockType, Media } from '@/payload/payload-types'

type LogoCloudBlockProps = Omit<LogoCloudBlockType, 'blockType' | 'blockName'>

/**
 * Logo Cloud block component.
 * Grid layout renders logos in a responsive grid.
 * Marquee layout renders logos in an infinite scrolling ticker using pure CSS animation.
 */
export function LogoCloudBlock({ heading, subheading, logos, design }: LogoCloudBlockProps) {
  if (!logos || logos.length === 0) return null

  const layout = design?.layout || 'grid'
  const columns = design?.columns || '5'

  const header = (heading || subheading) && (
    <div className="text-center">
      {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
      {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
    </div>
  )

  if (layout === 'marquee') {
    return (
      <div className="flex flex-col gap-8">
        {header}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="flex animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {/* Duplicate logos for seamless looping */}
            {[...logos, ...logos].map((logo, index) => (
              <LogoItem
                key={`${logo.id || index}-${index}`}
                logo={logo}
                className="mx-8 shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Grid layout
  return (
    <div className="flex flex-col gap-8">
      {header}
      <div
        className={cn(
          'grid items-center justify-items-center gap-8',
          columns === '3' && 'grid-cols-2 sm:grid-cols-3',
          columns === '4' && 'grid-cols-2 sm:grid-cols-4',
          columns === '5' && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
          columns === '6' && 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
        )}
      >
        {logos.map((logo, index) => (
          <LogoItem key={logo.id || index} logo={logo} />
        ))}
      </div>
    </div>
  )
}

type LogoData = NonNullable<LogoCloudBlockType['logos']>[number]

interface LogoItemProps {
  logo: LogoData
  className?: string
}

function LogoItem({ logo, className }: LogoItemProps) {
  const content = (
    <div
      className={cn(
        'flex h-16 w-32 items-center justify-center grayscale transition-all hover:grayscale-0',
        className,
      )}
    >
      <MediaComponent
        resource={logo.image as Media}
        className="max-h-full max-w-full object-contain"
        alt={logo.name}
      />
    </div>
  )

  if (logo.url) {
    return (
      <Link
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        title={logo.name}
      >
        {content}
      </Link>
    )
  }

  return content
}
