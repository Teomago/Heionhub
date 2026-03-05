import type { FieldHook } from 'payload'

/**
 * Validates that only one page can be marked as the home page at a time.
 * If this page is being set as home, checks if another page already has isHome=true.
 */
export const validateHomePage: FieldHook = async ({ data, req, value, operation, originalDoc }) => {
  if (!value) return value

  // Only check when isHome is being set to true
  if (operation === 'create' || operation === 'update') {
    const payload = req.payload

    const existing = await payload.find({
      collection: 'pages',
      where: {
        isHome: { equals: true },
        ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
      },
      limit: 1,
      depth: 0,
      select: { title: true },
      req,
    })

    if (existing.docs.length > 0) {
      const otherPage = existing.docs[0]
      throw new Error(
        `The page "${otherPage.title}" is already set as the home page. Please deselect it first before setting this page as home.`,
      )
    }
  }

  return value
}
