import type { NESTED_SUFFIX } from './blockFactory'

/**
 * Utility type: a root-level block slug (no suffix).
 */
export type RootBlockSlug = string

/**
 * Utility type: a nested block slug (with NESTED_SUFFIX appended).
 */
export type NestedBlockSlug = `${string}${typeof NESTED_SUFFIX}`

/**
 * Check if a slug is a nested variant (ends with NESTED_SUFFIX).
 */
export const isNestedSlug = (slug: string): slug is NestedBlockSlug => slug.endsWith('Nested')

/**
 * Check if a slug is a root variant (does not end with NESTED_SUFFIX).
 */
export const isRootSlug = (slug: string): slug is RootBlockSlug => !isNestedSlug(slug)

/**
 * Get the root slug from a potentially nested slug.
 */
export const getRootSlug = (slug: string): string =>
  isNestedSlug(slug) ? slug.slice(0, -'Nested'.length) : slug
