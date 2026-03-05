import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Media } from '@/components/display/Media'
import type { Article } from '@/payload-types'
import { isExpanded } from '@/lib/utils/isExpanded'

interface ArticleCardProps {
  article: Article
  className?: string
}

/**
 * Article card for listing pages.
 * Shows featured image, title, excerpt, and publish date.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  const href = article.pathname || `/articles/${article.slug}`
  const featuredImage = isExpanded(article.featuredImage) ? article.featuredImage : null

  return (
    <Link href={href} className={cn('group block', className)}>
      <article className="space-y-3">
        {featuredImage && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Media
              resource={featuredImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="space-y-1.5">
          {article.publishedDate && (
            <time dateTime={article.publishedDate} className="text-sm text-muted-foreground">
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          <h3 className="text-lg font-semibold leading-tight group-hover:underline">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  )
}
