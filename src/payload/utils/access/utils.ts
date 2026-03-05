import type { AccessResult, Where } from 'payload'
import type {
  PayloadAccessArgs,
  RoleInput,
  PossibleRoles,
  RoleConfig,
  FieldRoleConfig,
  FieldAccessArgs,
} from './types'

/**
 * Normalize any role input format to standard object format
 */
export const normalizeRoles = <T = RoleConfig>(
  input: RoleInput,
  moreRoles: PossibleRoles[] = [],
): Partial<Record<PossibleRoles, T>> => {
  if (typeof input === 'string') {
    const allRoles = [input as string, ...moreRoles.map(String)].filter(
      (role) => role && role.trim() !== '',
    )
    return Object.fromEntries(allRoles.map((role) => [role, true])) as any
  }

  if (Array.isArray(input)) {
    const allRoles = [...input.map(String), ...moreRoles.map(String)].filter(
      (role) => role && role.trim() !== '',
    )
    return Object.fromEntries(allRoles.map((role) => [role, true])) as any
  }

  if (moreRoles.length > 0) {
    const validMoreRoles = moreRoles.map(String).filter((role) => role && role.trim() !== '')
    const additionalRoles = Object.fromEntries(validMoreRoles.map((role) => [role, true]))
    return { ...input, ...additionalRoles } as any
  }

  return input as any
}

/**
 * Merge role configurations (later overrides earlier)
 */
export const mergeRoles = <T = RoleConfig>(
  existing?: Partial<Record<PossibleRoles, T>> | PossibleRoles[],
  newRoles?: Partial<Record<PossibleRoles, T>>,
): Partial<Record<PossibleRoles, T>> => {
  const normalizedExisting = existing
    ? Array.isArray(existing)
      ? normalizeRoles<T>(existing)
      : existing
    : {}

  return { ...normalizedExisting, ...newRoles }
}

/**
 * Process role configurations with collection-aware matching
 * Returns AccessResult for collection-level access
 */
export const processRoles = (
  userRoles: string[],
  roleConfigs: Record<string, RoleConfig>,
  args: PayloadAccessArgs,
  userCollection?: string,
): AccessResult | null => {
  const validRoles = userRoles.filter((role) => role && role.trim() !== '')
  if (validRoles.length === 0) return null

  const roleQueries: AccessResult[] = []

  for (const role of validRoles) {
    let roleConfig: RoleConfig | undefined

    // Collection-prefixed role in multi-auth (e.g., 'users:admin')
    if (userCollection) {
      const prefixedRole = `${userCollection}:${role}`
      roleConfig = roleConfigs[prefixedRole]
    }

    if (roleConfig === undefined) {
      roleConfig = roleConfigs[role]
    }

    if (roleConfig !== undefined) {
      let result: AccessResult
      if (typeof roleConfig === 'function') {
        result = roleConfig(args)
      } else {
        result = roleConfig
      }

      if (result === true) {
        return true
      }

      roleQueries.push(result)
    }
  }

  if (roleQueries.length > 0) {
    // Combine Where queries with OR
    const whereQueries = roleQueries.filter((query): query is Where => typeof query === 'object')

    if (whereQueries.length > 0) {
      return whereQueries.length === 1 ? whereQueries[0]! : { or: whereQueries }
    }

    return false
  }

  return null
}

/**
 * Process role configurations for fields with collection-aware matching
 * Returns Promise<boolean> for field-level access
 */
export const processFieldRoles = async <T>(
  userRoles: string[],
  roleConfigs: Record<string, FieldRoleConfig<T>>,
  args: FieldAccessArgs<T>,
  userCollection?: string,
): Promise<boolean | null> => {
  const validRoles = userRoles.filter((role) => role && role.trim() !== '')
  if (validRoles.length === 0) return null

  let foundAnyMatch = false

  for (const role of validRoles) {
    let roleConfig: FieldRoleConfig<T> | undefined

    // Collection-prefixed role in multi-auth (e.g., 'users:admin')
    if (userCollection) {
      const prefixedRole = `${userCollection}:${role}`
      roleConfig = roleConfigs[prefixedRole]
    }

    if (roleConfig === undefined) {
      roleConfig = roleConfigs[role]
    }

    if (roleConfig !== undefined) {
      foundAnyMatch = true
      try {
        let result: boolean
        if (typeof roleConfig === 'boolean') {
          result = roleConfig
        } else if (typeof roleConfig === 'function') {
          result = await roleConfig(args)
        } else {
          continue
        }

        if (result === true) {
          return true
        }
      } catch (error) {
        console.error('Error processing field roles:', error)
      }
    }
  }

  return foundAnyMatch ? false : null // false = denied, null = no match (allow fallback)
}
