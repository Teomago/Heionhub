import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'
import { updateAccountBalance, afterDeleteTransaction } from './hooks/updateAccountBalance'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: access.owner('owner'), // Removed adminLock so super-admins can view
    update: access.owner('owner').adminLock(),
  },
  admin: {
    useAsTitle: 'description',
    group: 'Finance',
    defaultColumns: ['date', 'description', 'amount', 'type', 'account'],
  },
  fields: [
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Amount (Cents)',
      admin: {
        description: 'Transaction amount in cents',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
        { label: 'Transfer', value: 'transfer' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
    },
    {
      name: 'toAccount',
      type: 'relationship',
      relationTo: 'accounts',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'transfer',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
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
  hooks: {
    afterChange: [updateAccountBalance],
    afterDelete: [afterDeleteTransaction],
  },
}
