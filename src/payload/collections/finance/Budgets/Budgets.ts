import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'

export const Budgets: CollectionConfig = {
  slug: 'budgets',
  admin: {
    useAsTitle: 'title',
    group: 'Finance',
    defaultColumns: ['title', 'month', 'amount'],
  },
  access: {
    create: ({ req: { user } }) => !!user,
    delete: access.owner('owner').adminLock(),
    read: access.owner('owner').adminLock(),
    update: access.owner('owner').adminLock(),
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.category && data.month) {
          try {
            const category = await req.payload.findByID({
              collection: 'categories',
              id: data.category,
            })
            if (category) {
              const namePart = data.name ? ` (${data.name})` : ''
              data.title = `${category.name}${namePart} - ${data.month}`
            }
          } catch (e) {
            // ignore
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Budget Name (Optional)',
      admin: {
        description: 'e.g. "Main Groceries" or "Holiday Fund"',
      },
    },
    {
      name: 'month',
      type: 'text',
      required: true,
      defaultValue: () => new Date().toISOString().slice(0, 7), // YYYY-MM
      admin: {
        description: 'YYYY-MM format',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      label: 'Budget Limit (Cents)',
    },
    {
      name: 'locked',
      type: 'checkbox',
      defaultValue: false,
      label: 'Locked (Prevent Spending)',
    },
    {
      name: 'recurrenceGroupId',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'ID to group recurring budgets together',
      },
    },
    {
      name: 'recurrenceType',
      type: 'select',
      options: [
        { label: 'Monthly (One-time)', value: 'monthly' },
        { label: 'Fixed Duration', value: 'fixed' },
        { label: 'Indefinite', value: 'indefinite' },
      ],
      defaultValue: 'monthly',
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
  custom: {
    figma: {
      enabled: false,
    },
  },
}
