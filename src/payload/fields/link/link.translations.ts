import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    fields: {
      link: 'Link',
      label: 'Label',
      default: 'Default',
      secondary: 'Secondary',
      outline: 'Outline',
      ghost: 'Ghost',
      destructive: 'Destructive',
      type: 'Type',
      internalLink: 'Internal Link',
      customUrl: 'Custom URL',
      openInNewTab: 'Open in new tab',
      documentToLinkTo: 'Document to link to',
      appearance: 'Appearance',
      appearanceDescription: 'Choose how the link should be rendered',
    },
  },
  de: {
    fields: {
      link: 'Link',
      label: 'Bezeichnung',
      default: 'Standard',
      secondary: 'Sekundär',
      outline: 'Kontur',
      ghost: 'Transparent',
      destructive: 'Löschen',
      type: 'Typ',
      internalLink: 'Interner Link',
      customUrl: 'Benutzerdefinierte URL',
      openInNewTab: 'In neuem Tab öffnen',
      documentToLinkTo: 'Dokument zum Verlinken',
      appearance: 'Aussehen',
      appearanceDescription: 'Wie der Link dargestellt werden soll',
    },
  },
})
