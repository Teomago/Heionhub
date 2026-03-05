import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      twoColumn: {
        label: 'Two Column',
        heading: 'Heading',
        content: 'Content',
        media: 'Media',
        mediaPosition: 'Media Position',
        left: 'Left',
        right: 'Right',
        verticalAlignment: 'Vertical Alignment',
        top: 'Top',
        center: 'Center',
        bottom: 'Bottom',
      },
    },
  },
  de: {
    blocks: {
      twoColumn: {
        label: 'Zwei Spalten',
        heading: 'Überschrift',
        content: 'Inhalt',
        media: 'Medien',
        mediaPosition: 'Medienposition',
        left: 'Links',
        right: 'Rechts',
        verticalAlignment: 'Vertikale Ausrichtung',
        top: 'Oben',
        center: 'Mitte',
        bottom: 'Unten',
      },
    },
  },
})
