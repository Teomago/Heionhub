import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      banner: {
        label: 'Banner',
        content: 'Content',
        type: 'Type',
        typeInfo: 'Info',
        typeWarning: 'Warning',
        typeSuccess: 'Success',
        dismissible: 'Dismissible',
      },
    },
  },
  de: {
    blocks: {
      banner: {
        label: 'Banner',
        content: 'Inhalt',
        type: 'Typ',
        typeInfo: 'Info',
        typeWarning: 'Warnung',
        typeSuccess: 'Erfolg',
        dismissible: 'Schließbar',
      },
    },
  },
})
