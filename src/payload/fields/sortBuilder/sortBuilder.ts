import { TextField } from 'payload'
import { SortBuilderFieldArgs, SortBuilderOptions } from './types'

/**
 * Admin configuration for the Query Builder field
 * @param options - Configuration options for the Query Builder
 * @returns Admin components configuration for the Query Builder field
 *
 * @example
 * ```ts
 * import { sortBuilderFieldAdmin } from 'payload/fields/queryBuilder'
 * {
 *  name: 'query',
 *  type: 'text',
 *  hasMany: true,
 *  admin: {
 *      ...sortBuilderFieldAdmin({ collectionSlug: 'pages' }),
 *  }
 * }
 */
export const sortBuilderFieldAdmin = (options: SortBuilderOptions) => ({
  components: {
    Field: {
      path: '@/payload/fields/sortBuilder/ui',
      clientProps: {
        ...options,
      },
    },
  },
})
/**
 * Utility to create a Sort Builder field for building `sort` queries
 * @param args - Configuration options for the Sort Builder field
 * @returns A TextField configured as a Sort Builder
 */
export const sortBuilder = (args: SortBuilderFieldArgs) => {
  const options: SortBuilderOptions = {
    collectionSlug: args.collectionSlug,
    collectionSlugField: args.collectionSlugField,
  }
  const baseField: TextField = {
    name: args.name,
    type: 'text',
    hasMany: true,
    required: args.required || false,
    label: args.label,
    admin: {
      description: args.description,
      ...sortBuilderFieldAdmin(options),
    },
  }

  if (typeof args.overrides === 'function') {
    return {
      ...args.overrides(baseField),
      //Force hasMany to true, regardless of overrides
      hasMany: true,
    } as TextField
  }
  return baseField
}
