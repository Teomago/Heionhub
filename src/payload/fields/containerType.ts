import { deepMerge, DeepPartial } from '@/lib/utils'
import { LabelFunction, SelectField, StaticLabel } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'

type ContainerVariantProps = {
  type?: 'default' | 'post' | 'none' | null | undefined
  container?: boolean | null | undefined
  variant?: 'standard' | 'richText' | null | undefined
}

type ContainerTypeVariant = NonNullable<ContainerVariantProps['type']>

export const containerOptions: Record<
  ContainerTypeVariant,
  { label: LabelFunction | StaticLabel; value: string }
> = {
  none: {
    label: getTranslation('fields:none'),
    value: 'none',
  },
  default: {
    label: getTranslation('fields:default'),
    value: 'default',
  },
  post: {
    label: getTranslation('fields:post'),
    value: 'post',
  },
}

type ContainerField = (options?: {
  types?: ContainerTypeVariant[]
  overrides?: DeepPartial<SelectField>
}) => SelectField

export const containerType: ContainerField = ({ types, overrides = {} } = {}) => {
  const field: SelectField = {
    name: 'containerType',
    type: 'select',
    label: getTranslation('fields:containerType'),
    admin: {
      isClearable: false,
      width: '50%',
    },
    options: [],
  }

  let typesToUse = [containerOptions.none, containerOptions.default, containerOptions.post]

  if (types) {
    typesToUse = types.map((type) => containerOptions[type])

    if (!types.includes('default') && !overrides.defaultValue) {
      field.defaultValue = types[0]
    }
  } else {
    if (!overrides.defaultValue) {
      field.defaultValue = 'default'
    }
  }

  field.options = typesToUse

  return deepMerge(field, overrides)
}
