import type { Block, BlockSlug } from 'payload'
import { contentBlockRegistry } from './content'
import { ColumnsBlock } from './layout/Columns'
import { getAllBlocks, getBlockSlugsFor } from './registry'
import { RichTextBlock } from './RichText.config'

/** Re-export the content block registry for use by layout blocks etc. */
export { contentBlockRegistry } from './content'

/** Slugs available in the root page-builder blocks field. */
export const registeredBlockSlugs: BlockSlug[] = [
  RichTextBlock.blockSlug as BlockSlug,
  ...getBlockSlugsFor(contentBlockRegistry, 'root'),
  ColumnsBlock.slug as BlockSlug,
] as BlockSlug[]

/** Slugs available inside layout blocks (nested/inline variants). */
export const inlineBlockSlugs: BlockSlug[] = getBlockSlugsFor(
  contentBlockRegistry,
  'layout',
) as BlockSlug[]

/** Slugs available in richText inline blocks. */
export const richTextBlockSlugs: BlockSlug[] = getBlockSlugsFor(
  contentBlockRegistry,
  'richText',
) as BlockSlug[]

/** RichText blocks (array for compat). */
const richTextBlocks: Block[] = RichTextBlock.blocks

/** All blocks for the Payload config. */
export const blocks: Block[] = [
  ...richTextBlocks,
  ...getAllBlocks(contentBlockRegistry),
  ColumnsBlock,
]
