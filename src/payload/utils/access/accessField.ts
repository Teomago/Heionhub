import type {
  AccessFieldConfig,
  ChainableAccessField,
  RoleInput,
  PossibleRoles,
  FieldAccessArgs,
  FieldCondition,
  AccessFieldStatic,
} from './types'
import { isMember, isAdminUser } from '@/lib/auth/typeGuards'
import { normalizeRoles, mergeRoles, processFieldRoles } from './utils'
import { SUPER_ADMIN_ROLE } from './constants'

/**
 * Core access field function implementation
 */
const createAccessFieldFunction = <T = any>(config?: AccessFieldConfig<T>) => {
  return async (args: FieldAccessArgs<T>): Promise<boolean> => {
    const type = config?.type || 'restricted'

    if (type === 'public') {
      return true
    }

    const user = args?.req?.user

    if (!user) {
      if (type === 'published') {
        return args.doc?._status === 'published'
      }
      return false
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

    if (userRoles.includes(SUPER_ADMIN_ROLE) && !config?.adminLock) {
      return true
    }

    if (config?.roles) {
      const rolesConfig = Array.isArray(config.roles)
        ? Object.fromEntries(config.roles.map((role) => [role, true]))
        : config.roles
      const hasAccess = await processFieldRoles(userRoles, rolesConfig as any, args, userCollection)
      if (hasAccess !== null) return hasAccess
    }

    if (config?.condition) {
      return await config.condition(args)
    }

    if (type === 'published') {
      return args.doc?._status === 'published'
    }

    return false
  }
}

/**
 * Creates a chainable access field function with all methods attached
 */
const createChainableAccessField = <T = any>(
  config: AccessFieldConfig<T> = {},
): ChainableAccessField<T> => {
  const accessFn = createAccessFieldFunction<T>(config)

  return Object.assign(accessFn, {
    roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccessField<T>({
        ...config,
        roles: mergeRoles(config.roles, normalizeRoles(input, moreRoles)),
      }),

    adminLock: () =>
      createChainableAccessField<T>({
        ...config,
        adminLock: true,
      }),

    owner: (field = 'createdBy') =>
      createChainableAccessField<T>({
        ...config,
        condition: ({ req, doc }) => (doc as any)?.[field] === req.user?.id,
      }),

    published: () =>
      createChainableAccessField<T>({
        ...config,
        type: 'published',
      }),

    publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccessField<T>({
        ...config,
        type: 'published',
        roles: mergeRoles(config.roles, normalizeRoles(input, moreRoles)),
      }),

    condition: (fn: FieldCondition<T>) =>
      createChainableAccessField<T>({
        ...config,
        condition: fn,
      }),

    build: () => accessFn,
  })
}

/**
 * Main access field function with static methods
 * Usage: accessField() for admin-only, accessField.roles('editor'), or chain methods
 */
export const accessField: AccessFieldStatic = Object.assign(
  <T = any>(config?: AccessFieldConfig<T>) => createChainableAccessField<T>(config || {}),

  {
    // Static methods for common patterns
    public: <T = any>() => createChainableAccessField<T>({ type: 'public' }),

    published: <T = any>() => createChainableAccessField<T>({ type: 'published' }),

    adminLock: <T = any>() => createChainableAccessField<T>({ adminLock: true }),

    roles: <T = any>(input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccessField<T>({
        roles: normalizeRoles(input, moreRoles),
      }),

    owner: <T = any>(field = 'createdBy') =>
      createChainableAccessField<T>({
        condition: ({ req, doc }) => (doc as any)?.[field] === req.user?.id,
      }),

    publishedOrRole: <T = any>(input: RoleInput, ...moreRoles: PossibleRoles[]) =>
      createChainableAccessField<T>({
        type: 'published',
        roles: normalizeRoles(input, moreRoles),
      }),

    condition: <T = any>(fn: FieldCondition<T>) =>
      createChainableAccessField<T>({
        condition: fn,
      }),
  },
)

export type {
  AccessFieldConfig,
  AccessType,
  FieldCondition,
  FieldRoleConfig,
  FieldAccessArgs,
  PossibleRoles,
  RoleInput,
  ChainableAccessField,
} from './types'
