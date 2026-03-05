import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/display/Card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/buttons'
import type { PricingBlockType } from '@/payload/payload-types'

type PricingBlockProps = Omit<PricingBlockType, 'blockType' | 'blockName'>
type PlanData = NonNullable<PricingBlockType['plans']>[number]

const periodLabels: Record<string, string> = {
  monthly: '/mo',
  yearly: '/yr',
  'one-time': '',
}

/**
 * Pricing block component.
 * Renders pricing plans in a responsive grid with optional highlighting.
 */
export function PricingBlock({ heading, subheading, plans, design }: PricingBlockProps) {
  if (!plans || plans.length === 0) return null

  const columns = design?.columns || '3'

  return (
    <div className="flex flex-col gap-8">
      {(heading || subheading) && (
        <div className="text-center">
          {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
          {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div
        className={cn(
          'grid gap-6',
          columns === '2' && 'sm:grid-cols-2',
          columns === '3' && 'sm:grid-cols-2 lg:grid-cols-3',
          columns === '4' && 'sm:grid-cols-2 lg:grid-cols-4',
        )}
      >
        {plans.map((plan, index) => (
          <PricingCard key={plan.id || index} plan={plan} />
        ))}
      </div>
    </div>
  )
}

function PricingCard({ plan }: { plan: PlanData }) {
  const isHighlighted = plan.highlighted === true

  return (
    <Card
      className={cn('relative flex h-full flex-col', isHighlighted && 'border-primary shadow-lg')}
    >
      {isHighlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          Popular
        </Badge>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="mt-3">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.period && (
            <span className="text-muted-foreground">{periodLabels[plan.period] || ''}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {plan.features && plan.features.length > 0 && (
          <ul className="space-y-2">
            {plan.features.map((feature, idx) => (
              <li key={feature.id || idx} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-primary">✓</span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter>
        {plan.ctaLink ? (
          <Button variant={isHighlighted ? 'default' : 'outline'} className="w-full" asChild>
            <Link href={plan.ctaLink}>{plan.ctaLabel || 'Get started'}</Link>
          </Button>
        ) : (
          <Button variant={isHighlighted ? 'default' : 'outline'} className="w-full">
            {plan.ctaLabel || 'Get started'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
