'use client'
import type {
  Operator,
  PaginatedDocs,
  RelationshipFieldClient,
  ResolvedFilterOptions,
  UploadFieldClient,
  Where,
} from 'payload'
import { formatAdminURL } from 'payload/shared'
import * as qs from 'qs-esm'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { useConfig, useLocale, useTranslation, ReactSelect, useDebounce } from '@payloadcms/ui'

import { optionsReducer, type Option } from './optionsReducer'

interface RelationshipFilterProps {
  disabled: boolean
  field: RelationshipFieldClient | UploadFieldClient
  filterOptions?: ResolvedFilterOptions
  onChange: (value: unknown) => void
  operator: Operator
  value: unknown
}

interface ValueWithRelation {
  relationTo: string
  value: string
}

const maxResultsPerRequest = 10

export const RelationshipFilter: React.FC<RelationshipFilterProps> = ({
  disabled,
  field,
  filterOptions,
  onChange,
  value,
}) => {
  const { admin = {}, relationTo } = field
  const hasMany = 'hasMany' in field ? field.hasMany : false
  const placeholder = 'placeholder' in admin ? admin.placeholder : undefined
  const isSortable = admin?.isSortable

  const {
    config: {
      routes: { api },
    },
    getEntityConfig,
  } = useConfig()

  const hasMultipleRelations = Array.isArray(relationTo)
  const [options, dispatchOptions] = useReducer(optionsReducer, [])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [errorLoading, setErrorLoading] = useState('')
  const [hasLoadedFirstOptions, setHasLoadedFirstOptions] = useState(false)
  const { i18n, t } = useTranslation()
  const locale = useLocale()

  const relationSlugs = hasMultipleRelations ? relationTo : [relationTo]

  const loadedRelationships = useRef<Map<string, { hasLoadedAll: boolean; nextPage: number }>>(
    new Map(relationSlugs.map((relation) => [relation, { hasLoadedAll: false, nextPage: 1 }])),
  )

  const addOptions = useCallback(
    (data: PaginatedDocs, relation: string) => {
      const collection = getEntityConfig({ collectionSlug: relation })
      if (collection) {
        dispatchOptions({
          type: 'ADD',
          collection,
          data,
          hasMultipleRelations,
          i18n,
          relation,
        })
      }
    },
    [hasMultipleRelations, i18n, getEntityConfig],
  )

  const loadOptions = useCallback(
    async ({
      abortController,
      relationSlug,
    }: {
      abortController: AbortController
      relationSlug: string
    }) => {
      const loadedRelationship = loadedRelationships.current.get(relationSlug)

      if (relationSlug && loadedRelationship && !loadedRelationship.hasLoadedAll) {
        const collection = getEntityConfig({ collectionSlug: relationSlug })
        const fieldToSearch = collection?.admin?.useAsTitle || 'id'

        const where: Where = { and: [] }

        const query: Record<string, unknown> = {
          depth: 0,
          limit: maxResultsPerRequest,
          locale: locale?.code,
          page: loadedRelationship.nextPage,
          select: { [fieldToSearch]: true },
          where,
        }

        if (filterOptions && filterOptions[relationSlug]) {
          ;(where.and as Where[]).push(filterOptions[relationSlug])
        }

        if (debouncedSearch) {
          ;(where.and as Where[]).push({
            [fieldToSearch]: { like: debouncedSearch },
          })
        }

        try {
          const response = await fetch(
            formatAdminURL({
              apiRoute: api,
              path: `/${relationSlug}${qs.stringify(query, { addQueryPrefix: true })}`,
            }),
            {
              credentials: 'include',
              headers: { 'Accept-Language': i18n.language },
              signal: abortController.signal,
            },
          )

          if (response.ok) {
            const data: PaginatedDocs = await response.json()
            if (data.docs.length > 0) {
              addOptions(data, relationSlug)

              loadedRelationships.current.set(relationSlug, {
                hasLoadedAll: !data.nextPage,
                nextPage: data.nextPage || 1,
              })
            }
          } else {
            setErrorLoading(t('error:unspecific'))
          }
        } catch (e) {
          if (!abortController.signal.aborted) {
            console.error(e)
          }
        }
      }

      setHasLoadedFirstOptions(true)
    },
    [
      addOptions,
      api,
      debouncedSearch,
      filterOptions,
      getEntityConfig,
      i18n.language,
      locale?.code,
      t,
    ],
  )

  const handleScrollToBottom = useCallback(() => {
    const entries = Array.from(loadedRelationships.current.entries())
    const relationshipToLoad = entries.find(([, data]) => !data.hasLoadedAll)

    if (relationshipToLoad) {
      const abortController = new AbortController()
      void loadOptions({ abortController, relationSlug: relationshipToLoad[0] })
    }
  }, [loadOptions])

  const findOptionsByValue = useCallback((): Option | Option[] | undefined => {
    if (!value) return undefined

    if (hasMany && Array.isArray(value)) {
      return value.map((val) => {
        if (hasMultipleRelations) {
          let matchedOption: Option | undefined
          options.forEach((opt) => {
            if (opt.options) {
              const found = opt.options.find(
                (subOpt) => subOpt.value === (val as ValueWithRelation).value,
              )
              if (found) matchedOption = found
            }
          })
          return matchedOption as Option
        }
        return options.find((opt) => opt.value === val) as Option
      })
    }

    if (hasMultipleRelations) {
      let matchedOption: Option | undefined
      const valueWithRelation = value as ValueWithRelation
      options.forEach((opt) => {
        if (opt.options) {
          const found = opt.options.find((subOpt) => subOpt.value === valueWithRelation.value)
          if (found) matchedOption = found
        }
      })
      return matchedOption
    }

    return options.find((opt) => opt.value === value)
  }, [hasMany, hasMultipleRelations, value, options])

  const handleInputChange = useCallback(
    (input: string) => {
      if (input !== search) {
        dispatchOptions({ type: 'CLEAR', i18n, required: false })

        const slugs = Array.isArray(relationTo) ? relationTo : [relationTo]
        loadedRelationships.current = new Map(
          slugs.map((relation) => [relation, { hasLoadedAll: false, nextPage: 1 }]),
        )

        setSearch(input)
      }
    },
    [i18n, relationTo, search],
  )

  const addOptionByID = useCallback(
    async (id: string, relation: string) => {
      if (!errorLoading && id !== 'null' && id && relation) {
        const response = await fetch(
          formatAdminURL({ apiRoute: api, path: `/${relation}/${id}?depth=0` }),
          {
            credentials: 'include',
            headers: { 'Accept-Language': i18n.language },
          },
        )

        if (response.ok) {
          const data = await response.json()
          addOptions({ docs: [data], hasNextPage: false, totalDocs: 1 } as PaginatedDocs, relation)
        } else {
          console.error(t('error:loadingDocument', { id }))
        }
      }
    },
    [i18n, addOptions, api, errorLoading, t],
  )

  // Load initial options
  useEffect(() => {
    const relations = Array.isArray(relationTo) ? relationTo : [relationTo]

    loadedRelationships.current = new Map(
      relations.map((relation) => [relation, { hasLoadedAll: false, nextPage: 1 }]),
    )

    dispatchOptions({ type: 'CLEAR', i18n, required: false })
    setHasLoadedFirstOptions(false)

    const abortControllers: AbortController[] = []

    relations.forEach((relation) => {
      const abortController = new AbortController()
      void loadOptions({ abortController, relationSlug: relation })
      abortControllers.push(abortController)
    })

    return () => {
      abortControllers.forEach((controller) => {
        try {
          controller.abort()
        } catch {
          // swallow
        }
      })
    }
  }, [i18n, relationTo, debouncedSearch, filterOptions, loadOptions])

  // Load options by value if not loaded
  useEffect(() => {
    if (value && hasLoadedFirstOptions) {
      if (hasMany && Array.isArray(value)) {
        const matchedOptions = findOptionsByValue() as Option[]
        matchedOptions?.forEach((option, i) => {
          if (!option) {
            if (hasMultipleRelations) {
              const v = value[i] as ValueWithRelation
              void addOptionByID(v.value, v.relationTo)
            } else {
              void addOptionByID(value[i] as string, relationTo as string)
            }
          }
        })
      } else {
        const matchedOption = findOptionsByValue()
        if (!matchedOption) {
          if (hasMultipleRelations) {
            const v = value as ValueWithRelation
            void addOptionByID(v.value, v.relationTo)
          } else {
            void addOptionByID(value as string, relationTo as string)
          }
        }
      }
    }
  }, [
    addOptionByID,
    findOptionsByValue,
    hasMany,
    hasMultipleRelations,
    relationTo,
    value,
    hasLoadedFirstOptions,
  ])

  const valueToRender = (findOptionsByValue() || value) as Option

  if (errorLoading) {
    return <div className="condition-value-relationship__error-loading">{errorLoading}</div>
  }

  return (
    <ReactSelect
      disabled={disabled}
      isMulti={hasMany}
      isSortable={isSortable}
      onChange={(selected: unknown) => {
        if (!selected) {
          onChange(null)
          return
        }

        if (hasMany && Array.isArray(selected)) {
          onChange(
            selected.map((option: Option) => {
              if (hasMultipleRelations) {
                return { relationTo: option.relationTo, value: option.value }
              }
              return option.value
            }),
          )
        } else if (hasMultipleRelations && !Array.isArray(selected)) {
          const opt = selected as Option
          onChange({ relationTo: opt.relationTo, value: opt.value })
        } else if (!Array.isArray(selected)) {
          onChange((selected as Option).value)
        }
      }}
      onInputChange={handleInputChange}
      onMenuScrollToBottom={handleScrollToBottom}
      options={options}
      placeholder={placeholder as string | undefined}
      value={valueToRender}
    />
  )
}
