import type { Media as MediaType } from '@/payload-types'

/** Props shared by all media renderers */
export interface MediaBaseProps {
  /** The media document from Payload */
  resource?: MediaType | string | number | null
  /** Alt text override */
  alt?: string
  /** CSS class */
  className?: string
  /** Image priority (above the fold) */
  priority?: boolean
  /** Image sizes attribute */
  sizes?: string
  /** Fill mode (absolute positioned, fills parent) */
  fill?: boolean
  /** Image loading strategy */
  loading?: 'eager' | 'lazy'
}

/** Image component props */
export interface ImageProps extends MediaBaseProps {
  /** Width override */
  width?: number
  /** Height override */
  height?: number
  /** Object fit within container */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
}

/** Video component props */
export interface VideoProps extends MediaBaseProps {
  /** Autoplay the video */
  autoPlay?: boolean
  /** Loop the video */
  loop?: boolean
  /** Mute the video */
  muted?: boolean
  /** Show video controls */
  controls?: boolean
  /** Video plays inline on mobile */
  playsInline?: boolean
}
