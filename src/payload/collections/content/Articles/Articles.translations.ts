import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    articles: {
      singular: 'Article',
      plural: 'Articles',
      tabGeneral: 'General',
      title: 'Title',
      content: 'Content',
      authors: 'Authors',
      tags: 'Tags',
      excerpt: 'Excerpt',
      featuredImage: 'Featured Image',
    },
    seo: {
      title: 'SEO',
    },
  },
  de: {
    articles: {
      singular: 'Artikel',
      plural: 'Artikel',
      tabGeneral: 'Allgemein',
      title: 'Titel',
      content: 'Inhalt',
      authors: 'Autoren',
      tags: 'Tags',
      excerpt: 'Auszug',
      featuredImage: 'Beitragsbild',
    },
    seo: {
      title: 'SEO',
    },
  },
})
