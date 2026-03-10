import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: access.public(),
    delete: access.owner('id'),
    read: access.owner('id'),
    update: access.owner('id'),
  },
  admin: {
    defaultColumns: ['firstName', 'email'],
    useAsTitle: 'email',
    group: 'Finance',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600000,
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
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'USD',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'COP', value: 'COP' },
      ],
      required: true,
    },
    {
      name: 'hasCompletedTour',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the user has completed the intro tour on the dashboard.',
      },
    },
    {
      name: 'hasCompletedImportTour',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether the user has completed the import tutorial on the import page.',
      },
    },
  ],
  labels: {
    plural: 'Members',
    singular: 'Member',
  },
}
