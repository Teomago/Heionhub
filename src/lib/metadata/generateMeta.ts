import type { Metadata } from 'next'
import { getCachedGlobal } from '@/modules/common/data'
import type { SEOSettings, Page, Article, Media } from '@/payload-types'
import { isExpanded } from '@/lib/utils/isExpanded'
import { getMediaUrl } from '@/components/display/Media/utils'

/**
 * Get site-wide SEO settings from the global.
 */
async function getSeoSettings(): Promise<SEOSettings> {
  return getCachedGlobal<SEOSettings>('seo-settings', 0)
}

/**
 * Merge page/article-specific metadata with site defaults.
 * Generates Next.js Metadata for use in `generateMetadata`.
 */
export async function generateMeta(options: {
  title?: string
  description?: string
  image?: Media | string | null
  pathname?: string
  noIndex?: boolean
}): Promise<Metadata> {
  const { title, description, image, pathname, noIndex } = options
  const seo = await getSeoSettings()

  const siteName = seo.siteName || ''
  const siteTagline = seo.tagline || ''

  // Build title — return just the page/article title.
  // The layout template (`%s | SiteName`) appends the site name automatically.
  const metaTitle =
    title || (siteName ? `${siteName}${siteTagline ? ` — ${siteTagline}` : ''}` : '')

  // Full title for OG/Twitter (social previews don't use the template)
  const fullTitle = title ? `${title} | ${siteName}` : metaTitle

  // Build description
  const metaDescription = description || siteTagline || ''

  // Build OG image
  let ogImage: string | undefined
  if (image) {
    if (typeof image === 'string') {
      ogImage = image
    } else if (isExpanded(image)) {
      ogImage = getMediaUrl(image) || undefined
    }
  }

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
  }

  if (noIndex) {
    metadata.robots = { index: false, follow: false }
  }

  if (ogImage || fullTitle) {
    metadata.openGraph = {
      title: fullTitle,
      description: metaDescription,
      ...(siteName && { siteName }),
      ...(ogImage && {
        images: [{ url: ogImage }],
      }),
    }
  }

  if (ogImage || fullTitle) {
    metadata.twitter = {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: metaDescription,
      ...(ogImage && {
        images: [ogImage],
      }),
    }
  }

  return metadata
}

/**
 * Generate metadata for a Page document.
 */
export async function generatePageMeta(page: Page): Promise<Metadata> {
  return generateMeta({
    title: page.title,
    pathname: page.pathname || undefined,
  })
}

/**
 * Generate metadata for an Article document.
 */
export async function generateArticleMeta(article: Article): Promise<Metadata> {
  const image = isExpanded(article.featuredImage) ? article.featuredImage : null

  return generateMeta({
    title: article.title,
    description: article.excerpt || undefined,
    image,
    pathname: article.pathname || undefined,
  })
}
