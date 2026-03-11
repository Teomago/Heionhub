import { getPayload } from '@/lib/payload/getPayload'
import type { Where } from 'payload'
import type { ArticleData, PaginatedResult } from './types'

/**
 * Fetch a single article by slug.
 */
export async function getArticle(slug: string, draft?: boolean, locale?: string): Promise<ArticleData | null> {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'articles',
    draft,
    ...(locale ? { locale: locale as any } : {}),
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

/**
 * Fetch paginated articles for a listing page.
 * Optionally filter by tag IDs.
 */
export async function getArticles(
  options: {
    page?: number
    limit?: number
    sort?: string
    tags?: (string | number)[]
    where?: Where
    draft?: boolean
    locale?: string
  } = {},
): Promise<PaginatedResult<ArticleData>> {
  const { page = 1, limit = 12, sort = '-publishedDate', tags, draft, locale } = options
  const payload = await getPayload()

  const where: Where = {}

  // Filter by tags if provided
  if (tags && tags.length > 0) {
    where.tags = { in: tags }
  }

  // Merge with provided where clause
  const finalWhere: Where = options.where ? { and: [where, options.where] } : where

  const result = await payload.find({
    collection: 'articles',
    draft,
    ...(locale ? { locale: locale as any } : {}),
    page,
    limit,
    sort,
    depth: 1,
    where: finalWhere,
  })

  return {
    docs: result.docs,
    pagination: {
      page: result.page ?? 1,
      totalPages: result.totalPages ?? 1,
      totalDocs: result.totalDocs ?? 0,
      hasNextPage: result.hasNextPage ?? false,
      hasPrevPage: result.hasPrevPage ?? false,
      limit: result.limit ?? limit,
    },
  }
}

/**
 * Fetch all article slugs for static param generation.
 */
export async function getArticleStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'articles',
    limit: 1000,
    depth: 0,
    select: {
      slug: true,
    },
  })

  return result.docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug }))
}
