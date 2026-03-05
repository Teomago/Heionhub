'use client'
import type { JSONFieldClientProps, Operator } from 'payload'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { dequal } from 'dequal/lite'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  RenderCustomComponent,
  useField,
  useTranslation,
  useConfig,
  useFormFields,
  Button,
} from '@payloadcms/ui'

import type {
  AddCondition,
  OrCondition,
  RemoveCondition,
  UpdateCondition,
  WhereBuilderOptions,
  WhereCondition,
  WhereQuery,
} from './types'

import { Condition } from './Condition/index'
import { reduceFieldsToOptions } from './reduceFieldsToOptions'
import { fieldTypeConditions, getValidFieldOperators } from './field-types'

import './index.scss'
import { getSiblingPath } from './utils'
import { mergeFieldStyles } from '@payloadcms/ui/shared'

export type WhereFieldProps = JSONFieldClientProps & WhereBuilderOptions

const WhereField: React.FC<WhereFieldProps> = (props) => {
  const {
    field,
    field: {
      admin: { description, readOnly: adminReadOnly } = {},
      label,
      localized,
      required,
      name,
    },
    path: pathFromProps,
    readOnly,
    collectionSlug,
    collectionSlugField,
    showRawJSON,
  } = props

  const { i18n, t } = useTranslation()
  const { config } = useConfig()

  const dynamicCollectionSlug = useFormFields(
    ([fields]) =>
      fields?.[
        getSiblingPath({
          currentPath: pathFromProps || '',
          siblingField: collectionSlugField || '',
          currentName: name,
        }) || ''
      ]?.value,
  )
  const actualCollectionSlug: string | undefined = useMemo(() => {
    return collectionSlugField ? (dynamicCollectionSlug as string | undefined) : collectionSlug
  }, [collectionSlugField, dynamicCollectionSlug, collectionSlug])

  const collectionConfig = useMemo(() => {
    if (!actualCollectionSlug) return undefined
    return config.collections?.find((c) => c.slug === actualCollectionSlug)
  }, [actualCollectionSlug, config.collections])

  const collectionFields = useMemo(() => {
    return collectionConfig?.fields || []
  }, [collectionConfig])

  const reducedFields = useMemo(
    () =>
      reduceFieldsToOptions({
        fieldPermissions: true,
        fields: collectionFields,
        i18n,
      }),
    [collectionFields, i18n],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<WhereQuery>({
    potentiallyStalePath: pathFromProps,
  })

  const initialCollectionSlug = useRef(actualCollectionSlug) // IMPORTANT
  //Without this ref, every new render after initial load will reset the value
  //For example, if user switches tabs in the admin panel, the value would reset to empty
  useEffect(() => {
    //
    /**
     * Clear current value when collection slug changes
     * Maybe in future we can save previous values per collection slug
     *
     * For example, if user selects "Pages" collection, adds some conditions,
     * then switches to "Media" collection, and then goes back to "Pages",
     * we could restore the previously set conditions for "Pages".
     *
     * I think this would be great UX improvement (if user accidentally switches collection slug)
     * Maybe redundant (versions/history could also help in that case)
     *
     *
     */

    if (actualCollectionSlug !== undefined) {
      if (initialCollectionSlug.current === actualCollectionSlug) {
        //Don't clear on first render
        initialCollectionSlug.current = actualCollectionSlug
        return
      }
      setValue({ or: [] })
    }
  }, [actualCollectionSlug])

  const conditions = useMemo<OrCondition[]>(() => {
    if (value && typeof value === 'object' && 'or' in value && Array.isArray(value.or)) {
      return value.or
    }
    return []
  }, [value])

  const handleWhereChange = useCallback(
    (newWhere: WhereQuery) => {
      if (readOnly || disabled) return
      setValue(newWhere)
    },
    [readOnly, disabled, setValue],
  )

  const addCondition: AddCondition = useCallback(
    ({ andIndex, field, orIndex, relation }) => {
      const newConditions = [...conditions]
      const defaultOperator = fieldTypeConditions[field.field.type]?.operators[0]?.value || 'equals'

      if (relation === 'and') {
        if (!newConditions[orIndex]) {
          newConditions[orIndex] = { and: [] }
        }
        newConditions[orIndex].and.splice(andIndex, 0, {
          [String(field.value)]: {
            [defaultOperator]: undefined,
          },
        })
      } else {
        newConditions.push({
          and: [
            {
              [String(field.value)]: {
                [defaultOperator]: undefined,
              },
            },
          ],
        })
      }

      handleWhereChange({ or: newConditions })
    },
    [conditions, handleWhereChange],
  )

  const updateCondition: UpdateCondition = useCallback(
    ({ andIndex, field, operator: incomingOperator, orIndex, value: newValue }) => {
      const existingCondition = conditions[orIndex]?.and[andIndex]

      if (typeof existingCondition === 'object' && field.value) {
        const { validOperator } = getValidFieldOperators({
          field: field.field,
          operator: incomingOperator,
        })

        const existingValue = existingCondition[String(field.value)]?.[validOperator]
        if (typeof existingValue !== 'undefined' && existingValue === newValue) {
          return
        }

        const newRowCondition: WhereCondition = {
          [String(field.value)]: { [validOperator]: newValue },
        }

        if (dequal(existingCondition, newRowCondition)) {
          return
        }

        const newConditions = [...conditions]
        newConditions[orIndex] = {
          ...newConditions[orIndex],
          and: [...newConditions[orIndex].and],
        }
        newConditions[orIndex].and[andIndex] = newRowCondition

        handleWhereChange({ or: newConditions })
      }
    },
    [conditions, handleWhereChange],
  )

  const removeCondition: RemoveCondition = useCallback(
    ({ andIndex, orIndex }) => {
      const newConditions = [...conditions]
      newConditions[orIndex] = {
        ...newConditions[orIndex],
        and: [...newConditions[orIndex].and],
      }
      newConditions[orIndex].and.splice(andIndex, 1)

      if (newConditions[orIndex].and.length === 0) {
        newConditions.splice(orIndex, 1)
      }

      handleWhereChange({ or: newConditions })
    },
    [conditions, handleWhereChange],
  )
  const style = useMemo(() => mergeFieldStyles(field), [field])

  return (
    <div
      className={[
        'field-type',
        'query-builder-field',
        showError && 'error',
        (readOnly || disabled) && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={
          <FieldLabel label={label} localized={localized} path={path} required={required} />
        }
      />
      <div>
        <RenderCustomComponent
          CustomComponent={Error}
          Fallback={<FieldError path={path} showError={showError} />}
        />
        {BeforeInput}
        <div className="where-builder">
          {conditions.length > 0 && (
            <>
              <ul className="where-builder__or-filters">
                {conditions.map((or, orIndex) => {
                  const compoundOrKey = `${orIndex}_${Array.isArray(or?.and) ? or.and.length : ''}`

                  return (
                    <li key={compoundOrKey}>
                      {orIndex !== 0 && (
                        <div className="query-builder-field__or-label">{t('general:or')}</div>
                      )}
                      <div className="query-builder-field__and-group">
                        <ul className="where-builder__and-filters">
                          {Array.isArray(or?.and) &&
                            or.and.map((condition, andIndex) => {
                              const fieldPath = Object.keys(condition)[0]
                              const operator =
                                (Object.keys(condition?.[fieldPath] || {})?.[0] as Operator) ||
                                undefined
                              const conditionValue = condition?.[fieldPath]?.[operator]

                              return (
                                <li key={andIndex}>
                                  {andIndex !== 0 && (
                                    <div className="query-builder-field__and-label">
                                      {t('general:and')}
                                    </div>
                                  )}
                                  <Condition
                                    addCondition={addCondition}
                                    andIndex={andIndex}
                                    fieldPath={fieldPath}
                                    operator={operator}
                                    orIndex={orIndex}
                                    reducedFields={reducedFields}
                                    removeCondition={removeCondition}
                                    updateCondition={updateCondition}
                                    value={conditionValue}
                                    disabled={disabled || readOnly || adminReadOnly}
                                  />
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Button
                buttonStyle="icon-label"
                icon="plus"
                iconStyle="with-border"
                iconPosition="left"
                className="where-builder__add-or"
                onClick={() => {
                  const firstField = reducedFields.find(
                    (field) => !field.field.admin?.disableListFilter,
                  )
                  if (firstField) {
                    addCondition({
                      andIndex: 0,
                      field: firstField,
                      orIndex: conditions.length,
                      relation: 'or',
                    })
                  }
                }}
                disabled={readOnly || disabled || adminReadOnly}
                type="button"
              >
                {t('general:or')}
              </Button>
            </>
          )}
          {conditions.length === 0 && (
            <div className="where-builder__no-filters">
              <div className="where-builder__label">
                {actualCollectionSlug
                  ? t('general:noFiltersSet')
                  : 'Please select a collection to build filters.'}
              </div>
              <Button
                buttonStyle="icon-label"
                icon="plus"
                iconStyle="with-border"
                iconPosition="left"
                className="where-builder__add-first-filter"
                disabled={!actualCollectionSlug || readOnly || disabled || adminReadOnly}
                onClick={() => {
                  const firstField = reducedFields.find(
                    (field) => !field.field.admin?.disableListFilter,
                  )
                  if (firstField) {
                    addCondition({
                      andIndex: 0,
                      field: firstField,
                      orIndex: 0,
                      relation: 'or',
                    })
                  }
                }}
                type="button"
              >
                {/**
                 * TODO: Maybe add custom translation key, to not mention "filter" here?
                 * Maybe "condition" will be more appropriate?
                 */}
                {t('general:addFilter')}
              </Button>
            </div>
          )}
        </div>

        {AfterInput}
      </div>

      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />

      {/* Raw JSON preview */}
      {showRawJSON && (
        <details className="query-builder-field__raw">
          <summary>Raw JSON</summary>
          <pre>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        </details>
      )}
    </div>
  )
}

export default WhereField
