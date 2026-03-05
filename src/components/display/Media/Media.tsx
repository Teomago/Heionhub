import React from 'react'
import { cn } from '@/lib/utils/cn'
import { isVideo, isImage } from '@/lib/utils/media'
import type { MediaBaseProps, ImageProps, VideoProps } from './types'
import { Image } from './Image'
import { Video } from './Video'
import type { Media as MediaType } from '@/payload-types'

export type MediaProps = MediaBaseProps &
  Partial<Omit<ImageProps, keyof MediaBaseProps>> &
  Partial<Omit<VideoProps, keyof MediaBaseProps>> & {
    /** Wrapper element class */
    containerClassName?: string
  }

/**
 * Polymorphic media renderer.
 * Automatically selects Image or Video based on the media MIME type.
 *
 * @example
 * ```tsx
 * <Media resource={page.heroImage} sizes="100vw" priority />
 * ```
 */
export function Media({
  resource,
  className,
  containerClassName,
  // Image props
  width,
  height,
  objectFit,
  // Video props
  autoPlay,
  loop,
  muted,
  controls,
  playsInline,
  // Shared props
  ...shared
}: MediaProps) {
  if (!resource) return null

  const mediaObj =
    typeof resource === 'object' && resource !== null ? (resource as MediaType) : null
  const mimeType = mediaObj?.mimeType || null

  const content = isVideo(mimeType) ? (
    <Video
      resource={resource}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline={playsInline}
      {...shared}
    />
  ) : isImage(mimeType) || mimeType === null ? (
    <Image
      resource={resource}
      className={className}
      width={width}
      height={height}
      objectFit={objectFit}
      {...shared}
    />
  ) : null

  if (!content) return null

  if (containerClassName) {
    return <div className={cn(containerClassName)}>{content}</div>
  }

  return content
}
