import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const VideoBlock = createBlock({
  slug: 'video',
  interfaceName: 'VideoBlockType',
  labels: {
    singular: getTranslation('blocks:video:label'),
    plural: getTranslation('blocks:video:label'),
  },
  admin: {
    group: adminBlockGroups.media,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:video:heading'),
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: getTranslation('blocks:video:url'),
          admin: {
            description: getTranslation('blocks:video:urlDescription'),
          },
        },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          label: getTranslation('blocks:video:poster'),
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'aspectRatio',
          type: 'select',
          label: getTranslation('blocks:video:aspectRatio'),
          defaultValue: '16/9',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:video:ratio16x9'), value: '16/9' },
            { label: getTranslation('blocks:video:ratio4x3'), value: '4/3' },
            { label: getTranslation('blocks:video:ratio1x1'), value: '1/1' },
          ],
        },
      ],
    },
  },
})
