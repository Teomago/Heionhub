'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/display/Accordion'
import { RichText } from '@/modules/richText'
import { cn } from '@/lib/utils/cn'
import type { AccordionBlockType, AccordionBlockNestedType } from '@/payload/payload-types'

type AccordionBlockProps =
  | Omit<AccordionBlockType, 'blockType' | 'blockName'>
  | Omit<AccordionBlockNestedType, 'blockType' | 'blockName'>

/**
 * Accordion block component.
 * Renders a list of collapsible items using Radix Accordion.
 */
export function AccordionBlock({ items, design }: AccordionBlockProps) {
  if (!items || items.length === 0) return null

  const accordionType = design?.accordionType || 'single'
  const alignment = design?.alignment || 'left'

  const alignmentClass = alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''

  return (
    <div className={cn('w-full', alignmentClass)}>
      {accordionType === 'single' ? (
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.id || index} value={item.id || `item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                {item.content && <RichText data={item.content} enableProse enableGutter={false} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion type="multiple" className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.id || index} value={item.id || `item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                {item.content && <RichText data={item.content} enableProse enableGutter={false} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
