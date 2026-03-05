import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      logoCloud: {
        label: 'Logo Cloud',
        heading: 'Heading',
        subheading: 'Subheading',
        logos: 'Logos',
        logoName: 'Name',
        logoImage: 'Logo Image',
        logoUrl: 'Link URL',
        layout: 'Layout',
        grid: 'Grid',
        marquee: 'Marquee',
        columns: 'Columns',
      },
    },
  },
  de: {
    blocks: {
      logoCloud: {
        label: 'Logo-Leiste',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        logos: 'Logos',
        logoName: 'Name',
        logoImage: 'Logo-Bild',
        logoUrl: 'Link-URL',
        layout: 'Layout',
        grid: 'Raster',
        marquee: 'Laufband',
        columns: 'Spalten',
      },
    },
  },
})
