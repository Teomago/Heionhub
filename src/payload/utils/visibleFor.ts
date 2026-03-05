import type { AllRoles, AuthCollectionKeys, GetCollectionUser } from '@/payload/utils/access/types'
import type { ClientUser } from 'payload'
import { SUPER_ADMIN_ROLE } from './access'

type AuthUser = {
  [K in AuthCollectionKeys]: GetCollectionUser<K> & { collection: K }
}[AuthCollectionKeys]

type UserParam = {
  user: ClientUser | AuthUser | null
}

export const visibleFor = (allowedRoles: AllRoles[] = []): ((args: UserParam) => boolean) => {
  return ({ user }) => {
    if (!user) return true

    const userRoles: AllRoles[] = Array.isArray((user as any).roles)
      ? (user as any).roles
      : (user as any).role
        ? [(user as any).role]
        : []

    if (userRoles.includes(SUPER_ADMIN_ROLE as AllRoles)) {
      return false
    }

    if (userRoles.some((role) => allowedRoles.includes(role))) {
      return false
    }

    return true
  }
}
