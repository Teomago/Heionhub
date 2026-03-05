import type { FEATURE_KEYS } from './constants'

/**
 * All possible feature keys
 */
export type FeatureKey = (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS]

/**
 * Text formatting features
 */
export type FormatFeature =
  | typeof FEATURE_KEYS.BOLD
  | typeof FEATURE_KEYS.ITALIC
  | typeof FEATURE_KEYS.UNDERLINE
  | typeof FEATURE_KEYS.STRIKETHROUGH
  | typeof FEATURE_KEYS.INLINE_CODE
  | typeof FEATURE_KEYS.SUPERSCRIPT
  | typeof FEATURE_KEYS.SUBSCRIPT

/**
 * Structure-related features
 */
export type StructureFeature =
  | typeof FEATURE_KEYS.UNORDERED_LIST
  | typeof FEATURE_KEYS.ORDERED_LIST
  | typeof FEATURE_KEYS.CHECKLIST
  | typeof FEATURE_KEYS.BLOCKQUOTE
  | typeof FEATURE_KEYS.INDENT
  | typeof FEATURE_KEYS.HORIZONTAL_RULE
