import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePageAfterChange: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  // Only revalidate if the document is published
  if (doc._status === 'published') {
    if (doc.pathname) {
      payload.logger.info(`Revalidating page path: ${doc.pathname}`)
      revalidatePath(doc.pathname)
    }
    // If the pathname changed, revalidate the old one too
    if (previousDoc?.pathname && previousDoc.pathname !== doc.pathname) {
      revalidatePath(previousDoc.pathname)
    }
  }
  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
  if (doc?.pathname) {
    payload.logger.info(`Revalidating deleted page path: ${doc.pathname}`)
    revalidatePath(doc.pathname)
  }
  return doc
}
