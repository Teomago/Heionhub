'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { z } from 'zod'
import { headers } from 'next/headers'

const subscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  frequency: z.enum(['weekly', 'monthly', 'yearly']),
  nextDueDate: z.string(),
  account: z.string().optional(),
  category: z.string().optional(),
})

export async function createSubscription(data: z.infer<typeof subscriptionSchema>) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    return { error: 'Unauthorized' }
  }

  try {
    const amountInCents = Math.round(data.amount * 100)

    await payload.create({
      collection: 'subscriptions',
      data: {
        name: data.name,
        amount: amountInCents,
        frequency: data.frequency,
        nextDueDate: data.nextDueDate,
        account: data.account,
        category: data.category,
        owner: user.id,
      },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to create subscription' }
  }
}

export async function updateSubscription(id: string, data: z.infer<typeof subscriptionSchema>) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    return { error: 'Unauthorized' }
  }

  try {
    const existing = await payload.findByID({
      collection: 'subscriptions',
      id,
    })

    const ownerId =
      existing && existing.owner
        ? typeof existing.owner === 'object'
          ? existing.owner.id
          : existing.owner
        : null

    if (!existing || ownerId !== user.id) {
      return { error: 'Subscription not found or unauthorized' }
    }

    const amountInCents = Math.round(data.amount * 100)

    await payload.update({
      collection: 'subscriptions',
      id,
      data: {
        name: data.name,
        amount: amountInCents,
        frequency: data.frequency,
        nextDueDate: data.nextDueDate,
        account: data.account,
        category: data.category,
      },
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to update subscription' }
  }
}

export async function deleteSubscription(id: string) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    return { error: 'Unauthorized' }
  }

  try {
    const existing = await payload.findByID({
      collection: 'subscriptions',
      id,
    })

    const ownerId =
      existing && existing.owner
        ? typeof existing.owner === 'object'
          ? existing.owner.id
          : existing.owner
        : null

    if (!existing || ownerId !== user.id) {
      return { error: 'Subscription not found or unauthorized' }
    }

    await payload.delete({
      collection: 'subscriptions',
      id,
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete subscription' }
  }
}
