import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      icon: {
        singular: 'Icon',
        plural: 'Icons',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
      },
    },
    fields: { size: 'Size' },
  },
  de: {
    blocks: {
      icon: {
        singular: 'Symbol',
        plural: 'Symbole',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
      },
    },
    fields: { size: 'Größe' },
  },
})
