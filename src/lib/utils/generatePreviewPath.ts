import { generateSignedToken } from './signedToken'

/**
 * Generate a preview path for the admin panel's live preview feature.
 * Routes through /next/preview with a signed token to enable Next.js draft mode.
 */
export const generatePreviewPath = ({ pathname }: { pathname: string }): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const token = generateSignedToken({ scope: 'preview', expiresIn: '1h' })
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`

  return `${baseUrl}/next/preview?token=${token}&path=${encodeURIComponent(path)}`
}
