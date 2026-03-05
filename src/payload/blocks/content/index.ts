import type { RegisteredBlock } from '../registry/types'
import { AccordionBlock } from './Accordion.config'
import { ArticleListingBlock } from './ArticleListing.config'
import { HeroBlock } from './Hero.config'
import { FeaturesBlock } from './Features.config'
import { CtaSectionBlock } from './CtaSection.config'
import { StatsBlock } from './Stats.config'
import { TestimonialsBlock } from './Testimonials.config'
import { LogoCloudBlock } from './LogoCloud.config'
import { TwoColumnBlock } from './TwoColumn.config'
import { GalleryBlock } from './Gallery.config'
import { VideoBlock } from './Video.config'
import { TeamBlock } from './Team.config'
import { MarqueeBlock } from './Marquee.config'
import { SpacerBlock } from './Spacer.config'
import { ContactFormBlock } from './ContactForm.config'
import { PricingBlock } from './Pricing.config'
import { BannerBlock } from './Banner.config'
import { FAQBlock } from './FAQ.config'

/** All content blocks registered via createBlock. */
export const contentBlockRegistry: RegisteredBlock[] = [
  AccordionBlock,
  ArticleListingBlock,
  HeroBlock,
  FeaturesBlock,
  CtaSectionBlock,
  StatsBlock,
  TestimonialsBlock,
  LogoCloudBlock,
  TwoColumnBlock,
  GalleryBlock,
  VideoBlock,
  TeamBlock,
  MarqueeBlock,
  SpacerBlock,
  ContactFormBlock,
  PricingBlock,
  BannerBlock,
  FAQBlock,
]
