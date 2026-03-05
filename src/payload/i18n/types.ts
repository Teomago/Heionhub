import type { NestedKeysStripped } from '@payloadcms/translations'
import { enTranslations } from '@payloadcms/translations/languages/en'
import { translations } from './languages'

import type { DEFAULT_LOCALE, SupportedLocale } from './config'

export type TranslationsObject = typeof translations.en & typeof enTranslations
export type TranslationKeys = NestedKeysStripped<TranslationsObject>

/** String or per-locale map for fields that do not accept LabelFunction (e.g. placeholder, admin.group). */
export type StaticTranslation = string | Record<string, string>

type DefaultLocale = typeof DEFAULT_LOCALE
type OtherLocales = Exclude<SupportedLocale, DefaultLocale>

/** Same keys as T at every level; no extra, no missing. */
export type DeepExactly<T> =
  T extends Record<string, unknown> ? { [K in keyof T]: DeepExactly<T[K]> } : T

/** Map of each supported locale to the same shape T. */
export type TranslationsExport<T extends Record<string, unknown>> = Record<SupportedLocale, T>

/** Parameter type for defineTranslations: default locale defines T; others must match DeepExactly<T>. */
export type DefineTranslationsParam<T extends Record<string, unknown>> = {
  [K in DefaultLocale]: T
} & { [K in OtherLocales]: DeepExactly<T> }
