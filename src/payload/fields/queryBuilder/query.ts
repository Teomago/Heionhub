import { JSONField } from 'payload'
import { WhereBuilderFieldArgs, WhereBuilderOptions } from './types'

/**
 * Admin configuration for the Query Builder field
 * @param options - Configuration options for the Query Builder
 * @returns Admin components configuration for the Query Builder field
 *
 * @example
 * ```ts
 * import { whereBuilderFieldAdmin } from 'payload/fields/queryBuilder'
 * {
 *  name: 'query',
 *  type: 'json',
 *  admin: {
 *      ...whereBuilderFieldAdmin({ collectionSlug: 'pages' }),
 *  }
 * }
 */
export const whereBuilderFieldAdmin = (options: WhereBuilderOptions) => ({
  components: {
    Field: {
      path: '@/payload/fields/queryBuilder/ui',
      clientProps: {
        ...options,
      },
    },
  },
})
/**
 * Utility to create a Query Builder field for building `where` queries
 * @param args - Configuration options for the Query Builder field
 * @returns A JSONField configured as a Query Builder
 */
export const queryBuilder = (args: WhereBuilderFieldArgs) => {
  const options: WhereBuilderOptions = {
    collectionSlug: args.collectionSlug,
    collectionSlugField: args.collectionSlugField,
    showRawJSON: args.showRawJSON === true,
  }
  const baseField: JSONField = {
    name: args.name,
    type: 'json',
    required: args.required || false,
    label: args.label,
    admin: {
      description: args.description,
      ...whereBuilderFieldAdmin(options),
    },
  }

  if (typeof args.overrides === 'function') {
    return args.overrides(baseField)
  }
  return baseField
}

/**
 * Maybe create another utlity for creating select fields for collections?
 * That way we can use type-safe CollectionSlug options, with auto-complete
 */
