import React from 'react'
import Link from 'next/link'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { defaultJSXConverters, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
} from '@payloadcms/richtext-lexical'
import type { IconBlockType, CallToActionBlockType } from '@/payload-types'
import { getLinkProps } from '@/lib/utils/getLinkProps'
import { cn } from '@/lib/utils/cn'

// Extend node types with our custom blocks
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CallToActionBlockType>
  | SerializedInlineBlockNode<IconBlockType>

/**
 * Composed JSX converters for rich text rendering.
 *
 * Merges default converters with custom overrides:
 * - blocks.callToAction: Renders CTA links
 * - inlineBlocks.icon: Renders inline icons
 */
export const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    callToAction: ({ node }) => {
      const { links, design } = node.fields
      if (!links || links.length === 0) return null

      const alignClass = (() => {
        const mobileAlign = design?.align?.mobile
        if (mobileAlign === 'center') return 'justify-center'
        if (mobileAlign === 'right') return 'justify-end'
        if (mobileAlign === 'fullWidth') return ''
        return 'justify-start'
      })()

      return (
        <div className={cn('flex flex-wrap gap-3 not-prose', alignClass)}>
          {links.map((item, index) => {
            const { link } = item
            const props = getLinkProps(link)
            const appearance = link.appearance || 'default'
            const size = link.size || 'md'

            return (
              <Link
                key={item.id || index}
                {...props}
                className={cn(
                  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                  // Size variants
                  size === 'xs' && 'h-7 px-2 text-xs',
                  size === 'sm' && 'h-8 px-3 text-sm',
                  size === 'md' && 'h-9 px-4 text-sm',
                  size === 'lg' && 'h-10 px-6 text-base',
                  size === 'xl' && 'h-12 px-8 text-lg',
                  // Appearance variants
                  appearance === 'default' &&
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                  appearance === 'secondary' &&
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                  appearance === 'outline' &&
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                  appearance === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
                  appearance === 'destructive' &&
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                  appearance === 'link' &&
                    'text-primary underline-offset-4 hover:underline h-auto p-0',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )
    },
  },
  inlineBlocks: {
    icon: ({ node }) => {
      const { icon, color, size } = node.fields
      if (!icon) return null

      const mobileSize = size?.mobile || 24
      const style: React.CSSProperties = {
        display: 'inline-flex',
        width: mobileSize,
        height: mobileSize,
        ...(color ? { color } : {}),
      }

      // Icon field stores icon identifier string — render as a span with the icon name
      // The actual rendering depends on the icon system (could be SVG sprite, font icon, etc.)
      return (
        <span
          className="inline-icon inline-flex items-center justify-center align-middle"
          style={style}
          data-icon={icon}
          aria-hidden="true"
        />
      )
    },
  },
})
