import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true, // Ensure the frontend can read the settings
  },
  fields: [
    {
      name: 'loginCoverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Cover image displayed on the left side of the login page. Recommended: portrait or square, min 1200px tall.',
      },
    },
    {
      name: 'enableMultiLanguage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable bilingual routing and the frontend Language Switcher.',
      },
      required: true,
    },
    {
      name: 'defaultLanguage',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
      ],
      defaultValue: 'en',
      required: true,
      admin: {
        description: 'The default language for new visitors.',
      },
    },
    {
      name: 'supportedLanguages',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
      ],
      defaultValue: ['en', 'es'],
      required: true,
      admin: {
        description: 'The languages currently active on the site.',
      },
    },
  ],
}
