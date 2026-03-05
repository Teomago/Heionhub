import type { Block } from 'payload'
import type { BlockContext } from '../blockFactory/types'

export type RegisteredBlock = {
  blockSlug: string
  inlineSlug: string | null
  availableIn: BlockContext[]
  blocks: Block[]
}
