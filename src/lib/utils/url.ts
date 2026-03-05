import { canUseDOM } from './canUseDOM'

const getSiteURL = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Get the current application URL
 * - In browser: Uses window.location for accurate current URL
 * - On server: Uses environment variable (canonical domain)
 */
export const getURL = (): string => {
  if (canUseDOM) {
    const { protocol, hostname, port } = window.location
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }
  return getSiteURL()
}

/**
 * Get URL from request headers (for dynamic server-side use)
 */
export const getURLFromRequest = (request: Request): string => {
  const host = request.headers.get('host')
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  return host ? `${protocol}://${host}` : getSiteURL()
}

/**
 * Validate if a string is a valid URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
