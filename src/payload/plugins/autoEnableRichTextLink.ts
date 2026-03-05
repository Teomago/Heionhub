import type { Plugin } from 'payload'
import { linkableCollections } from '@/payload/constants/linkableCollections'

/**
 * Plugin to automatically enable rich text linking for collections defined in linkableCollections.
 * Ensures consistency across all linkable collections without manual configuration.
 */
export const autoEnableRichTextLink: Plugin = (config) => {
  return {
    ...config,
    collections: config.collections?.map((collection) => {
      const isLinkable = linkableCollections.some((slug) => slug === collection.slug)

      return {
        ...collection,
        admin: {
          ...collection.admin,
          enableRichTextLink: isLinkable ? true : undefined,
        },
      }
    }),
  }
}
