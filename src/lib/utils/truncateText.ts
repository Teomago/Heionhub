/**
 * Truncate text to a maximum length, adding ellipsis if truncated.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}
