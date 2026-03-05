import React from 'react'
import { cn } from '@/lib/utils/cn'
import type { VideoProps } from './types'
import { getMediaUrl, getMediaAlt } from './utils'
import type { Media as MediaType } from '@/payload-types'

/**
 * Video component for Payload media resources.
 */
export function Video({
  resource,
  alt: altOverride,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  playsInline = true,
}: VideoProps) {
  const src = getMediaUrl(resource as MediaType | string | number | null)
  const alt = altOverride || getMediaAlt(resource as MediaType | string | number | null)

  if (!src) return null

  return (
    <video
      className={cn('w-full', className)}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline={playsInline}
      aria-label={alt || undefined}
    >
      <source src={src} />
    </video>
  )
}
