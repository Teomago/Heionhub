import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { textEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'
import { iconField } from '@/payload/fields/icon'

export const FeaturesBlock = createBlock({
  slug: 'features',
  interfaceName: 'FeaturesBlockType',
  labels: {
    singular: getTranslation('blocks:features:label'),
    plural: getTranslation('blocks:features:label'),
  },
  admin: {
    group: adminBlockGroups.content,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:features:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:features:subheading'),
        },
        {
          name: 'items',
          type: 'array',
          label: getTranslation('blocks:features:items'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'title',
                fallbackLabel: 'Feature {{index + 1}}',
              }),
            },
          },
          fields: [
            iconField({
              name: 'icon',
              overrides: (field) => ({
                ...field,
                label: getTranslation('blocks:features:icon'),
              }),
            }),
            {
              name: 'title',
              type: 'text',
              required: true,
              label: getTranslation('blocks:features:itemTitle'),
            },
            {
              name: 'description',
              type: 'richText',
              label: getTranslation('blocks:features:itemDescription'),
              editor: textEditor({
                formatting: ['bold', 'italic'],
                links: true,
                headings: false,
                align: false,
                addFeatures: ['unorderedList', 'orderedList'],
              }),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'layout',
          type: 'select',
          label: getTranslation('blocks:features:layout'),
          defaultValue: 'grid',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:features:grid'), value: 'grid' },
            { label: getTranslation('blocks:features:list'), value: 'list' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:features:columns'),
          defaultValue: '3',
          admin: {
            isClearable: false,
            condition: (_, siblingData) => siblingData?.layout !== 'list',
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
