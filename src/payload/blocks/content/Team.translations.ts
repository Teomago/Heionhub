import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    blocks: {
      team: {
        label: 'Team',
        heading: 'Heading',
        subheading: 'Subheading',
        members: 'Team Members',
        name: 'Name',
        role: 'Role',
        bio: 'Bio',
        photo: 'Photo',
        socialLinks: 'Social Links',
        socialPlatform: 'Platform',
        socialUrl: 'URL',
        columns: 'Columns',
      },
    },
  },
  de: {
    blocks: {
      team: {
        label: 'Team',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        members: 'Teammitglieder',
        name: 'Name',
        role: 'Rolle',
        bio: 'Biografie',
        photo: 'Foto',
        socialLinks: 'Social-Media-Links',
        socialPlatform: 'Plattform',
        socialUrl: 'URL',
        columns: 'Spalten',
      },
    },
  },
})
