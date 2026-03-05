import type { ArrayField, Field } from 'payload'

import type { LinkAppearance } from './types'

import { deepMerge } from '@/lib/utils'
import { link } from './link'
import { getTranslation } from '@/payload/i18n/getTranslation'

type LinkGroupType = (options?: {
  appearances?: LinkAppearance[] | false
  localizeLabels?: boolean
  overrides?: Partial<ArrayField>
  linkOverrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({
  appearances,
  localizeLabels = false,
  overrides = {},
  linkOverrides = {},
} = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    label: getTranslation('general:links'),
    type: 'array',
    admin: {
      initCollapsed: true,
      components: {
        RowLabel: '@/payload/fields/link/ui/LinkRowLabel',
      },
    },
    fields: [link({ appearances, localizeLabels, overrides: linkOverrides })],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
