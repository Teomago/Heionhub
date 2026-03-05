/**
 * Type guard to check if a value is a plain object (not null, not array, not Date, etc.)
 */
export const isObject = (item: unknown): item is Record<string, unknown> => {
  return Boolean(
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    Object.prototype.toString.call(item) === '[object Object]',
  )
}
