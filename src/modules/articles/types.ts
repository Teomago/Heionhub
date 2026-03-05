import type { Article } from '@/payload-types'

/**
 * Article data type for the frontend.
 */
export type ArticleData = Article

/**
 * Route params for article pages.
 */
export interface ArticleRouteParams {
  slug: string
}

/**
 * Listing pagination info.
 */
export interface PaginationInfo {
  page: number
  totalPages: number
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

/**
 * Paginated list result.
 */
export interface PaginatedResult<T> {
  docs: T[]
  pagination: PaginationInfo
}
