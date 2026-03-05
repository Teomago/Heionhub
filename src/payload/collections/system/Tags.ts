import type { CollectionConfig } from 'payload'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { access } from '@/payload/utils/access'
import { slug } from '@/payload/fields/slug'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: getTranslation('tags:singular'),
    plural: getTranslation('tags:plural'),
  },
  admin: {
    useAsTitle: 'name',
    group: adminMenuGroups.system,
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    listSearchableFields: ['name', 'slug'],
  },
  trash: true,
  access: {
    create: access().roles('editor'),
    read: access.public(),
    update: access.roles('editor'),
    delete: access(),
  },
  fields: [
    slug('name'),
    {
      name: 'name',
      label: getTranslation('general:name'),
      type: 'text',
      localized: true,
      required: true,
      unique: true,
    },
  ],
}
