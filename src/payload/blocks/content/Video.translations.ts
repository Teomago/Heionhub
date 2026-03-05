import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      video: {
        label: 'Video',
        url: 'Video URL',
        urlDescription: 'YouTube or Vimeo URL',
        poster: 'Poster Image',
        aspectRatio: 'Aspect Ratio',
        ratio16x9: '16:9',
        ratio4x3: '4:3',
        ratio1x1: '1:1',
        heading: 'Heading',
      },
    },
  },
  de: {
    blocks: {
      video: {
        label: 'Video',
        url: 'Video-URL',
        urlDescription: 'YouTube- oder Vimeo-URL',
        poster: 'Vorschaubild',
        aspectRatio: 'Seitenverhältnis',
        ratio16x9: '16:9',
        ratio4x3: '4:3',
        ratio1x1: '1:1',
        heading: 'Überschrift',
      },
    },
  },
})
