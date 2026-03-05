import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    pages: {
      isHome: 'Home Page',
      isHomeDescription:
        'Set this page as the home page (/). Only one page can be the home page at a time.',
    },
  },
  de: {
    pages: {
      isHome: 'Startseite',
      isHomeDescription:
        'Diese Seite als Startseite (/) festlegen. Nur eine Seite kann gleichzeitig die Startseite sein.',
    },
  },
})
