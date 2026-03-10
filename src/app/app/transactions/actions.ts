'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { Member } from '@/payload/payload-types'

const createTransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(['income', 'expense', 'transfer']),
  date: z.string(), // ISO string from date picker
  description: z.string().optional(),
  account: z.string().min(1, 'Account is required'), // ID
  toAccount: z.string().optional(), // ID
  category: z.string().optional(), // Category ID
})

export async function createTransaction(data: z.infer<typeof createTransactionSchema>) {
  const { user, payload } = await assertUser()

  const account = await payload.findByID({
    collection: 'accounts',
    id: data.account,
  })

  // Safe checks for owner
  const accountOwnerId =
    account && typeof account.owner === 'object' ? (account.owner as Member).id : account?.owner

  if (!account || accountOwnerId !== user.id) {
    throw new Error('Unauthorized access to account')
  }

  if (data.type === 'transfer' && data.toAccount) {
    const toAccount = await payload.findByID({
      collection: 'accounts',
      id: data.toAccount,
    })

    const toAccountOwnerId =
      toAccount && typeof toAccount.owner === 'object'
        ? (toAccount.owner as Member).id
        : toAccount?.owner

    if (!toAccount || toAccountOwnerId !== user.id) {
      throw new Error('Unauthorized access to destination account')
    }
  }

  try {
    const amountInCents = Math.round(data.amount * 100)

    await payload.create({
      collection: 'transactions',
      data: {
        amount: amountInCents,
        type: data.type,
        date: data.date,
        description: data.description,
        account: data.account,
        toAccount: data.type === 'transfer' ? data.toAccount : undefined,
        category: data.category,
        owner: user.id,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to create transaction' }
  }

  redirect('/app/transactions')
}

export async function deleteTransaction(id: string) {
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
      collection: 'transactions',
      id,
    })

    const ownerId =
      existing && existing.owner
        ? typeof existing.owner === 'object'
          ? existing.owner.id
          : existing.owner
        : null
    if (!existing || ownerId !== user.id) {
      return { error: 'Transaction not found or unauthorized' }
    }

    await payload.delete({
      collection: 'transactions',
      id,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete transaction' }
  }
}

export async function updateTransaction(id: string, data: z.infer<typeof createTransactionSchema>) {
  // For simplicity, we create a new transaction and delete the old one to handle all balance updates correctly
  // or we can implement the diff logic.
  // Deleting old and creating new is safer for balance consistency but changes ID (if we were creating new).
  // Here we want to update. Use delete logic (revert) then create logic (apply) but keep ID?
  // Payload update doesn't automatically handle side effects unless we code hooks.
  // Since we are doing it in actions, let's:
  // 1. Revert old transaction effects.
  // 2. Update transaction data.
  // 3. Apply new transaction effects.

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
      collection: 'transactions',
      id,
    })

    const ownerId =
      existing && existing.owner
        ? typeof existing.owner === 'object'
          ? existing.owner.id
          : existing.owner
        : null

    if (!existing || ownerId !== user.id) {
      return { error: 'Transaction not found or unauthorized' }
    }

    const newAmountInCents = Math.round(data.amount * 100)
    await payload.update({
      collection: 'transactions',
      id,
      data: {
        amount: newAmountInCents,
        type: data.type,
        date: data.date,
        description: data.description,
        account: data.account,
        toAccount: data.type === 'transfer' ? data.toAccount : undefined,
      },
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to update transaction' }
  }
}

export async function exportFilteredTransactions(params: {
  description?: string
  dateRange?: string
  type?: string
  category?: string
  account?: string
  sort?: string
}) {
  let user, payload
  try {
    const auth = await assertUser()
    user = auth.user
    payload = auth.payload
  } catch (e) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const where: any = {
      and: [{ owner: { equals: user.id } }],
    }

    if (params.description) {
      where.and.push({ description: { contains: params.description } })
    }

    if (params.type && params.type !== 'all') {
      where.and.push({ type: { equals: params.type } })
    }

    if (params.category && params.category !== 'all') {
      where.and.push({ category: { equals: params.category } })
    }

    if (params.account && params.account !== 'all') {
      where.and.push({ account: { equals: params.account } })
    }

    if (params.dateRange && params.dateRange !== 'all') {
      const now = new Date()
      let startDate: Date | undefined
      let endDate: Date | undefined

      switch (params.dateRange) {
        case 'thisMonth':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          break
        case 'lastMonth':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          endDate = new Date(now.getFullYear(), now.getMonth(), 0)
          break
        case 'last3Months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1)
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          break
        case 'thisYear':
          startDate = new Date(now.getFullYear(), 0, 1)
          endDate = new Date(now.getFullYear(), 11, 31)
          break
      }

      if (startDate && endDate) {
        where.and.push({
          date: {
            greater_than_equal: startDate.toISOString(),
            less_than_equal: endDate.toISOString(),
          },
        })
      }
    }

    // We increase limits for bulk exporting vs paginated viewing
    const transactions = await payload.find({
      collection: 'transactions',
      where,
      sort: params.sort || '-date',
      limit: 10000,
      depth: 1,
    })

    // Transform into exactly the structure our Import feature accepts
    const flatData = transactions.docs.map((tx) => {
      const accountObj = typeof tx.account === 'object' ? tx.account : null
      const categoryObj = typeof tx.category === 'object' ? tx.category : null

      return {
        Date: new Date(tx.date).toISOString().split('T')[0],
        Description: tx.description || '',
        Amount: (tx.amount / 100).toFixed(2),
        Type: tx.type,
        CategoryName: categoryObj?.name || 'Uncategorized',
        AccountName: accountObj?.name || 'Default Account',
      }
    })

    return { success: true, data: flatData }
  } catch (error) {
    console.error('Export Error:', error)
    return { success: false, error: 'Critical error rendering export query.' }
  }
}

export async function getTransactionsPaginated(
  params: {
    description?: string
    dateRange?: string
    type?: string
    category?: string
    account?: string
    sort?: string
  },
  page: number = 1,
  limit: number = 50,
) {
  const { user, payload } = await assertUser()

  const where: any = {
    and: [{ owner: { equals: user.id } }],
  }

  if (params.description) {
    where.and.push({ description: { contains: params.description } })
  }

  if (params.type && params.type !== 'all') {
    where.and.push({ type: { equals: params.type } })
  }

  if (params.category && params.category !== 'all') {
    where.and.push({ category: { equals: params.category } })
  }

  if (params.account && params.account !== 'all') {
    where.and.push({ account: { equals: params.account } })
  }

  if (params.dateRange && params.dateRange !== 'all') {
    const now = new Date()
    let startDate: Date | undefined
    let endDate: Date | undefined

    switch (params.dateRange) {
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case 'last3Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        break
      case 'thisYear':
        startDate = new Date(now.getFullYear(), 0, 1)
        endDate = new Date(now.getFullYear(), 11, 31)
        break
    }

    if (startDate && endDate) {
      where.and.push({
        date: {
          greater_than_equal: startDate.toISOString(),
          less_than_equal: endDate.toISOString(),
        },
      })
    }
  }

  const transactions = await payload.find({
    collection: 'transactions',
    where,
    sort: params.sort || '-date',
    limit,
    page,
    depth: 1,
  })

  // We need to return plain objects without Payload abstractions (like Document IDs in memory)
  // Payload docs are mostly plain, but better to be safe with JSON serialization
  return JSON.parse(JSON.stringify(transactions))
}
