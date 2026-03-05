import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    header: {
      label: 'Header',
      navLinks: 'Navigation Links',
      navLinksDescription: 'Links displayed on the left side of the header',
      logo: 'Logo',
      logoType: 'Logo Type',
      logoNone: 'None',
      logoImage: 'Image',
      logoText: 'Text',
      cta: 'Call to Action',
      ctaEnabled: 'Show CTA Button',
    },
  },
  de: {
    header: {
      label: 'Kopfzeile',
      navLinks: 'Navigationslinks',
      navLinksDescription: 'Links auf der linken Seite der Kopfzeile',
      logo: 'Logo',
      logoType: 'Logo-Typ',
      logoNone: 'Keins',
      logoImage: 'Bild',
      logoText: 'Text',
      cta: 'Handlungsaufforderung',
      ctaEnabled: 'CTA-Button anzeigen',
    },
  },
})
