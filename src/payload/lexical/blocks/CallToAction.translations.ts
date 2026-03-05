import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      callToAction: {
        singular: 'Call to Action',
        plural: 'Call to Actions',
        marginTop: 'Margin Top',
        marginBottom: 'Margin Bottom',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
      },
    },
    fields: { align: 'Align' },
  },
  de: {
    blocks: {
      callToAction: {
        singular: 'Call-to-Action',
        plural: 'Call-to-Actions',
        marginTop: 'Abstand oben',
        marginBottom: 'Abstand unten',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
      },
    },
    fields: { align: 'Ausrichten' },
  },
})
