import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    pages: {
      singular: 'Page',
      plural: 'Pages',
      title: 'Title',
      pathname: 'Pathname',
      content: 'Content',
      blocks: 'Blocks',
      block: 'Block',
      settings: 'Settings',
      developer: 'Developer',
      beforeList: 'Before List',
      afterList: 'After List',
      typeStandard: 'Standard',
      typeDynamic: 'Dynamic',
      filterByTags: 'Filter by Tags',
      filterByTagsDescription: 'Only show articles with these tags. Leave empty to show all.',
    },
    seo: {
      title: 'SEO',
    },
  },
  de: {
    pages: {
      singular: 'Seite',
      plural: 'Seiten',
      title: 'Titel',
      pathname: 'Pfadname',
      content: 'Inhalt',
      blocks: 'Blöcke',
      block: 'Block',
      settings: 'Einstellungen',
      developer: 'Developer',
      beforeList: 'Vor der Liste',
      afterList: 'Nach der Liste',
      typeStandard: 'Standard',
      typeDynamic: 'Dynamisch',
      filterByTags: 'Nach Tags filtern',
      filterByTagsDescription:
        'Nur Artikel mit diesen Tags anzeigen. Leer lassen, um alle anzuzeigen.',
    },
    seo: {
      title: 'SEO',
    },
  },
})
