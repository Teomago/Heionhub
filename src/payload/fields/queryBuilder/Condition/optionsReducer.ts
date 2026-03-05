'use client'
import type { I18nClient } from '@payloadcms/translations'
import type { ClientCollectionConfig, PaginatedDocs } from 'payload'
import { getTranslation } from '@payloadcms/translations'

export interface Option {
  label: string
  options?: Option[]
  relationTo?: string
  value: string
  [key: string]: unknown
}

interface ClearAction {
  i18n: I18nClient
  required: boolean
  type: 'CLEAR'
}

interface AddAction {
  collection: ClientCollectionConfig
  data: PaginatedDocs
  hasMultipleRelations: boolean
  i18n: I18nClient
  relation: string
  type: 'ADD'
}

export type Action = AddAction | ClearAction

const reduceToIDs = (options: Option[]): string[] =>
  options.reduce<string[]>((ids, option) => {
    if (option.options) {
      return [...ids, ...reduceToIDs(option.options)]
    }
    return [...ids, option.value]
  }, [])

export const optionsReducer = (state: Option[], action: Action): Option[] => {
  switch (action.type) {
    case 'ADD': {
      const { collection, data, hasMultipleRelations, i18n, relation } = action
      const labelKey = collection.admin?.useAsTitle || 'id'
      const loadedIDs = reduceToIDs(state)

      if (!hasMultipleRelations) {
        return [
          ...state,
          ...data.docs.reduce<Option[]>((docs, doc) => {
            if (!loadedIDs.includes(doc.id)) {
              loadedIDs.push(doc.id)
              return [
                ...docs,
                {
                  label: doc[labelKey] || doc.id,
                  value: doc.id,
                },
              ]
            }
            return docs
          }, []),
        ]
      }

      const newOptions = [...state]
      const optionsToAddTo = newOptions.find(
        (optionGroup) => optionGroup.label === getTranslation(collection.labels?.plural, i18n),
      )

      const newSubOptions = data.docs.reduce<Option[]>((docs, doc) => {
        if (!loadedIDs.includes(doc.id)) {
          loadedIDs.push(doc.id)
          return [
            ...docs,
            {
              label: doc[labelKey] || doc.id,
              relationTo: relation,
              value: doc.id,
            },
          ]
        }
        return docs
      }, [])

      if (optionsToAddTo) {
        optionsToAddTo.options = [...(optionsToAddTo.options || []), ...newSubOptions]
      } else {
        newOptions.push({
          label: getTranslation(collection.labels?.plural, i18n) || relation,
          options: newSubOptions,
          value: '',
        })
      }

      return newOptions
    }

    case 'CLEAR': {
      return action.required ? [] : [{ label: action.i18n.t('general:none'), value: 'null' }]
    }

    default: {
      return state
    }
  }
}
