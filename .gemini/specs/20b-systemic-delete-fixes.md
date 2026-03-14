# RFC 20B: Systemic Deletion & Cache Invalidation Fixes

This specification addresses critical gaps identified in the data deletion flow and cache invalidation logic across the Eterhub finance platform. These fixes ensure UI consistency, data integrity, and robust tenant isolation.

## Technical Requirements

### 1. Server Actions Revalidation
All individual deletion Server Actions must invalidate the Next.js router cache to ensure the UI reflects data changes immediately.
- **Action:** Add `revalidatePath('/[locale]/app', 'layout')` to the following actions:
  - `deleteAccount` in `src/app/[locale]/app/accounts/actions.ts`
  - `deleteBudget` in `src/app/[locale]/app/budget/actions.ts`
  - `deleteCategory` in `src/app/[locale]/app/categories/actions.ts`
  - `deleteTransaction` in `src/app/[locale]/app/transactions/actions.ts`

### 2. Mutation Hooks Invalidation
Update client-side React Query hooks to ensure all relevant lists are refreshed after a successful deletion.
- **`useAccountMutations`**: Add `queryClient.invalidateQueries({ queryKey: ['accounts'] })` in `onSuccess`.
- **`useBudgetMutations`**: Add `queryClient.invalidateQueries({ queryKey: ['budgets'] })` in `onSuccess`.
- **`useCategoryMutations`**: Add `queryClient.invalidateQueries({ queryKey: ['categories'] })` in `onSuccess`.

### 3. Hard Delete Conversion
Transition from soft-delete (status-based) to strict hard-delete for specific collections to satisfy Privacy Policy "Right to Erasure" requirements for core entities, while preserving accounting logs for transactions.
- **Accounts**: Change `payload.update({ status: 'deleted' })` to `payload.delete({ collection: 'accounts' })`.
- **Budgets**: Change `payload.update({ status: 'deleted' })` to `payload.delete({ collection: 'budgets' })`.
- **Transactions**: **KEEP** soft-delete logic (`status: 'deleted'`) in `deleteTransaction` to allow for audit trails, unless a "Nuke" operation is explicitly triggered.

### 4. Explicit Ownership Verification (Security)
Eliminate reliance on `overrideAccess: true` which bypasses Payload's internal security hooks. 
- **Requirement**: In all individual delete actions, find the record by ID first using the `payload` instance.
- **Verification**: Explicitly check `record.owner === user.id` (handling both object and ID formats).
- **Enforcement**: Throw an unauthorized error if the check fails before executing the deletion.

### 5. Account Cascading (Transactions)
When an account is deleted, all associated transactions must also be removed to prevent orphaned data and broken balance calculations.
- **Action**: In `src/app/[locale]/app/accounts/actions.ts`, inside `deleteAccount`:
  - Run `payload.db.deleteMany({ collection: 'transactions', where: { account: { equals: id } } })` **before** deleting the account document itself.

## Verification Plan

### Manual Verification
1. Delete an Account and verify that the page immediately refreshes with the account gone.
2. Verify that all transactions associated with that account are no longer visible in the Transactions list.
3. Check the database to confirm the Account record is physically removed (Hard Delete).
4. Attempt to delete an account belonging to another user via API/Script to verify the ownership check prevents it.
