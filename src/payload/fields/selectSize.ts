import { deepMerge, DeepPartial } from '@/lib/utils'
import type { LabelFunction, SelectField, StaticLabel } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'

export type SizeVariants = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const variantOptions: Record<
  SizeVariants,
  { label: LabelFunction | StaticLabel; value: string }
> = {
  none: {
    label: getTranslation('fields:none'),
    value: 'none',
  },
  xs: {
    label: 'XS',
    value: 'xs',
  },
  sm: {
    label: 'SM',
    value: 'sm',
  },
  md: {
    label: 'MD',
    value: 'md',
  },
  lg: {
    label: 'LG',
    value: 'lg',
  },
  xl: {
    label: 'XL',
    value: 'xl',
  },
}

type SizeType = (options?: {
  variants?: SizeVariants[]
  includeNone?: boolean
  noneLabel?: LabelFunction | StaticLabel
  overrides?: DeepPartial<SelectField>
}) => SelectField

export const selectSize: SizeType = ({
  variants,
  includeNone = false,
  noneLabel,
  overrides = {},
} = {}) => {
  const sizeResult: SelectField = {
    name: 'size',
    label: getTranslation('fields:size'),
    type: 'select',
    admin: { isClearable: false },
    options: [],
  }

  let variantsToUse = variants
    ? variants.map((variant) => variantOptions[variant])
    : [
        variantOptions.xs,
        variantOptions.sm,
        variantOptions.md,
        variantOptions.lg,
        variantOptions.xl,
      ]

  if (includeNone) {
    const noneOption = {
      label: noneLabel || variantOptions.none.label,
      value: 'none',
    }
    variantsToUse = [noneOption, ...variantsToUse]
  }

  if (variants) {
    if (!variants.includes('md') && !overrides.defaultValue) {
      sizeResult.defaultValue = includeNone ? 'none' : variants[0]
    }
  } else {
    if (!overrides.defaultValue) {
      sizeResult.defaultValue = includeNone ? 'none' : 'md'
    }
  }

  variantsToUse.map((option) => sizeResult.options.push(option))

  return deepMerge(sizeResult, overrides)
}
