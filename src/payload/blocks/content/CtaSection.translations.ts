import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      ctaSection: {
        label: 'CTA Section',
        heading: 'Heading',
        body: 'Body',
        links: 'Call to Action',
        background: 'Background',
        bgDefault: 'Default',
        bgMuted: 'Muted',
        bgPrimary: 'Primary',
        alignment: 'Alignment',
        left: 'Left',
        center: 'Center',
      },
    },
  },
  de: {
    blocks: {
      ctaSection: {
        label: 'CTA-Bereich',
        heading: 'Überschrift',
        body: 'Inhalt',
        links: 'Handlungsaufforderung',
        background: 'Hintergrund',
        bgDefault: 'Standard',
        bgMuted: 'Gedämpft',
        bgPrimary: 'Primär',
        alignment: 'Ausrichtung',
        left: 'Links',
        center: 'Mitte',
      },
    },
  },
})
