import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: access.owner('owner'),
    update: access.owner('owner').adminLock(),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    defaultColumns: ['name', 'type', 'balance', 'currency'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Checking', value: 'checking' },
        { label: 'Savings', value: 'savings' },
        { label: 'Credit Card', value: 'credit' },
        { label: 'Cash', value: 'cash' },
        { label: 'Investment', value: 'investment' },
      ],
    },
    {
      name: 'balance',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Current balance in cents',
      },
    },
    {
      name: 'creditLimit',
      type: 'number',
      required: false,
      admin: {
        description: 'Credit limit in cents (for Credit Cards)',
      },
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
      name: 'color',
      type: 'text',
      required: false,
      admin: {
        description: 'Account color (hex)',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            if (!value && req.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
      admin: {
        condition: () => false, // Hide from admin UI if needed, or make read-only
      },
    },
  ],
}
