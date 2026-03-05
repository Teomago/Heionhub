import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { defaultEditor } from '@/payload/lexical'
import { linkGroup } from '@/payload/fields/link/linkGroup'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const CtaSectionBlock = createBlock({
  slug: 'ctaSection',
  interfaceName: 'CtaSectionBlockType',
  labels: {
    singular: getTranslation('blocks:ctaSection:label'),
    plural: getTranslation('blocks:ctaSection:label'),
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
          required: true,
          label: getTranslation('blocks:ctaSection:heading'),
        },
        {
          name: 'body',
          type: 'richText',
          label: getTranslation('blocks:ctaSection:body'),
          editor: defaultEditor(),
        },
        linkGroup({
          appearances: ['default', 'secondary', 'outline', 'ghost'],
          overrides: {
            label: getTranslation('blocks:ctaSection:links'),
            maxRows: 3,
          },
        }),
      ],
      design: (defaults) => [
        ...defaults,
        {
          name: 'background',
          type: 'select',
          label: getTranslation('blocks:ctaSection:background'),
          defaultValue: 'default',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:ctaSection:bgDefault'), value: 'default' },
            { label: getTranslation('blocks:ctaSection:bgMuted'), value: 'muted' },
            { label: getTranslation('blocks:ctaSection:bgPrimary'), value: 'primary' },
          ],
        },
        {
          name: 'alignment',
          type: 'select',
          label: getTranslation('blocks:ctaSection:alignment'),
          defaultValue: 'center',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('blocks:ctaSection:left'), value: 'left' },
            { label: getTranslation('blocks:ctaSection:center'), value: 'center' },
          ],
        },
      ],
    },
  },
})
