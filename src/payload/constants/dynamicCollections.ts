import type { CollectionSlug } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'

/**
 * Collections that can be rendered under dynamic pages.
 * Used for type inference and validation across the app.
 *
 * Each dynamic collection:
 * - Has a corresponding listing page
 * - Gets its pathname computed from: listingPage.pathname + '/' + slug
 */
export const dynamicCollections = ['articles'] as const satisfies readonly CollectionSlug[]

export type DynamicCollectionSlug = (typeof dynamicCollections)[number]

/** Options for dynamic collection select; labels are translated. */
export const getDynamicCollectionsOptions = (): {
  value: DynamicCollectionSlug
  label: ReturnType<typeof getTranslation>
}[] => [{ value: 'articles', label: getTranslation('articles:plural') }]

export type DynamicPagesMap = Record<string, string>

/**
 * Default pathnames for each dynamic collection's listing page.
 * Used when no dynamic page exists for a collection.
 *
 * key is pathname, value is collection slug
 */
export const dynamicCollectionDefaultPathnames: Record<string, DynamicCollectionSlug> = {
  '/articles': 'articles',
}

export const getDefaultCollectionPathname = (collection: DynamicCollectionSlug): string => {
  const entry = Object.entries(dynamicCollectionDefaultPathnames).find(
    ([, col]) => col === collection,
  )
  return entry ? entry[0] : '/'
}

/**
 * Type guard to check if a string is a valid dynamic collection slug.
 * Useful for validating route parameters.
 *
 * @param collection - The string to validate
 * @returns True if the collection is a valid DynamicCollectionSlug
 */
export const isValidDynamicCollection = (collection: string): collection is DynamicCollectionSlug =>
  dynamicCollections.includes(collection as DynamicCollectionSlug)
