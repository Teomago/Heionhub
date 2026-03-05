import type { LinkableDocument } from '@/payload/extended-types'
import { assertNever } from './assertNever'
import { getRoute } from './getRoute'
import { isExpanded } from './isExpanded'

/**
 * Convert an internal document reference to an href string.
 * Handles both expanded (populated) and non-expanded (ID only) references.
 *
 * @example
 * ```ts
 * // Expanded reference
 * internalDocToHref({ relationTo: 'pages', value: { id: '1', pathname: '/about' } })
 * // Returns: '/about'
 *
 * // Non-expanded reference (just ID)
 * internalDocToHref({ relationTo: 'pages', value: '123' })
 * // Returns: ''
 * ```
 */
export function internalDocToHref(doc: LinkableDocument): string {
  const { relationTo, value } = doc

  if (!isExpanded(value)) {
    // Can't resolve a path from just an ID
    return ''
  }

  switch (relationTo) {
    case 'pages':
      return getRoute('pages', value)
    case 'articles':
      return getRoute('articles', value)
    default:
      return assertNever(relationTo)
  }
}
