import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    articleListing: {
      singular: 'Article Listing',
      plural: 'Article Listings',
      tags: 'Filter by Tags',
      tagsDescription: 'Only show articles with these tags. Leave empty to show all.',
      limit: 'Limit',
      columns: 'Columns',
      sort: 'Sort',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortTitleAZ: 'Title A→Z',
      sortTitleZA: 'Title Z→A',
      showPagination: 'Show Pagination',
    },
  },
  de: {
    articleListing: {
      singular: 'Artikelauflistung',
      plural: 'Artikelauflistungen',
      tags: 'Nach Tags filtern',
      tagsDescription: 'Nur Artikel mit diesen Tags anzeigen. Leer lassen, um alle anzuzeigen.',
      limit: 'Limit',
      columns: 'Spalten',
      sort: 'Sortierung',
      sortNewest: 'Neueste zuerst',
      sortOldest: 'Älteste zuerst',
      sortTitleAZ: 'Titel A→Z',
      sortTitleZA: 'Titel Z→A',
      showPagination: 'Seitennavigation anzeigen',
    },
  },
})
