/**
 * Type guard to check if a relationship field value has been expanded (populated)
 * vs being just an ID string.
 *
 * @example
 * ```ts
 * const author = post.author // string | User
 * if (isExpanded<User>(author)) {
 *   console.log(author.name) // User type
 * } else {
 *   console.log(author) // string (just the ID)
 * }
 * ```
 */
export const isExpanded = <T>(doc: T | string | number | null | undefined): doc is T => {
  return typeof doc === 'object' && doc !== null
}
