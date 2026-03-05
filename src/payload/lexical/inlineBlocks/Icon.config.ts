import { colorField } from '@/payload/fields/color'
import { iconField } from '@/payload/fields/icon'
import { manualSpace } from '@/payload/fields/manualSpace'
import { getTranslation } from '@/payload/i18n/getTranslation'
import type { Block } from 'payload'

export const IconBlock: Block = {
  slug: 'icon',
  labels: {
    singular: getTranslation('blocks:icon:singular'),
    plural: getTranslation('blocks:icon:plural'),
  },
  interfaceName: 'IconBlockType',
  admin: {
    components: {
      Label: '@/payload/fields/icon/ui-server#IconLabel',
    },
  },
  fields: [
    iconField(),
    colorField(),
    {
      name: 'size',
      type: 'group',
      label: getTranslation('fields:size'),
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            manualSpace({
              overrides: {
                name: 'mobile',
                label: getTranslation('general:mobile'),
              },
            }),
            manualSpace({
              overrides: {
                name: 'tablet',
                label: getTranslation('general:tablet'),
              },
            }),
            manualSpace({
              overrides: {
                name: 'desktop',
                label: getTranslation('general:desktop'),
              },
            }),
          ],
        },
      ],
    },
  ],
}
