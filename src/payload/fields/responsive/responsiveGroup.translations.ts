import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    responsive: {
      type: 'Type',
      preset: 'Preset',
      custom: 'Custom',
      presetSizes: 'Preset Sizes',
      presetSizesDescription: 'Select predefined size values per breakpoint',
      customSizes: 'Custom Sizes',
      customSizesDescription: 'Enter custom pixel values per breakpoint',
      responsiveSizing: 'Responsive Sizing',
    },
  },
  de: {
    responsive: {
      type: 'Typ',
      preset: 'Voreinstellung',
      custom: 'Benutzerdefiniert',
      presetSizes: 'Voreingestellte Größen',
      presetSizesDescription: 'Vordefinierte Größenwerte pro Breakpoint wählen',
      customSizes: 'Benutzerdefinierte Größen',
      customSizesDescription: 'Benutzerdefinierte Pixelwerte pro Breakpoint eingeben',
      responsiveSizing: 'Responsive Größen',
    },
  },
})
