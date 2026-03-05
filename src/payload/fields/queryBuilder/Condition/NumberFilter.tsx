'use client'
import type { NumberFieldClient, Operator } from 'payload'
import { getTranslation } from '@payloadcms/translations'
import { useTranslation, ReactSelect } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

interface NumberFilterProps {
  disabled: boolean
  field: NumberFieldClient
  onChange: (value: unknown) => void
  operator: Operator
  value: number | number[]
}

export const NumberFilter: React.FC<NumberFilterProps> = ({
  disabled,
  field,
  onChange,
  operator,
  value,
}) => {
  const { i18n, t } = useTranslation()
  const isMulti = ['in', 'not_in'].includes(operator) || field?.hasMany

  const [valueToRender, setValueToRender] = useState<
    { id: string; label: string; value: { value: number } }[]
  >([])

  const onSelect = useCallback(
    (selectedOption: unknown) => {
      let newValue: number[] | null
      if (!selectedOption) {
        newValue = []
      } else if (isMulti) {
        if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map((option: { value?: { value?: number } | number }) =>
            Number((option.value as { value?: number })?.value || option.value),
          )
        } else {
          const opt = selectedOption as { value?: { value?: number } | number }
          newValue = [Number((opt.value as { value?: number })?.value || opt.value)]
        }
      } else {
        newValue = null
      }
      onChange(newValue)
    },
    [isMulti, onChange],
  )

  useEffect(() => {
    if (Array.isArray(value)) {
      setValueToRender(
        value.map((val, index) => ({
          id: `${val}${index}`,
          label: `${val}`,
          value: {
            toString: () => `${val}${index}`,
            value: val,
          },
        })),
      )
    } else {
      setValueToRender([])
    }
  }, [value])

  const adminPlaceholder = field?.admin?.placeholder
  const placeholder = (
    adminPlaceholder && typeof adminPlaceholder === 'string'
      ? getTranslation(adminPlaceholder, i18n)
      : t('general:enterAValue')
  ) as string

  return isMulti ? (
    <ReactSelect
      disabled={disabled}
      isClearable
      isCreatable
      isMulti={isMulti}
      isSortable
      numberOnly
      onChange={onSelect}
      options={[]}
      placeholder={placeholder}
      value={valueToRender || []}
    />
  ) : (
    <input
      className="condition-value-number"
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="number"
      value={value as number}
    />
  )
}
