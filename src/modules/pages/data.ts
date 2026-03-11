import { getPayload } from '@/lib/payload/getPayload'
import { resolvePathname } from '@/lib/utils/resolvePathname'
import type { PageData } from './types'

/**
 * Fetch a page by its pathname.
 *
 * @param params - Route params from Next.js catch-all route
 * @returns The page document, or null if not found
 */
export async function getPage(params: { segments?: string[], draft?: boolean, locale?: string }): Promise<PageData | null> {
  const pathname = resolvePathname(params)
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'pages',
    draft: params.draft,
    ...(params.locale ? { locale: params.locale as any } : {}),
    where: {
      pathname: { equals: pathname },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

/**
 * Generate static params for all pages.
 * Used by Next.js `generateStaticParams`.
 */
export async function getPageStaticParams(): Promise<{ segments: string[] }[]> {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 0,
    select: {
      pathname: true,
    },
  })

  return result.docs
    .filter((doc) => doc.pathname)
    .map((doc) => {
      const pathname = doc.pathname!
      // Root page → empty segments
      if (pathname === '/') return { segments: [] }
      // Strip leading slash and split
      return { segments: pathname.replace(/^\//, '').split('/') }
    })
}
