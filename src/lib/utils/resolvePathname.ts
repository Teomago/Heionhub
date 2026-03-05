/**
 * Resolves Next.js dynamic route params to a pathname string.
 * Handles `[...segments]` and `[[...segments]]` catch-all routes.
 *
 * @example
 * ```ts
 * resolvePathname({ segments: ['blog', 'my-post'] }) // '/blog/my-post'
 * resolvePathname({ segments: 'about' }) // '/about'
 * resolvePathname({ segments: undefined }) // '/'
 * resolvePathname({}) // '/'
 * ```
 */
export const resolvePathname = (params: { segments?: string | string[] | undefined }): string => {
  const { segments } = params

  if (!segments) return '/'

  if (typeof segments === 'string') {
    return `/${segments}`
  }

  if (segments.length === 0) return '/'

  return `/${segments.join('/')}`
}
