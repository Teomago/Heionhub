# RFC 10: Postgres Business Logic (Soft Deletes & Budget Limits)

This document outlines the implementation plan for enforcing strict financial rules (Budget Hard Limits) and improving data retention (Soft Deletes) using our new PostgreSQL/Drizzle infrastructure.

## Goal Description

1. **Soft Deletes:** Prevent accidental structural data loss by converting hard `DELETE` commands into `UPDATE` modifications containing a `status: 'deleted'` flag. This allows users to retain transaction history without skewing active balances.
2. **Budget Hard Limits:** Protect user spending caps by utilizing Drizzle atomic atomic increments, tracking live `currentSpend`, and enforcing `locked` thresholds via pre-save hooks.

## Proposed Changes

### 1. Soft Deletes Implementation [NEW/MODIFY]

#### A. Database Schema (`src/payload/collections/finance/`)

We will add a globally indexed `status` field to three core collections:

- `Transactions`
- `Accounts`
- `Budgets`

**Field Definition Example:**

```typescript
{
  name: 'status',
  type: 'select',
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Deleted', value: 'deleted' },
  ],
  defaultValue: 'active',
  index: true,
}
```

#### B. Access Control (Read Policies)

We will modify the `read` access control for these collections. Only users with the `admin` role will see soft-deleted records. Standard members will automatically have `status: { equals: 'active' }` enforced in their queries.

```typescript
export const isActiveFilter = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) return true
  return {
    and: [
      { owner: { equals: user.id } },
      { status: { equals: 'active' } }, // Hide soft deletes automatically
    ],
  }
}
```

#### C. Frontend Server Actions Refactor

We will rewrite the `delete...` Server Actions (e.g., in `src/app/app/transactions/actions.ts` and `src/app/app/accounts/actions.ts`). Instead of `payload.delete({ id })`, they will call:

```typescript
await payload.update({
  collection: 'transactions', // Or accounts, budgets
  id,
  data: { status: 'deleted' },
  overrideAccess: true,
})
```

_(Note: Our custom `updateAccountBalance` hook already cleverly checks `if (doc.status === 'deleted')` and reverses the balance logically. This ensures soft-deleted transactions immediately refund the account balance.)_

---

### 2. Budget Hard Limits Implementation [MODIFY]

#### A. Add `currentSpend` to Budgets

Update `src/payload/collections/finance/Budgets.ts` to include a native tracking numeric field:

```typescript
{
  name: 'currentSpend',
  type: 'number',
  defaultValue: 0,
  admin: {
    readOnly: true, // Only manipulated by server hooks
  }
}
```

#### B. Drizzle Hook: Update Budget Spend (`src/payload/collections/finance/Transactions/hooks/updateBudgetSpend.ts`)

Similar to the `updateAccountBalance` hook, we will capture `CollectionAfterChangeHook` from Transactions. If a transaction has a `budget` linked, we will atomically increment the `currentSpend` using Drizzle ORM.

```typescript
import { sql, eq } from 'drizzle-orm'

// INSIDE HOOK:
const budgetsTable = payload.db.tables['budgets']
await payload.db.drizzle
  .update(budgetsTable)
  .set({
    currentSpend: sql`${budgetsTable.currentSpend} + ${doc.amount}`,
  })
  .where(eq(budgetsTable.id, doc.budget))
```

_(We will account for update/delete deltas recursively exactly as we did for accounts)._

#### C. Enforcement Barrier (`beforeChange` Hook)

If a user is adding a new transaction to a locked budget, we evaluate the limit _before_ saving. This requires a quick fetch of the current budget state. We will use our custom `APIError` to safely block the UI action.

```typescript
// src/payload/collections/finance/Transactions/hooks/checkBudgetLimits.ts
export const checkBudgetLimits: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (!data.budget || operation !== 'create') return data

  const budget = await req.payload.findByID({
    collection: 'budgets',
    id: data.budget,
  })

  // If budget is locked and (current + new amount) exceeds limit
  if (budget.locked && budget.currentSpend + data.amount > budget.limit) {
    throw new APIError('This transaction exceeds the locked budget limit.', 400)
  }

  return data
}
```

## Verification Plan

1. **Schema Check:** Run `pnpm test` and `payload generate:types`.
2. **Soft Deletes:** Delete a transaction on the frontend and verify it disappears from the UI but remains in the CMS marked as `deleted`. Verify the primary account balance reflexes this.
3. **Hard Limits:** Create a budget for $100 and flag it `locked`. Attempt to create a $101 transaction linked to it and ensure the `APIError` gracefully bounces the user backward without executing the Postgres commit.
