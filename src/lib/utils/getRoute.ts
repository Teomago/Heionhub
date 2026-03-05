import type { LinkableCollectionSlug } from '@/payload/constants/linkableCollections'
import type { GetCollectionType } from '@/payload/extended-types'

type RequiredRoutes = Record<LinkableCollectionSlug, (doc: { pathname?: string | null }) => string>

/**
 * Type-safe route definitions for all linkable collections.
 * Uses `satisfies` to ensure every linkable collection has a route function.
 *
 * @example
 * ```ts
 * const href = getRoute('pages', { pathname: '/about' }) // '/about'
 * const href = getRoute('articles', { pathname: '/blog/my-post' }) // '/blog/my-post'
 * ```
 */
const routes = {
  pages: (doc) => doc.pathname || '/',
  articles: (doc) => doc.pathname || '/',
} satisfies RequiredRoutes

/**
 * Get the frontend URL path for a document from a linkable collection.
 */
export function getRoute<T extends LinkableCollectionSlug>(
  collection: T,
  doc: Pick<GetCollectionType<T>, 'pathname'>,
): string {
  const routeFn = routes[collection]
  return routeFn(doc as { pathname?: string | null })
}
