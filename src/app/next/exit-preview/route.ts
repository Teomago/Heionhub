import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Exit preview mode route.
 * Disables Next.js draft mode and redirects back to the referring page or home.
 *
 * Usage: GET /next/exit-preview
 */
export async function GET(request: Request): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  const referer = request.headers.get('referer')
  const redirectPath = referer ? new URL(referer).pathname : '/'

  redirect(redirectPath)
}
