import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { textEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const BannerBlock = createBlock({
  slug: 'banner',
  interfaceName: 'BannerBlockType',
  labels: {
    singular: getTranslation('blocks:banner:label'),
    plural: getTranslation('blocks:banner:label'),
  },
  admin: {
    group: adminBlockGroups.content,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: getTranslation('blocks:banner:content'),
          editor: textEditor({
            formatting: ['bold', 'italic'],
            links: true,
            headings: false,
            align: false,
          }),
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'type',
          type: 'select',
          label: getTranslation('blocks:banner:type'),
          defaultValue: 'info',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:banner:typeInfo'), value: 'info' },
            { label: getTranslation('blocks:banner:typeWarning'), value: 'warning' },
            { label: getTranslation('blocks:banner:typeSuccess'), value: 'success' },
          ],
        },
        {
          name: 'dismissible',
          type: 'checkbox',
          label: getTranslation('blocks:banner:dismissible'),
          defaultValue: false,
        },
      ],
    },
  },
})
