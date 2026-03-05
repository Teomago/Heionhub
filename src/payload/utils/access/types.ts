import type { AccessResult, AccessArgs, Where, PayloadRequest } from 'payload'
import { Config } from '@/payload-types'

export type AuthCollectionKeys = {
  [K in keyof Config['collections']]: Config['auth'] extends Record<string, any>
    ? K extends keyof Config['auth']
      ? K
      : never
    : never
}[keyof Config['collections']]

export type GetCollectionUser<K extends AuthCollectionKeys> = Config['collections'][K]

export type ExtractRoles<T> = T extends { roles?: ReadonlyArray<infer R> | null }
  ? R
  : T extends { role?: infer R | null }
    ? R
    : never

export type AllRoles = {
  [K in AuthCollectionKeys]: ExtractRoles<GetCollectionUser<K>>
}[AuthCollectionKeys]

export type CollectionPrefixedRoles = {
  [K in AuthCollectionKeys]: `${K & string}:${ExtractRoles<GetCollectionUser<K>> & string}`
}[AuthCollectionKeys]

export type PossibleRoles = AllRoles | CollectionPrefixedRoles

export type PayloadAccessArgs = AccessArgs

export type AccessType = 'public' | 'restricted' | 'published'

export type DynamicQuery = (args: PayloadAccessArgs) => Where | boolean

export type RoleConfig = Where | boolean | DynamicQuery

export type RoleInput = PossibleRoles | PossibleRoles[] | Partial<Record<PossibleRoles, RoleConfig>>

export type AccessConfig = {
  type?: AccessType
  roles?: Partial<Record<PossibleRoles, RoleConfig>> | PossibleRoles[]
  query?: Where | DynamicQuery
  adminLock?: boolean | Where | DynamicQuery
}

export type ChainableAccess = {
  (args: PayloadAccessArgs): AccessResult
  roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccess
  adminLock: (restriction?: boolean | Where | DynamicQuery) => ChainableAccess
  owner: (field?: string) => ChainableAccess
  published: () => ChainableAccess
  publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccess
  build?: () => (args: PayloadAccessArgs) => AccessResult
}

export type AccessStatic = {
  (config?: AccessConfig): ChainableAccess
  public: () => ChainableAccess
  published: () => ChainableAccess
  adminLock: (restriction?: boolean | Where | DynamicQuery) => ChainableAccess
  roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccess
  owner: (field?: string) => ChainableAccess
  publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccess
}

export type FieldAccessArgs<T = any> = {
  data?: Partial<T> | undefined
  doc?: T & { _status?: string }
  id?: number | string
  req: PayloadRequest
  siblingData?: Partial<T> | undefined
}

export type FieldCondition<T = any> = (args: FieldAccessArgs<T>) => boolean | Promise<boolean>

export type FieldRoleConfig<T = any> = boolean | FieldCondition<T>

export type AccessFieldConfig<T = any> = {
  type?: AccessType
  roles?: Partial<Record<PossibleRoles, FieldRoleConfig<T>>> | PossibleRoles[]
  condition?: FieldCondition<T>
  adminLock?: boolean
}

export type ChainableAccessField<T = any> = {
  (args: FieldAccessArgs<T>): Promise<boolean>
  roles: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccessField<T>
  adminLock: () => ChainableAccessField<T>
  owner: (field?: string) => ChainableAccessField<T>
  published: () => ChainableAccessField<T>
  publishedOrRole: (input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccessField<T>
  condition: (fn: FieldCondition<T>) => ChainableAccessField<T>
  build?: () => (args: FieldAccessArgs<T>) => Promise<boolean>
}

export type AccessFieldStatic = {
  <T = any>(config?: AccessFieldConfig<T>): ChainableAccessField<T>
  public: <T = any>() => ChainableAccessField<T>
  published: <T = any>() => ChainableAccessField<T>
  adminLock: <T = any>() => ChainableAccessField<T>
  roles: <T = any>(input: RoleInput, ...moreRoles: PossibleRoles[]) => ChainableAccessField<T>
  owner: <T = any>(field?: string) => ChainableAccessField<T>
  publishedOrRole: <T = any>(
    input: RoleInput,
    ...moreRoles: PossibleRoles[]
  ) => ChainableAccessField<T>
  condition: <T = any>(fn: FieldCondition<T>) => ChainableAccessField<T>
}
