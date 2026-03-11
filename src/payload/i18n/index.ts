/** i18n entry: merged translations (from languages/), config, getTranslation, and types. Add locales in config; run generate:translations to regenerate languages/. */
export { en, es, translations } from './languages'
export * from './config'
export { getTranslation } from './getTranslation'
export type {
  TranslationKeys,
  TranslationsObject,
  StaticTranslation,
  DeepExactly,
  TranslationsExport,
  DefineTranslationsParam,
} from './types'
