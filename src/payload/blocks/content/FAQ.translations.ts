import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      faq: {
        label: 'FAQ',
        heading: 'Heading',
        subheading: 'Subheading',
        items: 'Questions',
        question: 'Question',
        answer: 'Answer',
        allowMultiple: 'Allow Multiple Open',
      },
    },
  },
  de: {
    blocks: {
      faq: {
        label: 'FAQ',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        items: 'Fragen',
        question: 'Frage',
        answer: 'Antwort',
        allowMultiple: 'Mehrere gleichzeitig öffnen',
      },
    },
  },
})
