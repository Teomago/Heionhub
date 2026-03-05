import { createBlock } from '@/payload/blocks/blockFactory'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'

export const ArticleListingBlock = createBlock({
  slug: 'articleListing',
  interfaceName: 'ArticleListingBlockType',
  labels: {
    singular: getTranslation('articleListing:singular'),
    plural: getTranslation('articleListing:plural'),
  },
  admin: {
    group: adminBlockGroups.content,
  },
  availableIn: ['root'],
  tabs: {
    fields: {
      general: [
        {
          name: 'tags',
          label: getTranslation('articleListing:tags'),
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          admin: {
            description: getTranslation('articleListing:tagsDescription'),
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'limit',
              label: getTranslation('articleListing:limit'),
              type: 'number',
              defaultValue: 12,
              min: 1,
              max: 100,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'columns',
              label: getTranslation('articleListing:columns'),
              type: 'select',
              defaultValue: '3',
              admin: {
                width: '33%',
                isClearable: false,
              },
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ],
            },
            {
              name: 'sort',
              label: getTranslation('articleListing:sort'),
              type: 'select',
              defaultValue: '-publishedDate',
              admin: {
                width: '33%',
                isClearable: false,
              },
              options: [
                { label: getTranslation('articleListing:sortNewest'), value: '-publishedDate' },
                { label: getTranslation('articleListing:sortOldest'), value: 'publishedDate' },
                { label: getTranslation('articleListing:sortTitleAZ'), value: 'title' },
                { label: getTranslation('articleListing:sortTitleZA'), value: '-title' },
              ],
            },
          ],
        },
        {
          name: 'showPagination',
          label: getTranslation('articleListing:showPagination'),
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  },
})
