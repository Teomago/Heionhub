import type { AccessArgs } from 'payload'
import { isAdminUser } from '@/lib/auth/typeGuards'

export const isActiveOwner = ({ req: { user } }: AccessArgs) => {
  if (!user) return false

  // Admins can see deleted and active records
  if (isAdminUser(user)) {
    return true
  }

  // Members can only see their own active records
  return {
    and: [{ owner: { equals: user.id } }, { status: { equals: 'active' } }],
  } as any
}
