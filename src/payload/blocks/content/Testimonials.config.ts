import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { textEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const TestimonialsBlock = createBlock({
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlockType',
  labels: {
    singular: getTranslation('blocks:testimonials:label'),
    plural: getTranslation('blocks:testimonials:label'),
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
          label: getTranslation('blocks:testimonials:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:testimonials:subheading'),
        },
        {
          name: 'items',
          type: 'array',
          label: getTranslation('blocks:testimonials:items'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'authorName',
                fallbackLabel: 'Testimonial {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'quote',
              type: 'richText',
              required: true,
              label: getTranslation('blocks:testimonials:quote'),
              editor: textEditor({
                formatting: ['bold', 'italic'],
                links: false,
                headings: false,
                align: false,
              }),
            },
            {
              name: 'authorName',
              type: 'text',
              required: true,
              label: getTranslation('blocks:testimonials:authorName'),
            },
            {
              name: 'authorRole',
              type: 'text',
              label: getTranslation('blocks:testimonials:authorRole'),
            },
            {
              name: 'authorCompany',
              type: 'text',
              label: getTranslation('blocks:testimonials:authorCompany'),
            },
            {
              name: 'authorAvatar',
              type: 'upload',
              relationTo: 'media',
              label: getTranslation('blocks:testimonials:authorAvatar'),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'layout',
          type: 'select',
          label: getTranslation('blocks:testimonials:layout'),
          defaultValue: 'grid',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:testimonials:grid'), value: 'grid' },
            { label: getTranslation('blocks:testimonials:carousel'), value: 'carousel' },
            { label: getTranslation('blocks:testimonials:single'), value: 'single' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:testimonials:columns'),
          defaultValue: '3',
          admin: {
            isClearable: false,
            condition: (_data: any, siblingData: any) => siblingData.layout === 'grid',
          },
          options: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ],
        },
      ],
    },
  },
})
