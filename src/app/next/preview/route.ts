import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySignedToken } from '@/lib/utils/signedToken'

/**
 * Preview mode entry route.
 * Verifies a signed token, enables Next.js draft mode, then redirects to the target path.
 *
 * Usage: GET /next/preview?token=<signed-token>&path=/some-page
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const path = searchParams.get('path') || '/'

  if (!token) {
    return new Response('Missing token', { status: 401 })
  }

  const isValid = verifySignedToken(token, { scope: 'preview' })

  if (!isValid) {
    return new Response('Invalid or expired token', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
