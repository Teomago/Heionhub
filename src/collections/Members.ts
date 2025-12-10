import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'secondName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'secondLastName',
      type: 'text',
    },
  ],
}
