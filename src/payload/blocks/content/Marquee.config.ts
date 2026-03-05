import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const MarqueeBlock = createBlock({
  slug: 'marquee',
  interfaceName: 'MarqueeBlockType',
  labels: {
    singular: getTranslation('blocks:marquee:label'),
    plural: getTranslation('blocks:marquee:label'),
  },
  admin: {
    group: adminBlockGroups.media,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'items',
          type: 'array',
          label: getTranslation('blocks:marquee:items'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'text',
                fallbackLabel: 'Item {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              label: getTranslation('blocks:marquee:itemType'),
              defaultValue: 'text',
              required: true,
              admin: { isClearable: false },
              options: [
                { label: getTranslation('blocks:marquee:typeText'), value: 'text' },
                { label: getTranslation('blocks:marquee:typeImage'), value: 'image' },
              ],
            },
            {
              name: 'text',
              type: 'text',
              label: getTranslation('blocks:marquee:text'),
              admin: {
                condition: (_data: any, siblingData: any) => siblingData.type === 'text',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: getTranslation('blocks:marquee:image'),
              admin: {
                condition: (_data: any, siblingData: any) => siblingData.type === 'image',
              },
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'speed',
          type: 'select',
          label: getTranslation('blocks:marquee:speed'),
          defaultValue: 'normal',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:marquee:slow'), value: 'slow' },
            { label: getTranslation('blocks:marquee:normal'), value: 'normal' },
            { label: getTranslation('blocks:marquee:fast'), value: 'fast' },
          ],
        },
        {
          name: 'direction',
          type: 'select',
          label: getTranslation('blocks:marquee:direction'),
          defaultValue: 'ltr',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:marquee:ltr'), value: 'ltr' },
            { label: getTranslation('blocks:marquee:rtl'), value: 'rtl' },
          ],
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          label: getTranslation('blocks:marquee:pauseOnHover'),
          defaultValue: true,
        },
      ],
    },
  },
})
