import { FieldHook } from 'payload'
import { slugify } from '../slugify'

type FormatSlugArgs = {
  fieldToUse: string
}

/**
 * Ensures the slug is always properly formatted.
 *
 * - Allows "/" as a special case (homepage)
 * - Slugifies any other value to remove invalid characters
 * - Falls back to source field if slug is empty
 */
export const formatSlug = ({ fieldToUse }: FormatSlugArgs): FieldHook => {
  return ({ operation, value, data, context }) => {
    if (!operation || (operation !== 'create' && operation !== 'update')) {
      return value
    }

    if (context?.duplicate) {
      return value
    }

    if (value === '/') {
      return value
    }

    if (typeof value === 'string' && value.length > 0) {
      return slugify(value)
    }

    const sourceValue = data?.[fieldToUse]
    if (sourceValue && typeof sourceValue === 'string') {
      return slugify(sourceValue)
    }

    return value
  }
}
