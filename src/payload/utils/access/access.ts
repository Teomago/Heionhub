import { AccessResult, Where } from 'payload'
import { isMember, isAdminUser } from '@/lib/auth/typeGuards'
import type {
  AccessConfig,
  ChainableAccess,
  RoleInput,
  PossibleRoles,
  PayloadAccessArgs,
  AccessStatic,
  DynamicQuery,
} from './types'
import { normalizeRoles, mergeRoles, processRoles } from './utils'
import { SUPER_ADMIN_ROLE } from './constants'

/**
 * Core access function implementation
 */
const createAccessFunction = (config?: AccessConfig) => {
  return (args: PayloadAccessArgs): AccessResult => {
    const type = config?.type || 'restricted'
    const publishedQuery: Where = { _status: { equals: 'published' } }

    // Handle public access
    if (type === 'public') {
      return true
    }

    const user = args?.req?.user

    // Handle unauthenticated users
    if (!user) {
      return type === 'published' ? publishedQuery : false
    }

    let userCollection = ''
    let userRoles: string[] = []

    if (isAdminUser(user)) {
      userCollection = user.collection
      userRoles = Array.isArray(user.roles) ? user.roles : []
    } else if (isMember(user)) {
      userCollection = user.collection
      userRoles = []
    }

    // Process roles with collection-aware matching
    if (config?.roles) {
      const rolesConfig = Array.isArray(config.roles)
        ? Object.fromEntries(config.roles.map((role: string) => [role, true]))
        : config.roles
      const result = processRoles(userRoles, rolesConfig as any, args, userCollection)
      if (result !== null) return result
    }

    // Admin access (respects explicit config and adminLock)
    if (userRoles.includes(SUPER_ADMIN_ROLE)) {
      const hasExplicitAdminConfig =
        config?.roles &&
        ((Array.isArray(config.roles) && (config.roles as string[]).includes(SUPER_ADMIN_ROLE)) ||
          (!Array.isArray(config.roles) &&
            SUPER_ADMIN_ROLE in (config.roles as Record<string, unknown>)))

      if (!hasExplicitAdminConfig) {
        if (config?.adminLock === true || config?.adminLock === false) {
          return !config.adminLock
        } else if (config?.adminLock) {
          return typeof config.adminLock === 'function' ? config.adminLock(args) : config.adminLock
        } else {
          return true
        }
      }
    }

    if (config?.query) {
      return typeof config.query === 'function' ? config.query(args) : config.query
    }

    if (type === 'published') {
      return publishedQuery
    }

    return false
  }
}

/**
 * Creates a chainable access function with fluent API
 */
const createChainableAccess = (config: AccessConfig = {}): ChainableAccess => {
  const accessFn = createAccessFunction(config)

  return Object.assign(accessFn, {
    roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccess({
        ...config,
        roles: mergeRoles(config.roles, normalizeRoles(input, moreRoles)),
      }),

    adminLock: (restriction: boolean | Where | DynamicQuery = true) =>
      createChainableAccess({
        ...config,
        adminLock: restriction,
      }),

    owner: (field = 'createdBy') =>
      createChainableAccess({
        ...config,
        query: ({ req }: PayloadAccessArgs) => ({
          [field]: { equals: req.user?.id },
        }),
      }),

    published: () =>
      createChainableAccess({
        ...config,
        type: 'published',
      }),

    publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccess({
        ...config,
        type: 'published',
        roles: mergeRoles(config.roles, normalizeRoles(input, moreRoles)),
      }),

    build: () => accessFn,
  })
}

/**
 * Main access function - chainable API for access control
 * Usage: access() for admin-only, access.roles('editor'), or chain methods
 */
export const access: AccessStatic = Object.assign(
  (config?: AccessConfig) => createChainableAccess(config || {}),

  {
    // Static methods for common patterns
    public: () => createChainableAccess({ type: 'public' }),

    published: () => createChainableAccess({ type: 'published' }),

    adminLock: (restriction: boolean | Where | DynamicQuery = true) =>
      createChainableAccess({ adminLock: restriction }),

    roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccess({
        roles: normalizeRoles(input, moreRoles),
      }),

    owner: (field = 'createdBy') =>
      createChainableAccess({
        query: ({ req }: PayloadAccessArgs) => ({
          [field]: { equals: req.user?.id },
        }),
      }),

    publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccess({
        type: 'published',
        roles: normalizeRoles(input, moreRoles),
      }),
  },
)

export type {
  AccessConfig,
  AccessType,
  DynamicQuery,
  RoleConfig,
  PossibleRoles,
  RoleInput,
  ChainableAccess,
} from './types'
