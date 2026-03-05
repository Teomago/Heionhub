import { Labels } from 'payload'

const fallbackLabel = (slug: string): string => {
  // Convert slug to PascalCase for better readability
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const addSuffixToBlockLabels = ({
  labels,
  suffix,
  blockSlug,
}: {
  labels?: Labels
  suffix: string
  blockSlug: string
}): Labels => {
  const resultLabels = {
    ...labels,
  }
  // Adding suffix only in development mode to make it easier to identify nested blocks
  // They will have the same labels as root blocks in production to avoid confusion for content editors
  if (process.env.NODE_ENV !== 'development') {
    return resultLabels as Labels
  }
  // Handle not defined labels
  if (!resultLabels.singular) {
    resultLabels.singular = fallbackLabel(blockSlug)
  }
  if (!resultLabels.plural) {
    resultLabels.plural = fallbackLabel(blockSlug)
  }
  // Handle string labels (and also we adding suffix to fallback labels)
  if (typeof resultLabels.singular === 'string') {
    resultLabels.singular = `${resultLabels.singular} ${suffix}`
  }
  if (typeof resultLabels.plural === 'string') {
    resultLabels.plural = `${resultLabels.plural} ${suffix}`
  }

  // Handle object labels (localized)
  if (typeof resultLabels.singular === 'object') {
    for (const key in resultLabels.singular) {
      resultLabels.singular[key] = `${resultLabels.singular[key]} ${suffix}`
    }
  }
  if (typeof resultLabels.plural === 'object') {
    for (const key in resultLabels.plural) {
      resultLabels.plural[key] = `${resultLabels.plural[key]} ${suffix}`
    }
  }

  // Handle function labels
  if (typeof resultLabels.singular === 'function') {
    const originalSingularFn = resultLabels.singular
    resultLabels.singular = (data) => `${originalSingularFn(data)} ${suffix}`
  }
  if (typeof resultLabels.plural === 'function') {
    const originalPluralFn = resultLabels.plural
    resultLabels.plural = (data) => `${originalPluralFn(data)} ${suffix}`
  }

  return resultLabels as Labels
}

export const addSuffixToBlockInterfaceName = (interfaceName: string, suffix: string): string => {
  // If interfaceName ends with "Type", insert suffix before "Type"
  if (interfaceName.endsWith('Type')) {
    return `${interfaceName.slice(0, -4)}${suffix}Type`
  }
  return `${interfaceName}${suffix}`
}
