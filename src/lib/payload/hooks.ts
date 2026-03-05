'use client'

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { Config } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import * as qs from 'qs-esm'

type CollectionSlug = keyof Config['collections']

interface UseCollectionArgs {
  collection: CollectionSlug
  limit?: number
  page?: number
  sort?: string
  where?: unknown
  depth?: number
}

// Helper to fetch data from Payload API
const fetchCollection = async (args: UseCollectionArgs) => {
  const { collection, ...query } = args
  const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true })

  const response = await fetch(`/api/${collection}${stringifiedQuery}`)

  if (!response.ok) {
    throw new Error(`Error fetching ${collection}: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Hook to fetch a paginated collection from Payload CMS API
 */
export const useCollection = (
  args: UseCollectionArgs,
  queryOptions?: Partial<UseQueryOptions<PaginatedDocs<Config['collections'][CollectionSlug]>>>,
) => {
  return useQuery({
    queryKey: [args.collection, args],
    queryFn: () => fetchCollection(args),
    ...queryOptions,
  })
}
