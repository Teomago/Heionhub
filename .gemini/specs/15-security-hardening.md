# RFC 15: Security Hardening & UX Polish

> **Status:** 🟡 Pending Approval  
> **Date:** 2026-03-11  
> **Depends on:** RFC 13 (i18n Architecture), RFC 14 (Mass Translation Sweep)

---

## 1. Atomic Registration & Invitation Burn

### The "Burned Code Trap"

The current `registerMember` action in `src/app/[locale]/(frontend)/actions/auth.ts` performs two sequential operations:

1. `payload.create({ collection: 'members', data: { ... } })` — creates the member
2. `payload.update({ collection: 'invitation-codes', id, data: { status: 'used' } })` — marks the code as used

**The bug:** If step 1 succeeds but step 2 fails (e.g., network timeout, DB lock), the member is created but the invitation code remains `available`. A second user could then reuse the same code.

**Worse scenario:** If step 1 fails (e.g., duplicate email) but the code was already re-fetched and marked `used` in a race condition, the code is burned with no member created.

### Solution: Payload Transactions

Payload 3.x's Postgres adapter exposes `payload.db.beginTransaction()` which returns a transaction ID. This ID is attached to a `req` object and passed to both operations, ensuring they execute within the same SQL transaction.

### Implementation

#### [MODIFY] [auth.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(frontend)/actions/auth.ts)

Refactor `registerMember` to:

```typescript
export async function registerMember(formData: FormData, invitationCode: string) {
  const payload = await getPayload({ config })

  // 1. Verify code (outside transaction — read-only)
  const verify = await verifyInvitation(invitationCode)
  if (!verify.success) return verify

  // ... extract and validate form fields ...

  // 2. Begin atomic transaction
  const req = { payload } as any
  const transactionID = await payload.db.beginTransaction()
  req.transactionID = transactionID

  try {
    // 3. Create member (within transaction)
    await payload.create({
      collection: 'members',
      data: { email, password, firstName, ... },
      req,
    })

    // 4. Mark code as used (within SAME transaction)
    const { docs } = await payload.find({
      collection: 'invitation-codes',
      where: { code: { equals: invitationCode.toUpperCase() } },
      req,
    })

    if (docs.length > 0) {
      await payload.update({
        collection: 'invitation-codes',
        id: docs[0].id,
        data: { status: 'used' },
        req,
      })
    }

    // 5. Commit — both operations succeed or neither do
    await payload.db.commitTransaction(transactionID)
    return { success: true }
  } catch (error) {
    // 6. Rollback — member is NOT created, code is NOT burned
    await payload.db.rollbackTransaction(transactionID)
    console.error('Registration error:', error)
    return { success: false, error: 'REGISTRATION_FAILED', message: 'Failed to create account.' }
  }
}
```

> [!IMPORTANT]
> The `req` object with `transactionID` **MUST** be passed to every `payload.create`, `payload.find`, and `payload.update` call within the transaction scope. If any call omits `req`, it will execute outside the transaction and break atomicity.

---

## 2. Explicit IDOR Prevention (Defense in Depth)

### Current State

The `createTransaction` action **already implements** IDOR prevention correctly:
- Fetches the linked `Account` via `payload.findByID` and checks `accountOwnerId !== user.id` before creating the transaction.
- Validates `toAccount` ownership for transfers.
- Throws `APIError('Unauthorized access to account', 403, true)` on mismatch.

The `deleteTransaction` and `updateTransaction` actions also validate ownership of the **transaction itself** via `ownerId !== user.id`.

### Gap Analysis

| Action | Transaction Ownership | Account Ownership | Budget Ownership |
|---|---|---|---|
| `createTransaction` | ✅ (sets `owner: user.id`) | ✅ (explicit `findByID` check) | ❌ Not checked |
| `updateTransaction` | ✅ (explicit `findByID` check) | ❌ Not re-verified on account change | ❌ Not checked |
| `deleteTransaction` | ✅ (explicit `findByID` check) | N/A | N/A |

### Implementation

#### [MODIFY] [actions.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/app/transactions/actions.ts)

**`createTransaction`** — Add budget ownership check:

```typescript
// After account verification, before payload.create:
if (data.category) {
  // Budget is optional, but if a budget is linked via the transaction form, verify it
  // (Budgets are linked at form-level, not required on the collection)
}
```

**`updateTransaction`** — Add account ownership re-verification when the user changes the account on an existing transaction:

```typescript
// After verifying transaction ownership, before payload.update:
const newAccount = await payload.findByID({ collection: 'accounts', id: data.account })
const newAccountOwnerId = typeof newAccount.owner === 'object' 
  ? (newAccount.owner as Member).id : newAccount.owner
if (!newAccount || newAccountOwnerId !== user.id) {
  throw new APIError('Unauthorized access to account', 403, true)
}

if (data.type === 'transfer' && data.toAccount) {
  const toAccount = await payload.findByID({ collection: 'accounts', id: data.toAccount })
  const toAccountOwnerId = typeof toAccount.owner === 'object'
    ? (toAccount.owner as Member).id : toAccount.owner
  if (!toAccount || toAccountOwnerId !== user.id) {
    throw new APIError('Unauthorized access to destination account', 403, true)
  }
}
```

> [!NOTE]
> The `deleteTransaction` action does NOT need account re-verification because the soft-delete only sets `status: 'deleted'` and does not modify any account or budget references.

---

## 3. Dashboard Currency Dynamic Formatting

### Problem

`DashboardClient.tsx` currently hardcodes `toLocaleString('en-US', { style: 'currency', currency: 'USD' })` in 3 locations:
- Total Balance card (line ~107)
- Upcoming Bills amount (line ~167)
- Recent Transaction amounts (line ~244)

This ignores the member's `currency` field (`USD`, `EUR`, `GBP`, or `COP`).

### Implementation

#### [MODIFY] [DashboardClient.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/app/components/DashboardClient.tsx)

1. Expand the `DashboardData` interface to include `userCurrency`:

```typescript
interface DashboardData {
  // ... existing fields ...
  userCurrency?: string  // From the member's currency preference
}
```

2. Extract currency with explicit fallback:

```typescript
const currency = dashboard.userCurrency || 'COP'
```

> [!CAUTION]
> Claude's Rule: The fallback MUST be `'COP'` (Colombian Peso), not `'USD'`. This is the product owner's explicit decision for the target market.

3. Create a formatting helper inside the component:

```typescript
const formatAmount = (amountInDollars: number) =>
  amountInDollars.toLocaleString(undefined, { style: 'currency', currency })
```

4. Replace all 3 hardcoded `toLocaleString` calls with `formatAmount(...)`.

5. **Server-side:** Update `src/app/[locale]/app/page.tsx` (Dashboard server component) to pass `userCurrency: member.currency` in the `initialData` object sent to `DashboardClient`.

---

## 4. Sentry Observability in Finance Hooks

### Problem

The three Transaction hooks (`updateAccountBalance`, `checkBudgetLimits`, `updateBudgetSpend`) contain `try/catch` blocks that only `console.error` on failure. Database lock errors, constraint violations, and Drizzle SQL errors are silently swallowed and never reach Sentry.

### Implementation

#### [MODIFY] [updateAccountBalance.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Transactions/hooks/updateAccountBalance.ts)

Wrap the `applyDelta` function's Drizzle SQL call:

```typescript
import * as Sentry from '@sentry/nextjs'

async function applyDelta(payload: any, accountId: string | undefined, amountToInject: number) {
  if (amountToInject === 0 || !accountId) return

  try {
    const accountsTable = payload.db.tables['accounts']
    if (accountsTable) {
      await payload.db.drizzle
        .update(accountsTable)
        .set({ balance: sql`${accountsTable.balance} + ${amountToInject}` })
        .where(eq(accountsTable.id, accountId))
    }
  } catch (error) {
    Sentry.captureException(error, {
      extra: { accountId, amountToInject, hook: 'updateAccountBalance' },
    })
    throw error  // Rethrow so the parent transaction aborts
  }
}
```

> [!WARNING]
> The current code catches errors and **swallows them** (`console.error` without rethrow). This means a failed balance update could silently leave account balances out of sync. The fix MUST rethrow after capturing to Sentry.

#### [MODIFY] [checkBudgetLimits.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Transactions/hooks/checkBudgetLimits.ts)

Wrap the `req.payload.findByID` call (the only DB operation) in try/catch with `Sentry.captureException`:

```typescript
try {
  const budget = await req.payload.findByID({ collection: 'budgets', id: budgetId })
  // ... existing limit logic ...
} catch (error) {
  Sentry.captureException(error, {
    extra: { budgetId, hook: 'checkBudgetLimits' },
  })
  throw error
}
```

#### [MODIFY] [updateBudgetSpend.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Transactions/hooks/updateBudgetSpend.ts)

Same pattern as `updateAccountBalance` — wrap the `applyDelta` function's Drizzle SQL call:

```typescript
import * as Sentry from '@sentry/nextjs'

async function applyDelta(payload: any, budgetId: string | undefined, amountToInject: number) {
  // ... existing guard ...
  try {
    // ... existing Drizzle update ...
  } catch (error) {
    Sentry.captureException(error, {
      extra: { budgetId, amountToInject, hook: 'updateBudgetSpend' },
    })
    throw error  // Rethrow — do NOT swallow
  }
}
```

---

## Verification Plan

### Automated
- `npx tsc --noEmit` — must pass with zero errors
- `pnpm build` — must succeed with exit code 0

### Manual
- **Registration atomicity:** Create a member with a valid invitation code → verify code is `used`. Simulate a failure (e.g., duplicate email) → verify code remains `available`.
- **IDOR:** Attempt to create a transaction with an account ID belonging to another user → expect `403` error.
- **Currency:** Log in as a member with `currency: 'COP'` → verify Dashboard formats amounts as COP. Log in as member with no currency → verify fallback to COP.
- **Sentry:** Trigger a DB error in a hook (e.g., invalid account ID) → verify the exception appears in the Sentry dashboard.
