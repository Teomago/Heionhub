import { generatePreviewPath } from '@/lib/utils'
import { publishedDate } from '@/payload/fields/publishedDate'
import { slug } from '@/payload/fields/slug'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { access } from '@/payload/utils/access'
import type { CollectionConfig } from 'payload'
import { syncPathnameFromSettings } from '@/payload/hooks/syncPathnameFromSettings'
import { revalidatePageAfterChange, revalidatePageAfterDelete } from '../Pages/hooks/revalidatePage'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: getTranslation('articles:singular'),
    plural: getTranslation('articles:plural'),
  },
  admin: {
    useAsTitle: 'title',
    group: adminMenuGroups.content,
    defaultColumns: ['title', 'slug', 'createdAt', 'updatedAt'],
    enableRichTextLink: true,
    preview: (data) =>
      generatePreviewPath({
        pathname: `${data?.pathname}`,
      }),
  },
  trash: true,
  versions: { drafts: true },
  access: {
    create: access.roles('editor'),
    read: access.roles('editor'),
    update: access.roles('editor'),
    delete: access(),
  },
  hooks: {
    afterChange: [revalidatePageAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
  fields: [
    slug(),
    publishedDate(),
    {
      name: 'authors',
      label: getTranslation('articles:authors'),
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      defaultValue: ({ user }) => {
        return [user?.id]
      },
      admin: {
        position: 'sidebar',
        isSortable: true,
      },
    },
    {
      name: 'tags',
      label: getTranslation('articles:tags'),
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
        isSortable: true,
      },
    },
    {
      name: 'pathname',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [syncPathnameFromSettings({ collection: 'articles' })],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: getTranslation('articles:tabGeneral'),
          fields: [
            {
              name: 'title',
              label: getTranslation('general:title'),
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'excerpt',
              label: getTranslation('articles:excerpt'),
              type: 'textarea',
              localized: true,
              maxLength: 300,
            },
            {
              name: 'featuredImage',
              label: getTranslation('articles:featuredImage'),
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: getTranslation('general:content'),
          fields: [
            {
              name: 'content',
              label: getTranslation('general:content'),
              type: 'richText',
              localized: true,
            },
          ],
        },

      ],
    },
  ],
}
