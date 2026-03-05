import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { getURL } from '@/lib/utils'

const getSiteName = () => process.env.NEXT_PUBLIC_SITE_NAME || 'EtherHub'

const formatMetaTitle = (title?: string) => {
  const siteName = getSiteName()
  return title ? `${title} | ${siteName}` : siteName
}

const generateTitle: GenerateTitle = ({ doc, collectionSlug }) => {
  switch (collectionSlug) {
    case 'pages':
    case 'articles':
      return formatMetaTitle((doc as any)?.title || '')
    default:
      return `Missing generate title function for: ${collectionSlug}`
  }
}

const generateURL: GenerateURL = ({ doc, collectionSlug }) => {
  const pathname = (doc as any)?.pathname
  switch (collectionSlug) {
    case 'pages':
    case 'articles':
      return `${getURL()}${pathname === '/' ? '' : pathname}`.replace(/^\/+/, '/')
    default:
      return getURL()
  }
}

export const seo = seoPlugin({
  collections: ['pages', 'articles'],
  globals: ['seo-settings'],
  generateURL,
  generateTitle,
})
