import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      features: {
        label: 'Features',
        heading: 'Heading',
        subheading: 'Subheading',
        items: 'Features',
        icon: 'Icon',
        itemTitle: 'Title',
        itemDescription: 'Description',
        layout: 'Layout',
        grid: 'Grid',
        list: 'List',
        columns: 'Columns',
      },
    },
  },
  de: {
    blocks: {
      features: {
        label: 'Features',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        items: 'Features',
        icon: 'Symbol',
        itemTitle: 'Titel',
        itemDescription: 'Beschreibung',
        layout: 'Layout',
        grid: 'Raster',
        list: 'Liste',
        columns: 'Spalten',
      },
    },
  },
})
