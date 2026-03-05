/**
 * Split a pathname into its segments, stripping leading/trailing slashes.
 * Returns an empty array for the root path.
 *
 * @example
 * ```ts
 * getPathSegments('/blog/my-post') // ['blog', 'my-post']
 * getPathSegments('/') // []
 * getPathSegments('') // []
 * getPathSegments('/blog/') // ['blog']
 * ```
 */
export const getPathSegments = (pathname: string): string[] => {
  const trimmed = pathname.replace(/^\/|\/$/g, '')
  if (!trimmed) return []
  return trimmed.split('/')
}
