import { cookies, headers } from 'next/headers'
import { getPayload } from '@/lib/payload/getPayload'

export async function getAuthUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token) {
      return null
    }

    const payload = await getPayload()
    const headersList = await headers()

    // Validate the token directly
    const { user } = await payload.auth({ headers: headersList })

    // We only want the Finance users (Customers) for the dashboard
    if (user && user.collection === 'members') {
      return user
    }

    return null
  } catch (error) {
    console.error('Error verifying auth token:', error)
    return null
  }
}
