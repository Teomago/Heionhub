import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { defaultEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const FAQBlock = createBlock({
  slug: 'faq',
  interfaceName: 'FAQBlockType',
  labels: {
    singular: getTranslation('blocks:faq:label'),
    plural: getTranslation('blocks:faq:label'),
  },
  admin: {
    group: adminBlockGroups.content,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:faq:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:faq:subheading'),
        },
        {
          name: 'items',
          type: 'array',
          label: getTranslation('blocks:faq:items'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'question',
                fallbackLabel: 'Question {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              label: getTranslation('blocks:faq:question'),
            },
            {
              name: 'answer',
              type: 'richText',
              required: true,
              label: getTranslation('blocks:faq:answer'),
              editor: defaultEditor(),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'allowMultiple',
          type: 'checkbox',
          label: getTranslation('blocks:faq:allowMultiple'),
          defaultValue: false,
        },
      ],
    },
  },
})
