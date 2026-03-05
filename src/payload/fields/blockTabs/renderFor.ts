import type { Field } from 'payload'

/**
 * Contexts where a field can be rendered.
 * Used by blockTabsFactory: 'block' = block-level variant, 'inline' = inline variant.
 * Set via field.admin.custom.renderIn (Payload admin.custom; no type extension needed).
 */
export type RenderContext = 'block' | 'inline'

type AdminWithCustom = { admin?: { custom?: Record<string, unknown> } }

const getRenderIn = (field: Field): RenderContext | RenderContext[] | undefined =>
  (field as AdminWithCustom).admin?.custom?.renderIn as RenderContext | RenderContext[] | undefined

const includeInVariant = (field: Field, variant: RenderContext): boolean => {
  const renderIn = getRenderIn(field)
  if (renderIn == null) return true
  const arr = Array.isArray(renderIn) ? renderIn : [renderIn]
  return arr.includes(variant)
}

/** Payload Field types that have a nested `fields` array. */
const hasNestedFields = (f: Field): f is Field & { fields: Field[] } =>
  'fields' in f && Array.isArray((f as Field & { fields: unknown[] }).fields)

/**
 * Filter fields to those allowed in the given variant (admin.custom.renderIn includes variant or is absent).
 * Recurses into row, group, array, collapsible. Uses admin.custom only; no field type extension.
 */
export const filterFieldsByRenderFor = (fields: Field[], variant: RenderContext): Field[] => {
  const out: Field[] = []
  for (const field of fields) {
    if (!includeInVariant(field, variant)) continue
    if (hasNestedFields(field)) {
      out.push({
        ...field,
        fields: filterFieldsByRenderFor(field.fields, variant),
      } as Field)
    } else {
      out.push(field)
    }
  }
  return out
}
