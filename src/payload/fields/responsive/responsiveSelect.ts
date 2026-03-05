import type { Field, GroupField, SelectField, LabelFunction, StaticLabel } from 'payload'
import { deepMerge, type DeepPartial } from '@/lib/utils'
import { getTranslation } from '@/payload/i18n/getTranslation'

export type ResponsiveBreakpoint = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const BREAKPOINT_LABELS: Record<ResponsiveBreakpoint, LabelFunction | StaticLabel> = {
  base: getTranslation('responsive:base'),
  xs: 'XS',
  sm: 'SM',
  md: 'MD',
  lg: 'LG',
  xl: 'XL',
}

export interface ResponsiveSelectOption {
  label: LabelFunction | StaticLabel
  value: string
}

export interface ResponsiveSelectOptions {
  /** Field name for the responsive group */
  name?: string
  /** Field label */
  label?: LabelFunction | StaticLabel
  /** Options for each breakpoint select */
  options: ResponsiveSelectOption[]
  /** Whether to include an "inherit" option (for cascading behavior) */
  includeInherit?: boolean
  /** Whether to include a "fullwidth" option (for w-full responsive classes) */
  includeFullwidth?: boolean
  /** Label for the inherit option */
  inheritLabel?: LabelFunction | StaticLabel
  /** Label for the fullwidth option */
  fullwidthLabel?: LabelFunction | StaticLabel
  /** Default value for base breakpoint */
  defaultValue?: string
  /** Which breakpoints to include (defaults to all 6) */
  breakpoints?: ResponsiveBreakpoint[]
  /** Admin description */
  description?: string
  /** Overrides for the group field */
  overrides?: DeepPartial<GroupField>
}

/**
 * Creates a responsive select field group with breakpoint-specific select fields
 *
 * Generates a group with 6 select fields (base, xs, sm, md, lg, xl) arranged in rows.
 * Supports cascading "inherit" option for values to flow from smaller breakpoints.
 */
export const responsiveSelect = ({
  name = 'responsive',
  label,
  options,
  includeInherit = true,
  includeFullwidth = false,
  inheritLabel,
  fullwidthLabel,
  defaultValue,
  breakpoints = ['base', 'xs', 'sm', 'md', 'lg', 'xl'],
  description,
  overrides = {},
}: ResponsiveSelectOptions): GroupField => {
  const inheritOption: ResponsiveSelectOption = {
    label: inheritLabel || getTranslation('responsive:inherit'),
    value: '',
  }

  const fullwidthOption: ResponsiveSelectOption = {
    label: fullwidthLabel || getTranslation('fields:fullWidth'),
    value: 'fullwidth',
  }

  const createBreakpointField = (
    breakpoint: ResponsiveBreakpoint,
    isFirst: boolean,
  ): SelectField => {
    let fieldOptions = options

    // For first field, optionally prepend fullwidth
    if (isFirst && includeFullwidth) {
      fieldOptions = [fullwidthOption, ...fieldOptions]
    }

    // For non-first fields, prepend inherit (and optionally fullwidth)
    if (!isFirst) {
      if (includeInherit && includeFullwidth) {
        fieldOptions = [inheritOption, fullwidthOption, ...options]
      } else if (includeInherit) {
        fieldOptions = [inheritOption, ...options]
      } else if (includeFullwidth) {
        fieldOptions = [fullwidthOption, ...options]
      }
    }

    return {
      name: breakpoint,
      type: 'select',
      label: BREAKPOINT_LABELS[breakpoint],
      defaultValue: isFirst ? defaultValue : '',
      admin: {
        isClearable: false,
        width: '33.333%',
      },
      options: fieldOptions,
    }
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

  const groupField: GroupField = {
    name,
    type: 'group',
    label: label || getTranslation('responsive:responsiveValues'),
    interfaceName: 'ResponsiveSelectType',
    admin: {
      hideGutter: true,
      description,
    },
    fields,
  }

  return deepMerge(groupField, overrides)
}
