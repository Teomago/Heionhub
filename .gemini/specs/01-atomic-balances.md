# RFC 01: Atomic Balance Updates (Data Integrity)

## Problem Statement

Currently, the Eterhub Finance App handles balance updates inside Next.js Server Actions (`src/app/app/transactions/actions.ts`). When a user creates, updates, or deletes a transaction, the Server Action calculates the new balance and issues a separate API call to update the `Accounts` collection.

This approach introduces **three critical vulnerabilities**:

1. **Race Conditions:** Two simultaneous transactions can read the same stale balance, resulting in an inaccurate final balance.
2. **Partial Failures (Lack of Atomicity):** If the transaction creation succeeds but the account update API fails, the ledger and the account balance will permanently diverge.
3. **Admin Panel Bypass:** If a super-admin creates or deletes a transaction directly inside the Payload CMS Admin dashboard, the Next.js Server Action is bypassed entirely, and the Account balance is never updated.

## Proposed Solution: Collection Hooks + `$inc` operator

To guarantee 100% atomicity and centralize the logic, we will remove balance calculations from the Next.js frontend and migrate them to Payload CMS Collection Hooks.

We will achieve atomicity by abandoning absolute balance calculations (e.g., `balance = oldBalance - amount`) and instead using MongoDB's atomic operator (`$inc` in Mongoose via Payload's Local API) to simply apply a delta.

---

## Files to be Modified / Created

1. **`src/app/app/transactions/actions.ts`**
   - **Action:** Remove all `payload.update({ collection: 'accounts' ... })` logic from `createTransaction`, `updateTransaction`, and `deleteTransaction`.
   - **Result:** The action should only create/update/delete the Transaction document and immediately return success.

2. **`src/payload/collections/finance/Transactions/hooks/updateAccountBalance.ts`** _(New File)_
   - **Action:** Define an `afterChange` hook that handles creation, modification, and Soft Deletions (status changing from 'active' to 'deleted').

---

## Technical Implementation Details

### The `afterChange` Hook Logic (`updateAccountBalance.ts`)

The hook intercepts the save operation _after_ the Database has successfully committed the Transaction.

```typescript
import type { CollectionAfterChangeHook } from 'payload'

export const updateAccountBalance: CollectionAfterChangeHook = async ({
  doc, // The current document after the change
  previousDoc, // The document before the change (null on creation)
  operation, // 'create' or 'update'
  req: { payload }, // Payload Local API
}) => {
  let deltaAmount = 0
  let accountId = typeof doc.account === 'object' ? doc.account.id : doc.account

  if (operation === 'create') {
    // 1. CREATION
    deltaAmount = calculateDirectionalAmount(doc.type, doc.amount)
    await applyDelta(payload, accountId, deltaAmount)

    // Handle Transfers (deduct from source, add to destination)
    if (doc.type === 'transfer' && doc.toAccount) {
      let toAccountId = typeof doc.toAccount === 'object' ? doc.toAccount.id : doc.toAccount
      await applyDelta(payload, toAccountId, doc.amount) // amount is positive for receiver
    }
  } else if (operation === 'update') {
    // 2. SOFT DELETION (Phase 2 integration)
    if (previousDoc.status === 'active' && doc.status === 'deleted') {
      // Revert the transaction
      deltaAmount = -calculateDirectionalAmount(previousDoc.type, previousDoc.amount)
      await applyDelta(payload, accountId, deltaAmount)

      if (previousDoc.type === 'transfer' && previousDoc.toAccount) {
        let oldToAccountId =
          typeof previousDoc.toAccount === 'object'
            ? previousDoc.toAccount.id
            : previousDoc.toAccount
        await applyDelta(payload, oldToAccountId, -previousDoc.amount)
      }
      return doc // Skip further update logic
    }

    // 3. MODIFICATION (Value, Type, or Account change)
    // First, revert the impact of the PREVIOUS document on the PREVIOUS account
    const oldAccountId =
      typeof previousDoc.account === 'object' ? previousDoc.account.id : previousDoc.account
    const oldDelta = -calculateDirectionalAmount(previousDoc.type, previousDoc.amount)
    await applyDelta(payload, oldAccountId, oldDelta)

    if (previousDoc.type === 'transfer' && previousDoc.toAccount) {
      const oldToAccountId =
        typeof previousDoc.toAccount === 'object' ? previousDoc.toAccount.id : previousDoc.toAccount
      await applyDelta(payload, oldToAccountId, -previousDoc.amount)
    }

    // Then, apply the impact of the NEW document on the NEW account
    const newDelta = calculateDirectionalAmount(doc.type, doc.amount)
    await applyDelta(payload, accountId, newDelta)

    if (doc.type === 'transfer' && doc.toAccount) {
      const newToAccountId = typeof doc.toAccount === 'object' ? doc.toAccount.id : doc.toAccount
      await applyDelta(payload, newToAccountId, doc.amount)
    }
  }

  return doc
}

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
```

### Applying the Delta Atomically (Mongoose `$inc`)

Because Payload's native `payload.update()` Local API currently overwrites values rather than incrementing them out-of-the-box in the public typing, we must access the underlying database adapter to use MongoDB's `$inc` operator. This prevents race conditions if two hooks fire simultaneously.

```typescript
async function applyDelta(payload: any, accountId: string, amountToInject: number) {
  if (amountToInject === 0 || !accountId) return

  // Access the underlying Mongoose Model via Payload's MongoDB Adapter
  const AccountsModel = payload.db.collections['accounts']

  // Atomically increment the balance, preventing read-write race conditions
  await AccountsModel.updateOne({ _id: accountId }, { $inc: { balance: amountToInject } })
}
```

### Integration

Finally, inject the hook into `src/payload/collections/finance/Transactions/Transactions.ts`:

```typescript
import { updateAccountBalance } from './hooks/updateAccountBalance'

export const Transactions: CollectionConfig = {
  // ...
  hooks: {
    afterChange: [updateAccountBalance],
  },
}
```

## Review Request

This approach ensures 100% data integrity, removes fragile Next.js frontend logic, automatically handles Soft Deletion state transitions, and centralizes business logic directly on the database layer regardless of where the creation request originates (App vs. Admin Panel). Please review for approval before execution.
