import React from 'react'
import { RichText } from '@/modules/richText'
import { Media } from '@/components/display/Media'
import { isExpanded } from '@/lib/utils/isExpanded'
import type { Article, User } from '@/payload-types'

interface ArticleTemplateProps {
  article: Article
}

/**
 * Full article detail template.
 * Renders the complete article with featured image, metadata, and content.
 */
export function ArticleTemplate({ article }: ArticleTemplateProps) {
  const featuredImage = isExpanded(article.featuredImage) ? article.featuredImage : null
  const authors = article.authors
    ?.filter((a): a is User => isExpanded(a))
    .map((a) => a.name || a.email || 'Unknown')

  return (
    <article className="container-post py-16">
      {/* Header */}
      <header className="mb-8 space-y-4">
        {article.publishedDate && (
          <time dateTime={article.publishedDate} className="text-sm text-muted-foreground">
            {new Date(article.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
        {article.excerpt && <p className="text-xl text-muted-foreground">{article.excerpt}</p>}
        {authors && authors.length > 0 && (
          <p className="text-sm text-muted-foreground">By {authors.join(', ')}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-12">
          <Media resource={featuredImage} fill sizes="(max-width: 768px) 100vw, 800px" priority />
        </div>
      )}

      {/* Content */}
      {article.content && <RichText data={article.content} variant="blog" />}
    </article>
  )
}
