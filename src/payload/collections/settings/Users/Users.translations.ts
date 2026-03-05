import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    users: {
      singular: 'User',
      plural: 'Users',
      firstName: 'First Name',
      lastName: 'Last Name',
      name: 'Name',
      roles: 'Roles',
      admin: 'Admin',
      editor: 'Editor',
      user: 'User',
    },
  },
  de: {
    users: {
      singular: 'Benutzer',
      plural: 'Benutzer',
      firstName: 'Vorname',
      lastName: 'Nachname',
      name: 'Name',
      roles: 'Rollen',
      admin: 'Admin',
      editor: 'Editor',
      user: 'Benutzer',
    },
  },
})
