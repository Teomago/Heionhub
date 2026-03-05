import type { SelectFieldSingleValidation } from 'payload'
import type { DynamicCollectionSlug } from '@/payload/constants/dynamicCollections'

/**
 * Validates that a dynamic page's type or collection cannot be changed if it has children.
 *
 * This ensures "referential integrity" for the dynamic routing system.
 *
 * NOTE: FigmaCMS adaptation — no `_status` / draft checks since versions are not supported.
 */
export const validateDynamicPageSafeChange = (
  fieldToProtect: 'type' | 'dynamicCollection',
): SelectFieldSingleValidation => {
  return async (value, { req, id, operation, data }) => {
    const payload = req.payload
    if (!payload) return true

    // 1. Fetch original state if updating
    const originalDoc =
      operation === 'update' && id
        ? await payload.findByID({
            collection: 'pages',
            id,
            select: { type: true, dynamicCollection: true },
          })
        : null

    // 2. Protection for existing dynamic pages (only on update)
    if (
      operation === 'update' &&
      originalDoc?.type === 'dynamic' &&
      originalDoc.dynamicCollection
    ) {
      const oldCollection = originalDoc.dynamicCollection as DynamicCollectionSlug

      // Check if the field we are protecting is actually changing AWAY from its dynamic state
      const isChangingAway =
        fieldToProtect === 'type' ? value !== 'dynamic' : value !== originalDoc.dynamicCollection

      if (isChangingAway) {
        // Check for children in the linked collection
        const { totalDocs: childrenCount } = await payload.count({
          collection: oldCollection,
        })

        if (childrenCount > 0) {
          const collectionLabel = oldCollection.replace('-', ' ')
          return `Cannot change ${fieldToProtect === 'type' ? 'page type' : 'collection'}: ${childrenCount} ${collectionLabel} item${childrenCount === 1 ? '' : 's'} depend on this listing page. Delete them first.`
        }
      }
    }

    // 3. Uniqueness Check: Ensure no other dynamic page uses this collection
    const targetType = (data as any)?.type || originalDoc?.type
    const targetCollection = (data as any)?.dynamicCollection || originalDoc?.dynamicCollection

    if (targetType === 'dynamic' && targetCollection) {
      const { totalDocs: duplicateCount } = await payload.count({
        collection: 'pages',
        where: {
          and: [
            ...(id ? [{ id: { not_equals: id } }] : []),
            { type: { equals: 'dynamic' } },
            { dynamicCollection: { equals: targetCollection } },
            { _status: { equals: 'published' } },
          ],
        },
      })

      if (duplicateCount > 0) {
        return `A dynamic page for ${targetCollection.replace('-', ' ')} already exists. Each collection can only have one dynamic page.`
      }
    }

    return true
  }
}
