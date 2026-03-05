import { CollectionSlug, LabelFunction, StaticLabel, TextField } from 'payload'
import { JSX } from 'react'

export interface SortBuilderOptions {
  /**
   * The slug of the collection to which the Sort Builder applies
   * If needed dynamically, this could be derived from sibling fields by using `collectionSlugField` prop below
   */
  collectionSlug?: CollectionSlug
  /**
   * The path of a sibling field that contains the collection slug to which the Sort Builder applies
   * If provided, this takes precedence over the `collectionSlug` prop
   *
   * You can use dot notation to reference nested fields, e.g. 'settings.collectionSlug'
   */
  collectionSlugField?: string
}

export interface SortBuilderFieldArgs extends SortBuilderOptions {
  name: string
  description?: string
  required?: boolean
  label?: false | LabelFunction | StaticLabel
  /**
   * A function used to override field at a granular level.
   */
  overrides?: (field: TextField) => TextField
}

export interface SortableField {
  label: string | JSX.Element
  value: string
}
