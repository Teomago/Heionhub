import {
  BlocksFeature,
  HeadingFeature,
  lexicalEditor,
  type LexicalEditorProps,
} from '@payloadcms/richtext-lexical'
import type { Block, BlockSlug } from 'payload'
import { FEATURE_KEYS } from './constants'
import type { FormatFeature, FeatureKey } from './types'

// Features that can be removed (excludes essential features like paragraph and toolbarInline)
type RemovableFeature = Exclude<
  FeatureKey,
  typeof FEATURE_KEYS.PARAGRAPH | typeof FEATURE_KEYS.TOOLBAR_INLINE
>

interface TextEditorOptions {
  /** Admin UI configuration */
  admin?: LexicalEditorProps['admin']

  /** Text formatting features to include - defaults to ['bold', 'italic', 'underline', 'strikethrough'] */
  formatting?: boolean | FormatFeature[]

  /** Heading levels to enable - defaults to ['h1', 'h2', 'h3', 'h4'] */
  headings?: boolean | Array<'h1' | 'h2' | 'h3' | 'h4'>

  /** Enable text alignment - defaults to false */
  align?: boolean

  /** Enable links - defaults to false */
  links?: boolean

  /** Enable inline code - defaults to true */
  inlineCode?: boolean

  /** Enable upload feature for media - defaults to false */
  upload?: boolean

  /** Enable text state feature - defaults to false */
  textState?: boolean

  /** Custom blocks to include */
  blocks?: (Block | BlockSlug)[]

  /** Inline blocks to include (e.g., ['icon']) */
  inlineBlocks?: (Block | BlockSlug)[]

  /** Features to explicitly remove */
  removeFeatures?: RemovableFeature[]

  /** Features to explicitly add back that are removed by default */
  addFeatures?: RemovableFeature[]
}

/**
 * Creates a simplified text editor for Payload CMS
 *
 * By default removes: lists, blockquotes, indentation, horizontal rules, links, uploads, alignment
 * By default includes: headings (h1-h4), bold, italic, underline, strikethrough, inline code
 */
export const textEditor = (options: TextEditorOptions = {}) => {
  const {
    admin,
    blocks = [],
    inlineBlocks = [],
    formatting = ['bold', 'italic', 'underline', 'strikethrough'],
    headings = ['h1', 'h2', 'h3', 'h4'],
    align = false,
    links = true,
    inlineCode = false,
    upload = false,
    textState = false,
    removeFeatures = [],
    addFeatures = [],
  } = options

  return lexicalEditor({
    admin,
    features({ rootFeatures }) {
      const getFeatureKey = (feature: any): string | undefined => {
        return feature?.key
      }

      const shouldKeepFeature = (featureKey: string | undefined): boolean => {
        if (!featureKey) return false

        if (removeFeatures.some((f) => f === featureKey)) {
          if (addFeatures.some((f) => f === featureKey)) {
            return true
          }
          return false
        }

        if (addFeatures.some((f) => f === featureKey)) {
          return true
        }

        const formatFeatures: FormatFeature[] = [
          FEATURE_KEYS.BOLD,
          FEATURE_KEYS.ITALIC,
          FEATURE_KEYS.UNDERLINE,
          FEATURE_KEYS.STRIKETHROUGH,
        ]

        if (formatFeatures.includes(featureKey as FormatFeature)) {
          if (formatting === false) return false
          if (Array.isArray(formatting)) {
            return formatting.includes(featureKey as FormatFeature)
          }
          return true
        }

        switch (featureKey) {
          case FEATURE_KEYS.HEADING:
            return headings !== false
          case FEATURE_KEYS.ALIGN:
            return align === true
          case FEATURE_KEYS.LINK:
            return links === true
          case FEATURE_KEYS.INLINE_CODE:
            return inlineCode !== false
          case FEATURE_KEYS.UPLOAD:
            return upload === true
          case FEATURE_KEYS.TEXT_STATE:
            return textState === true
          case FEATURE_KEYS.TOOLBAR_INLINE:
          case FEATURE_KEYS.PARAGRAPH:
            return true
          case FEATURE_KEYS.UNORDERED_LIST:
          case FEATURE_KEYS.ORDERED_LIST:
          case FEATURE_KEYS.BLOCKQUOTE:
          case FEATURE_KEYS.INDENT:
          case FEATURE_KEYS.HORIZONTAL_RULE:
            return false
          default:
            return false
        }
      }

      const filteredFeatures = rootFeatures.filter((feature) => {
        const featureKey = getFeatureKey(feature)
        return shouldKeepFeature(featureKey)
      })

      const customizedFeatures = filteredFeatures.map((feature) => {
        const featureKey = getFeatureKey(feature)

        if (featureKey === FEATURE_KEYS.HEADING && Array.isArray(headings)) {
          return HeadingFeature({
            enabledHeadingSizes: headings,
          })
        }

        return feature
      })

      const hasBlocks = blocks && blocks.length > 0
      const hasInlineBlocks = inlineBlocks && inlineBlocks.length > 0

      if (hasBlocks || hasInlineBlocks) {
        const blockFeatureConfig: Parameters<typeof BlocksFeature>[0] = {
          ...(hasBlocks ? { blocks } : {}),
          ...(hasInlineBlocks ? { inlineBlocks } : {}),
        }

        customizedFeatures.push(BlocksFeature(blockFeatureConfig))
      }

      return customizedFeatures
    },
  })
}
