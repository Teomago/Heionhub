import React from 'react'
import { Block } from './Block'
import { blockComponents } from './components'
import { getRootSlug } from '@/payload/blocks/types'
import type { Page } from '@/payload/payload-types'

/** Union type of all possible block data from a page */
type PageBlock = NonNullable<Page['blocks']>[number]

interface BlocksRendererProps {
  /** Array of block data from Payload */
  blocks?: PageBlock[] | null
  /** Whether these are nested blocks (inside columns) — skips Block wrapper */
  nested?: boolean
}

/**
 * Renders an array of Payload blocks by matching each block's `blockType`
 * to its corresponding React component.
 *
 * For root blocks: wraps in <Block> with container/spacing/tag settings.
 * For nested blocks: renders component directly without wrapper.
 */
export function BlocksRenderer({ blocks, nested = false }: BlocksRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const { blockType } = block

        // Map nested slugs back to root component (e.g., accordionNested → accordion)
        const componentSlug = getRootSlug(blockType)
        const Component = blockComponents[componentSlug]

        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[BlocksRenderer] No component found for block type: ${blockType}`)
          }
          return null
        }

        const key = (block as any).id || `${blockType}-${index}`

        if (nested) {
          return (
            <div key={key} className={index > 0 ? 'mt-6' : undefined}>
              <Component {...(block as any)} />
            </div>
          )
        }

        // Root blocks get the shared Block wrapper
        const settings = (block as any).settings || {}
        const design = (block as any).design || {}

        return (
          <Block
            key={key}
            htmlTag={settings.htmlTag}
            containerType={settings.containerType}
            spacing={design.spacing}
            spacingType={design.spacingType}
            prefix={(block as any).prefix}
            suffix={(block as any).suffix}
            withPrefix={settings.withPrefix}
            withSuffix={settings.withSuffix}
            blockName={block.blockName}
            id={settings.id}
          >
            <Component {...(block as any)} />
          </Block>
        )
      })}
    </>
  )
}
