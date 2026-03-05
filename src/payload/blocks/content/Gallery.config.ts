import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const GalleryBlock = createBlock({
  slug: 'gallery',
  interfaceName: 'GalleryBlockType',
  labels: {
    singular: getTranslation('blocks:gallery:label'),
    plural: getTranslation('blocks:gallery:label'),
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
          label: getTranslation('blocks:gallery:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:gallery:subheading'),
        },
        {
          name: 'images',
          type: 'array',
          label: getTranslation('blocks:gallery:images'),
          minRows: 1,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              label: getTranslation('blocks:gallery:caption'),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'layout',
          type: 'select',
          label: getTranslation('blocks:gallery:layout'),
          defaultValue: 'grid',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:gallery:grid'), value: 'grid' },
            { label: getTranslation('blocks:gallery:masonry'), value: 'masonry' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:gallery:columns'),
          defaultValue: '3',
          admin: { isClearable: false },
          options: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
          ],
        },
        {
          name: 'lightbox',
          type: 'checkbox',
          label: getTranslation('blocks:gallery:lightbox'),
          defaultValue: true,
        },
      ],
    },
  },
})
