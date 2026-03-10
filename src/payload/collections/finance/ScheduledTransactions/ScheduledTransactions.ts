import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'

export const ScheduledTransactions: CollectionConfig = {
  slug: 'scheduled-transactions',
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: access.owner('owner').adminLock(),
    update: access.owner('owner').adminLock(),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    defaultColumns: ['name', 'amount', 'frequency', 'nextDueDate'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Subscription amount in cents',
      },
    },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      options: [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
      ],
      defaultValue: 'monthly',
    },
    {
      name: 'nextDueDate',
      type: 'date',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
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
        condition: () => false,
      },
    },
  ],
}
