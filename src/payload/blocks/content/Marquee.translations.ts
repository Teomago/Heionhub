import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      marquee: {
        label: 'Marquee',
        items: 'Items',
        itemType: 'Type',
        typeText: 'Text',
        typeImage: 'Image',
        text: 'Text',
        image: 'Image',
        speed: 'Speed',
        slow: 'Slow',
        normal: 'Normal',
        fast: 'Fast',
        direction: 'Direction',
        ltr: 'Left to Right',
        rtl: 'Right to Left',
        pauseOnHover: 'Pause on Hover',
      },
    },
  },
  de: {
    blocks: {
      marquee: {
        label: 'Laufband',
        items: 'Elemente',
        itemType: 'Typ',
        typeText: 'Text',
        typeImage: 'Bild',
        text: 'Text',
        image: 'Bild',
        speed: 'Geschwindigkeit',
        slow: 'Langsam',
        normal: 'Normal',
        fast: 'Schnell',
        direction: 'Richtung',
        ltr: 'Links nach Rechts',
        rtl: 'Rechts nach Links',
        pauseOnHover: 'Bei Hover pausieren',
      },
    },
  },
})
