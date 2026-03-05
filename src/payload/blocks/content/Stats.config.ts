import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const StatsBlock = createBlock({
  slug: 'stats',
  interfaceName: 'StatsBlockType',
  labels: {
    singular: getTranslation('blocks:stats:label'),
    plural: getTranslation('blocks:stats:label'),
  },
  admin: {
    group: adminBlockGroups.socialProof,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:stats:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:stats:subheading'),
        },
        {
          name: 'items',
          type: 'array',
          label: getTranslation('blocks:stats:items'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'label',
                fallbackLabel: 'Stat {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: getTranslation('blocks:stats:value'),
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              label: getTranslation('blocks:stats:itemLabel'),
            },
            {
              name: 'prefix',
              type: 'text',
              label: getTranslation('blocks:stats:prefix'),
            },
            {
              name: 'suffix',
              type: 'text',
              label: getTranslation('blocks:stats:suffix'),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'layout',
          type: 'select',
          label: getTranslation('blocks:stats:layout'),
          defaultValue: 'grid',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:stats:grid'), value: 'grid' },
            { label: getTranslation('blocks:stats:inline'), value: 'inline' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:stats:columns'),
          defaultValue: '4',
          admin: {
            isClearable: false,
            condition: (_data: any, siblingData: any) => siblingData.layout !== 'inline',
          },
          options: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
          ],
        },
      ],
    },
  },
})
