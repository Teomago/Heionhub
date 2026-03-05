import type {
  ClientField,
  CollectionSlug,
  JSONField,
  LabelFunction,
  Operator,
  StaticLabel,
} from 'payload'

export interface WhereBuilderOptions {
  /**
   * The slug of the collection to which the Query Builder applies
   * If needed dynamically, this could be derived from sibling fields by using `collectionSlugField` prop below
   */
  collectionSlug?: CollectionSlug
  /**
   * The path of a sibling field that contains the collection slug to which the Query Builder applies
   * If provided, this takes precedence over the `collectionSlug` prop
   *
   * You can use dot notation to reference nested fields, e.g. 'settings.collectionSlug'
   */
  collectionSlugField?: string

  /**
   * Whether to show the raw JSON representation of the query alongside the UI builder. This can be useful for debugging or for users who want to see the underlying query structure.
   *
   * @default false
   */
  showRawJSON?: boolean
}

export interface WhereBuilderFieldArgs extends WhereBuilderOptions {
  name: string
  description?: string
  required?: boolean
  label?: false | LabelFunction | StaticLabel
  /**
   * A function used to override field at a granular level.
   */
  overrides?: (field: JSONField) => JSONField
}

export type Value = Date | number | number[] | string | string[] | boolean | undefined

export interface ReducedField {
  field: ClientField
  label: React.ReactNode
  operators: {
    label: string
    value: Operator
  }[]
  plainTextLabel?: string
  value: string
}

export type Relation = 'and' | 'or'

export interface WhereCondition {
  [fieldPath: string]: {
    [operator: string]: Value
  }
}

export interface OrCondition {
  and: WhereCondition[]
}

export interface WhereQuery {
  or: OrCondition[]
}

export type AddCondition = (args: {
  andIndex: number
  field: ReducedField
  orIndex: number
  relation: Relation
}) => void

export type UpdateCondition = (args: {
  andIndex: number
  field: ReducedField
  operator: string
  orIndex: number
  value: Value
}) => void

export type RemoveCondition = (args: { andIndex: number; orIndex: number }) => void
