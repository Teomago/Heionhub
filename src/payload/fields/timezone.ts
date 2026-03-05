import { SelectField } from 'payload'
import { deepMerge, type DeepPartial } from '@/lib/utils'
import { getTranslation } from '../i18n/getTranslation'

// IANA format timezones
const ALL_TIMEZONES = [
  'Pacific/Midway',
  'Pacific/Niue',
  'Pacific/Honolulu',
  'Pacific/Rarotonga',
  'America/Anchorage',
  'Pacific/Gambier',
  'America/Los_Angeles',
  'America/Tijuana',
  'America/Denver',
  'America/Phoenix',
  'America/Chicago',
  'America/Guatemala',
  'America/New_York',
  'America/Bogota',
  'America/Caracas',
  'America/Santiago',
  'America/Buenos_Aires',
  'America/Sao_Paulo',
  'Atlantic/South_Georgia',
  'Atlantic/Azores',
  'Atlantic/Cape_Verde',
  'Europe/London',
  'Europe/Berlin',
  'Africa/Lagos',
  'Europe/Athens',
  'Africa/Cairo',
  'Europe/Moscow',
  'Asia/Riyadh',
  'Asia/Dubai',
  'Asia/Baku',
  'Asia/Karachi',
  'Asia/Tashkent',
  'Asia/Calcutta',
  'Asia/Dhaka',
  'Asia/Almaty',
  'Asia/Jakarta',
  'Asia/Bangkok',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Brisbane',
  'Australia/Sydney',
  'Pacific/Guam',
  'Pacific/Noumea',
  'Pacific/Auckland',
  'Pacific/Fiji',
] as const

// Define type locally to avoid dependency on global generated types
export type SupportedTimezones = (typeof ALL_TIMEZONES)[number]

// Convert IANA format to camelCase translation key
const timezoneToTranslationKey = (timezone: string): string => {
  // First, replace slashes with underscores: Pacific/Midway -> Pacific_Midway
  // Then convert to camelCase: Pacific_Midway -> pacificMidway
  const withUnderscores = timezone.replace(/\//g, '_')

  // Convert to camelCase: first letter lowercase, capitalize after underscores
  const camelCased = withUnderscores
    .split('_')
    .map((part, index) => {
      if (index === 0) {
        // First part should be all lowercase
        return part.toLowerCase()
      }
      // Subsequent parts should be capitalized
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join('')

  return `timezones:${camelCased}`
}

// Generate options programmatically
const TIMEZONE_OPTIONS = ALL_TIMEZONES.map((timezone) => ({
  label: getTranslation(timezoneToTranslationKey(timezone) as any),
  value: timezone,
}))

// Custom type for overrides that excludes options
type TimezoneFieldOverrides = Omit<DeepPartial<SelectField>, 'options' | 'type'>

type TimezoneField = (overrides?: TimezoneFieldOverrides) => SelectField

export const timezone: TimezoneField = (overrides = {}) => {
  const baseConfig: SelectField = {
    name: 'timezone',
    type: 'select',
    options: TIMEZONE_OPTIONS,
  }

  // Merge without allowing options override
  const { options: _, ...safeOverrides } = overrides as any

  return deepMerge<SelectField>(baseConfig, safeOverrides)
}
