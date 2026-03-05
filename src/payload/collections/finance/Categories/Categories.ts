import type { CollectionConfig } from 'payload'

import { access } from '@/payload/utils/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Finance',
    defaultColumns: ['name', 'type', 'icon', 'color'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      // If user is from 'users' collection (admin), allow reading all categories
      if (user.collection === 'users') {
        return true
      }
      return {
        or: [
          {
            owner: {
              equals: user.id,
            },
          },
          {
            isDefault: {
              equals: true,
            },
          },
        ],
      } as any
    },
    create: ({ req: { user } }) => !!user,
    // Only owner can update/delete. Default categories are protected by check.
    // Actually, if I am owner of default category (admin), I can update.
    // Regular users shouldn't update default categories.
    // Regular users shouldn't update default categories.
    update: access.owner('owner').adminLock(),
    delete: access.owner('owner').adminLock(),
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
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
        { label: 'Transfer', value: 'transfer' }, // Transfer category? usually transfers don't have categories, or "Transfer" is the category.
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g. "shopping-cart")',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Color hex code or Tailwind class',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ user }) => user?.email === 'admin@teomagoinc.co' || false, // Hide from normal users? Or just read only?
        // For now, simple hidden or read only via access control (field level)
      },
      access: {
        create: ({ req: { user } }) => user?.collection === 'users', // Only admins (users collection) can set default
        update: ({ req: { user } }) => user?.collection === 'users',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'members',
      // owner is required for user-created categories.
      // For default categories, owner might be null or admin?
      // Let's make it optional.
      required: false,
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            // If creating and no owner provided, and user is customer, set to customer.
            // If admin creating default, owner might be null.
            if (!value && req.user && req.user.collection === 'members') {
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
