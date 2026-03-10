import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import type { Payload } from 'payload'
import type { User, Member } from '@/payload/payload-types'

export type ValidUser = User | Member

export interface AuthContext {
  user: ValidUser
  payload: Payload
}

/**
 * Validates the current Server Action session.
 * Throws an Error if unauthenticated, halting the Action.
 * Returns the typed User and the ready Payload instance.
 */
export async function assertUser(): Promise<AuthContext> {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    throw new Error('Unauthorized')
  }

  // Type assertion is safe here because of the collection check above
  return { user: user as ValidUser, payload }
}
