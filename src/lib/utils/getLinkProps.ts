import type { LinkableCollectionSlug } from '@/payload/constants/linkableCollections'
import { internalDocToHref } from './internalDocToHref'

/** Shape of the link field data from Payload */
export interface LinkFieldData {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: LinkableCollectionSlug
    value: any
  } | null
  url?: string | null
  label?: string | null
}

/** Props that can be spread onto an anchor element */
export interface LinkProps {
  href: string
  target?: string
  rel?: string
  'aria-label'?: string
}

/**
 * Convert a Payload link field value into React anchor props.
 *
 * @example
 * ```tsx
 * const link = page.callToAction
 * const props = getLinkProps(link)
 * // <a {...props}>{link.label}</a>
 * ```
 */
export function getLinkProps(link: LinkFieldData | undefined | null): LinkProps {
  if (!link) return { href: '' }

  let href = ''

  if (link.type === 'reference' && link.reference) {
    href = internalDocToHref({
      relationTo: link.reference.relationTo,
      value: link.reference.value,
    })
  } else if (link.type === 'custom' && link.url) {
    href = link.url
  }

  const props: LinkProps = { href }

  if (link.newTab) {
    props.target = '_blank'
    props.rel = 'noopener noreferrer'
  }

  if (link.label) {
    props['aria-label'] = link.label
  }

  return props
}
