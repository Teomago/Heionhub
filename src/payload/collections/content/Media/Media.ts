import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import type { CollectionConfig } from 'payload'
import { validateAlt } from './validations/validateAlt'
import { access } from '@/payload/utils/access'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { addCredits } from '@/payload/i18n/placeholders/media'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: getTranslation('media:singular'),
    plural: getTranslation('media:plural'),
  },
  folders: true,
  upload: {
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 900,
      },
      {
        name: 'medium',
        width: 1400,
      },
      {
        name: 'large',
        width: 1920,
      },
      {
        name: 'xlarge',
        width: 2560,
      },
    ],
  },
  admin: {
    group: adminMenuGroups.content,
    defaultColumns: ['filename', 'updatedAt'],
  },
  access: {
    read: access({ type: 'public' }),
    create: access().roles('editor', 'user'),
    update: access().roles('editor', 'user'),
    delete: access(),
  },
  fields: [
    {
      name: 'alt',
      label: getTranslation('media:alt'),
      type: 'text',
      validate: validateAlt,
      localized: true,
    },
    {
      name: 'caption',
      label: getTranslation('media:caption'),
      type: 'textarea',
      localized: true,
    },
    {
      name: 'credit',
      label: getTranslation('media:credit'),
      type: 'text',
      localized: true,
      hasMany: true,
      admin: {
        placeholder: addCredits,
      },
    },
  ],
}
