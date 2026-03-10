import type { CollectionConfig } from 'payload'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { formatConcatenatedFields } from '@/payload/hooks/formatConcatenatedFields'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { ensureRolesPopulated } from './hooks/ensureRolesPopulated'
import { access } from '@/payload/utils/access'
import { setDefaultUserRole } from './utils'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: getTranslation('users:singular'),
    plural: getTranslation('users:plural'),
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600000,
  },
  admin: {
    useAsTitle: 'name',
    group: adminMenuGroups.settings,
    listSearchableFields: ['firstName', 'lastName', 'email'],
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
  },
  hooks: {
    afterLogin: [ensureRolesPopulated],
  },
  forceSelect: {
    firstName: true,
    lastName: true,
  },
  access: {
    read: access.owner('id'),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: getTranslation('general:firstName'),
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'lastName',
          label: getTranslation('general:lastName'),
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'name',
      label: getTranslation('general:name'),
      type: 'text',
      virtual: true,
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [formatConcatenatedFields(['firstName', 'lastName'])],
      },
    },
    {
      name: 'roles',
      label: getTranslation('users:roles'),
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: setDefaultUserRole,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
        afterRead: [
          ({ value }) => {
            // Ensure roles is never empty for the admin UI
            if (!value || (Array.isArray(value) && value.length === 0)) {
              return ['admin']
            }
            return value
          },
        ],
      },
      options: [
        {
          label: getTranslation('users:admin'),
          value: 'admin',
        },
        {
          label: getTranslation('users:editor'),
          value: 'editor',
        },
        {
          label: getTranslation('users:user'),
          value: 'user',
        },
      ],
    },
  ],
}
