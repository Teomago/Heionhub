'use client'
import type {
  DateFieldClient,
  NumberFieldClient,
  Operator,
  Option,
  ResolvedFilterOptions,
  SelectFieldClient,
  TextFieldClient,
} from 'payload'
import type { ReducedField, Value } from '../types'

import { DateFilter } from './DateFilter'
import { NumberFilter } from './NumberFilter'
import { RelationshipFilter } from './RelationshipFilter'
import { SelectFilter } from './SelectFilter'
import { TextFilter } from './TextFilter'

interface DefaultFilterProps {
  booleanSelect: boolean
  disabled: boolean
  filterOptions?: ResolvedFilterOptions
  internalField: ReducedField
  onChange: (value: unknown) => void
  operator: Operator
  options: Option[]
  value: Value
}

export const DefaultFilter: React.FC<DefaultFilterProps> = ({
  booleanSelect,
  disabled,
  filterOptions,
  internalField,
  onChange,
  operator,
  options,
  value,
}) => {
  if (booleanSelect || ['radio', 'select'].includes(internalField?.field?.type || '')) {
    return (
      <SelectFilter
        disabled={disabled}
        field={internalField.field as SelectFieldClient}
        isClearable={!booleanSelect}
        onChange={onChange}
        operator={operator}
        options={options}
        value={value as string}
      />
    )
  }

  switch (internalField?.field?.type) {
    case 'date': {
      return (
        <DateFilter
          disabled={disabled}
          field={internalField.field as DateFieldClient}
          onChange={onChange}
          operator={operator}
          value={value as Date | string}
        />
      )
    }

    case 'number': {
      return (
        <NumberFilter
          disabled={disabled}
          field={internalField.field as NumberFieldClient}
          onChange={onChange}
          operator={operator}
          value={value as number | number[]}
        />
      )
    }

    case 'relationship': {
      return (
        <RelationshipFilter
          disabled={disabled}
          field={internalField.field}
          filterOptions={filterOptions}
          onChange={onChange}
          operator={operator}
          value={value}
        />
      )
    }

    case 'upload': {
      return (
        <RelationshipFilter
          disabled={disabled}
          field={internalField.field}
          filterOptions={filterOptions}
          onChange={onChange}
          operator={operator}
          value={value}
        />
      )
    }

    default: {
      return (
        <TextFilter
          disabled={disabled}
          field={internalField?.field as TextFieldClient}
          onChange={onChange}
          operator={operator}
          value={value as string | string[]}
        />
      )
    }
  }
}
