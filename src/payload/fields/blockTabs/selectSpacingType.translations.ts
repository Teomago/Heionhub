import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    fields: {
      padding: 'Padding',
      margin: 'Margin',
      spacingType: 'Spacing Type',
    },
  },
  de: {
    fields: {
      padding: 'Abstand innen',
      margin: 'Abstand außen',
      spacingType: 'Abstandsart',
    },
  },
})
