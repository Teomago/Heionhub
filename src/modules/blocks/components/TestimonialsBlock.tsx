'use client'

import React from 'react'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import { Card, CardContent } from '@/components/display/Card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/display/Carousel'
import type { TestimonialsBlockType, Media } from '@/payload/payload-types'

type TestimonialsBlockProps = Omit<TestimonialsBlockType, 'blockType' | 'blockName'>

/**
 * Testimonials block component.
 * Supports grid, carousel, and single layouts.
 * Marked 'use client' because the carousel layout uses interactive embla hooks.
 */
export function TestimonialsBlock({ heading, subheading, items, design }: TestimonialsBlockProps) {
  if (!items || items.length === 0) return null

  const layout = design?.layout || 'grid'
  const columns = design?.columns || '3'

  const header = (heading || subheading) && (
    <div className="text-center">
      {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
      {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
    </div>
  )

  if (layout === 'single' && items.length > 0) {
    const item = items[0]
    return (
      <div className="flex flex-col items-center gap-8">
        {header}
        <TestimonialCard item={item} variant="single" />
      </div>
    )
  }

  if (layout === 'carousel') {
    return (
      <div className="flex flex-col gap-8">
        {header}
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent className="-ml-4">
            {items.map((item, index) => (
              <CarouselItem key={item.id || index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <TestimonialCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-center gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    )
  }

  // Grid layout
  return (
    <div className="flex flex-col gap-8">
      {header}
      <div
        className={cn(
          'grid gap-6',
          columns === '2' && 'sm:grid-cols-2',
          columns === '3' && 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {items.map((item, index) => (
          <TestimonialCard key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  )
}

type TestimonialData = NonNullable<TestimonialsBlockType['items']>[number]

interface TestimonialCardProps {
  item: TestimonialData
  variant?: 'default' | 'single'
}

function TestimonialCard({ item, variant = 'default' }: TestimonialCardProps) {
  const avatarMedia = item.authorAvatar as Media | null | undefined
  const initials = item.authorName
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className={cn('h-full', variant === 'single' && 'max-w-2xl')}>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className={cn(variant === 'single' && 'text-center')}>
          <RichText data={item.quote} enableProse enableGutter={false} />
        </div>
        <div className={cn('flex items-center gap-3', variant === 'single' && 'justify-center')}>
          <Avatar size="default">
            {avatarMedia?.url ? <AvatarImage src={avatarMedia.url} alt={item.authorName} /> : null}
            <AvatarFallback>{initials || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{item.authorName}</p>
            {(item.authorRole || item.authorCompany) && (
              <p className="text-xs text-muted-foreground">
                {[item.authorRole, item.authorCompany].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
