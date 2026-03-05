import { deepMerge, DeepPartial } from '@/lib/utils'
import type { LabelFunction, SelectField, StaticLabel } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'

type TagVariant = 'div' | 'section' | 'article'

const tagOptions: Record<
  TagVariant,
  {
    label: LabelFunction | StaticLabel
    value: string
  }
> = {
  section: {
    label: 'section',
    value: 'section',
  },
  div: {
    label: 'div',
    value: 'div',
  },
  article: {
    label: 'article',
    value: 'article',
  },
}

type HTMLFieldType = (options?: {
  tags?: TagVariant[]
  overrides?: DeepPartial<SelectField>
}) => SelectField

export const htmlTag: HTMLFieldType = ({ tags, overrides = {} } = {}) => {
  const field: SelectField = {
    name: 'htmlTag',
    label: getTranslation('fields:htmlTag'),
    type: 'select',
    admin: {
      isClearable: false,
      width: '50%',
    },
    options: [],
  }

  let optionsToUse = [tagOptions.div, tagOptions.section, tagOptions.article]

  if (tags) {
    optionsToUse = tags.map((tag) => tagOptions[tag])

    if (!tags.includes('section') && !overrides.defaultValue) {
      field.defaultValue = tags[0]
    }
  } else {
    if (!overrides.defaultValue) {
      field.defaultValue = 'section'
    }
  }

  field.options = optionsToUse

  return deepMerge(field, overrides)
}
