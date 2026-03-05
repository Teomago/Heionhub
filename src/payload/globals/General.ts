import type { GlobalConfig } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { access } from '@/payload/utils/access'
import { GOOGLE_FONT_OPTIONS } from '@/payload/constants/googleFonts'

export const General: GlobalConfig = {
  slug: 'general-settings',
  label: getTranslation('general:general'),
  typescript: {
    interface: 'GeneralSettings',
  },
  admin: {
    group: adminMenuGroups.settings,
  },
  access: {
    read: access.public(),
    update: access(),
  },

  fields: [
    {
      name: 'typography',
      label: getTranslation('settings:typography'),
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'headingFont',
              label: getTranslation('settings:headingFont'),
              type: 'select',
              defaultValue: 'Inter',
              options: GOOGLE_FONT_OPTIONS,
              admin: {
                width: '50%',
                description: getTranslation('settings:headingFontDescription'),
              },
            },
            {
              name: 'bodyFont',
              label: getTranslation('settings:bodyFont'),
              type: 'select',
              defaultValue: 'Inter',
              options: GOOGLE_FONT_OPTIONS,
              admin: {
                width: '50%',
                description: getTranslation('settings:bodyFontDescription'),
              },
            },
          ],
        },
      ],
    },
  ],
}
