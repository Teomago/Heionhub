'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Media as MediaComponent } from '@/components/display/Media'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import type { GalleryBlockType, GalleryBlockNestedType, Media } from '@/payload/payload-types'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

type GalleryBlockProps =
  | Omit<GalleryBlockType, 'blockType' | 'blockName'>
  | Omit<GalleryBlockNestedType, 'blockType' | 'blockName'>

type ImageItem = NonNullable<GalleryBlockType['images']>[number]

/**
 * Gallery block component.
 * Supports grid and masonry layouts with optional lightbox.
 * Marked 'use client' for Dialog lightbox interactivity.
 */
export function GalleryBlock({ heading, subheading, images, design }: GalleryBlockProps) {
  if (!images || images.length === 0) return null

  const layout = design?.layout || 'grid'
  const columns = design?.columns || '3'
  const lightbox = design?.lightbox !== false

  const [lightboxImage, setLightboxImage] = useState<ImageItem | null>(null)

  const header = (heading || subheading) && (
    <div className="text-center">
      {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
      {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
    </div>
  )

  const columnClass = cn(
    layout === 'masonry' ? 'columns-2' : 'grid gap-4',
    layout === 'masonry' && columns === '3' && 'sm:columns-3',
    layout === 'masonry' && columns === '4' && 'sm:columns-3 lg:columns-4',
    layout === 'grid' && columns === '2' && 'sm:grid-cols-2',
    layout === 'grid' && columns === '3' && 'sm:grid-cols-2 lg:grid-cols-3',
    layout === 'grid' && columns === '4' && 'sm:grid-cols-2 lg:grid-cols-4',
  )

  return (
    <div className="flex flex-col gap-8">
      {header}
      <div className={columnClass}>
        {images.map((item, index) => {
          const media = item.image as Media
          return (
            <div
              key={item.id || index}
              className={cn(
                'group relative overflow-hidden rounded-lg',
                layout === 'masonry' && 'mb-4 break-inside-avoid',
                lightbox && 'cursor-pointer',
              )}
              onClick={lightbox ? () => setLightboxImage(item) : undefined}
            >
              <MediaComponent
                resource={media}
                className={cn(
                  'w-full object-cover transition-transform duration-300 group-hover:scale-105',
                  layout === 'grid' && 'aspect-square',
                )}
              />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-sm text-white">{item.caption}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {lightbox && (
        <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
          <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
            <VisuallyHidden.Root>
              <DialogTitle>{lightboxImage?.caption || 'Image'}</DialogTitle>
              <DialogDescription>Gallery image preview</DialogDescription>
            </VisuallyHidden.Root>
            {lightboxImage && (
              <div className="relative">
                <MediaComponent
                  resource={lightboxImage.image as Media}
                  className="max-h-[85vh] w-full rounded-lg object-contain"
                />
                {lightboxImage.caption && (
                  <p className="mt-2 text-center text-sm text-white">{lightboxImage.caption}</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
