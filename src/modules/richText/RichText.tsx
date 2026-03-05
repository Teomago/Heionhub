import React from 'react'
import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils/cn'
import { typographyVariants, type TypographyVariantProps } from '@/lib/variants'
import { jsxConverters } from './jsxConverters'

export interface RichTextProps extends TypographyVariantProps {
  /** Lexical rich text data from Payload */
  data: Parameters<typeof PayloadRichText>[0]['data']
  /** Additional CSS classes */
  className?: string
  /** Whether to wrap in prose container */
  enableProse?: boolean
  /** Whether colors should be inverted */
  enableGutter?: boolean
}

/**
 * Rich text renderer wrapping Payload's lexical-to-JSX converter.
 * Applies typographic prose styling by default.
 */
export function RichText({
  data,
  className,
  variant,
  invert,
  enableProse = true,
  enableGutter = true,
}: RichTextProps) {
  if (!data) return null

  return (
    <PayloadRichText
      data={data}
      converters={jsxConverters}
      className={cn(
        enableProse && typographyVariants({ variant, invert }),
        enableGutter && 'rich-text-container',
        'max-w-none',
        className,
      )}
    />
  )
}
