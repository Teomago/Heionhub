'use client'
import { useRowLabel } from '@payloadcms/ui'
import type { ArrayRowLabelArgs, FieldTemplateVariable, RelationTemplateVariable } from './types'
import { useEffect, useMemo, useRef, useState } from 'react'

const TEMPLATE_TOKEN_REGEX = /{{\s*([^}]+)\s*}}/g

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const getNestedValue = (obj: unknown, path: string): unknown => {
  if (!path) {
    return undefined
  }

  return path.split('.').reduce<unknown>((acc, part) => {
    if (isRecord(acc) && part in acc) {
      return acc[part]
    }

    return undefined
  }, obj)
}

const setNestedValue = (target: Record<string, unknown>, path: string, value: unknown): void => {
  const segments = path.split('.')

  let cursor = target

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      cursor[segment] = value
      return
    }

    const existing = cursor[segment]
    if (isRecord(existing)) {
      cursor[segment] = { ...existing }
    } else {
      cursor[segment] = {}
    }

    cursor = cursor[segment] as Record<string, unknown>
  })
}

const hasEmptyFieldValues = (template: string, data: unknown): boolean => {
  const fieldMatches = template.match(/{{\s*(?!index[\s+\-*/\d]*\s*}})([\w.]+)\s*}}/g)

  if (!fieldMatches) {
    return false
  }

  return fieldMatches.every((match) => {
    const fieldPath = match.replace(/{{\s*|\s*}}/g, '')
    const value = getNestedValue(data, fieldPath)
    return !value || (typeof value === 'string' && value.trim() === '')
  })
}

/* eslint-disable no-new-func */
const evaluateExpression = (expression: string, context: Record<string, unknown>): unknown => {
  try {
    const evaluator = new Function(
      'context',
      `
        with (context) {
          return (${expression});
        }
      `,
    )

    return evaluator(context)
  } catch {
    return ''
  }
}
/* eslint-enable no-new-func */

const processTemplate = (template: string, context: Record<string, unknown>): string => {
  return template.replace(TEMPLATE_TOKEN_REGEX, (_, rawExpression) => {
    const expression = String(rawExpression).trim()

    if (!expression) {
      return ''
    }

    const value = evaluateExpression(expression, context)

    if (value === null || value === undefined) {
      return ''
    }

    return String(value)
  })
}

const TEMPLATE_HELPERS = {}

type RelationshipOptionValue = {
  relationTo?: string | string[]
  value: string
  label?: string
  data?: Record<string, unknown>
}

const isRelationshipValueObject = (value: unknown): value is RelationshipOptionValue => {
  return (
    isRecord(value) &&
    typeof value.value === 'string' &&
    (!('id' in value) || typeof value.id !== 'string')
  )
}

const extractRelationId = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value
  }

  if (isRelationshipValueObject(value)) {
    return value.value
  }

  if (isRecord(value)) {
    if (typeof value.id === 'string') {
      return value.id
    }

    if (typeof value.value === 'string') {
      return value.value
    }
  }

  return null
}

const getInlineRelationRecord = (
  value: unknown,
  valuePath?: string,
): Record<string, unknown> | null => {
  if (!isRecord(value)) {
    return null
  }

  if (isRelationshipValueObject(value)) {
    if (isRecord(value.data)) {
      return value.data
    }

    if (valuePath && typeof value.label === 'string') {
      return { [valuePath]: value.label }
    }

    return null
  }

  return value
}

const resolveRelationshipSlug = (
  config: Pick<RelationTemplateVariable, 'relationTo'>,
  override?: string,
): string | null => {
  if (override && typeof override === 'string') {
    return override
  }

  if (Array.isArray(config.relationTo)) {
    return config.relationTo[0] ?? null
  }

  return config.relationTo ?? null
}

type RelationshipRequest = {
  cacheKey: string
  id: string
  params: Record<string, unknown>
  path: string
  slug: string
  valuePath?: string
}

type RelationshipTarget =
  | {
      type: 'resolved'
      path: string
      value: Record<string, unknown>
    }
  | {
      type: 'request'
      path: string
      slug: string
      id: string
      valuePath?: string
    }

const shallowEqualRecord = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  return aKeys.every((key) => a[key] === b[key])
}

const areRequestsEqual = (a: RelationshipRequest[], b: RelationshipRequest[]): boolean => {
  if (a.length !== b.length) {
    return false
  }

  return a.every((request, index) => {
    const other = b[index]

    return (
      request.cacheKey === other.cacheKey &&
      request.path === other.path &&
      request.id === other.id &&
      request.slug === other.slug
    )
  })
}

const createRelationshipCacheKey = (slug: string, id: string): string => {
  return `${slug}:${id}`
}

const extractValueForVariable = (value: unknown, valuePath?: string): unknown => {
  if (!valuePath) {
    return value
  }

  return getNestedValue(value, valuePath)
}

const formatVariableValue = (
  variable: RelationTemplateVariable | FieldTemplateVariable,
  value: unknown,
): string | number | '' => {
  const extractedValue = extractValueForVariable(value, variable.valuePath)

  if (variable.format === 'number') {
    if (typeof extractedValue === 'number') {
      return extractedValue
    }

    if (typeof extractedValue === 'string') {
      const parsed = Number(extractedValue)
      return Number.isNaN(parsed) ? extractedValue : parsed
    }
  }

  if (typeof extractedValue === 'string' || typeof extractedValue === 'number') {
    return extractedValue
  }

  if (typeof extractedValue === 'boolean') {
    return extractedValue ? 'true' : 'false'
  }

  return ''
}

const ArrayRowLabel: React.FC<ArrayRowLabelArgs> = ({
  fieldToUse,
  template = false,
  fallbackLabel = 'Item {{index}}',
  templateVariables = [],
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, rowNumber } = useRowLabel<any>()
  const [resolvedRelations, setResolvedRelations] = useState<Record<string, unknown>>({})
  const [pendingRequests, setPendingRequests] = useState<RelationshipRequest[]>([])
  const [currentRequest, setCurrentRequest] = useState<RelationshipRequest | null>(null)
  const relationshipCacheRef = useRef<Map<string, unknown>>(new Map())

  const relationVariables = useMemo(() => {
    return templateVariables.filter(
      (variable): variable is RelationTemplateVariable => 'relationPath' in variable,
    )
  }, [templateVariables])

  const relationshipTargets = useMemo(() => {
    if (!relationVariables.length) {
      return []
    }

    return relationVariables
      .map((config) => {
        const resolvedValue = resolvedRelations[config.relationPath]

        if (resolvedValue && isRecord(resolvedValue)) {
          if (!resolvedValue.id) {
            resolvedValue.id = extractRelationId(getNestedValue(data, config.relationPath))
          }

          const hasRequestedField =
            !config.valuePath || getNestedValue(resolvedValue, config.valuePath) !== undefined

          if (hasRequestedField) {
            return {
              type: 'resolved' as const,
              path: config.relationPath,
              value: resolvedValue,
            }
          }
        }

        const rawValue = getNestedValue(data, config.relationPath)

        if (!rawValue) {
          return null
        }

        const inlineRecord = getInlineRelationRecord(rawValue, config.valuePath)

        if (inlineRecord) {
          const hasRequestedField =
            !config.valuePath || getNestedValue(inlineRecord, config.valuePath) !== undefined

          if (hasRequestedField) {
            return {
              type: 'resolved' as const,
              path: config.relationPath,
              value: inlineRecord,
            }
          }
        }

        const relationId = extractRelationId(rawValue)

        if (!relationId) {
          return null
        }

        const relationSlug = resolveRelationshipSlug(
          config,
          isRelationshipValueObject(rawValue) && typeof rawValue.relationTo === 'string'
            ? rawValue.relationTo
            : undefined,
        )

        if (!relationSlug) {
          return null
        }

        return {
          type: 'request' as const,
          path: config.relationPath,
          slug: relationSlug,
          id: relationId,
          valuePath: config.valuePath,
        }
      })
      .filter((target): target is RelationshipTarget => target !== null)
  }, [data, relationVariables, resolvedRelations])

  const awaitingRelationships = useMemo(() => {
    return relationshipTargets.some((target) => target.type === 'request')
  }, [relationshipTargets])

  useEffect(() => {
    if (!relationVariables.length) {
      setResolvedRelations((current) => (Object.keys(current).length ? {} : current))
      setPendingRequests((current) => (current.length ? [] : current))
      setCurrentRequest((current) => (current ? null : current))
      return
    }

    const nextResolved: Record<string, unknown> = {}
    const nextQueue: RelationshipRequest[] = []

    relationshipTargets.forEach((target) => {
      if (target.type === 'resolved') {
        nextResolved[target.path] = target.value
        return
      }

      const params: Record<string, unknown> = {}

      const cacheKey = createRelationshipCacheKey(target.slug, target.id)

      if (relationshipCacheRef.current.has(cacheKey)) {
        nextResolved[target.path] = relationshipCacheRef.current.get(cacheKey)
        return
      }

      nextQueue.push({
        cacheKey,
        id: target.id,
        params,
        path: target.path,
        slug: target.slug,
        valuePath: target.valuePath,
      })
    })

    setResolvedRelations((current) =>
      shallowEqualRecord(current, nextResolved) ? current : nextResolved,
    )
    setPendingRequests((current) => (areRequestsEqual(current, nextQueue) ? current : nextQueue))
    if (!nextQueue.length) {
      setCurrentRequest((current) => (current ? null : current))
    }
  }, [relationVariables, relationshipTargets])

  useEffect(() => {
    if (currentRequest || !pendingRequests.length) {
      return
    }

    setCurrentRequest(pendingRequests[0])
  }, [currentRequest, pendingRequests])

  useEffect(() => {
    if (!relationVariables.length) {
      return
    }

    setResolvedRelations((current) => {
      let changed = false
      const next = { ...current }

      relationVariables.forEach(({ relationPath }) => {
        const inlineValue = getNestedValue(data, relationPath)
        if (!inlineValue && relationPath in next) {
          delete next[relationPath]
          changed = true
        }
      })

      return changed ? next : current
    })
  }, [data, relationVariables])

  useEffect(() => {
    if (!currentRequest) {
      return
    }

    let isMounted = true
    const fetchController = new AbortController()

    const fetchRelation = async (): Promise<void> => {
      try {
        const searchParams = new URLSearchParams()
        Object.entries(currentRequest.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.set(key, String(value))
          }
        })

        const queryString = searchParams.toString()
        const url = `/api/${currentRequest.slug}/${currentRequest.id}${
          queryString ? `?${queryString}` : ''
        }`

        const response = await fetch(url, {
          credentials: 'include',
          signal: fetchController.signal,
        })

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          return
        }

        const payload = await response.json()
        const doc = payload?.doc ?? payload

        relationshipCacheRef.current.set(currentRequest.cacheKey, doc)

        setResolvedRelations((prev) => {
          if (prev[currentRequest.path] === doc) {
            return prev
          }

          return {
            ...prev,
            [currentRequest.path]: doc,
          }
        })
      } catch (error) {
        if (!fetchController.signal.aborted) {
          // eslint-disable-next-line no-console
          console.error('[ArrayRowLabel] error fetching relation doc', error)
        }
      } finally {
        if (!fetchController.signal.aborted) {
          setPendingRequests((prev) =>
            prev.filter((request) => request.cacheKey !== currentRequest.cacheKey),
          )
          setCurrentRequest(null)
        }
      }
    }

    void fetchRelation()

    return () => {
      isMounted = false
      fetchController.abort()
    }
  }, [currentRequest])

  const enrichedData = useMemo(() => {
    if (!isRecord(data)) {
      return data
    }

    if (!Object.keys(resolvedRelations).length) {
      return data
    }

    const mergedData = { ...data }

    Object.entries(resolvedRelations).forEach(([path, value]) => {
      if (!value) {
        return
      }

      if (path.includes('.')) {
        setNestedValue(mergedData, path, value)
      } else {
        mergedData[path] = value
      }
    })

    return mergedData
  }, [data, resolvedRelations])

  const templateValueSource = isRecord(enrichedData) ? enrichedData : data

  const templateVariableValues = useMemo(() => {
    if (!templateVariables.length) {
      return {}
    }

    const values: Record<string, string | number> = {}

    templateVariables.forEach((variable) => {
      let sourceValue: unknown

      if ('relationPath' in variable) {
        const resolved = resolvedRelations[variable.relationPath]

        if (isRecord(resolved)) {
          sourceValue = resolved
        } else if (isRecord(templateValueSource)) {
          const inlineValue = getInlineRelationRecord(
            getNestedValue(templateValueSource, variable.relationPath),
            variable.valuePath,
          )

          if (isRecord(inlineValue) && !isRelationshipValueObject(inlineValue)) {
            sourceValue = inlineValue
          }
        }
      } else if (isRecord(templateValueSource)) {
        sourceValue = getNestedValue(templateValueSource, variable.fieldPath)
      }

      if (sourceValue === undefined || sourceValue === null) {
        if (variable.fallback) {
          values[variable.key] = variable.fallback
        }
        return
      }

      const formatted = formatVariableValue(variable, sourceValue)

      if (formatted !== '' && formatted !== null && formatted !== undefined) {
        values[variable.key] = formatted
      } else if (variable.fallback) {
        values[variable.key] = variable.fallback
      }
    })

    return values
  }, [resolvedRelations, templateValueSource, templateVariables])

  const templateContext = useMemo(() => {
    const baseContext: Record<string, unknown> = {
      index: rowNumber ?? 0,
      helpers: TEMPLATE_HELPERS,
      ...templateVariableValues,
    }

    if (isRecord(enrichedData)) {
      return {
        ...enrichedData,
        ...baseContext,
      }
    }

    return baseContext
  }, [enrichedData, rowNumber, templateVariableValues])

  const customLabel = useMemo(() => {
    let labelValue = ''
    let shouldUseFallback = false

    if (!template) {
      const value = getNestedValue(enrichedData, fieldToUse)
      if (typeof value === 'string' || typeof value === 'number') {
        labelValue = String(value).trim()
      }
      shouldUseFallback = !labelValue
    } else {
      shouldUseFallback = awaitingRelationships || hasEmptyFieldValues(fieldToUse, templateContext)

      if (!shouldUseFallback) {
        labelValue = processTemplate(fieldToUse, templateContext).trim()

        if (!labelValue) {
          shouldUseFallback = true
        }
      }
    }

    if (shouldUseFallback) {
      labelValue = processTemplate(fallbackLabel, templateContext)
    }

    return labelValue
  }, [awaitingRelationships, fieldToUse, fallbackLabel, enrichedData, template, templateContext])

  return <>{customLabel}</>
}

export default ArrayRowLabel
