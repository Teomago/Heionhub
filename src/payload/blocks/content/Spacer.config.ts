import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const SpacerBlock = createBlock({
  slug: 'spacer',
  interfaceName: 'SpacerBlockType',
  labels: {
    singular: getTranslation('blocks:spacer:label'),
    plural: getTranslation('blocks:spacer:label'),
  },
  admin: {
    group: adminBlockGroups.layout,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'height',
          type: 'select',
          label: getTranslation('blocks:spacer:height'),
          defaultValue: 'md',
          required: true,
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:spacer:heightXs'), value: 'xs' },
            { label: getTranslation('blocks:spacer:heightSm'), value: 'sm' },
            { label: getTranslation('blocks:spacer:heightMd'), value: 'md' },
            { label: getTranslation('blocks:spacer:heightLg'), value: 'lg' },
            { label: getTranslation('blocks:spacer:heightXl'), value: 'xl' },
          ],
        },
      ],
    },
  },
})
