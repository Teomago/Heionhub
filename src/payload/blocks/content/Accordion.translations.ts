import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    accordion: {
      items: 'Items',
      accordionType: 'Accordion Type',
      single: 'Single',
      multiple: 'Multiple',
      width: 'Width',
      widthDescription: 'Maximum width constraint for the accordion',
      fullWidth: 'Full Width',
      left: 'Left',
      center: 'Center',
      right: 'Right',
    },
  },
  de: {
    accordion: {
      items: 'Einträge',
      accordionType: 'Akkordeon-Typ',
      single: 'Einzeln',
      multiple: 'Mehrere',
      width: 'Breite',
      widthDescription: 'Maximale Breitenbeschränkung für das Akkordeon',
      fullWidth: 'Volle Breite',
      left: 'Links',
      center: 'Mitte',
      right: 'Rechts',
    },
  },
})
