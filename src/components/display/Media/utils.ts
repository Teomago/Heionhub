import type { Media as MediaType } from '@/payload-types'

/**
 * Get the URL for a media resource.
 * Handles both expanded (full object) and non-expanded (ID) references.
 */
export function getMediaUrl(
  resource: MediaType | string | number | null | undefined,
): string | null {
  if (!resource) return null
  if (typeof resource === 'string') return resource
  if (typeof resource === 'number') return null
  return resource.url || null
}

/**
 * Get alt text from a media resource, with fallback to filename.
 */
export function getMediaAlt(
  resource: MediaType | string | number | null | undefined,
  fallback?: string,
): string {
  if (!resource || typeof resource !== 'object') return fallback || ''
  return resource.alt || resource.filename || fallback || ''
}

/**
 * Get media dimensions from a resource.
 */
export function getMediaDimensions(resource: MediaType | null | undefined): {
  width: number | undefined
  height: number | undefined
} {
  if (!resource || typeof resource !== 'object') {
    return { width: undefined, height: undefined }
  }
  return {
    width: resource.width || undefined,
    height: resource.height || undefined,
  }
}
