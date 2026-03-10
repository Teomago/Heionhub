import type { AllRoles, AuthCollectionKeys, GetCollectionUser } from '@/payload/utils/access/types'
import type { ClientUser } from 'payload'
import { isMember, isAdminUser } from '@/lib/auth/typeGuards'
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

    let userRoles: AllRoles[] = []

    if (isAdminUser(user)) {
      userRoles = Array.isArray(user.roles) ? (user.roles as AllRoles[]) : []
    } else if (isMember(user)) {
      userRoles = []
    }

    if (userRoles.includes(SUPER_ADMIN_ROLE as AllRoles)) {
      return false
    }

    if (userRoles.some((role) => allowedRoles.includes(role))) {
      return false
    }

    return true
  }
}
