'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { getAuthUser } from '@/lib/auth/getAuthUser'
import { revalidatePath } from 'next/cache'

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

  revalidatePath('/[locale]/app', 'layout')
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

  revalidatePath('/[locale]/app', 'layout')
}
