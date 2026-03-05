// Main access functions
export { access } from './access'
export { accessField } from './accessField'

// Export constants
export { SUPER_ADMIN_ROLE } from './constants'

// Export types
export type {
  AccessConfig,
  AccessType,
  DynamicQuery,
  RoleConfig,
  PossibleRoles,
  RoleInput,
  ChainableAccess,
  PayloadAccessArgs,
  AccessStatic,
  // Field-level types
  AccessFieldConfig,
  FieldCondition,
  FieldRoleConfig,
  FieldAccessArgs,
  ChainableAccessField,
  AccessFieldStatic,
} from './types'
