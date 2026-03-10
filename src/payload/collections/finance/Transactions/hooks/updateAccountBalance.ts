import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'
import { sql, eq } from 'drizzle-orm'

// Helper to determine if we are adding or subtracting from the primary account
function calculateDirectionalAmount(
  type: 'income' | 'expense' | 'transfer',
  amount: number,
): number {
  if (type === 'income') return amount
  if (type === 'expense') return -amount
  if (type === 'transfer') return -amount // Source account goes down
  return 0
}

// Helper to get ID from string or relationship object
function getId(relation: any): string | undefined {
  if (!relation) return undefined
  return typeof relation === 'object' ? relation.id : relation
}

async function applyDelta(payload: any, accountId: string | undefined, amountToInject: number) {
  if (amountToInject === 0 || !accountId) return

  try {
    // Access the underlying Drizzle ORM via Payload's Postgres Adapter
    const accountsTable = payload.db.tables['accounts']

    if (accountsTable) {
      // Atomically increment the balance, preventing read-write race conditions
      await payload.db.drizzle
        .update(accountsTable)
        .set({
          balance: sql`${accountsTable.balance} + ${amountToInject}`,
        })
        .where(eq(accountsTable.id, accountId))
    }
  } catch (error) {
    console.error('Failed to apply atomic delta to account balance:', error)
  }
}

export const updateAccountBalance: CollectionAfterChangeHook = async ({
  doc, // The current document after the change
  previousDoc, // The document before the change (null on creation)
  operation, // 'create' or 'update'
  req: { payload }, // Payload Local API
}) => {
  let deltaAmount = 0
  const accountId = getId(doc.account)

  if (operation === 'create') {
    // 1. CREATION
    deltaAmount = calculateDirectionalAmount(doc.type, doc.amount)
    await applyDelta(payload, accountId, deltaAmount)

    // Handle Transfers (deduct from source, add to destination)
    if (doc.type === 'transfer' && doc.toAccount) {
      const toAccountId = getId(doc.toAccount)
      await applyDelta(payload, toAccountId, doc.amount) // amount is positive for receiver
    }
  } else if (operation === 'update') {
    const prevAccountId = getId(previousDoc.account)
    const prevToAccountId = getId(previousDoc.toAccount)

    // 1. PERFORMANCE OPTIMIZATION (EARLY RETURN)
    // If no core financial fields changed, skip the hook entirely to save DB queries
    if (
      doc.amount === previousDoc.amount &&
      doc.type === previousDoc.type &&
      accountId === prevAccountId &&
      getId(doc.toAccount) === prevToAccountId &&
      doc.status === previousDoc.status
    ) {
      return doc
    }

    // 2. SOFT DELETION REVERT
    if (previousDoc.status !== 'deleted' && doc.status === 'deleted') {
      // Revert the transaction completely
      deltaAmount = -calculateDirectionalAmount(previousDoc.type, previousDoc.amount)
      await applyDelta(payload, prevAccountId, deltaAmount)

      if (previousDoc.type === 'transfer' && previousDoc.toAccount) {
        await applyDelta(payload, prevToAccountId, -previousDoc.amount)
      }
      return doc // Skip further update logic
    }

    // Potential Soft Restoration (Edge Case)
    if (previousDoc.status === 'deleted' && doc.status !== 'deleted') {
      const restoreDelta = calculateDirectionalAmount(doc.type, doc.amount)
      await applyDelta(payload, accountId, restoreDelta)

      if (doc.type === 'transfer' && doc.toAccount) {
        await applyDelta(payload, getId(doc.toAccount), doc.amount)
      }
      return doc // Skip
    }

    // 3. MODIFICATION (Value, Type, or Account change)
    // First, revert the impact of the PREVIOUS document on the PREVIOUS account
    if (previousDoc.status !== 'deleted') {
      const oldDelta = -calculateDirectionalAmount(previousDoc.type, previousDoc.amount)
      await applyDelta(payload, prevAccountId, oldDelta)

      if (previousDoc.type === 'transfer' && previousDoc.toAccount) {
        await applyDelta(payload, prevToAccountId, -previousDoc.amount)
      }
    }

    // Then, apply the impact of the NEW document on the NEW account
    if (doc.status !== 'deleted') {
      const newDelta = calculateDirectionalAmount(doc.type, doc.amount)
      await applyDelta(payload, accountId, newDelta)

      if (doc.type === 'transfer' && doc.toAccount) {
        const newToAccountId = getId(doc.toAccount)
        await applyDelta(payload, newToAccountId, doc.amount)
      }
    }
  }

  // 4. INVALIDATE ZERO-BLAST-RADIUS CACHE
  const ownerId = getId(doc.owner) || doc.owner
  if (ownerId) {
    revalidateTag(`transactions_user_${ownerId}`)
  }

  return doc
}

export const afterDeleteTransaction: CollectionAfterDeleteHook = async ({
  req: { payload },
  doc,
}) => {
  // Hard Delete Fallback: If deleted directly via Admin panel, revert balances.
  // We only revert if it wasn't already reverted via a Soft Delete transition.
  if (doc.status === 'deleted') {
    return doc
  }

  const accountId = getId(doc.account)
  const delta = -calculateDirectionalAmount(doc.type, doc.amount)

  await applyDelta(payload, accountId, delta)

  if (doc.type === 'transfer' && doc.toAccount) {
    const toAccountId = getId(doc.toAccount)
    await applyDelta(payload, toAccountId, -doc.amount)
  }

  // INVALIDATE ZERO-BLAST-RADIUS CACHE
  const ownerIdString = getId(doc.owner) || doc.owner
  if (ownerIdString) {
    revalidateTag(`transactions_user_${ownerIdString}`)
  }

  return doc
}
