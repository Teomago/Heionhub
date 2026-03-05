import type { Field } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { deepMerge } from '@/lib/utils'
import { setPublishedDate } from './hooks/setPublishedDate'

type PublishedDateType = (overrides?: Record<string, unknown>) => Field

/**
 * Creates a reusable publishedDate field with consistent defaults and override support.
 *
 * This field is designed for content collections that need publication date tracking.
 * It automatically sets the date to the current date (UTC midnight) when a document
 * is published for the first time.
 *
 * @param overrides - Optional field overrides to customize the field configuration
 * @returns Field configuration for publishedDate
 *
 * @example
 * // Basic usage with defaults
 * publishedDate()
 *
 * @example
 * // With custom overrides
 * publishedDate({
 *   admin: { position: 'main' },
 *   label: 'Custom Published Date',
 *   required: true
 * })
 */
export const publishedDate: PublishedDateType = (overrides = {}) => {
  const fieldResult: Field = {
    name: 'publishedDate',
    label: getTranslation('fields:publishedDate'),
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayOnly',
        displayFormat: 'dd.MM.yyyy',
      },
    },
    hooks: {
      beforeChange: [setPublishedDate],
    },
  }

  return deepMerge(fieldResult, overrides)
}
