import type { User, Member } from '@/payload/payload-types'

/**
 * Type guard to safely narrow the generic user object to the Member collection type.
 */
export function isMember(user: unknown): user is Member {
  return (
    typeof user === 'object' &&
    user !== null &&
    'collection' in user &&
    (user as Record<string, unknown>).collection === 'members'
  )
}

/**
 * Type guard to safely narrow the generic user object to the Admin User collection type.
 */
export function isAdminUser(user: unknown): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    'collection' in user &&
    (user as Record<string, unknown>).collection === 'users'
  )
}
