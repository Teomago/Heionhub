import type { GlobalConfig } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { access } from '@/payload/utils/access'

export const SEO: GlobalConfig = {
  slug: 'seo-settings',
  label: getTranslation('seo:title'),
  typescript: {
    interface: 'SEOSettings',
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
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      admin: {
        description: 'The name of your website',
      },
    },
    {
      name: 'tagline',
      label: 'Site Tagline',
      type: 'text',
      admin: {
        description: 'A short description of your website',
      },
    },

  ],
}
