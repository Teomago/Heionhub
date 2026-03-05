'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import type { BannerBlockType, BannerBlockNestedType } from '@/payload/payload-types'

type BannerBlockProps =
  | Omit<BannerBlockType, 'blockType' | 'blockName'>
  | Omit<BannerBlockNestedType, 'blockType' | 'blockName'>

const typeStyles: Record<string, { container: string; badge: string; badgeLabel: string }> = {
  info: {
    container: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    badgeLabel: 'Info',
  },
  warning: {
    container: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
    badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    badgeLabel: 'Warning',
  },
  success: {
    container: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    badgeLabel: 'Success',
  },
}

/**
 * Banner block component.
 * Renders an alert-style banner with type, content, and optional dismiss.
 * Marked 'use client' for dismissible functionality.
 */
export function BannerBlock({ content, design }: BannerBlockProps) {
  if (!content) return null

  const [dismissed, setDismissed] = useState(false)
  const bannerType = design?.type || 'info'
  const dismissible = design?.dismissible === true
  const styles = typeStyles[bannerType] || typeStyles.info

  if (dismissed) return null

  return (
    <div className={cn('relative flex items-start gap-3 rounded-lg border p-4', styles.container)}>
      <Badge variant="secondary" className={cn('shrink-0', styles.badge)}>
        {styles.badgeLabel}
      </Badge>
      <div className="flex-1 [&_p]:m-0">
        <RichText data={content} enableProse enableGutter={false} />
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
