import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    responsive: {
      base: 'Base',
      inherit: 'Inherit',
      responsiveValues: 'Responsive values',
    },
    fields: {
      fullWidth: 'Full Width',
    },
  },
  de: {
    responsive: {
      base: 'Basis',
      inherit: 'Vererben',
      responsiveValues: 'Responsive Werte',
    },
    fields: {
      fullWidth: 'Volle Breite',
    },
  },
})
