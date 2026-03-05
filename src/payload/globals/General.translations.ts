import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    settings: {
      globalLabel: 'General',
      typography: 'Typography',
      headingFont: 'Heading Font',
      headingFontDescription: 'Google Font used for headings (h1–h6)',
      bodyFont: 'Body Font',
      bodyFontDescription: 'Google Font used for body text',
    },
  },
  de: {
    settings: {
      globalLabel: 'Allgemein',
      typography: 'Typografie',
      headingFont: 'Überschrift-Schriftart',
      headingFontDescription: 'Google-Schriftart für Überschriften (h1–h6)',
      bodyFont: 'Fließtext-Schriftart',
      bodyFontDescription: 'Google-Schriftart für Fließtext',
    },
  },
})
