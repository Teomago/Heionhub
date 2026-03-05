import type { Page } from '@/payload/payload-types'

/**
 * Type for page data returned by the data fetcher.
 * Includes all fields needed for rendering.
 */
export type PageData = Page

/**
 * Route params for the catch-all page route.
 */
export type PageRouteParams = {
  segments?: string[]
}
