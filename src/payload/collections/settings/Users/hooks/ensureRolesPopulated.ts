import type { CollectionAfterLoginHook } from 'payload'
import { isAdminUser } from '@/lib/auth/typeGuards'

/**
 * After login, ensures the user has at least a default role.
 * This handles OAuth-created users who may not have roles assigned
 * This handles users created via alternative auth methods who may not have roles assigned.
 */
export const ensureRolesPopulated: CollectionAfterLoginHook = async ({ req, user }) => {
  let roles: ('admin' | 'editor' | 'user')[] | undefined
  if (isAdminUser(user)) {
    roles = user.roles || undefined
  }

  // If user has no roles, assign defaults
  if (!roles || (Array.isArray(roles) && roles.length === 0)) {
    const { totalDocs: userCount } = await req.payload.count({ collection: 'users' })

    // First user (or only user) gets admin, others get default 'user' role
    const defaultRoles = userCount <= 1 ? ['admin'] : ['user']

    await req.payload.update({
      collection: 'users',
      id: user.id,
      data: { roles: defaultRoles } as any,
      context: { skipHooks: true },
    })

    // Update the user object in-place so the current session has correct roles
    if (isAdminUser(user)) {
      user.roles = defaultRoles as ('admin' | 'editor' | 'user')[]
    }
  }

  return user
}
