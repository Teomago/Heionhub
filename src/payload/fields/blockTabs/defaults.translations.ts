import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    fields: {
      spacing: 'Spacing',
      idDescription:
        'Unique ID field, applied to the HTML component wrapping this block. Useful for links to be able to navigate to this particular block on a page.',
      withPrefix: 'With Prefix',
      withSuffix: 'With Suffix',
    },
  },
  de: {
    fields: {
      spacing: 'Abstand',
      idDescription:
        'Eindeutiges ID-Feld, das auf die HTML-Komponente angewendet wird, die diesen Block umgibt. Nützlich für Links, um zu diesem bestimmten Block auf einer Seite navigieren zu können.',
      withPrefix: 'Mit Präfix',
      withSuffix: 'Mit Suffix',
    },
  },
})
