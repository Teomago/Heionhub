import { GroupField } from 'payload'
import { deepMerge, type DeepPartial } from '@/lib/utils'
import { getTranslation } from '@/payload/i18n/getTranslation'

type ServiceAreaFieldOverrides = DeepPartial<GroupField>

interface ServiceAreaOptions {
  withInherit?: boolean
  overrides?: ServiceAreaFieldOverrides
}

export const serviceArea = (options: ServiceAreaOptions = {}): GroupField => {
  const { withInherit = false, overrides = {} } = options

  const baseOptions = [
    'radius',
    'postalCodes',
    'cities',
    'regions',
    'countries',
    'global',
    'online',
    'custom',
    'none',
  ]

  const typeOptions = withInherit ? ['inherit', ...baseOptions] : baseOptions

  const baseConfig: GroupField = {
    name: 'serviceArea',
    label: getTranslation('serviceArea:label'),
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        label: getTranslation('serviceArea:type'),
        options: typeOptions,
      },
      {
        name: 'radius',
        type: 'group',
        label: getTranslation('serviceArea:radius'),
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'radius',
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'distance',
                type: 'number',
                label: getTranslation('serviceArea:distance'),
                min: 0,
                admin: {
                  width: '50%',
                },
              },
              {
                name: 'unit',
                type: 'select',
                label: getTranslation('serviceArea:unit'),
                defaultValue: 'km',
                options: ['km', 'miles'],
                admin: {
                  width: '50%',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'postalCodes',
        label: getTranslation('serviceArea:postalCodes'),
        type: 'text',
        hasMany: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'postalCodes',
          placeholder: '10001',
          description: getTranslation('serviceArea:postalCodesDescription'),
        },
      },
      {
        name: 'cities',
        type: 'array',
        label: getTranslation('serviceArea:cities'),
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'cities',
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            label: getTranslation('serviceArea:cityName'),
            required: true,
          },
          {
            name: 'state',
            type: 'text',
            label: getTranslation('serviceArea:stateProvince'),
            admin: {
              description: getTranslation('serviceArea:stateProvinceDescription'),
            },
          },
          {
            name: 'country',
            type: 'text',
            label: getTranslation('serviceArea:countryCode'),
            admin: {
              placeholder: 'DE',
              description: getTranslation('serviceArea:countryCodeDescription'),
            },
          },
        ],
      },
      {
        name: 'regions',
        type: 'array',
        label: getTranslation('serviceArea:regions'),
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'regions',
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            label: getTranslation('serviceArea:regionName'),
            required: true,
          },
          {
            name: 'country',
            type: 'text',
            label: getTranslation('serviceArea:countryCode'),
            admin: {
              placeholder: 'DE',
              description: getTranslation('serviceArea:countryCodeDescription'),
            },
          },
        ],
      },
      {
        name: 'countries',
        label: getTranslation('serviceArea:countries'),
        type: 'text',
        hasMany: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'countries',
          placeholder: 'DE',
          description: getTranslation('serviceArea:countryCodeDescription'),
        },
      },
      {
        name: 'customDescription',
        type: 'text',
        label: getTranslation('serviceArea:customDescription'),
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
          description: getTranslation('serviceArea:customDescriptionHelp'),
        },
      },
    ],
  }

  return deepMerge<GroupField>(baseConfig, overrides || {})
}
