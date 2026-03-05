'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { headers } from 'next/headers'

const createAccountSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['checking', 'savings', 'credit', 'cash', 'investment']),
  balance: z.number(), // in dollars/units from form
  currency: z.enum(['USD', 'EUR', 'GBP', 'COP']),
  color: z.string().optional(),
  creditLimit: z.number().optional(),
})

export async function createAccount(data: z.infer<typeof createAccountSchema>) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || user.collection !== 'members') {
    throw new Error('Unauthorized')
  }

  try {
    let balanceInCents = Math.round(data.balance * 100)

    if (data.type === 'credit') {
      balanceInCents = -Math.abs(balanceInCents)
    }

    await payload.create({
      collection: 'accounts',
      data: {
        name: data.name,
        type: data.type,
        balance: balanceInCents,
        currency: data.currency,
        color: data.color,
        creditLimit: data.creditLimit ? Math.round(data.creditLimit * 100) : undefined,
        owner: user.id,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to create account' }
  }

  redirect('/app/accounts')
}

export async function updateAccount(
  id: string,
  data: Partial<z.infer<typeof createAccountSchema>>,
) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || user.collection !== 'members') {
    throw new Error('Unauthorized')
  }

  try {
    const updateData: any = { ...data }
    if (typeof data.balance === 'number') {
      const balanceInCents = Math.round(data.balance * 100)
      if (updateData.type === 'credit' || (!updateData.type && data.type === 'credit')) {
        // If updating balance, and it's a credit account (either new type or existing type if not changing type)
        // We need to know the type to do this logic correctly in update.
        // However, data is Partial. We might not have type.
        // Ideally we fetch account to check type if not provided, OR we rely on frontend sending it.
        // For now, let's assume if they are editing, they see the negative value?
        // Actually, if we invert it on create, it shows as negative.
        // Users might be confused seeing negative.
        // If they see -500 and change to -600, it works.
        // If they see -500 and change to 600 (thinking debt), we should probably not auto-invert on update unless we change the UI to show absolute value for credit.
        // Let's stick to Create logic modification for now as per user request context (initial of new account).
        updateData.balance = balanceInCents
      } else {
        updateData.balance = balanceInCents
      }
    }

    await payload.update({
      collection: 'accounts',
      id,
      data: {
        name: updateData.name,
        type: updateData.type,
        balance: updateData.balance,
        currency: updateData.currency,
        color: updateData.color,
        creditLimit: updateData.creditLimit ? Math.round(updateData.creditLimit * 100) : undefined,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to update account' }
  }

  // Usually handled by client-side mutation invalidation, but could redirect or just return success
  return { success: true }
}

export async function deleteAccount(id: string) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || user.collection !== 'members') {
    throw new Error('Unauthorized')
  }

  try {
    await payload.delete({
      collection: 'accounts',
      id,
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete account' }
  }

  return { success: true }
}
