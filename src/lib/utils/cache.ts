import { cache } from 'react'
import { unstable_cache } from 'next/cache'

type CacheOptions = {
  /** Cache tags for revalidation. Can include functions that receive the args. */
  tags?: string[] | ((...args: any[]) => string[])
  /** Revalidation period in seconds */
  revalidate?: number | false
}

/**
 * Combines React's `cache()` (request deduplication) with Next.js `unstable_cache()` (persistent cache).
 *
 * - React `cache()` deduplicates calls within a single request
 * - `unstable_cache()` persists across requests with tag-based revalidation
 *
 * @example
 * ```ts
 * const getCachedPosts = createCachedFetcher(
 *   async (category: string) => {
 *     return payload.find({ collection: 'posts', where: { category: { equals: category } } })
 *   },
 *   { tags: ['posts'], revalidate: 60 }
 * )
 * ```
 */
export function createCachedFetcher<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options: CacheOptions = {},
): (...args: TArgs) => Promise<TResult> {
  const { tags, revalidate } = options

  const getCacheTags = (...args: TArgs): string[] => {
    if (!tags) return []
    if (typeof tags === 'function') return tags(...args)
    return tags
  }

  const cachedFn = (...args: TArgs): Promise<TResult> => {
    const cacheTags = getCacheTags(...args)

    return unstable_cache(async () => fn(...args), [fn.name || 'anonymous', ...cacheTags], {
      tags: cacheTags.length > 0 ? cacheTags : undefined,
      revalidate: revalidate ?? false,
    })()
  }

  // Wrap with React cache for request-level deduplication
  return cache(cachedFn)
}
