/* THIS FILE IS AUTO-GENERATED — do not edit manually */
/* Run: pnpm generate:block-slugs */

/** All content block slugs (root + nested). */
export const allBlockSlugs = [
  "richText",
  "accordion",
  "accordionNested",
  "articleListing",
  "hero",
  "features",
  "ctaSection",
  "ctaSectionNested",
  "stats",
  "statsNested",
  "testimonials",
  "logoCloud",
  "twoColumn",
  "gallery",
  "galleryNested",
  "video",
  "videoNested",
  "team",
  "marquee",
  "spacer",
  "spacerNested",
  "contactForm",
  "contactFormNested",
  "pricing",
  "banner",
  "bannerNested",
  "faq",
  "faqNested",
  "columns"
] as const

/** Slugs available in the root page-builder blocks field. */
export const rootBlockSlugs = [
  "richText",
  "accordion",
  "articleListing",
  "hero",
  "features",
  "ctaSection",
  "stats",
  "testimonials",
  "logoCloud",
  "twoColumn",
  "gallery",
  "video",
  "team",
  "marquee",
  "spacer",
  "contactForm",
  "pricing",
  "banner",
  "faq",
  "columns"
] as const

/** Slugs available inside layout blocks (nested variants). */
export const layoutBlockSlugs = [
  "accordionNested",
  "ctaSectionNested",
  "statsNested",
  "galleryNested",
  "videoNested",
  "spacerNested",
  "contactFormNested",
  "bannerNested",
  "faqNested"
] as const

/** Slugs available in richText inline blocks. */
export const richTextBlockSlugs = [
  "accordion"
] as const

/** RichText block slug. */
export const richTextBlockSlug = "richText" as const

/** Union type of all block slugs. */
export type BlockSlug = (typeof allBlockSlugs)[number]

/** Union type of root block slugs. */
export type RootBlockSlug = (typeof rootBlockSlugs)[number]

/** Union type of layout (nested) block slugs. */
export type LayoutBlockSlug = (typeof layoutBlockSlugs)[number]

