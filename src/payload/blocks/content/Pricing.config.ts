import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const PricingBlock = createBlock({
  slug: 'pricing',
  interfaceName: 'PricingBlockType',
  labels: {
    singular: getTranslation('blocks:pricing:label'),
    plural: getTranslation('blocks:pricing:label'),
  },
  admin: {
    group: adminBlockGroups.conversion,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:pricing:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:pricing:subheading'),
        },
        {
          name: 'plans',
          type: 'array',
          label: getTranslation('blocks:pricing:plans'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'name',
                fallbackLabel: 'Plan {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: getTranslation('blocks:pricing:planName'),
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              label: getTranslation('blocks:pricing:price'),
            },
            {
              name: 'period',
              type: 'select',
              label: getTranslation('blocks:pricing:period'),
              defaultValue: 'monthly',
              admin: { isClearable: false },
              options: [
                { label: getTranslation('blocks:pricing:periodMonthly'), value: 'monthly' },
                { label: getTranslation('blocks:pricing:periodYearly'), value: 'yearly' },
                { label: getTranslation('blocks:pricing:periodOneTime'), value: 'one-time' },
              ],
            },
            {
              name: 'features',
              type: 'array',
              label: getTranslation('blocks:pricing:features'),
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: getTranslation('blocks:pricing:featureText'),
                },
              ],
            },
            {
              name: 'ctaLabel',
              type: 'text',
              label: getTranslation('blocks:pricing:ctaLabel'),
              defaultValue: 'Get started',
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: getTranslation('blocks:pricing:ctaLink'),
            },
            {
              name: 'highlighted',
              type: 'checkbox',
              label: getTranslation('blocks:pricing:highlighted'),
              defaultValue: false,
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:pricing:columns'),
          defaultValue: '3',
          admin: { isClearable: false },
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
