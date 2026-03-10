import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'
import { updateAccountBalance, afterDeleteTransaction } from './hooks/updateAccountBalance'
import { checkBudgetLimits } from './hooks/checkBudgetLimits'
import { updateBudgetSpend } from './hooks/updateBudgetSpend'
import { isActiveOwner } from '../access/isActiveOwner'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: isActiveOwner, // Read policy filters out soft deletes automatically
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
      name: 'budget',
      type: 'relationship',
      relationTo: 'budgets',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Deleted', value: 'deleted' },
      ],
      defaultValue: 'active',
      index: true,
      admin: {
        position: 'sidebar',
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
        condition: () => false,
      },
    },
  ],
  hooks: {
    beforeChange: [checkBudgetLimits],
    afterChange: [updateAccountBalance, updateBudgetSpend],
    afterDelete: [afterDeleteTransaction],
  },
}
