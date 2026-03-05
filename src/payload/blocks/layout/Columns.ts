import { contentBlockRegistry } from '@/payload/blocks/content'
import { getBlockSlugsFor } from '@/payload/blocks/registry'
import { blockTabs } from '@/payload/fields/blockTabs'
import { selectSize } from '@/payload/fields/selectSize'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'
import type { Block, BlockSlug, Field } from 'payload'

/**
 * Generate width span options (1-12 grid system)
 */
const widthSpanOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} (${Math.round(((i + 1) / 12) * 100)}%)`,
  value: `${i + 1}`,
}))

/**
 * Reusable width span field for responsive column widths
 */
const widthSpanField = (name: string, label: string, defaultValue?: string): Field => ({
  name,
  type: 'select',
  label,
  defaultValue,
  admin: {
    width: '33%',
  },
  options: [{ label: '—', value: '' }, ...widthSpanOptions],
})

/**
 * Width breakpoint fields for column settings
 */
const columnWidthFields: Field[] = [
  {
    type: 'row',
    fields: [
      widthSpanField('base', 'Base', '12'),
      widthSpanField('xs', 'XS'),
      widthSpanField('sm', 'SM'),
    ],
  },
  {
    type: 'row',
    fields: [widthSpanField('md', 'MD'), widthSpanField('lg', 'LG'), widthSpanField('xl', 'XL')],
  },
]

/**
 * Core columns fields (shared between full and inline versions)
 */
const columnsFields: Field[] = [
  {
    name: 'columns',
    type: 'array',
    label: 'Columns',
    labels: {
      singular: 'Column',
      plural: 'Columns',
    },
    interfaceName: 'ColumnItemType',
    minRows: 2,
    maxRows: 6,
    admin: {
      initCollapsed: false,
      components: {
        RowLabel: customRowLabel({
          fieldToUse: 'Column {{String(index + 1).padStart(2, "0")}}',
          template: true,
        }),
      },
    },
    fields: [
      {
        type: 'tabs',
        tabs: [
          // Content tab
          {
            label: getTranslation('general:content'),
            fields: [
              {
                name: 'blocks',
                type: 'blocks',
                label: false,
                blocks: [],
                blockReferences: getBlockSlugsFor(contentBlockRegistry, 'layout') as BlockSlug[],
              },
            ],
          },
          {
            name: 'settings',
            label: getTranslation('general:settings'),
            interfaceName: 'ColumnSettingsType',
            admin: {
              condition: (_data, _siblingData, parent) =>
                parent.blockData.settings?.advancedColumnSettings === true,
            },
            fields: [
              {
                name: 'alignSelf',
                type: 'select',
                label: 'Align Self',
                defaultValue: 'auto',
                options: [
                  { label: 'Auto', value: 'auto' },
                  { label: 'Start', value: 'start' },
                  { label: 'Center', value: 'center' },
                  { label: 'End', value: 'end' },
                  { label: 'Stretch', value: 'stretch' },
                ],
              },
              {
                name: 'width',
                type: 'group',
                label: 'Column Widths',
                interfaceName: 'ColumnWidthType',
                admin: {
                  hideGutter: true,
                },
                fields: columnWidthFields,
              },
            ],
          },
        ],
      },
    ],
  },
]

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlockType',
  admin: {
    group: adminBlockGroups.layout,
  },
  fields: blockTabs({
    prefix: true,
    suffix: true,
    fields: {
      general: columnsFields,
      design: (defaults) => [
        ...defaults,
        {
          type: 'row',
          fields: [
            selectSize({
              overrides: {
                name: 'gap',
                label: 'Gap',
                defaultValue: 'md',
                admin: {
                  width: '50%',
                },
              },
            }),
            {
              name: 'verticalAlignment',
              type: 'select',
              label: 'Vertical Alignment',
              admin: {
                width: '50%',
              },
              options: [
                { label: 'Start', value: 'start' },
                { label: 'Center', value: 'center' },
                { label: 'End', value: 'end' },
                { label: 'Stretch', value: 'stretch' },
              ],
            },
          ],
        },
        {
          name: 'advancedColumnSettings',
          type: 'checkbox',
          label: 'Advanced Column Settings',
          defaultValue: false,
        },
        {
          name: 'alignSelf',
          type: 'select',
          label: 'Align Self',
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.advancedColumnSettings === true,
          },
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Start', value: 'start' },
            { label: 'Center', value: 'center' },
            { label: 'End', value: 'end' },
            { label: 'Stretch', value: 'stretch' },
          ],
        },
        {
          name: 'width',
          type: 'group',
          label: 'Column Widths',
          interfaceName: 'ColumnWidthType',
          admin: {
            hideGutter: true,
          },
          fields: columnWidthFields,
        },
      ],
    },
  }),
}
