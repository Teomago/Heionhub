import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

const isAdminUser = ({ req }: { req: any }) => req.user?.collection === 'users'

export const InvitationCodes: CollectionConfig = {
  slug: 'invitation-codes',
  access: {
    create: isAdminUser,
    read: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  admin: {
    useAsTitle: 'code',
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Used',
          value: 'used',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          // Generate 14 random chars/numbers, all uppercase
          const code = crypto.randomBytes(14).toString('hex').slice(0, 14).toUpperCase()

          if (data) {
            data.code = code
          }
        }
        return data
      },
    ],
  },
}
