import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/components/display/Media'
import type { VideoBlockType, VideoBlockNestedType } from '@/payload/payload-types'

type VideoBlockProps =
  | Omit<VideoBlockType, 'blockType' | 'blockName'>
  | Omit<VideoBlockNestedType, 'blockType' | 'blockName'>

/**
 * Video embed block component.
 * Supports YouTube and Vimeo URLs with configurable aspect ratio.
 */
export function VideoBlock({ heading, url, poster, design }: VideoBlockProps) {
  if (!url) return null

  const aspectRatio = design?.aspectRatio || '16/9'
  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) return null

  const aspectClass = cn(
    'relative w-full overflow-hidden rounded-lg',
    aspectRatio === '16/9' && 'aspect-video',
    aspectRatio === '4/3' && 'aspect-[4/3]',
    aspectRatio === '1/1' && 'aspect-square',
  )

  return (
    <div className="flex flex-col gap-4">
      {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
      <div className={aspectClass}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={heading || 'Video'}
          loading="lazy"
        />
      </div>
    </div>
  )
}

/**
 * Convert a YouTube or Vimeo URL to an embeddable URL.
 */
function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}
