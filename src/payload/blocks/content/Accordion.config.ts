import type { BlockSlug } from 'payload'
import { createBlock } from '@/payload/blocks/blockFactory'
import { responsiveGroup } from '@/payload/fields/responsive'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { textEditor } from '@/payload/lexical'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const AccordionBlock = createBlock({
  slug: 'accordion',
  interfaceName: 'AccordionBlockType',
  admin: {
    group: adminBlockGroups.content,
  },
  availableIn: ['root', 'richText', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'title',
                fallbackLabel: 'Item {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              editor: textEditor({
                formatting: ['bold', 'italic'],
                links: true,
                inlineCode: true,
                headings: ['h3', 'h4'],
                align: false,
                upload: true,
                inlineBlocks: ['icon' as BlockSlug],
                addFeatures: ['unorderedList', 'orderedList'],
              }),
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'accordionType',
          type: 'select',
          label: 'Accordion Type',
          defaultValue: 'single',
          admin: {
            isClearable: false,
          },
          options: [
            { label: 'Single', value: 'single' },
            { label: 'Multiple', value: 'multiple' },
          ],
        },
        {
          ...responsiveGroup({
            name: 'width',
            label: 'Width',
            presetOptions: [
              { label: 'XS (480px)', value: 'xs' },
              { label: 'SM (640px)', value: 'sm' },
              { label: 'MD (768px)', value: 'md' },
              { label: 'LG (1024px)', value: 'lg' },
              { label: 'XL (1280px)', value: 'xl' },
              { label: '2XL (1536px)', value: '2xl' },
              { label: 'Full Width', value: 'fullwidth' },
            ],
            defaultPreset: 'lg',
            description: 'Maximum width constraint for the accordion',
            overrides: {
              admin: {
                condition: (_data, siblingData) => siblingData?.containerType !== 'none',
                custom: {
                  renderIn: 'block',
                },
              },
            },
          }),
        },
        {
          name: 'alignment',
          type: 'select',
          defaultValue: 'center',
          admin: {
            isClearable: false,
            condition: (_, siblingData) => siblingData?.containerType !== 'none',
          },
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  },
})
