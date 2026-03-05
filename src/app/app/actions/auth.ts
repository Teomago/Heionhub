'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const payload = await getPayload()
  const headersList = await headers()
  await payload.auth({ headers: headersList }) // Ensure payload is init? Not strictly needed for logout but good practice

  // There isn't a direct "logout" method exposed on payload instance easily for headers-based auth
  // without response modification, but usually we just expire the cookie.
  // actually payload.auth() doesn't expose logout.
  // We need to use next/headers to delete the cookie.

  const cookieStore = await import('next/headers').then((mod) => mod.cookies())
  cookieStore.delete('payload-token')

  redirect('/login')
}
