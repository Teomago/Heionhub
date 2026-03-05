export type TemplateVariableFormat = 'string' | 'number' | 'discount'

type BaseTemplateVariable = {
  key: string
  /**
   * Optional nested path to resolve relative to the matched field value.
   * e.g. { relationPath: 'type', valuePath: 'name' } exposes the related type name.
   */
  valuePath?: string
  /**
   * Optional built-in formatter to apply to the extracted value.
   * - `string` (default) - coerces to string if possible.
   * - `number` - coerces to number, falling back to string if needed.
   * - `discount` - formats a discount group using the shared formatter.
   */
  format?: TemplateVariableFormat
  /**
   * Fallback value used when the resolved field is empty.
   */
  fallback?: string
}

export type RelationTemplateVariable = BaseTemplateVariable & {
  relationPath: string
  relationTo: string | string[]
  select?: string[]
}

export type FieldTemplateVariable = BaseTemplateVariable & {
  fieldPath: string
}

export type ArrayRowLabelTemplateVariables = Array<RelationTemplateVariable | FieldTemplateVariable>

export type ArrayRowLabelArgs = {
  /**
   * The field in the array item to use for the label.
   * Supports dot notation for nested fields (e.g. 'nested.fieldName')
   * and {{variable}} syntax when template is true.
   */
  fieldToUse: string
  /**
   * Whether to treat fieldToUse as a template string.
   * Enables {{variable}} syntax.
   * Available variables: {{index}} - row number (starting from 0)
   * @default false
   */
  template?: boolean
  /**
   * Fallback label if the specified field is not found or is empty
   * @default 'Item {{index}}'
   */
  fallbackLabel?: string
  /**
   * Optional list of template variables that can be used inside `fieldToUse`.
   */
  templateVariables?: ArrayRowLabelTemplateVariables
}
