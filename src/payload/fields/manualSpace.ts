import { deepMerge, type DeepPartial } from '@/lib/utils'
import type { NumberField } from 'payload'

type ManualSpaceType = (options?: { overrides?: DeepPartial<NumberField> }) => NumberField

export const manualSpace: ManualSpaceType = ({ overrides = {} } = {}) => {
  const field: NumberField = {
    name: 'space',
    label: {
      en: 'Space',
      de: 'Abstand',
    },
    type: 'number',
    defaultValue: false,
    admin: {
      width: '33.333%',
    },
  }

  return deepMerge(field, overrides)
}
