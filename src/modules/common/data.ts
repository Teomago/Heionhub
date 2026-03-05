import { getPayload } from '@/lib/payload/getPayload'

/**
 * Fetch a global by its slug with caching.
 * Used for Header, Footer, General settings, etc.
 */
export async function getCachedGlobal<T = any>(slug: string, depth: number = 1): Promise<T> {
  const payload = await getPayload()

  const result = await payload.findGlobal({
    slug: slug as any,
    depth,
  })

  return result as T
}
