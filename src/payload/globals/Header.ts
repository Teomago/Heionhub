import type { GlobalConfig } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { access } from '@/payload/utils/access'
import { link } from '@/payload/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: getTranslation('header:label'),
  typescript: { interface: 'HeaderSettings' },
  admin: { group: adminMenuGroups.settings },
  access: {
    read: access.public(),
    update: access(),
  },

  fields: [
    // --- Left: Navigation Links ---
    {
      name: 'navLinks',
      label: getTranslation('header:navLinks'),
      type: 'array',
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description: getTranslation('header:navLinksDescription'),
        components: {
          RowLabel: '@/payload/fields/link/ui/LinkRowLabel',
        },
      },
      fields: [link({ appearances: false, localizeLabels: true })],
    },
    // --- Center: Logo ---
    {
      name: 'logo',
      label: getTranslation('header:logo'),
      type: 'group',
      fields: [
        {
          name: 'type',
          label: getTranslation('header:logoType'),
          type: 'select',
          defaultValue: 'none',
          admin: { isClearable: false },
          options: [
            { label: getTranslation('header:logoNone'), value: 'none' },
            { label: getTranslation('header:logoImage'), value: 'image' },
            { label: getTranslation('header:logoText'), value: 'text' },
          ],
        },
        {
          name: 'image',
          label: getTranslation('header:logoImage'),
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'text',
          label: getTranslation('header:logoText'),
          type: 'text',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'text',
          },
        },
      ],
    },
    // --- Right: CTA Button (optional) ---
    {
      name: 'cta',
      label: getTranslation('header:cta'),
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: getTranslation('header:ctaEnabled'),
          type: 'checkbox',
          defaultValue: false,
        },
        link({
          appearances: false,
          localizeLabels: true,
          overrides: {
            admin: {
              condition: (data: Record<string, unknown>) => {
                const cta = data?.cta as Record<string, unknown> | undefined
                return cta?.enabled
              },
            },
          },
        }),
      ],
    },
  ],
}
