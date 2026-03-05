import { defineTranslations } from '@/payload/i18n/config'

export const translations = defineTranslations({
  en: {
    serviceArea: {
      label: 'Service Area',
      type: 'Service Area Type',
      radius: 'Service Radius',
      distance: 'Distance',
      unit: 'Unit',
      postalCodes: 'Postal/ZIP Codes',
      postalCodesDescription: 'Press enter after each code.',
      cities: 'Cities',
      cityName: 'City Name',
      stateProvince: 'State/Province',
      stateProvinceDescription: 'Optional - helps with disambiguation',
      countryCode: 'Country Code',
      countryCodeDescription: 'ISO 3166-1 alpha-2',
      regions: 'Regions/States',
      regionName: 'Region/State Name',
      countries: 'Countries',
      customDescription: 'Custom Service Area Description',
      customDescriptionHelp:
        'Describe your service area (e.g., "Greater London Area", "Tri-State Area")',
    },
  },
  de: {
    serviceArea: {
      label: 'Servicegebiet',
      type: 'Servicegebiet-Typ',
      radius: 'Service-Radius',
      distance: 'Entfernung',
      unit: 'Einheit',
      postalCodes: 'Postleitzahlen',
      postalCodesDescription: 'Nach jeder Code-Eingabe Enter drücken.',
      cities: 'Städte',
      cityName: 'Stadtname',
      stateProvince: 'Bundesland/Provinz',
      stateProvinceDescription: 'Optional – hilft bei der Unterscheidung',
      countryCode: 'Ländercode',
      countryCodeDescription: 'ISO 3166-1 alpha-2',
      regions: 'Regionen/Bundesländer',
      regionName: 'Regions-/Bundeslandname',
      countries: 'Länder',
      customDescription: 'Benutzerdefinierte Servicegebiet-Beschreibung',
      customDescriptionHelp:
        'Beschreiben Sie Ihr Servicegebiet (z. B. "Großraum London", "Drei-Staaten-Gebiet")',
    },
  },
})
