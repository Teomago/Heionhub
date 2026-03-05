'use client'
import type { Option, OptionObject, Operator, SelectFieldClient } from 'payload'
import { getTranslation } from '@payloadcms/translations'
import { useTranslation, ReactSelect } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

import { formatOptions } from './formatOptions'

interface SelectFilterProps {
  disabled: boolean
  field: SelectFieldClient
  isClearable?: boolean
  onChange: (value: unknown) => void
  operator: Operator
  options: Option[]
  value: string
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  disabled,
  field,
  isClearable = true,
  onChange,
  operator,
  options: optionsFromProps,
  value,
}) => {
  const { i18n } = useTranslation()
  const [options, setOptions] = useState(formatOptions(optionsFromProps))

  const isMulti = ['in', 'not_in'].includes(operator)
  let valueToRender: OptionObject | OptionObject[] | undefined

  if (isMulti && Array.isArray(value)) {
    valueToRender = (value as string[]).map((val) => {
      const matchingOption = options.find((option) => option.value === val)
      return {
        label: matchingOption ? getTranslation(matchingOption.label, i18n) : val,
        value: matchingOption?.value ?? val,
      }
    })
  } else if (value) {
    const matchingOption = options.find((option) => option.value === value)
    valueToRender = {
      label: matchingOption ? getTranslation(matchingOption.label, i18n) : value,
      value: matchingOption?.value ?? value,
    }
  }

  const onSelect = useCallback(
    (selectedOption: unknown) => {
      let newValue: string | string[] | null

      if (!selectedOption) {
        newValue = null
      } else if (isMulti) {
        if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map((option: OptionObject) => String(option.value))
        } else {
          newValue = []
        }
      } else {
        newValue = String((selectedOption as OptionObject).value)
      }

      onChange(newValue)
    },
    [isMulti, onChange],
  )

  useEffect(() => {
    setOptions(formatOptions(optionsFromProps))
  }, [optionsFromProps])

  useEffect(() => {
    if (!isMulti && Array.isArray(value)) {
      onChange(value[0])
    }
  }, [isMulti, onChange, value])

  return (
    <ReactSelect
      disabled={disabled}
      isClearable={isClearable}
      isMulti={isMulti}
      onChange={onSelect}
      options={options.map((option) => ({
        ...option,
        label: getTranslation(option.label, i18n),
      }))}
      placeholder={field?.admin?.placeholder as string | undefined}
      value={valueToRender}
    />
  )
}
