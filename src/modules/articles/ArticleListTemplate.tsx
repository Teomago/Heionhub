import React, { Suspense } from 'react'
import { getArticles } from './data'
import { ArticleCard } from './ArticleCard'
import { ListingGrid, Pagination } from '@/modules/listing'
import { BlocksRenderer } from '@/modules/blocks/BlocksRenderer'
import type { Page } from '@/payload-types'
import type { Where } from 'payload'

interface ArticleListTemplateProps {
  /** The page document that triggered this listing */
  page: Page
  /** Current page number from search params */
  currentPage?: number
}

/**
 * Template for rendering a dynamic page as an article listing.
 * Renders beforeList blocks, paginated grid of articles, then afterList blocks.
 * Supports filtering by tags configured in the page's settings tab.
 */
export async function ArticleListTemplate({ page, currentPage = 1 }: ArticleListTemplateProps) {
  // Extract tag IDs from filterByTags (may be IDs or expanded Tag objects)
  // Check if we are using the new query builder or legacy tags
  const query = page.settings?.query
  const where = query?.where as Where | undefined
  const sort = query?.sort as string | undefined

  // Fallback to legacy behavior if no query is defined but filterByTags exists (optional, based on migration strategy)
  // Since we replaced the field definition, filterByTags won't exist in new types, but might exist in DB.
  // We'll ignore legacy for now as per instruction "Replace filterByTags".

  const { docs: articles, pagination } = await getArticles({
    page: currentPage,
    limit: 12,
    sort,
    where,
  })

  return (
    <div>
      {/* Optional blocks above the listing */}
      {page.beforeList && page.beforeList.length > 0 && <BlocksRenderer blocks={page.beforeList} />}

      {/* Article listing grid */}
      <section className="w-full max-w-[1280px] mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <>
            <ListingGrid columns={3}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </ListingGrid>

            <Suspense>
              <div className="mt-12">
                <Pagination pagination={pagination} />
              </div>
            </Suspense>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-12">No articles found.</p>
        )}
      </section>

      {/* Optional blocks below the listing */}
      {page.afterList && page.afterList.length > 0 && <BlocksRenderer blocks={page.afterList} />}
    </div>
  )
}
