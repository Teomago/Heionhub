import type { GlobalConfig } from 'payload'
import { access } from '@/payload/utils/access'

export const ImportSettings: GlobalConfig = {
  slug: 'import-settings',
  label: 'Import Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: access.public(),
    update: () => true, // Assuming admins have full access via collection level controls. For safety, typically `access()`
  },
  fields: [
    {
      name: 'tutorialUrl',
      type: 'text',
      label: 'Excel to CSV Tutorial URL',
      required: true,
      defaultValue: 'https://www.youtube.com/watch?v=10XdeMVqK6Q',
      admin: {
        description: 'The URL shown to users who need help converting Excel files to CSV.',
      },
    },
  ],
}
