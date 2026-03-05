import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Media as MediaComponent } from '@/components/display/Media'
import type { MarqueeBlockType, Media } from '@/payload/payload-types'

type MarqueeBlockProps = Omit<MarqueeBlockType, 'blockType' | 'blockName'>

const speedDuration: Record<string, string> = {
  slow: '60s',
  normal: '30s',
  fast: '15s',
}

/**
 * Marquee block component.
 * Renders items in a continuous scrolling ticker using CSS animation.
 */
export function MarqueeBlock({ items, design }: MarqueeBlockProps) {
  if (!items || items.length === 0) return null

  const speed = design?.speed || 'normal'
  const direction = design?.direction || 'ltr'
  const pauseOnHover = design?.pauseOnHover !== false
  const duration = speedDuration[speed] || '30s'

  const animationStyle = {
    '--marquee-duration': duration,
  } as React.CSSProperties

  return (
    <div className="relative overflow-hidden" style={animationStyle}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div
        className={cn(
          'flex',
          direction === 'ltr'
            ? 'animate-[marquee_var(--marquee-duration)_linear_infinite]'
            : 'animate-[marquee-reverse_var(--marquee-duration)_linear_infinite]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="mx-6 flex shrink-0 items-center">
            {item.type === 'image' && item.image ? (
              <div className="h-12 w-32">
                <MediaComponent
                  resource={item.image as Media}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : item.text ? (
              <span className="whitespace-nowrap text-lg font-medium">{item.text}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
