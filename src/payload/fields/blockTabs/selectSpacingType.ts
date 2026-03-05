import { deepMerge, DeepPartial } from '@/lib/utils'
import type { LabelFunction, SelectField, StaticLabel } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'

export type SpacingVariants = 'padding' | 'margin'

export const spacingOptions: Record<
  SpacingVariants,
  { label: LabelFunction | StaticLabel; value: string }
> = {
  padding: {
    label: getTranslation('fields:padding'),
    value: 'padding',
  },
  margin: {
    label: getTranslation('fields:margin'),
    value: 'margin',
  },
}

type SpacingType = (options?: {
  variants?: SpacingVariants[]
  overrides?: DeepPartial<SelectField>
}) => SelectField

export const selectSpacingType: SpacingType = ({ variants, overrides = {} } = {}) => {
  const spacingResult: SelectField = {
    name: 'spacingType',
    label: getTranslation('fields:spacingType'),
    type: 'select',
    admin: { isClearable: false },
    options: [],
  }

  let variantsToUse = [spacingOptions.margin, spacingOptions.padding]

  if (variants) {
    variantsToUse = variants.map((variant) => spacingOptions[variant])

    if (!variants.includes('margin') && !overrides.defaultValue) {
      spacingResult.defaultValue = variants[0]
    }
  } else {
    if (!overrides.defaultValue) {
      spacingResult.defaultValue = 'margin'
    }
  }

  variantsToUse.map((option) => spacingResult.options.push(option))

  return deepMerge(spacingResult, overrides)
}
