import type { Field, GroupField, LabelFunction, StaticLabel } from 'payload'
import { deepMerge, type DeepPartial } from '@/lib/utils'
import { responsiveSelect, type ResponsiveSelectOption } from './responsiveSelect'
import { responsiveNumber } from './responsiveNumber'

export type ResponsiveSizeType = 'preset' | 'custom'

export interface ResponsiveGroupOptions {
  /** Field name for the responsive group */
  name?: string
  /** Field label */
  label?: LabelFunction | StaticLabel
  /** Options for preset mode select fields */
  presetOptions: ResponsiveSelectOption[]
  /** Default preset value for base breakpoint */
  defaultPreset?: string
  /** Default custom value for base breakpoint (px) */
  defaultCustom?: number
  /** Min value for custom number fields */
  customMin?: number
  /** Max value for custom number fields */
  customMax?: number
  /** Admin description */
  description?: string
  /** Condition function for when to show this group */
  condition?: (data: Record<string, unknown>, siblingData: Record<string, unknown>) => boolean
  /** Overrides for the group field */
  overrides?: DeepPartial<GroupField>
}

/**
 * Creates a responsive group with toggle between preset and custom (px) values
 *
 * Combines responsiveSelect and responsiveNumber with a type toggle.
 * Perfect for sizing fields where users can choose predefined sizes or custom pixel values.
 */
export const responsiveGroup = ({
  name = 'sizing',
  label,
  presetOptions,
  defaultPreset,
  defaultCustom,
  customMin = 0,
  customMax = 200,
  description,
  condition,
  overrides = {},
}: ResponsiveGroupOptions): GroupField => {
  const fields: Field[] = [
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      defaultValue: 'preset',
      admin: {
        isClearable: false,
      },
      options: [
        { label: 'Preset', value: 'preset' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    responsiveSelect({
      name: 'preset',
      label: 'Preset Sizes',
      options: presetOptions,
      includeInherit: true,
      defaultValue: defaultPreset,
      description: 'Select predefined size values per breakpoint',
      overrides: {
        admin: {
          condition: (_data, siblingData) => siblingData?.type === 'preset',
        },
      },
    }),
    responsiveNumber({
      name: 'custom',
      label: 'Custom Sizes',
      min: customMin,
      max: customMax,
      defaultValue: defaultCustom,
      suffix: 'px',
      description: 'Enter custom pixel values per breakpoint',
      overrides: {
        admin: {
          condition: (_data, siblingData) => siblingData?.type === 'custom',
        },
      },
    }),
  ]

  const groupField: GroupField = {
    name,
    type: 'group',
    label: label || 'Responsive Sizing',
    interfaceName: 'ResponsiveGroupType',
    admin: {
      hideGutter: true,
      description,
      condition,
    },
    fields,
  }

  return deepMerge(groupField, overrides)
}
