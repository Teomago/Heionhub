import type { CollectionAfterDeleteHook } from 'payload'

export const afterDeleteCascade: CollectionAfterDeleteHook = async ({ req, doc }) => {
  if (!doc?.id) return

  const ownerId = doc.id
  const targetCollections = [
    'transactions',
    'accounts',
    'budgets',
    'categories',
    'scheduled-transactions',
  ] as any[]

  for (const collection of targetCollections) {
    try {
      // User strictly requested payload.db.deleteMany to avoid timeouts with large datasets
      await req.payload.db.deleteMany({
        collection,
        where: { owner: { equals: ownerId } },
        req,
      })
      req.payload.logger.info(`[Privacy Compliance] Hard deleted ${collection} for Member ${ownerId}`)
    } catch (err: unknown) {
      req.payload.logger.error(`[Privacy Compliance] Failed to hard delete ${collection} for Member ${ownerId}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
}
