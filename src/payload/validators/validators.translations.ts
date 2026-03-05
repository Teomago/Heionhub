import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    validation: {
      invalidURL: 'Please enter a valid URL.',
      invalidLongitude: 'Longitude must be between -180 and 180.',
      invalidLatitude: 'Latitude must be between -90 and 90.',
      invalidTwentyFourHourFormat: 'Please use 24-hour format (HH:mm).',
    },
  },
  de: {
    validation: {
      invalidURL: 'Bitte geben Sie eine gültige URL ein.',
      invalidLongitude: 'Längengrad muss zwischen -180 und 180 liegen.',
      invalidLatitude: 'Breitengrad muss zwischen -90 und 90 liegen.',
      invalidTwentyFourHourFormat: 'Bitte 24-Stunden-Format (HH:mm) verwenden.',
    },
  },
})
