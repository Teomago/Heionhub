import React from 'react'
import { RichText } from '@/modules/richText'
import type { RichTextBlockType } from '@/payload/payload-types'

type RichTextBlockProps = Omit<RichTextBlockType, 'blockType' | 'blockName'>

/**
 * Rich Text block component.
 * Renders lexical rich text data with prose styling.
 */
export function RichTextBlock({ data, design }: RichTextBlockProps) {
  if (!data) return null

  return <RichText data={data} />
}
