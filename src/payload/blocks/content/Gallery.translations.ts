import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      gallery: {
        label: 'Gallery',
        heading: 'Heading',
        subheading: 'Subheading',
        images: 'Images',
        caption: 'Caption',
        layout: 'Layout',
        grid: 'Grid',
        masonry: 'Masonry',
        columns: 'Columns',
        lightbox: 'Enable Lightbox',
      },
    },
  },
  de: {
    blocks: {
      gallery: {
        label: 'Galerie',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        images: 'Bilder',
        caption: 'Beschriftung',
        layout: 'Layout',
        grid: 'Raster',
        masonry: 'Mauerwerk',
        columns: 'Spalten',
        lightbox: 'Lightbox aktivieren',
      },
    },
  },
})
