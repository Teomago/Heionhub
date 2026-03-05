'use client'
import type { Operator, TextFieldClient } from 'payload'
import { useTranslation, ReactSelect } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

interface TextFilterProps {
  disabled: boolean
  field: TextFieldClient
  onChange: (value: unknown) => void
  operator: Operator
  value: string | string[]
}

export const TextFilter: React.FC<TextFilterProps> = ({
  disabled,
  field,
  onChange,
  operator,
  value,
}) => {
  const { t } = useTranslation()
  const isMulti = ['in', 'not_in'].includes(operator) || field?.hasMany

  const [valueToRender, setValueToRender] = useState<
    { id: string; label: string; value: { value: string } }[]
  >([])

  const onSelect = useCallback(
    (selectedOption: unknown) => {
      let newValue: string[] | null
      if (!selectedOption) {
        newValue = []
      } else if (isMulti) {
        if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map(
            (option: { value?: { value?: string } | string }) =>
              (option.value as { value?: string })?.value || option.value,
          ) as string[]
        } else {
          const opt = selectedOption as { value?: { value?: string } | string }
          newValue = [((opt.value as { value?: string })?.value || opt.value) as string]
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

  return isMulti ? (
    <ReactSelect
      disabled={disabled}
      isClearable
      isCreatable
      isMulti={isMulti}
      isSortable
      onChange={onSelect}
      options={[]}
      placeholder={t('general:enterAValue')}
      value={valueToRender || []}
    />
  ) : (
    <input
      className="condition-value-text"
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('general:enterAValue')}
      type="text"
      value={(value as string) || ''}
    />
  )
}
