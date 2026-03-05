import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const LogoCloudBlock = createBlock({
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlockType',
  labels: {
    singular: getTranslation('blocks:logoCloud:label'),
    plural: getTranslation('blocks:logoCloud:label'),
  },
  admin: {
    group: adminBlockGroups.socialProof,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:logoCloud:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:logoCloud:subheading'),
        },
        {
          name: 'logos',
          type: 'array',
          label: getTranslation('blocks:logoCloud:logos'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'name',
                fallbackLabel: 'Logo {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: getTranslation('blocks:logoCloud:logoImage'),
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              label: getTranslation('blocks:logoCloud:logoName'),
            },
            {
              name: 'url',
              type: 'text',
              label: getTranslation('blocks:logoCloud:logoUrl'),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'layout',
          type: 'select',
          label: getTranslation('blocks:logoCloud:layout'),
          defaultValue: 'grid',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:logoCloud:grid'), value: 'grid' },
            { label: getTranslation('blocks:logoCloud:marquee'), value: 'marquee' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:logoCloud:columns'),
          defaultValue: '5',
          admin: {
            isClearable: false,
            condition: (_data: any, siblingData: any) => siblingData.layout !== 'marquee',
          },
          options: [
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
          ],
        },
      ],
    },
  },
})
