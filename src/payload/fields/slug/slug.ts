import { type TextFieldClientProps, type RowField, type TextField } from 'payload'
import { generateSlug } from './hooks/generateSlug'
import { formatSlug } from './hooks/formatSlug'
import { deepMerge, DeepPartial, generateId } from '@/lib/utils'
import { getTranslation } from '@/payload/i18n/getTranslation'

/**
 * Options for the slug field. All properties are optional and have defaults.
 */
type SlugOptions = {
  /**
   * Create a database index on the slug field (improves query performance).
   * @default true
   */
  index?: boolean
  /**
   * Enable localization for the slug field.
   * @default true
   */
  localized?: TextField['localized']
  /**
   * Override for the slug field name (the text field storing the slug value).
   * @default 'slug'
   */
  name?: string
  /**
   * Override the generated field: either a partial config (deep-merged) or a
   * function that receives the base field and returns the final field.
   */
  overrides?: DeepPartial<RowField> | ((field: RowField) => RowField)
  /**
   * Whether the slug field is required.
   * @default true
   */
  required?: TextField['required']
  /**
   * Place field in the sidebar.
   * @default true
   */
  sidebar?: boolean
  /**
   * Enforce field-level uniqueness (database constraint).
   * @default true
   */
  unique?: boolean
}

/** Function that returns the slug field config. */
type SlugField = (fieldToUse?: string, options?: SlugOptions) => RowField

/** Props passed to the slug field UI component (e.g. source field name). */
export type SlugFieldClientProps = {
  fieldToUse: string
}

/** Combined props for the slug field (client props + Payload text field props). */
export type SlugFieldProps = SlugFieldClientProps & TextFieldClientProps

/**
 * Creates a slug field with auto-generation from a source field.
 *
 * **Behavior by collection type:**
 * - **Non-versioned:** Slug is generated on create when empty; never auto-syncs on update.
 * - **Versioned:** Slug auto-syncs with the source until the document is published or the user
 *   edits the slug manually; then it stays fixed.
 *
 * **Formatting:** All values are slugified (lowercase, no spaces/invalid chars). The value `"/"`
 * is preserved for homepage slugs.
 *
 * @param fieldToUse - Name of the source field to generate the slug from (e.g. `'title'`).
 *   Default is `'title'`.
 * @param options - Optional configuration (index, localized, name, overrides, required, sidebar, unique).
 * @returns Field config ready to use in a collection's `fields` array.
 *
 * @example
 * // Default: source from 'title', unique, required, indexed, sidebar
 * slug()
 *
 * @example
 * // Custom source field
 * slug('name')
 *
 * @example
 * // Disable index or uniqueness
 * slug('title', { index: false, unique: false })
 */
export const slug: SlugField = (fieldToUse = 'title', options = {}) => {
  const {
    name: fieldName = 'slug',
    index = true,
    localized = true,
    overrides,
    required = true,
    sidebar = true,
    unique = true,
  } = options

  const baseField: RowField = {
    type: 'row',
    ...(sidebar && {
      admin: {
        position: 'sidebar',
      },
    }),
    fields: [
      {
        name: 'generateSlug',
        type: 'checkbox',
        admin: {
          disableBulkEdit: true,
          disableGroupBy: true,
          disableListColumn: true,
          disableListFilter: true,
          hidden: true,
        },
        defaultValue: true,
        hooks: {
          beforeChange: [generateSlug({ fieldName, fieldToUse })],
        },
        localized,
      },
      {
        name: fieldName,
        type: 'text',
        label: getTranslation('general:slug'),
        admin: {
          components: {
            Field: {
              clientProps: {
                fieldToUse,
              } satisfies SlugFieldClientProps,
              path: '@/payload/fields/slug/ui#SlugField',
            },
          },
          width: '100%',
        },
        hooks: {
          beforeValidate: [formatSlug({ fieldToUse })],
          beforeDuplicate: [
            ({ value, context }) => {
              context.duplicate = true
              if (value === '/') {
                return generateId().toLowerCase()
              }
              return `${value}-${generateId().toLowerCase()}`
            },
          ],
        },
        index,
        localized,
        required,
        unique,
      },
    ],
  }

  if (typeof overrides === 'function') {
    return overrides(baseField)
  }

  if (overrides) {
    return deepMerge(baseField, overrides)
  }

  return baseField
}
