import { FieldHook } from 'payload'
import { slugify } from '../slugify'

type GenerateSlugArgs = {
  fieldName?: string
  fieldToUse: string
}

/**
 * Field hook for auto-generating slugs from a source field.
 *
 * Behavior varies by collection type:
 * - **Non-versioned**: Generate on create if empty, never auto-sync on update
 * - **Versioned**: Auto-sync until published or manually edited
 *
 * Special cases:
 * - "/" is preserved (homepage slug)
 * - Empty slug on publish: generates from source field regardless of auto-sync setting
 *
 * @see SLUG_SPEC.md for full specification
 */
export const generateSlug = ({ fieldName = 'slug', fieldToUse }: GenerateSlugArgs): FieldHook => {
  return async ({ data, operation, originalDoc, value: isAutoSyncEnabled }) => {
    const hasVersions = '_status' in (data ?? {}) || '_status' in (originalDoc ?? {})
    const wasPublished = originalDoc?._status === 'published'
    const isPublishing = !wasPublished && data?._status === 'published'
    const currentSlug = data?.[fieldName]
    const slugIsEmpty = !currentSlug
    const isHomepage = currentSlug === '/'

    // Existing documents without the checkbox field should not auto-sync
    const checkboxMissing =
      operation === 'update' && originalDoc && originalDoc.generateSlug === undefined

    const generateFromSource = () => {
      if (data) {
        const sourceValue = data[fieldToUse]
        if (sourceValue && typeof sourceValue === 'string') {
          data[fieldName] = slugify(sourceValue)
        }
      }
    }

    if (operation === 'create') {
      if (slugIsEmpty) {
        generateFromSource()
      }
      return true
    }

    if (operation === 'update') {
      if (isHomepage) {
        return isAutoSyncEnabled ?? false
      }

      if (!hasVersions) {
        return false
      }

      if (checkboxMissing) {
        return false
      }

      if (isPublishing && slugIsEmpty) {
        generateFromSource()
        return false
      }

      if (isAutoSyncEnabled === false) {
        return false
      }

      if (wasPublished) {
        return false
      }

      if (isPublishing) {
        generateFromSource()
        return false
      }

      generateFromSource()
      return true
    }

    return isAutoSyncEnabled
  }
}
