'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { IconButton } from '@/components/buttons'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]

/* ===== Context ===== */

interface CarouselContextValue {
  api: CarouselApi
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  selectedIndex: number
  scrollSnaps: number[]
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('useCarousel must be used within <Carousel>')
  return context
}

/* ===== Carousel Root ===== */

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, opts, orientation = 'horizontal', setApi, children, ...props }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    })

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const onSelect = useCallback((api: NonNullable<CarouselApi>) => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setSelectedIndex(api.selectedScrollSnap())
    }, [])

    useEffect(() => {
      if (!emblaApi) return
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect(emblaApi)
      emblaApi.on('reInit', onSelect).on('select', onSelect)

      return () => {
        emblaApi.off('reInit', onSelect).off('select', onSelect)
      }
    }, [emblaApi, onSelect])

    useEffect(() => {
      if (setApi && emblaApi) setApi(emblaApi)
    }, [emblaApi, setApi])

    return (
      <CarouselContext.Provider
        value={{
          api: emblaApi,
          canScrollPrev,
          canScrollNext,
          scrollPrev,
          scrollNext,
          selectedIndex,
          scrollSnaps,
        }}
      >
        <div
          ref={ref}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <div ref={emblaRef} className="overflow-hidden">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = 'Carousel'

/* ===== CarouselContent ===== */

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex', className)} {...props} />,
)
CarouselContent.displayName = 'CarouselContent'

/* ===== CarouselItem ===== */

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  ),
)
CarouselItem.displayName = 'CarouselItem'

/* ===== CarouselPrevious ===== */

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { canScrollPrev, scrollPrev } = useCarousel()

  return (
    <IconButton
      ref={ref}
      variant="outline"
      size="md"
      className={cn('absolute -left-12 top-1/2 -translate-y-1/2 rounded-full', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </IconButton>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

/* ===== CarouselNext ===== */

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { canScrollNext, scrollNext } = useCarousel()

  return (
    <IconButton
      ref={ref}
      variant="outline"
      size="md"
      className={cn('absolute -right-12 top-1/2 -translate-y-1/2 rounded-full', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </IconButton>
  )
})
CarouselNext.displayName = 'CarouselNext'

/* ===== CarouselDots ===== */

function CarouselDots({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, api } = useCarousel()

  return (
    <div className={cn('flex justify-center gap-1.5 mt-4', className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            'h-2 w-2 rounded-full transition-colors',
            index === selectedIndex ? 'bg-foreground' : 'bg-foreground/25',
          )}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  type CarouselApi,
  type CarouselOptions,
}
