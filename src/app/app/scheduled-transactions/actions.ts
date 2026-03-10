'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { z } from 'zod'

const scheduledTransactionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  frequency: z.enum(['weekly', 'monthly', 'yearly']),
  nextDueDate: z.string(),
  account: z.string().optional(),
  category: z.string().optional(),
})

export async function createScheduledTransaction(data: z.infer<typeof scheduledTransactionSchema>) {
  let user, payload
  try {
    const auth = await assertUser()
    user = auth.user
    payload = auth.payload
  } catch (e) {
    return { error: 'Unauthorized' }
  }

  try {
    const amountInCents = Math.round(data.amount * 100)

    await payload.create({
      collection: 'scheduled-transactions',
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
    return { error: 'Failed to create scheduled transaction' }
  }
}

export async function updateScheduledTransaction(
  id: string,
  data: z.infer<typeof scheduledTransactionSchema>,
) {
  let user, payload
  try {
    const auth = await assertUser()
    user = auth.user
    payload = auth.payload
  } catch (e) {
    return { error: 'Unauthorized' }
  }

  try {
    const existing = await payload.findByID({
      collection: 'scheduled-transactions',
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
      collection: 'scheduled-transactions',
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
    return { error: 'Failed to update scheduled transaction' }
  }
}

export async function deleteScheduledTransaction(id: string) {
  let user, payload
  try {
    const auth = await assertUser()
    user = auth.user
    payload = auth.payload
  } catch (e) {
    return { error: 'Unauthorized' }
  }

  try {
    const existing = await payload.findByID({
      collection: 'scheduled-transactions',
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
      collection: 'scheduled-transactions',
      id,
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete scheduled transaction' }
  }
}
