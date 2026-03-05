import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      spacer: {
        label: 'Spacer',
        height: 'Height',
        heightXs: 'Extra Small',
        heightSm: 'Small',
        heightMd: 'Medium',
        heightLg: 'Large',
        heightXl: 'Extra Large',
      },
    },
  },
  de: {
    blocks: {
      spacer: {
        label: 'Abstand',
        height: 'Höhe',
        heightXs: 'Sehr klein',
        heightSm: 'Klein',
        heightMd: 'Mittel',
        heightLg: 'Groß',
        heightXl: 'Sehr groß',
      },
    },
  },
})
