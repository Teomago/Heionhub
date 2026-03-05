'use client'
import type { FieldTypes, Operator, Option as PayloadOption, ResolvedFilterOptions } from 'payload'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce, useTranslation, ReactSelect, Button } from '@payloadcms/ui'

import type { AddCondition, ReducedField, RemoveCondition, UpdateCondition, Value } from '../types'

import { DefaultFilter } from './DefaultFilter'
import { getOperatorValueTypes } from './validOperators'

interface SelectOption {
  label: string
  plainTextLabel?: string
  value: string
  [key: string]: unknown
}

/**
 * Check if a string is a valid ISO date string
 */
const isISODateString = (value: unknown): value is string => {
  if (typeof value !== 'string') return false
  // ISO 8601 date format check
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/
  return isoDateRegex.test(value) && !isNaN(Date.parse(value))
}

/**
 * Parse value based on field type - handles JSON deserialization issues
 * (e.g., Date objects become strings when stored as JSON)
 */
const parseValueForFieldType = (value: Value, fieldType: FieldTypes | undefined): Value => {
  if (value === undefined || value === null) return value

  if (fieldType === 'date' && isISODateString(value)) {
    return new Date(value)
  }

  return value
}

/**
 * Check if a value is valid for the given field type
 */
const isValueValidForFieldType = (value: Value, fieldType: FieldTypes | undefined): boolean => {
  if (value === undefined || value === null) return true

  switch (fieldType) {
    case 'date':
      return value instanceof Date || isISODateString(value)
    case 'number':
      return typeof value === 'number' || typeof value === 'string' || Array.isArray(value)
    case 'checkbox':
      return value === 'true' || value === 'false' || typeof value === 'boolean'
    case 'text':
    case 'email':
    case 'textarea':
      return typeof value === 'string' || Array.isArray(value)
    default:
      return true
  }
}

interface ConditionProps {
  addCondition: AddCondition
  andIndex: number
  fieldPath: string
  filterOptions?: ResolvedFilterOptions
  operator: Operator
  orIndex: number
  reducedFields: ReducedField[]
  removeCondition: RemoveCondition
  updateCondition: UpdateCondition
  value: Value
  disabled?: boolean
}

export const Condition: React.FC<ConditionProps> = ({
  addCondition,
  andIndex,
  fieldPath,
  filterOptions,
  operator,
  orIndex,
  reducedFields,
  removeCondition,
  updateCondition,
  value,
  disabled: disabledProp,
}) => {
  const { t } = useTranslation()

  const reducedField = reducedFields.find((field) => field.value === fieldPath)
  const fieldType = reducedField?.field?.type

  // Flag to skip the next debounced update (set when field changes to prevent stale values)
  const skipNextDebouncedUpdate = useRef(false)

  // Parse value for field type (handles JSON deserialization - e.g., date strings → Date objects)
  const parsedValue = useMemo(() => parseValueForFieldType(value, fieldType), [value, fieldType])

  const [internalValue, setInternalValue] = useState<Value>(parsedValue)
  const debouncedValue = useDebounce(internalValue, 300)

  const booleanSelect = ['exists'].includes(operator) || reducedField?.field?.type === 'checkbox'

  let valueOptions: PayloadOption[] = []

  if (booleanSelect) {
    valueOptions = [
      { label: t('general:true'), value: 'true' },
      { label: t('general:false'), value: 'false' },
    ]
  } else if (
    reducedField?.field &&
    'options' in reducedField.field &&
    Array.isArray(reducedField.field.options)
  ) {
    valueOptions = reducedField.field.options
  }

  useEffect(() => {
    // Skip this update if flag is set (prevents stale debounced value after field change)
    if (skipNextDebouncedUpdate.current) {
      skipNextDebouncedUpdate.current = false
      return
    }

    if (operator && reducedField && debouncedValue !== value) {
      updateCondition({
        andIndex,
        field: reducedField,
        operator,
        orIndex,
        value: debouncedValue === null || debouncedValue === '' ? undefined : debouncedValue,
      })
    }
  }, [debouncedValue, operator, reducedField, andIndex, orIndex, updateCondition, value])

  // Sync external value changes (with parsing for field type)
  useEffect(() => {
    setInternalValue(parsedValue)
  }, [parsedValue])

  const disabled =
    (!reducedField?.value && typeof reducedField?.value !== 'number') ||
    reducedField?.field?.admin?.disableListFilter ||
    disabledProp

  const handleFieldChange = useCallback(
    (selected: unknown) => {
      const option = selected as SelectOption | SelectOption[] | null
      if (!option || Array.isArray(option)) return

      const newField = reducedFields.find((f) => f.value === option.value)
      if (!newField) return

      // Check if current value is valid for the new field type
      const valueValidForNewField = isValueValidForFieldType(internalValue, newField.field.type)

      // Always clear value when changing field type to prevent type mismatches
      // (e.g., date value in text field or vice versa)
      const shouldClearValue = !valueValidForNewField || newField.field.type !== fieldType

      // Skip the next debounced update to prevent stale value from being applied
      skipNextDebouncedUpdate.current = true

      if (shouldClearValue) {
        setInternalValue(undefined)
      }

      updateCondition({
        andIndex,
        field: newField,
        operator: newField.operators[0]?.value || 'equals',
        orIndex,
        value: shouldClearValue ? undefined : internalValue,
      })
    },
    [andIndex, orIndex, reducedFields, updateCondition, internalValue, fieldType],
  )

  const handleOperatorChange = useCallback(
    (selected: unknown) => {
      const option = selected as SelectOption | SelectOption[] | null
      if (!option || Array.isArray(option)) return
      if (reducedField && option.value) {
        const operatorValueTypes = getOperatorValueTypes(reducedField.field.type)
        const validOperatorValue = operatorValueTypes[option.value] || 'any'

        // For date fields, Date objects have typeof 'object'
        const isDateValue = internalValue instanceof Date

        const isValidValue =
          validOperatorValue === 'any' ||
          typeof internalValue === validOperatorValue ||
          (validOperatorValue === 'object' && isDateValue) ||
          (validOperatorValue === 'boolean' &&
            (internalValue === 'true' || internalValue === 'false'))

        if (!isValidValue) {
          // If the current value is not valid for the new operator, reset it
          setInternalValue(undefined)
        }

        updateCondition({
          andIndex,
          field: reducedField,
          operator: option.value,
          orIndex,
          value: isValidValue ? internalValue : undefined,
        })
      }
    },
    [andIndex, reducedField, orIndex, updateCondition, internalValue],
  )

  const handleValueChange = useCallback((newValue: unknown) => {
    setInternalValue(newValue as Value)
  }, [])

  // Convert reducedFields to Option format for ReactSelect
  const fieldOptions: SelectOption[] = reducedFields
    .filter((field) => !field.field.admin?.disableListFilter)
    .map((field) => ({
      label: typeof field.label === 'string' ? field.label : field.plainTextLabel || field.value,
      plainTextLabel: field.plainTextLabel,
      value: field.value,
    }))

  const operatorOptions: SelectOption[] =
    reducedField?.operators.map((op) => ({
      label: op.label,
      value: op.value,
    })) || []

  // Compute valid value for filter based on current operator and field type
  // This ensures value is reset immediately when operator/field changes to incompatible type
  const validValueForFilter = useMemo(() => {
    if (!reducedField || !operator) return internalValue

    // First check if value is valid for the field type
    if (!isValueValidForFieldType(internalValue, reducedField.field.type)) {
      return undefined
    }

    const operatorValueTypes = getOperatorValueTypes(reducedField.field.type)
    const validOperatorValue = operatorValueTypes[operator] || 'any'

    // For date fields, also accept Date objects (typeof Date is 'object')
    const isDateValue = internalValue instanceof Date
    const isValid =
      validOperatorValue === 'any' ||
      typeof internalValue === validOperatorValue ||
      (validOperatorValue === 'object' && isDateValue) ||
      (validOperatorValue === 'boolean' && (internalValue === 'true' || internalValue === 'false'))

    return isValid ? internalValue : undefined
  }, [reducedField, operator, internalValue])

  return (
    <div className="condition">
      <div className="condition__wrap">
        <div className="condition__inputs">
          <div className="condition__field">
            <ReactSelect
              disabled={disabled}
              filterOption={({ data, label }, search) =>
                (((data as SelectOption)?.plainTextLabel as string) || label)
                  .toLowerCase()
                  .includes(search.toLowerCase())
              }
              isClearable={false}
              onChange={handleFieldChange}
              options={fieldOptions}
              value={fieldOptions.find((opt) => opt.value === reducedField?.value)}
            />
          </div>
          <div className="condition__operator">
            <ReactSelect
              disabled={disabled}
              isClearable={false}
              onChange={handleOperatorChange}
              options={operatorOptions}
              value={operatorOptions.find((o) => operator === o.value)}
            />
          </div>
          <div className="condition__value">
            {reducedField && (
              <DefaultFilter
                booleanSelect={booleanSelect}
                disabled={disabled || !operator}
                filterOptions={filterOptions}
                internalField={reducedField}
                onChange={handleValueChange}
                operator={operator}
                options={valueOptions}
                value={validValueForFilter}
              />
            )}
          </div>
        </div>
        <div className="condition__actions">
          <Button
            buttonStyle="icon-label"
            icon="x"
            iconStyle="with-border"
            className="condition__actions-remove"
            onClick={() => removeCondition({ andIndex, orIndex })}
            round
            disabled={disabled || reducedFields.length === 0}
          />
          <Button
            buttonStyle="icon-label"
            icon="plus"
            iconStyle="with-border"
            className="condition__actions-add"
            onClick={() =>
              addCondition({
                andIndex: andIndex + 1,
                field: reducedFields.find((field) => !field.field.admin?.disableListFilter)!,
                orIndex,
                relation: 'and',
              })
            }
            round
            disabled={disabled || reducedFields.length === 0}
          />
        </div>
      </div>
    </div>
  )
}
