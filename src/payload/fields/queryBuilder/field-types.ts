'use client'

import type { ClientField, Operator } from 'payload'

const equalsOperators = [
  { label: 'equals', value: 'equals' as Operator },
  { label: 'isNotEqualTo', value: 'not_equals' as Operator },
]

export const arrayOperators = [
  { label: 'isIn', value: 'in' as Operator },
  { label: 'isNotIn', value: 'not_in' as Operator },
]

const exists = { label: 'exists', value: 'exists' as Operator }

const base = [...equalsOperators, ...arrayOperators, exists]

const numeric = [
  ...base,
  { label: 'isGreaterThan', value: 'greater_than' as Operator },
  { label: 'isLessThan', value: 'less_than' as Operator },
  { label: 'isLessThanOrEqualTo', value: 'less_than_equal' as Operator },
  { label: 'isGreaterThanOrEqualTo', value: 'greater_than_equal' as Operator },
]

const like = { label: 'isLike', value: 'like' as Operator }
const notLike = { label: 'isNotLike', value: 'not_like' as Operator }
const contains = { label: 'contains', value: 'contains' as Operator }
const within = { label: 'within', value: 'within' as Operator }
const intersects = { label: 'intersects', value: 'intersects' as Operator }

interface FieldTypeCondition {
  component: string
  operators: { label: string; value: Operator }[]
}

export const fieldTypeConditions: Record<string, FieldTypeCondition> = {
  checkbox: {
    component: 'Text',
    operators: [...equalsOperators, exists],
  },
  code: {
    component: 'Text',
    operators: [...base, like, notLike, contains],
  },
  date: {
    component: 'Date',
    operators: [...numeric, exists],
  },
  email: {
    component: 'Text',
    operators: [...base, contains],
  },
  json: {
    component: 'Text',
    operators: [...base, like, contains, notLike, within, intersects],
  },
  number: {
    component: 'Number',
    operators: [...numeric, exists],
  },
  point: {
    component: 'Point',
    operators: [...equalsOperators, exists, within, intersects],
  },
  radio: {
    component: 'Select',
    operators: [...base],
  },
  relationship: {
    component: 'Relationship',
    operators: [...base],
  },
  richText: {
    component: 'Text',
    operators: [...base, like, notLike, contains],
  },
  select: {
    component: 'Select',
    operators: [...base],
  },
  text: {
    component: 'Text',
    operators: [...base, like, notLike, contains],
  },
  textarea: {
    component: 'Text',
    operators: [...base, like, notLike, contains],
  },
  upload: {
    component: 'Relationship',
    operators: [...base],
  },
}

export const getValidFieldOperators = ({
  field,
  operator,
}: {
  field: ClientField
  operator?: string
}): {
  validOperator: Operator
  validOperators: { label: string; value: Operator }[]
} => {
  let validOperators: { label: string; value: Operator }[] = []

  if (field.type === 'relationship' && Array.isArray(field.relationTo)) {
    if ('hasMany' in field && field.hasMany) {
      validOperators = [...equalsOperators, exists]
    } else {
      validOperators = [...base]
    }
  } else if (fieldTypeConditions[field.type]) {
    validOperators = [...fieldTypeConditions[field.type].operators]
  }

  return {
    validOperator:
      operator && validOperators.find(({ value }) => value === operator)
        ? (operator as Operator)
        : (validOperators[0]?.value ?? ('equals' as Operator)),
    validOperators,
  }
}
