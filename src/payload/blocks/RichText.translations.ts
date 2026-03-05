import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      richText: {
        singular: 'Rich Text Block',
        plural: 'Rich Text Blocks',
        content: 'Content',
      },
    },
  },
  de: {
    blocks: {
      richText: {
        singular: 'Rich-Text-Block',
        plural: 'Rich-Text-Blöcke',
        content: 'Inhalt',
      },
    },
  },
})
