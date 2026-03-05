import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { textEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const TeamBlock = createBlock({
  slug: 'team',
  interfaceName: 'TeamBlockType',
  labels: {
    singular: getTranslation('blocks:team:label'),
    plural: getTranslation('blocks:team:label'),
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
          label: getTranslation('blocks:team:heading'),
        },
        {
          name: 'subheading',
          type: 'text',
          label: getTranslation('blocks:team:subheading'),
        },
        {
          name: 'members',
          type: 'array',
          label: getTranslation('blocks:team:members'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'name',
                fallbackLabel: 'Member {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: getTranslation('blocks:team:name'),
            },
            {
              name: 'role',
              type: 'text',
              label: getTranslation('blocks:team:role'),
            },
            {
              name: 'bio',
              type: 'richText',
              label: getTranslation('blocks:team:bio'),
              editor: textEditor({
                formatting: ['bold', 'italic'],
                links: true,
                headings: false,
                align: false,
              }),
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: getTranslation('blocks:team:photo'),
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: getTranslation('blocks:team:socialLinks'),
              maxRows: 5,
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  label: getTranslation('blocks:team:socialPlatform'),
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'X / Twitter', value: 'twitter' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Website', value: 'website' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: getTranslation('blocks:team:socialUrl'),
                },
              ],
            },
          ],
        },
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'columns',
          type: 'select',
          label: getTranslation('blocks:team:columns'),
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
