import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    footer: {
      label: 'Footer',
      navigation: 'Navigation',
      contact: 'Contact & Social',
      socialLinks: 'Social Links',
      platform: 'Platform',
      url: 'URL',
      legal: 'Legal',
      legalName: 'Legal Name',
      copyright: 'Copyright',
      copyrightDescription: 'e.g. © 2026 Company Name. All rights reserved.',
    },
  },
  de: {
    footer: {
      label: 'Fußzeile',
      navigation: 'Navigation',
      contact: 'Kontakt & Social',
      socialLinks: 'Soziale Links',
      platform: 'Plattform',
      url: 'URL',
      legal: 'Rechtliches',
      legalName: 'Firmenname (rechtlich)',
      copyright: 'Urheberrecht',
      copyrightDescription: 'z.B. © 2026 Firmenname. Alle Rechte vorbehalten.',
    },
  },
})
