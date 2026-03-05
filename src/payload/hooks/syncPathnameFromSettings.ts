import type { FieldHook } from 'payload'
import {
  getDefaultCollectionPathname,
  type DynamicCollectionSlug,
} from '@/payload/constants/dynamicCollections'
import type { Page } from '@/payload-types'

interface SyncOptions {
  collection: DynamicCollectionSlug
  slugField?: string
}

/**
 * Computes pathname as: listingPage.pathname + '/' + slug
 *
 * Needs one dynamic page per collection.
 * Falls back to default pathname if no dynamic page exists.
 *
 * NOTE: FigmaCMS adaptation — no draft mode, no `_status` filters.
 */
export const syncPathnameFromSettings = (opts: SyncOptions): FieldHook => {
  return async ({ data, req, operation, context, siblingData }) => {
    if (operation !== 'create' && operation !== 'update') return
    if (context?.skipPathnameSync) return

    const slug = data?.[opts.slugField ?? 'slug'] || siblingData?.[opts.slugField ?? 'slug']
    if (!slug) return null

    const dynamicPages = await req.payload.find({
      collection: 'pages',
      where: {
        and: [
          { type: { equals: 'dynamic' } }, 
          { dynamicCollection: { equals: opts.collection } },
          { _status: { equals: 'published' } }
        ],
      },
      select: {
        type: true,
        dynamicCollection: true,
        pathname: true,
      },
      limit: 1,
    })
    const listingPage = dynamicPages?.docs?.[0] as Page | undefined
    if (!listingPage) {
      // If no dynamic page exists for the collection, use default pathnames as fallback
      const defaultPathname = getDefaultCollectionPathname(opts.collection)
      return `${defaultPathname}/${slug}`
    }

    const parentPathname =
      typeof listingPage === 'object' &&
      listingPage !== null &&
      listingPage.type === 'dynamic' &&
      listingPage.dynamicCollection === opts.collection
        ? listingPage.pathname
        : null

    if (!parentPathname) return null

    return `${parentPathname}/${slug}`
  }
}
