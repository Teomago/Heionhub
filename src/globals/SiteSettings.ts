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
              name: 'maxTagsPerMember',
              type: 'number',
              defaultValue: 30,
              admin: {
                description: 'Maximum number of custom tags a member can create.',
              },
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
