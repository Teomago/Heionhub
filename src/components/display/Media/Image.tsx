import React from 'react'
import NextImage from 'next/image'
import { cn } from '@/lib/utils/cn'
import type { ImageProps } from './types'
import { getMediaUrl, getMediaAlt, getMediaDimensions } from './utils'
import type { Media as MediaType } from '@/payload-types'

/**
 * Image component wrapping Next.js Image with Payload media support.
 * Handles both fill mode and explicit dimensions.
 */
export function Image({
  resource,
  alt: altOverride,
  className,
  priority = false,
  sizes,
  fill = false,
  loading,
  width: widthOverride,
  height: heightOverride,
  objectFit = 'cover',
}: ImageProps) {
  const mediaObj =
    typeof resource === 'object' && resource !== null ? (resource as MediaType) : null
  const src = getMediaUrl(resource as MediaType | string | number | null)
  const alt = altOverride || getMediaAlt(resource as MediaType | string | number | null)
  const { width: intrinsicWidth, height: intrinsicHeight } = getMediaDimensions(mediaObj)

  if (!src) return null

  const width = widthOverride || intrinsicWidth
  const height = heightOverride || intrinsicHeight

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes={sizes || '100vw'}
        priority={priority}
        loading={loading}
        className={cn(`object-${objectFit}`, className)}
      />
    )
  }

  // Need explicit dimensions for non-fill mode
  if (!width || !height) {
    // Fallback to fill-mode wrapper when dimensions unknown
    return (
      <div className={cn('relative', className)} style={{ aspectRatio: '16/9' }}>
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes={sizes || '100vw'}
          priority={priority}
          loading={loading}
          className={`object-${objectFit}`}
        />
      </div>
    )
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={loading}
      className={cn(`object-${objectFit}`, className)}
    />
  )
}
