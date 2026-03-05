import type { FieldHook } from 'payload'

/**
 * Options for configuring field concatenation
 */
export interface FormatConcatenatedFieldsOptions {
  /** Separator to use between fields. Defaults to a single space. */
  separator?: string
}

/**
 * Safely gets a nested property value using dot notation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): any {
  if (!obj || typeof obj !== 'object') return undefined
  if (!path) return undefined

  // Handle simple property access (no dots)
  if (!path.includes('.')) {
    return obj[path]
  }

  // Handle nested property access
  const parts = path.split('.')
  let current = obj

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined
    }
    current = current[part]
  }

  return current
}

/**
 * Creates a FieldHook that concatenates multiple field values using dot notation.
 *
 * Supports:
 * - Nested field paths using dot notation (e.g., 'profile.name.first')
 * - Configurable field ordering
 * - Customizable separators
 * - Safe navigation through nested objects
 * - Proper handling of missing or null values
 *
 * @example
 * // Basic usage (firstName + lastName)
 * formatConcatenatedFields(['firstName', 'lastName'])
 *
 * @example
 * // Custom separator
 * formatConcatenatedFields(['city', 'state', 'country'], { separator: ', ' })
 */
export const formatConcatenatedFields = (
  fieldPaths: string[],
  options: FormatConcatenatedFieldsOptions = {},
): FieldHook => {
  const { separator = ' ' } = options

  return ({ data }) => {
    if (!data || !fieldPaths || fieldPaths.length === 0) {
      return ''
    }

    const values = fieldPaths
      .map((path) => {
        const value = getNestedValue(data, path)
        if (value == null || value === '') return ''
        return String(value).trim()
      })
      .filter((value) => value !== '')

    return values.join(separator).trim()
  }
}
