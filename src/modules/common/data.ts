import { getPayload } from '@/lib/payload/getPayload'

/**
 * Fetch a global by its slug with caching.
 * Used for Header, Footer, General settings, etc.
 */
export async function getCachedGlobal<T = any>(slug: string, depth: number = 1, locale?: string): Promise<T> {
  const payload = await getPayload()

  const result = await payload.findGlobal({
    slug: slug as any,
    depth,
    ...(locale ? { locale: locale as any } : {}),
  })

  return result as T
}
