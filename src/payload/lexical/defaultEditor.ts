import {
  BlocksFeature,
  ChecklistFeature,
  HeadingFeature,
  IndentFeature,
  lexicalEditor,
  type LexicalEditorProps,
  RelationshipFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import type { Block, BlockSlug, CollectionSlug, Field, UploadCollectionSlug } from 'payload'
import { FEATURE_KEYS } from './constants'
import type { FeatureKey, FormatFeature } from './types'

// Type for heading sizes
type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

// Type for all removable features (excludes essential features)
type RemovableFeature = Exclude<
  FeatureKey,
  typeof FEATURE_KEYS.PARAGRAPH | typeof FEATURE_KEYS.TOOLBAR_INLINE
>

interface DefaultEditorOptions {
  /** Admin UI configuration */
  admin?: LexicalEditorProps['admin']

  /** Features to remove from the root editor */
  removeFeatures?: RemovableFeature[]

  /** Text formatting features to customize (defaults to all from root) */
  formatting?: FormatFeature[] | boolean

  /** Heading levels to enable (defaults to what's in root editor: h1-h4) */
  headings?: HeadingSize[] | boolean

  /** List features to customize (defaults to all from root) */
  lists?: Array<'unordered' | 'ordered' | 'checklist'> | boolean

  /** Enable/disable text alignment (defaults to true - from root) */
  align?: boolean

  /** Enable/disable links (defaults to true - from root) */
  links?: boolean

  /** Enable/disable inline code (defaults to true - from root) */
  inlineCode?: boolean

  /** Enable/disable blockquote (defaults to true - from root) */
  blockquote?: boolean

  /** Enable/disable horizontal rule (defaults to true - from root) */
  horizontalRule?: boolean

  /** Enable/disable indentation (defaults to true if lists are enabled) */
  indent?: boolean

  /** Enable/disable superscript (defaults to false - not in root) */
  superscript?: boolean

  /** Enable/disable subscript (defaults to false - not in root) */
  subscript?: boolean

  /** Enable/disable checklist (defaults to false - not in root) */
  checklist?: boolean

  /** Upload configuration (defaults to true - from root) */
  upload?:
    | boolean
    | {
        collections: Record<UploadCollectionSlug, { fields: Field[] }>
      }

  /** Relationship configuration (defaults to false - not in root) */
  relationship?:
    | boolean
    | {
        collections: CollectionSlug[]
      }

  /** Custom blocks to include (in addition to root blocks) */
  blocks?: (Block | BlockSlug)[]

  /** Inline blocks configuration */
  inlineBlocks?: (Block | BlockSlug)[]

  /** Replace root blocks entirely (instead of adding to them) */
  replaceBlocks?: boolean
}

/**
 * Creates a fully-featured default editor that starts with all root editor features.
 * Built on top of rootEditor, allowing selective removal or customization of features.
 *
 * @example
 * // All root features enabled (default)
 * defaultEditor()
 *
 * @example
 * // Remove specific features
 * defaultEditor({
 *   removeFeatures: ['align', 'upload'],
 *   horizontalRule: false
 * })
 *
 * @example
 * // Customize headings only
 * defaultEditor({
 *   headings: ['h2', 'h3', 'h4']
 * })
 */
export const defaultEditor = (options: DefaultEditorOptions = {}) => {
  const {
    admin,
    removeFeatures = [],
    formatting,
    headings,
    lists,
    align,
    links,
    inlineCode,
    blockquote,
    horizontalRule,
    indent,
    superscript = false,
    subscript = false,
    checklist = false,
    upload,
    relationship = false,
    blocks = [],
    inlineBlocks = [],
    replaceBlocks = false,
  } = options

  return lexicalEditor({
    admin,
    features({ rootFeatures }) {
      // Helper to get feature key
      const getFeatureKey = (feature: unknown): string | undefined => {
        return (feature as { key?: string })?.key
      }

      // Helper to determine if a feature should be kept
      const shouldKeepFeature = (featureKey: string | undefined): boolean => {
        if (!featureKey) return false

        // Check if explicitly removed
        if (removeFeatures.some((f) => f === featureKey)) {
          return false
        }

        // Handle formatting features
        const formatFeatures: FormatFeature[] = [
          FEATURE_KEYS.BOLD,
          FEATURE_KEYS.ITALIC,
          FEATURE_KEYS.UNDERLINE,
          FEATURE_KEYS.STRIKETHROUGH,
          FEATURE_KEYS.INLINE_CODE,
          FEATURE_KEYS.SUPERSCRIPT,
          FEATURE_KEYS.SUBSCRIPT,
        ]

        if (formatFeatures.includes(featureKey as FormatFeature)) {
          // Handle superscript/subscript (not in root by default)
          if (featureKey === FEATURE_KEYS.SUPERSCRIPT) return superscript === true
          if (featureKey === FEATURE_KEYS.SUBSCRIPT) return subscript === true

          // Handle other formatting
          if (formatting === false) return false
          if (Array.isArray(formatting)) {
            return formatting.includes(featureKey as FormatFeature)
          }
          // For inline code, check specific setting
          if (featureKey === FEATURE_KEYS.INLINE_CODE && inlineCode === false) {
            return false
          }
          return true // Default to true for root formatting features
        }

        // Handle specific features
        switch (featureKey) {
          case FEATURE_KEYS.HEADING:
            return headings !== false
          case FEATURE_KEYS.ALIGN:
            return align !== false
          case FEATURE_KEYS.LINK:
            return links !== false
          case FEATURE_KEYS.UPLOAD:
            return upload !== false
          case FEATURE_KEYS.BLOCKQUOTE:
            return blockquote !== false
          case FEATURE_KEYS.HORIZONTAL_RULE:
            return horizontalRule !== false
          case FEATURE_KEYS.INDENT:
            return indent !== false
          case FEATURE_KEYS.UNORDERED_LIST:
            if (lists === false) return false
            if (Array.isArray(lists)) return lists.includes('unordered')
            return true
          case FEATURE_KEYS.ORDERED_LIST:
            if (lists === false) return false
            if (Array.isArray(lists)) return lists.includes('ordered')
            return true
          case FEATURE_KEYS.CHECKLIST:
            if (lists === false) return false
            if (Array.isArray(lists)) return lists.includes('checklist')
            return checklist === true
          case FEATURE_KEYS.RELATIONSHIP:
            return relationship !== false
          case FEATURE_KEYS.BLOCKS:
            return !replaceBlocks
          case FEATURE_KEYS.TOOLBAR_INLINE:
          case FEATURE_KEYS.PARAGRAPH:
            return true
          default:
            return true
        }
      }

      // Filter root features
      const filteredFeatures = rootFeatures.filter((feature) => {
        const featureKey = getFeatureKey(feature)
        return shouldKeepFeature(featureKey)
      })

      // Customize features
      const customizedFeatures = filteredFeatures.map((feature) => {
        const featureKey = getFeatureKey(feature)

        if (featureKey === FEATURE_KEYS.HEADING && Array.isArray(headings)) {
          return HeadingFeature({
            enabledHeadingSizes: headings,
          })
        }

        if (featureKey === FEATURE_KEYS.UPLOAD && typeof upload === 'object') {
          return UploadFeature(upload)
        }

        if (featureKey === FEATURE_KEYS.BLOCKS && (blocks.length > 0 || inlineBlocks.length > 0)) {
          const featureWithProps = feature as {
            props?: {
              blocks?: (Block | BlockSlug)[]
              inlineBlocks?: (Block | BlockSlug)[]
            }
          }
          const existingBlocks = featureWithProps?.props?.blocks || ['callToAction']
          const existingInlineBlocks = featureWithProps?.props?.inlineBlocks || []

          if (replaceBlocks) {
            return BlocksFeature({
              blocks,
              inlineBlocks,
            })
          } else {
            return BlocksFeature({
              blocks: [...existingBlocks, ...blocks] as any[],
              inlineBlocks: [...existingInlineBlocks, ...inlineBlocks] as any[],
            })
          }
        }

        return feature
      })

      // Add extra features not in root
      const additionalFeatures = []

      if (
        superscript &&
        !customizedFeatures.some((f) => getFeatureKey(f) === FEATURE_KEYS.SUPERSCRIPT)
      ) {
        additionalFeatures.push(SuperscriptFeature())
      }

      if (
        subscript &&
        !customizedFeatures.some((f) => getFeatureKey(f) === FEATURE_KEYS.SUBSCRIPT)
      ) {
        additionalFeatures.push(SubscriptFeature())
      }

      if (
        checklist &&
        !customizedFeatures.some((f) => getFeatureKey(f) === FEATURE_KEYS.CHECKLIST)
      ) {
        additionalFeatures.push(ChecklistFeature())
      }

      if (
        indent === true &&
        !customizedFeatures.some((f) => getFeatureKey(f) === FEATURE_KEYS.INDENT)
      ) {
        additionalFeatures.push(IndentFeature())
      }

      if (
        relationship &&
        !customizedFeatures.some((f) => getFeatureKey(f) === FEATURE_KEYS.RELATIONSHIP)
      ) {
        if (typeof relationship === 'object') {
          additionalFeatures.push(
            RelationshipFeature({
              enabledCollections: relationship.collections,
            }),
          )
        } else {
          additionalFeatures.push(RelationshipFeature())
        }
      }

      if (replaceBlocks && blocks.length > 0) {
        additionalFeatures.push(
          BlocksFeature({
            blocks,
            inlineBlocks,
          }),
        )
      }

      return [...customizedFeatures, ...additionalFeatures]
    },
  })
}
