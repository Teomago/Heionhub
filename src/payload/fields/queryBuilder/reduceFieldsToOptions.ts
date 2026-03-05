'use client'
import type { ClientTranslationKeys, I18nClient } from '@payloadcms/translations'
import type { ClientField, SanitizedFieldPermissions, SanitizedFieldsPermissions } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { fieldAffectsData } from 'payload/shared'

import type { ReducedField } from './types'

import { fieldTypeConditions, getValidFieldOperators } from './field-types'
import { combineFieldLabel, createNestedClientFieldPath } from './utils'

/**
 * Type alias for field permissions when accessed as a record by field name.
 * Exported Payload types use a union that doesn't allow direct string indexing.
 */
type FieldPermsRecord = Record<string, SanitizedFieldPermissions | undefined>

/**
 * Resolves nested field permissions by name.
 * Replicates original Payload behavior: `perms?.[name]?.fields || perms?.[name]`
 */
const resolveNestedPermissions = (
  perms: SanitizedFieldPermissions | SanitizedFieldsPermissions | undefined,
  name: string,
): SanitizedFieldPermissions | SanitizedFieldsPermissions | undefined => {
  if (!perms || perms === true) return undefined
  const fieldPerm = (perms as FieldPermsRecord)[name]
  if (!fieldPerm || fieldPerm === true) return fieldPerm
  return fieldPerm.fields ?? fieldPerm
}

/**
 * Helper to check if a field is hidden/disabled
 * Copied from payload/shared to avoid direct dependency if possible, or assume it's available.
 * Actually, let's use the import from payload/shared if it works.
 * The source file uses: import { fieldIsHiddenOrDisabled, fieldIsID, tabHasName } from 'payload/shared'
 */
import { fieldIsHiddenOrDisabled, fieldIsID, tabHasName } from 'payload/shared'

interface ReduceFieldOptionsArgs {
  fieldPermissions?: SanitizedFieldPermissions | SanitizedFieldsPermissions
  fields: ClientField[]
  i18n: I18nClient
  labelPrefix?: string
  pathPrefix?: string
}

/**
 * Transforms a fields schema into a flattened array of fields with labels and values.
 * Used in the WhereBuilder component to render the fields in the dropdown.
 */
export const reduceFieldsToOptions = ({
  fieldPermissions,
  fields,
  i18n,
  labelPrefix,
  pathPrefix: pathPrefixFromArgs,
}: ReduceFieldOptionsArgs): ReducedField[] => {
  return fields.reduce<ReducedField[]>((reduced, field) => {
    let pathPrefix = pathPrefixFromArgs

    if (
      (fieldIsHiddenOrDisabled(field) && !fieldIsID(field)) ||
      ('virtual' in field && field.virtual === true)
    ) {
      return reduced
    }

    let shouldIgnoreFieldName = false

    if ('virtual' in field && typeof field.virtual === 'string') {
      pathPrefix = pathPrefix ? pathPrefix + '.' + field.virtual : field.virtual
      if (fieldAffectsData(field)) {
        shouldIgnoreFieldName = true
      }
    }

    if (field.type === 'tabs' && 'tabs' in field) {
      field.tabs.forEach((tab) => {
        if (typeof tab.label !== 'boolean') {
          const localizedTabLabel = getTranslation(tab.label || '', i18n)
          const labelWithPrefix = labelPrefix
            ? labelPrefix + ' > ' + localizedTabLabel
            : localizedTabLabel

          const tabPathPrefix =
            tabHasName(tab) && tab.name
              ? pathPrefix
                ? pathPrefix + '.' + tab.name
                : tab.name
              : pathPrefix

          if (typeof localizedTabLabel === 'string') {
            reduced.push(
              ...reduceFieldsToOptions({
                fieldPermissions:
                  typeof fieldPermissions === 'boolean'
                    ? fieldPermissions
                    : tabHasName(tab) && tab.name
                      ? resolveNestedPermissions(fieldPermissions, tab.name)
                      : fieldPermissions,
                fields: tab.fields,
                i18n,
                labelPrefix: labelWithPrefix as string,
                pathPrefix: tabPathPrefix,
              }),
            )
          }
        }
      })
      return reduced
    }

    if (field.type === 'row' && 'fields' in field) {
      reduced.push(
        ...reduceFieldsToOptions({
          fieldPermissions,
          fields: field.fields,
          i18n,
          labelPrefix,
          pathPrefix,
        }),
      )
      return reduced
    }

    if (field.type === 'collapsible' && 'fields' in field) {
      const localizedTabLabel = getTranslation(field.label || '', i18n)
      const labelWithPrefix = labelPrefix
        ? labelPrefix + ' > ' + localizedTabLabel
        : localizedTabLabel

      reduced.push(
        ...reduceFieldsToOptions({
          fieldPermissions,
          fields: field.fields,
          i18n,
          labelPrefix: labelWithPrefix,
          pathPrefix,
        }),
      )
      return reduced
    }

    if (field.type === 'group' && 'fields' in field) {
      const translatedLabel = getTranslation(field.label || '', i18n)
      const labelWithPrefix = labelPrefix
        ? translatedLabel
          ? labelPrefix + ' > ' + translatedLabel
          : labelPrefix
        : translatedLabel

      if (fieldAffectsData(field)) {
        const pathWithPrefix = field.name
          ? pathPrefix
            ? pathPrefix + '.' + field.name
            : field.name
          : pathPrefix

        reduced.push(
          ...reduceFieldsToOptions({
            fieldPermissions:
              typeof fieldPermissions === 'boolean'
                ? fieldPermissions
                : resolveNestedPermissions(fieldPermissions, field.name),
            fields: field.fields,
            i18n,
            labelPrefix: labelWithPrefix,
            pathPrefix: pathWithPrefix,
          }),
        )
      } else {
        reduced.push(
          ...reduceFieldsToOptions({
            fieldPermissions,
            fields: field.fields,
            i18n,
            labelPrefix: labelWithPrefix,
            pathPrefix,
          }),
        )
      }
      return reduced
    }

    if (field.type === 'array' && 'fields' in field) {
      const translatedLabel = getTranslation(field.label || '', i18n)
      const labelWithPrefix = labelPrefix
        ? translatedLabel
          ? labelPrefix + ' > ' + translatedLabel
          : labelPrefix
        : translatedLabel

      const pathWithPrefix = field.name
        ? pathPrefix
          ? pathPrefix + '.' + field.name
          : field.name
        : pathPrefix

      reduced.push(
        ...reduceFieldsToOptions({
          fieldPermissions:
            typeof fieldPermissions === 'boolean'
              ? fieldPermissions
              : resolveNestedPermissions(fieldPermissions, field.name),
          fields: field.fields,
          i18n,
          labelPrefix: labelWithPrefix,
          pathPrefix: pathWithPrefix,
        }),
      )
      return reduced
    }

    if (typeof fieldTypeConditions[field.type] === 'object') {
      const fieldPerm =
        fieldPermissions && fieldPermissions !== true
          ? (fieldPermissions as FieldPermsRecord)[field.name]
          : undefined
      if (
        fieldIsID(field) ||
        fieldPermissions === true ||
        fieldPerm === true ||
        (typeof fieldPerm === 'object' && fieldPerm?.read === true)
      ) {
        const operatorKeys = new Set<string>()

        const { validOperators } = getValidFieldOperators({ field })

        const operators = validOperators.reduce<
          { label: string; value: (typeof validOperators)[0]['value'] }[]
        >((acc, operator) => {
          if (!operatorKeys.has(operator.value)) {
            operatorKeys.add(operator.value)
            const operatorKey = `operators:${operator.label}` as ClientTranslationKeys
            acc.push({
              ...operator,
              label: i18n.t(operatorKey),
            })
          }
          return acc
        }, [])

        const localizedLabel = getTranslation(field.label || '', i18n)
        const formattedLabel = labelPrefix
          ? combineFieldLabel({ field, prefix: labelPrefix })
          : localizedLabel

        let fieldPath: string
        if (shouldIgnoreFieldName) {
          fieldPath = pathPrefix || ''
        } else if (pathPrefix) {
          fieldPath = createNestedClientFieldPath(pathPrefix, field)
        } else {
          fieldPath = field.name
        }

        const formattedField: ReducedField = {
          label: formattedLabel,
          plainTextLabel: `${labelPrefix ? labelPrefix + ' > ' : ''}${localizedLabel}`,
          value: fieldPath,
          ...fieldTypeConditions[field.type],
          field,
          operators,
        }

        reduced.push(formattedField)
        return reduced
      }
    }
    return reduced
  }, [])
}
