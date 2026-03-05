import React, { Suspense } from 'react'
import { getArticles } from '@/modules/articles/data'
import { ArticleCard } from '@/modules/articles/ArticleCard'
import { ListingGrid, Pagination } from '@/modules/listing'
import { extractIds } from '@/lib/utils/extractIds'
import type { ArticleListingBlockType } from '@/payload-types'

/**
 * ArticleListing block component.
 * Fetches and renders a configurable grid of articles,
 * optionally filtered by tags with pagination support.
 *
 * This is an async Server Component — data is fetched at render time.
 */
export async function ArticleListingBlock(props: ArticleListingBlockType) {
  const { tags, limit = 12, columns = '3', sort = '-publishedDate', showPagination = true } = props

  const tagIds = extractIds(tags)

  const { docs: articles, pagination } = await getArticles({
    limit: limit ?? 12,
    sort: sort ?? '-publishedDate',
    tags: tagIds.length > 0 ? tagIds : undefined,
  })

  const numColumns = (Number(columns) || 3) as 1 | 2 | 3 | 4

  if (articles.length === 0) {
    return <p className="text-center text-muted-foreground py-12">No articles found.</p>
  }

  return (
    <div>
      <ListingGrid columns={numColumns}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ListingGrid>

      {showPagination && pagination.totalPages > 1 && (
        <Suspense>
          <div className="mt-12">
            <Pagination pagination={pagination} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
