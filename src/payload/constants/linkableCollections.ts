import type { CollectionSlug } from 'payload'

export const linkableCollections = [
  'pages',
  'articles',
] as const satisfies readonly CollectionSlug[]

export type LinkableCollectionSlug = (typeof linkableCollections)[number]
