import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      pricing: {
        label: 'Pricing',
        heading: 'Heading',
        subheading: 'Subheading',
        plans: 'Plans',
        planName: 'Plan Name',
        price: 'Price',
        period: 'Period',
        periodMonthly: 'Monthly',
        periodYearly: 'Yearly',
        periodOneTime: 'One-time',
        features: 'Features',
        featureText: 'Feature',
        ctaLabel: 'Button Label',
        ctaLink: 'Button Link',
        highlighted: 'Highlighted',
        columns: 'Columns',
      },
    },
  },
  de: {
    blocks: {
      pricing: {
        label: 'Preise',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        plans: 'Tarife',
        planName: 'Tarifname',
        price: 'Preis',
        period: 'Zeitraum',
        periodMonthly: 'Monatlich',
        periodYearly: 'Jährlich',
        periodOneTime: 'Einmalig',
        features: 'Funktionen',
        featureText: 'Funktion',
        ctaLabel: 'Button-Text',
        ctaLink: 'Button-Link',
        highlighted: 'Hervorgehoben',
        columns: 'Spalten',
      },
    },
  },
})
