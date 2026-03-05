import { deepMerge, type DeepPartial } from '@/lib/utils'
import { LabelFunction, SelectField, StaticLabel } from 'payload'
import { getTranslation } from '../i18n/getTranslation'

export type AlignVariants = 'none' | 'left' | 'center' | 'right' | 'fullWidth'

export const variantOptions: Record<
  AlignVariants,
  { label: LabelFunction | StaticLabel; value: string }
> = {
  none: {
    label: getTranslation('fields:none'),
    value: 'none',
  },
  left: {
    label: getTranslation('fields:left'),
    value: 'left',
  },
  center: {
    label: getTranslation('fields:center'),
    value: 'center',
  },
  right: {
    label: getTranslation('fields:right'),
    value: 'right',
  },
  fullWidth: {
    label: getTranslation('fields:fullWidth'),
    value: 'fullWidth',
  },
}

type AlignType = (options?: {
  variants?: AlignVariants[]
  overrides?: DeepPartial<SelectField>
}) => SelectField

export const align: AlignType = ({ variants, overrides = {} } = {}) => {
  const field: SelectField = {
    name: 'align',
    label: getTranslation('fields:align'),
    type: 'select',
    admin: {
      isClearable: false,
      width: '33.333%',
    },
    options: [],
  }

  let variantsToUse = [
    variantOptions.none,
    variantOptions.left,
    variantOptions.center,
    variantOptions.right,
    variantOptions.fullWidth,
  ]

  if (variants) {
    variantsToUse = variants.map((variant) => variantOptions[variant])

    if (!variants?.includes('left') && !overrides.defaultValue) {
      field.defaultValue = variants[0]
    }
  } else {
    if (!overrides.defaultValue) {
      field.defaultValue = 'left'
    }
  }

  variantsToUse.map((option) => field.options.push(option))

  return deepMerge(field, overrides)
}
