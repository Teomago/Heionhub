import type { Block } from 'payload'
import { blockTabs } from '@/payload/fields/blockTabs'
import type { RegisteredBlock } from '../registry/types'
import type { BlockContext, CreateBlockConfig } from './types'
import { addSuffixToBlockInterfaceName, addSuffixToBlockLabels } from './uitls'

export const NESTED_SUFFIX = 'Nested' as const

/**
 * Produce a RegisteredBlock from a single config.
 *
 * - Root variant generated unless `availableIn` is set to only 'layout'
 * - Nested variant (slug: `${slug}${NESTED_SUFFIX}`) generated when `availableIn` includes 'layout'.
 */
export const createBlock = (config: CreateBlockConfig): RegisteredBlock => {
  const { tabs, availableIn: rawAvailableIn, ...blockRest } = config
  const blocks: Block[] = []

  const availableIn: BlockContext[] =
    rawAvailableIn === true
      ? ['root', 'richText', 'layout']
      : (rawAvailableIn ?? ['root', 'richText'])

  // Root variant
  if (
    availableIn.length > 0 &&
    // Check if availableIn is not only 'layout'
    // If length is 2 or more, it means there are other contexts besides 'layout', so we should generate the root variant
    !(availableIn.length === 1 && availableIn[0] === 'layout')
  ) {
    blocks.push({
      ...blockRest,
      fields: blockTabs({ ...tabs, variant: 'block' }),
    })
  }

  // Nested variant (for layout)
  const inlineSlug = availableIn.includes('layout') ? `${config.slug}${NESTED_SUFFIX}` : null
  const availableInLayout = availableIn.includes('layout')
  if (availableInLayout) {
    blocks.push({
      ...blockRest,
      slug: `${config.slug}${NESTED_SUFFIX}`,
      interfaceName: addSuffixToBlockInterfaceName(config.interfaceName, NESTED_SUFFIX),
      labels: addSuffixToBlockLabels({
        labels: config.labels,
        suffix: `(${NESTED_SUFFIX})`,
        blockSlug: config.slug,
      }),
      fields: blockTabs({ ...tabs, variant: 'inline' }),
    })
  }

  return {
    blockSlug: config.slug,
    inlineSlug,
    availableIn,
    blocks,
  }
}

/** @deprecated Use createBlock instead, which returns RegisteredBlock */
export const blockTabsFactory = createBlock
