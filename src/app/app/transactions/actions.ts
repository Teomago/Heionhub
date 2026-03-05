'use server'

import { getPayload } from '@/lib/payload/getPayload'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { headers } from 'next/headers'
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
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    throw new Error('Unauthorized')
  }

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

    if (data.type === 'income') {
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: {
          balance: account.balance + amountInCents,
        },
      })
    } else if (data.type === 'expense') {
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: {
          balance: account.balance - amountInCents,
        },
      })
    } else if (data.type === 'transfer' && data.toAccount) {
      // Deduct from source
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: {
          balance: account.balance - amountInCents,
        },
      })

      // Add to destination (fetch fresh to be safe or use what we check)
      const toAccount = await payload.findByID({
        collection: 'accounts',
        id: data.toAccount,
      })

      await payload.update({
        collection: 'accounts',
        id: data.toAccount,
        data: {
          balance: toAccount.balance + amountInCents,
        },
      })
    }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to create transaction' }
  }

  redirect('/app/transactions')
}

export async function deleteTransaction(id: string) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
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

    // Revert balance changes
    const amountInCents = existing.amount
    const accountId = typeof existing.account === 'object' ? existing.account.id : existing.account
    const toAccountId =
      typeof existing.toAccount === 'object' ? existing.toAccount?.id : existing.toAccount

    const account = await payload.findByID({
      collection: 'accounts',
      id: accountId,
    })

    if (existing.type === 'income') {
      await payload.update({
        collection: 'accounts',
        id: accountId,
        data: { balance: account.balance - amountInCents },
      })
    } else if (existing.type === 'expense') {
      await payload.update({
        collection: 'accounts',
        id: accountId,
        data: { balance: account.balance + amountInCents },
      })
    } else if (existing.type === 'transfer' && toAccountId) {
      // Revert transfer: Add back to source, deduct from dest
      await payload.update({
        collection: 'accounts',
        id: accountId,
        data: { balance: account.balance + amountInCents },
      })

      const toAccount = await payload.findByID({
        collection: 'accounts',
        id: toAccountId,
      })

      await payload.update({
        collection: 'accounts',
        id: toAccountId,
        data: { balance: toAccount.balance - amountInCents },
      })
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

  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
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

    // 1. Revert Old Balance
    const oldAmount = existing.amount
    const oldAccountId =
      typeof existing.account === 'object' ? existing.account.id : existing.account
    const oldToAccountId =
      typeof existing.toAccount === 'object' ? existing.toAccount?.id : existing.toAccount

    const oldAccount = await payload.findByID({ collection: 'accounts', id: oldAccountId })

    if (existing.type === 'income') {
      await payload.update({
        collection: 'accounts',
        id: oldAccountId,
        data: { balance: oldAccount.balance - oldAmount },
      })
    } else if (existing.type === 'expense') {
      await payload.update({
        collection: 'accounts',
        id: oldAccountId,
        data: { balance: oldAccount.balance + oldAmount },
      })
    } else if (existing.type === 'transfer' && oldToAccountId) {
      await payload.update({
        collection: 'accounts',
        id: oldAccountId,
        data: { balance: oldAccount.balance + oldAmount },
      })
      const oldToAccount = await payload.findByID({ collection: 'accounts', id: oldToAccountId })
      await payload.update({
        collection: 'accounts',
        id: oldToAccountId,
        data: { balance: oldToAccount.balance - oldAmount },
      })
    }

    // 2. Update Transaction
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

    // 3. Apply New Balance
    // We need to fetch accounts again as they might have changed (or use the returned val from update but that's partial).
    // Better to fetch fresh.
    const newAccount = await payload.findByID({ collection: 'accounts', id: data.account })

    if (data.type === 'income') {
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: { balance: newAccount.balance + newAmountInCents },
      })
    } else if (data.type === 'expense') {
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: { balance: newAccount.balance - newAmountInCents },
      })
    } else if (data.type === 'transfer' && data.toAccount) {
      await payload.update({
        collection: 'accounts',
        id: data.account,
        data: { balance: newAccount.balance - newAmountInCents },
      })
      const newToAccount = await payload.findByID({ collection: 'accounts', id: data.toAccount })
      await payload.update({
        collection: 'accounts',
        id: data.toAccount,
        data: { balance: newToAccount.balance + newAmountInCents },
      })
    }

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
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
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
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    throw new Error('Unauthorized')
  }

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
