/**
 * Extract IDs from a polymorphic relationship field value.
 * Handles both ID-only values and expanded objects with an `id` property.
 *
 * @param items - Array of IDs (string | number) or expanded objects, or null/undefined
 * @returns Array of raw IDs (string | number)
 *
 * @example
 * ```ts
 * extractIds([1, 2, 3]) // [1, 2, 3]
 * extractIds([{ id: 1, name: 'Tag A' }]) // [1]
 * extractIds(null) // []
 * ```
 */
export function extractIds(
  items: (string | number | Record<string, unknown> | { id: string | number })[] | null | undefined,
): (string | number)[] {
  if (!items || !Array.isArray(items)) return []

  return items
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') return item
      if (typeof item === 'object' && item !== null && 'id' in item)
        return (item as { id: string | number }).id
      return null
    })
    .filter((id): id is string | number => id !== null)
}
