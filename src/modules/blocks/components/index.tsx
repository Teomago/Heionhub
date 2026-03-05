import React from 'react'
import { RichTextBlock } from './RichTextBlock'
import { AccordionBlock } from './AccordionBlock'
import { ColumnsBlock } from './ColumnsBlock'
import { ArticleListingBlock } from './ArticleListingBlock'
import { HeroBlock } from './HeroBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { CtaSectionBlock } from './CtaSectionBlock'
import { StatsBlock } from './StatsBlock'
import { TestimonialsBlock } from './TestimonialsBlock'
import { LogoCloudBlock } from './LogoCloudBlock'
import { TwoColumnBlock } from './TwoColumnBlock'
import { GalleryBlock } from './GalleryBlock'
import { VideoBlock } from './VideoBlock'
import { TeamBlock } from './TeamBlock'
import { MarqueeBlock } from './MarqueeBlock'
import { SpacerBlock } from './SpacerBlock'
import { ContactFormBlock } from './ContactFormBlock'
import { PricingBlock } from './PricingBlock'
import { BannerBlock } from './BannerBlock'
import { FAQBlock } from './FAQBlock'

/**
 * Block component registry.
 *
 * Maps block slugs (root slug, not nested) to their React component.
 * When rendering, nested slugs are mapped back to root via `getRootSlug()`.
 *
 * To add a new block:
 * 1. Create BlockComponent.tsx in this directory
 * 2. Add the slug → component mapping here
 */
export const blockComponents: Record<string, React.ComponentType<any>> = {
  richText: RichTextBlock,
  accordion: AccordionBlock,
  columns: ColumnsBlock,
  articleListing: ArticleListingBlock,
  hero: HeroBlock,
  features: FeaturesBlock,
  ctaSection: CtaSectionBlock,
  stats: StatsBlock,
  testimonials: TestimonialsBlock,
  logoCloud: LogoCloudBlock,
  twoColumn: TwoColumnBlock,
  gallery: GalleryBlock,
  video: VideoBlock,
  team: TeamBlock,
  marquee: MarqueeBlock,
  spacer: SpacerBlock,
  contactForm: ContactFormBlock,
  pricing: PricingBlock,
  banner: BannerBlock,
  faq: FAQBlock,
}
