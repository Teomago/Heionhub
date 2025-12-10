import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Site Title',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Site Description',
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Open Graph Image',
            },
          ],
        },
      ],
    },
  ],
}
