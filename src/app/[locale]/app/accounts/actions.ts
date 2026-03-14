'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createAccountSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['checking', 'savings', 'credit', 'cash', 'investment']),
  balance: z.number(), // in dollars/units from form
  currency: z.enum(['USD', 'EUR', 'GBP', 'COP']),
  color: z.string().optional(),
  creditLimit: z.number().optional(),
})

export async function createAccount(data: z.infer<typeof createAccountSchema>) {
  const { user, payload } = await assertUser()

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
  const { user, payload } = await assertUser()

  try {
    const updateData: any = { ...data }
    if (typeof data.balance === 'number') {
      const balanceInCents = Math.round(data.balance * 100)
      if (updateData.type === 'credit' || (!updateData.type && data.type === 'credit')) {
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

  return { success: true }
}

export async function deleteAccount(id: string) {
  const { user, payload } = await assertUser()

  try {
    // 1. Fetch account and verify ownership (Requirement 4)
    const existing = await payload.findByID({
      collection: 'accounts',
      id,
    })

    if (!existing || !existing.owner) {
      return { error: 'Account not found or unauthorized' }
    }

    const ownerId = typeof existing.owner === 'object' ? existing.owner.id : existing.owner

    if (ownerId !== user.id) {
      return { error: 'Account not found or unauthorized' }
    }

    // 2. Cascade delete associated transactions (Requirement 5)
    await payload.db.deleteMany({
      collection: 'transactions',
      where: {
        or: [
          { account: { equals: id } },
          { toAccount: { equals: id } }
        ]
      }
    })

    // 3. Perform hard delete of the account (Requirement 3)
    await payload.delete({
      collection: 'accounts',
      id,
    })

    // 4. Revalidate cache (Requirement 1)
    revalidatePath('/[locale]/app', 'layout')
    
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete account' }
  }
}
