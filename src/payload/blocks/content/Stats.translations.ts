import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      stats: {
        label: 'Stats',
        heading: 'Heading',
        subheading: 'Subheading',
        items: 'Statistics',
        value: 'Value',
        itemLabel: 'Label',
        prefix: 'Prefix',
        suffix: 'Suffix',
        layout: 'Layout',
        grid: 'Grid',
        inline: 'Inline',
        columns: 'Columns',
      },
    },
  },
  de: {
    blocks: {
      stats: {
        label: 'Statistik',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        items: 'Statistiken',
        value: 'Wert',
        itemLabel: 'Bezeichnung',
        prefix: 'Präfix',
        suffix: 'Suffix',
        layout: 'Layout',
        grid: 'Raster',
        inline: 'Inline',
        columns: 'Spalten',
      },
    },
  },
})
