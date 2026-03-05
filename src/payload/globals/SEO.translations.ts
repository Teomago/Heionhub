import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    seo: {
      title: 'SEO',
      siteName: 'Site Name',
      siteNameDescription: 'The name of your website',
      tagline: 'Site Tagline',
      taglineDescription: 'A short description of your website',
      defaultMeta: 'Default Meta',
      defaultMetaDescription: 'Default meta tags for pages without specific SEO settings',
    },
  },
  de: {
    seo: {
      title: 'SEO',
      siteName: 'Seitenname',
      siteNameDescription: 'Der Name Ihrer Website',
      tagline: 'Slogan',
      taglineDescription: 'Eine kurze Beschreibung Ihrer Website',
      defaultMeta: 'Standard-Meta',
      defaultMetaDescription: 'Standard-Metadaten für Seiten ohne eigene SEO-Einstellungen',
    },
  },
})
