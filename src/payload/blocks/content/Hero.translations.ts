import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      hero: {
        label: 'Hero',
        heading: 'Heading',
        subheading: 'Subheading',
        body: 'Body',
        links: 'Call to Action',
        media: 'Media',
        layout: 'Layout',
        contentLeft: 'Content Left',
        contentRight: 'Content Right',
        contentCenter: 'Content Center',
        overlay: 'Overlay',
      },
    },
  },
  de: {
    blocks: {
      hero: {
        label: 'Hero',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        body: 'Inhalt',
        links: 'Handlungsaufforderung',
        media: 'Medien',
        layout: 'Layout',
        contentLeft: 'Inhalt Links',
        contentRight: 'Inhalt Rechts',
        contentCenter: 'Inhalt Zentriert',
        overlay: 'Überlagerung',
      },
    },
  },
})
