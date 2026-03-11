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
