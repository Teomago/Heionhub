import { CollectionConfig } from 'payload'

export const FinancialRecords: CollectionConfig = {
  slug: 'financial-records',
  admin: {
    useAsTitle: 'category',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
        { label: 'Saving', value: 'saving' },
      ],
      admin: {
        description: 'Categorizes the record to calculate balances.',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'The financial value of the record.',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: {
        description: 'Organization tag (e.g., "Salary", "Food").',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date of the transaction.',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional context or notes.',
      },
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
      index: true,
      admin: {
        description: 'Links record to the logged-in user.',
      },
    },
    {
      name: 'isFromBalance',
      type: 'checkbox',
      label: 'Deduct from Balance / Add to Balance?',
      defaultValue: true,
      admin: {
        description:
          'For Income: Adds to Wallet. For Expense: Deducts from Wallet. For Savings: If checked, moves money from Wallet to Savings (Net Balance decreases). If unchecked, adds to Savings from external source (Net Balance unaffected).',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filterOptions: ({ user }: any) => {
        if (!user) return true
        // Allow system tags (no member) OR tags owned by this user
        return {
          or: [{ member: { equals: user.id } }, { member: { exists: false } }],
        }
      },
      admin: {
        description: 'Categorize this record.',
      },
    },
  ],
}
