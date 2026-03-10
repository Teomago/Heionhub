# Eterhub - Refactoring & Audit Tasks (Phase 1: Core Finance)

## 1. Data Integrity: Balance Atomic Updates (Race Conditions & Soft Deletes)

**Context:** Currently, creating transactions and updating the `Accounts` balance occur in separate steps. Also, since we are implementing Soft Deletes (Phase 2), a deleted transaction must revert its effect on the account balance.
**Refactoring Instruction:**

- **Remove** the balance calculation and update logic from the frontend `actions.ts` files.
- **Implement** collection hooks in the `Transactions` collection (`src/payload/collections/Transactions/hooks/`).
- Create an `afterChange` hook. This hook must handle three scenarios atomically using the Payload Local API:
  1. **Creation:** Add/subtract the transaction amount from the linked Account's `balance`.
  2. **Modification:** Calculate the "delta" (difference between old and new amount) and adjust the balance.
  3. **Soft Deletion:** If `previousDoc.status === 'active'` and `doc.status === 'deleted'`, REVERT the transaction amount on the Account's balance.

## 2. Security Abstraction: DRY Server Actions

**Context:** Server Actions in `src/app/app/` (e.g., `transactions/actions.ts`) constantly repeat the session validation logic: `if (!user || (user.collection !== 'members' && user.collection !== 'users')) { throw new Error('Unauthorized') }`.
**Refactoring Instruction:**

- **Create** a utility function or a Higher-Order Function wrapper in `src/lib/auth/` or `src/utils/` (e.g., `withAuth` or `assertUser`).
- **Refactor** all Finance App Server Actions to use this centralized wrapper.
- **Goal:** Eliminate code duplication and centralize the access policy check before invoking the Payload Local API or performing business logic.

## 3. Performance & Scaling: Database-Level Aggregations

**Context:** The Dashboard and Reports pages are currently fetching raw document arrays (using `limit: 5000`) and performing in-memory calculations (`.reduce()`, `.forEach()`) on the Next.js server. This approach causes severe memory bloat, bandwidth waste, and a high risk of silent data truncation for power users.
**Refactoring Instruction:**

- **Create Payload Custom Endpoints:** Add custom endpoints to the `Transactions` and `Budgets` collections via Payload config (e.g., `/api/transactions/reports/monthly`, `/api/budgets/usage`).
- **Implement MongoDB Aggregation:** Inside these endpoints, access the underlying Payload Database Adapter (Mongoose) to run MongoDB Aggregation Pipelines. Use `$match` (to strictly filter by `req.user.id` and date range), `$group` (to group by category or month), and `$sum` (to calculate total amounts directly in the database).
- **Refactor Frontend Fetching:** Update `reports/page.tsx` and `app/page.tsx` to call these new aggregated endpoints (or their Local API equivalents) instead of fetching raw documents. The frontend should only receive the final calculated numbers (e.g., `{ totalExpense: 4500 }`).
- **Implement Caching (Crucial):** Wrap these aggregated queries in Next.js caching mechanisms (`unstable_cache` or Next.js 15 `fetch` cache options) to prevent running heavy DB aggregations on every single page load. Invalidate this cache (using `revalidateTag` or `revalidatePath`) inside the `Transactions` collection hooks whenever a transaction is created, updated, or deleted.

## 4. Type Safety: Eliminate `any` with Type Guards

**Context:** The codebase currently uses `(user as any)` to access collection-specific fields (like `hasCompletedTour` on the `Members` collection) because Payload's default auth user type is generic and could represent either a `User` (admin) or a `Member`.
**Refactoring Instruction:**

- **Create Type Guards:** Create a utility file at `src/lib/auth/typeGuards.ts`.
- **Implement Functions:** Write `isMember(user: any): user is Member` and `isAdminUser(user: any): user is User` using the generated types from `src/payload/payload-types.ts`.
- **Apply Globally:** Search the entire `src/` directory for `as any`. Replace these forced casts by wrapping the logic in `if (isMember(user))` blocks, allowing TypeScript to accurately infer the type and ensuring 100% type safety.

## 5. Domain Architecture: Rename & Automate Subscriptions

**Context:** The `Subscriptions` collection is a static visual tracker requiring manual entry for recurring bills.
**Refactoring Instruction:**

- **Rename Collection:** Rename to `ScheduledTransactions` (in Payload config and frontend).
- **Implement Cron Endpoint:** Create a secure API route (e.g., `app/api/cron/process-scheduled/route.ts`) protected by a `CRON_SECRET` header.
- **Automation Logic:** The endpoint must query `ScheduledTransactions` where `nextDueDate <= new Date()`. For each:
  1. Create a new document in `Transactions`.
  2. Increment the `nextDueDate` based on the frequency.
- **Vercel Config:** Create or update a `vercel.json` file in the root directory with a `"crons"` array mapping to this endpoint on a daily schedule (e.g., `"schedule": "0 0 * * *"`).

## 6. Data Integrity: Enforce Budget Hard Limits

**Context:** Budgets are currently calculated in-memory on the frontend, and the `locked` feature (preventing spending over the budget) has no backend enforcement.
**Refactoring Instruction:**

- **Add State to Schema:** Add a `currentSpend` (number) field to the `Budgets` collection schema in Payload.
- **Hook Integration:** Inside the `Transactions` collection hooks (created in Phase 1), add logic to update the associated Budget's `currentSpend` using MongoDB's atomic `$inc` operator whenever a transaction is categorized under that budget.
- **Enforce Lock:** In the `Transactions` `beforeChange` hook, check the associated budget. If `Budget.locked === true` and the new transaction amount pushes `currentSpend` over the `limit`, throw a Payload `APIError` to block the database write entirely.

# Phase 2: Security, Architecture & Observability

## 7. Border Security: Rate Limiting

**Context:** Next.js Server Actions are public POST endpoints. Currently, they have no rate limiting, making Eterhub vulnerable to Brute Force login attempts and Application-Layer DDoS attacks (spamming transaction creations to spike DB costs).
**Refactoring Instruction:**

- **Install Dependencies:** Install `@upstash/ratelimit` and `@vercel/kv` (or standard Redis client).
- **Implement Middleware:** Create `src/middleware.ts`.
- **Configure Rules:** Set up IP-based rate limiting rules:
  - **Strict:** For `/api/users/login` and auth actions (e.g., 5 requests per minute per IP).
  - **Moderate:** For core data mutation actions like `createTransaction` (e.g., 30 requests per minute per User ID/IP).
- **Update Payload Auth:** In `src/payload/collections/finance/Members/index.ts`, explicitly enable native brute-force protection: `auth: { maxLoginAttempts: 5, lockTime: 600000 }`.

## 8. Data Architecture: Implement Soft Deletes

**Context:** The app currently performs destructive "Hard Deletes" on financial data (`Transactions`, `Accounts`, `Budgets`). In fintech, deleting ledger history is an anti-pattern as it corrupts historical aggregates and prevents data recovery.
**Refactoring Instruction:**

- **Modify Schemas:** Add a `status` field to `Transactions`, `Accounts`, and `Budgets` collections in Payload:
  `{ name: 'status', type: 'select', options: ['active', 'deleted'], defaultValue: 'active', index: true }`
- **Override Delete Logic:** In all frontend Server Actions and API endpoints, replace `payload.delete()` calls with `payload.update()` to change the document's status to `deleted`.
- **Update Read Access:** Modify the Payload `access.read` function for these collections to automatically filter out soft-deleted items for standard users:
  `read: ({ req: { user } }) => ({ and: [{ owner: { equals: user?.id } }, { status: { not_equals: 'deleted' } }] })`

## 9. Observability: Centralized Error Handling

**Context:** The app currently swallows errors with basic `console.error()` and returns generic strings to the client. This leaves us blind to production crashes and provides poor UX when validation errors occur.
**Refactoring Instruction:**

- **Install Sentry:** Add `@sentry/nextjs` and run the initialization wizard.
- **Create Custom Error Class:** Create `src/lib/utils/APIError.ts` to differentiate between public (safe to show to the user, like "Budget Exceeded") and private errors (like DB crashes).
- **Refactor Server Actions:** Wrap all Server Action logic (`transactions/actions.ts`, etc.) in a robust `try/catch`.
  - On catch, log the full error context and User ID to Sentry: `Sentry.captureException(error, { user: { id: user.id } })`.
  - Return a sanitized message to the frontend, utilizing the custom `APIError` logic to provide better UX without leaking stack traces.
