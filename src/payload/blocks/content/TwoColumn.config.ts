import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { defaultEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const TwoColumnBlock = createBlock({
  slug: 'twoColumn',
  interfaceName: 'TwoColumnBlockType',
  labels: {
    singular: getTranslation('blocks:twoColumn:label'),
    plural: getTranslation('blocks:twoColumn:label'),
  },
  admin: {
    group: adminBlockGroups.layout,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:twoColumn:heading'),
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: getTranslation('blocks:twoColumn:content'),
          editor: defaultEditor(),
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: getTranslation('blocks:twoColumn:media'),
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'mediaPosition',
          type: 'select',
          label: getTranslation('blocks:twoColumn:mediaPosition'),
          defaultValue: 'right',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:twoColumn:left'), value: 'left' },
            { label: getTranslation('blocks:twoColumn:right'), value: 'right' },
          ],
        },
        {
          name: 'verticalAlignment',
          type: 'select',
          label: getTranslation('blocks:twoColumn:verticalAlignment'),
          defaultValue: 'center',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:twoColumn:top'), value: 'top' },
            { label: getTranslation('blocks:twoColumn:center'), value: 'center' },
            { label: getTranslation('blocks:twoColumn:bottom'), value: 'bottom' },
          ],
        },
      ],
    },
  },
})
