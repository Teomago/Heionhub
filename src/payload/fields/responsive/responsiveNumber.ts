import type { Field, GroupField, NumberField, LabelFunction, StaticLabel } from 'payload'
import { deepMerge, type DeepPartial } from '@/lib/utils'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { BREAKPOINT_LABELS, type ResponsiveBreakpoint } from './responsiveSelect'

export interface ResponsiveNumberOptions {
  /** Field name for the responsive group */
  name?: string
  /** Field label */
  label?: LabelFunction | StaticLabel
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Default value for base breakpoint */
  defaultValue?: number
  /** Which breakpoints to include (defaults to all 6) */
  breakpoints?: ResponsiveBreakpoint[]
  /** Admin description */
  description?: string
  /** Suffix text (e.g., 'px') */
  suffix?: string
  /** Overrides for the group field */
  overrides?: DeepPartial<GroupField>
}

/**
 * Creates a responsive number field group with breakpoint-specific number inputs
 *
 * Generates a group with 6 number fields (base, xs, sm, md, lg, xl) arranged in rows.
 * Empty values cascade from smaller breakpoints on the frontend.
 */
export const responsiveNumber = ({
  name = 'responsive',
  label,
  min,
  max,
  step,
  defaultValue,
  breakpoints = ['base', 'xs', 'sm', 'md', 'lg', 'xl'],
  description,
  suffix,
  overrides = {},
}: ResponsiveNumberOptions): GroupField => {
  const createBreakpointField = (
    breakpoint: ResponsiveBreakpoint,
    isFirst: boolean,
  ): NumberField => {
    const field: NumberField = {
      name: breakpoint,
      type: 'number',
      label: BREAKPOINT_LABELS[breakpoint],
      defaultValue: isFirst ? defaultValue : undefined,
      admin: {
        width: '33.333%',
        placeholder: isFirst ? undefined : '—',
        step: step,
      },
    }

    if (min !== undefined) field.min = min
    if (max !== undefined) field.max = max

    return field
  }

  // Create breakpoint fields
  const breakpointFields = breakpoints.map((bp, index) => createBreakpointField(bp, index === 0))

  // Split into two rows of 3 fields each
  const firstRowFields = breakpointFields.slice(0, 3)
  const secondRowFields = breakpointFields.slice(3, 6)

  const fields: Field[] = []

  if (firstRowFields.length > 0) {
    fields.push({
      type: 'row',
      fields: firstRowFields,
    })
  }

  if (secondRowFields.length > 0) {
    fields.push({
      type: 'row',
      fields: secondRowFields,
    })
  }

  const finalDescription = suffix
    ? description
      ? `${description} (${suffix})`
      : `Values in ${suffix}`
    : description

  const groupField: GroupField = {
    name,
    type: 'group',
    label: label || getTranslation('responsive:responsiveValues'),
    interfaceName: 'ResponsiveNumberType',
    admin: {
      hideGutter: true,
      description: finalDescription,
    },
    fields,
  }

  return deepMerge(groupField, overrides)
}
