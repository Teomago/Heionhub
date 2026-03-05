import React from 'react'
import { cn } from '@/lib/utils/cn'
import { containerVariants } from '@/lib/variants/containerVariants'
import { spaceVariants } from '@/lib/variants/spaceVariants'
import { RichText } from '@/modules/richText'

interface BlockWrapperProps {
  /** The HTML tag to render (div, section, article) */
  htmlTag?: 'div' | 'section' | 'article' | null
  /** Container type (none, default, post) */
  containerType?: 'none' | 'default' | 'post' | null
  /** Spacing size */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null
  /** Spacing type (margin or padding) */
  spacingType?: 'margin' | 'padding' | null
  /** Rich text content shown before the block */
  prefix?: any
  /** Rich text content shown after the block */
  suffix?: any
  /** Whether prefix is enabled */
  withPrefix?: boolean | null
  /** Whether suffix is enabled */
  withSuffix?: boolean | null
  /** Block name for debugging */
  blockName?: string | null
  /** Block ID */
  id?: string | null
  /** Additional CSS classes */
  className?: string
  children: React.ReactNode
}

/**
 * Shared block wrapper that applies common block settings:
 * - HTML tag (section, div, article)
 * - Container width (none, default, post)
 * - Spacing (margin/padding with size)
 * - Prefix/suffix rich text content
 */
export function Block({
  htmlTag,
  containerType,
  spacing,
  spacingType,
  prefix,
  suffix,
  withPrefix,
  withSuffix,
  blockName,
  id,
  className,
  children,
}: BlockWrapperProps) {
  const Tag = htmlTag || 'div'

  const spacingClasses =
    spacing && spacing !== 'none'
      ? spaceVariants({
          type: spacingType || 'margin',
          variant: 'y',
          size: spacing,
        })
      : undefined

  const containerClasses = containerVariants({
    type: containerType === 'none' ? 'none' : containerType || 'default',
    container: containerType !== 'none',
    variant: 'standard',
  })

  return (
    <Tag
      className={cn(spacingClasses, containerClasses, className)}
      id={id || undefined}
      data-block={blockName || undefined}
    >
      {withPrefix && prefix && (
        <RichText data={prefix} enableProse enableGutter={false} className="mb-8" />
      )}
      {children}
      {withSuffix && suffix && (
        <RichText data={suffix} enableProse enableGutter={false} className="mt-8" />
      )}
    </Tag>
  )
}
