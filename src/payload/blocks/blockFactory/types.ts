import type { Block } from 'payload'
import type { BlockTabsOptions } from '@/payload/fields/blockTabs'

/**
 * Contexts where a block variant can be used.
 * Single source of truth for placement; no separate "type" or "disallowInLayout".
 */
export type BlockContext = 'root' | 'layout' | 'richText'

/**
 * Config for createBlock. Extends Payload's Block so slug, labels, admin, etc. are available.
 * fields is built from tabs.
 */
export type CreateBlockConfig = Omit<Block, 'fields'> & {
  interfaceName: string
  tabs: BlockTabsOptions
  /**
   * Where this block can appear.
   * - `true` → all contexts: root, richText, layout
   * - `BlockContext[]` → explicit list; defaults to `['root', 'richText']` when omitted.
   *
   * When `layout` is included a nested variant with suffix is automatically generated.
   */
  availableIn?: BlockContext[] | true
}
