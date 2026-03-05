import React from 'react'
import { cn } from '@/lib/utils/cn'
import { RichText } from '@/modules/richText'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/display/Accordion'
import type { FAQBlockType, FAQBlockNestedType } from '@/payload/payload-types'

type FAQBlockProps =
  | Omit<FAQBlockType, 'blockType' | 'blockName'>
  | Omit<FAQBlockNestedType, 'blockType' | 'blockName'>

/**
 * FAQ block component.
 * Renders questions and answers using the existing Accordion component.
 */
export function FAQBlock({ heading, subheading, items, design }: FAQBlockProps) {
  if (!items || items.length === 0) return null

  const allowMultiple = design?.allowMultiple === true

  return (
    <div className="flex flex-col gap-8">
      {(heading || subheading) && (
        <div className="text-center">
          {heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}
          {subheading && <p className="mt-2 text-lg text-muted-foreground">{subheading}</p>}
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl">
        <Accordion type={allowMultiple ? 'multiple' : 'single'} collapsible>
          {items.map((item, index) => (
            <AccordionItem key={item.id || index} value={`faq-${item.id || index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <RichText data={item.answer} enableProse enableGutter={false} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
