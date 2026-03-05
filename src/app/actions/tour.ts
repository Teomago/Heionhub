'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { getAuthUser } from '@/lib/auth/getAuthUser'

export async function markTourCompleted() {
  const user = await getAuthUser()

  if (!user || user.collection !== 'members') {
    throw new Error('Unauthorized')
  }

  const payload = await getPayload()

  await payload.update({
    collection: 'members',
    id: user.id,
    data: {
      hasCompletedTour: true,
    },
  })

  // We intentionally do NOT revalidatePath here because the tour dismissal
  // is a purely visual state change and we don't want to lag the UI.
}

export async function markImportTourCompleted() {
  const user = await getAuthUser()

  if (!user || user.collection !== 'members') {
    throw new Error('Unauthorized')
  }

  const payload = await getPayload()

  await payload.update({
    collection: 'members',
    id: user.id,
    data: {
      hasCompletedImportTour: true,
    },
  })
}
