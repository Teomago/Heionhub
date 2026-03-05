import format from 'standard-slugify'

/**
 * Converts a human readable string into a URL safe slug.
 */
export const slugify = (value: string): string => {
  return format(value)
}

export default slugify
