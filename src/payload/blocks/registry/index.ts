import type { Block, BlockSlug } from 'payload'
import type { BlockContext } from '../blockFactory/types'
import type { RegisteredBlock } from './types'

/** All Block[] for Payload config from a registry array. */
export const getAllBlocks = (registry: RegisteredBlock[]): Block[] =>
  registry.flatMap((e) => e.blocks)

/** Block slugs for given context.
 * If context is 'layout' and nested variant exists, returns nested slug, otherwise returns regular slug.
 * Used for filtering blocks in the UI based on context (e.g. root blocks vs nested blocks in layout).
 */
export const getBlockSlugsFor = (registry: RegisteredBlock[], context: BlockContext): BlockSlug[] =>
  registry
    .filter((e) => e.availableIn.includes(context))
    .map((e) => {
      if (context === 'layout' && e.inlineSlug) {
        return e.inlineSlug as BlockSlug
      }
      return e.blockSlug as BlockSlug
    })

/** All slugs from the registry. */
export const getAllSlugs = <const T extends readonly RegisteredBlock[]>(registry: T) => {
  return registry.flatMap((rb) => {
    const slugs: string[] = [rb.blockSlug]
    if (rb.inlineSlug) slugs.push(rb.inlineSlug)
    return slugs
  }) as BlockSlug[]
}
