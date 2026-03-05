import React from 'react'
import { cn } from '@/lib/utils/cn'
import type { SpacerBlockType, SpacerBlockNestedType } from '@/payload/payload-types'

type SpacerBlockProps =
  | Omit<SpacerBlockType, 'blockType' | 'blockName'>
  | Omit<SpacerBlockNestedType, 'blockType' | 'blockName'>

const heightMap: Record<string, string> = {
  xs: 'h-4',
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-40',
}

/**
 * Spacer block component.
 * Renders an empty div with configurable height for layout spacing.
 */
export function SpacerBlock({ height }: SpacerBlockProps) {
  const size = height || 'md'

  return <div className={cn(heightMap[size] || heightMap.md)} aria-hidden="true" />
}
