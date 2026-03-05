import { Config } from '@/payload-types'
import { LinkableCollectionSlug as LinkableCollectionSlugType } from './constants/linkableCollections'

/**
 * Union type of collection slugs that can be linked to a rendered page.
 * This is derived from the linkableCollections constant array.
 *
 * @example 'pages' | 'articles'
 */
export type LinkableCollectionSlug = LinkableCollectionSlugType

/**
 * Union type of all linkable collection document types.
 * Used when you need to accept any document from a linkable collection but don't know the specific type.
 *
 * @example Page | Article
 */
export type LinkableCollection = Config['collections'][LinkableCollectionSlugType]

/**
 * Type mapping from collection slugs to their corresponding document types.
 * Useful for creating type-safe functions that work with specific collections.
 *
 * @example CollectionTypeMap['pages'] = Page, CollectionTypeMap['articles'] = Article
 */
export type CollectionTypeMap = Config['collections']

/**
 * Helper type to get the specific document type based on a collection slug.
 * Provides type safety when working with documents from specific collections.
 *
 * @template T - The specific LinkableCollectionSlug
 * @example GetCollectionType<'pages'> = Page, GetCollectionType<'articles'> = Article
 */
export type GetCollectionType<T extends LinkableCollectionSlug> = CollectionTypeMap[T]

/**
 * Discriminated union that maps each collection slug to its document type.
 * This enables TypeScript to automatically narrow types in switch statements.
 * When you switch on relationTo, the value field will be automatically typed.
 */
export type LinkableDocument = {
  [K in LinkableCollectionSlug]: {
    relationTo: K
    value: string | GetCollectionType<K>
  }
}[LinkableCollectionSlug]

/**
 * Dynamic page configuration from Pages collection where type='dynamic'.
 * Contains the minimal fields needed for rendering dynamic page headers.
 */
export type DynamicPageConfig = Pick<
  Config['collections']['pages'],
  'id' | 'title' | 'pathname' | 'beforeList' | 'afterList' | 'breadcrumbs'
>
