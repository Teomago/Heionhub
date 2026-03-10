# PostgreSQL Migration Postmortem

> Completed: 2026-03-10

## What We Did

Migrated the entire Eterhub application from **MongoDB** (`@payloadcms/db-mongodb` + `mongoose`) to **PostgreSQL** (`@payloadcms/db-postgres` + `drizzle-orm`).

### Phase 3.1 — The Great Migration (RFC 09)

1. **Dependency Swap:** Uninstalled `@payloadcms/db-mongodb` and `mongoose`. Installed `@payloadcms/db-postgres`, `graphql`, and `drizzle-orm@0.44.7`.
2. **Payload Config:** Updated `src/payload/payload.config.ts` to use `postgresAdapter` with `idType: 'uuid'` (to maintain string-based IDs across the frontend).
3. **Atomic Balance Updates:** Rewrote `src/payload/collections/finance/Transactions/hooks/updateAccountBalance.ts` from Mongoose `$inc`/`updateOne` to Drizzle `sql` template literals with `eq()`.
4. **Aggregation Pipelines:** Rewrote `src/app/app/reports/actions.ts` from MongoDB aggregation pipelines to Drizzle `select()`, `sum()`, `groupBy()`, `leftJoin()`, with `sql` for `COALESCE` and `TO_CHAR`.

### Phase 3.2 — Business Logic (RFC 10)

5. **Soft Deletes:** Added `status: 'active' | 'deleted'` field to `Transactions`, `Accounts`, and `Budgets`. Created `isActiveOwner` read access policy. Refactored `deleteTransaction()`, `deleteAccount()`, `deleteBudget()` Server Actions to use `payload.update({ status: 'deleted' })` instead of `payload.delete()`.
6. **Budget Hard Limits:** Added `currentSpend` field to `Budgets`. Created `updateBudgetSpend` hook (atomic Drizzle `sql` increments). Created `checkBudgetLimits` `beforeChange` hook that blocks both creates and updates if a locked budget would be exceeded.

### Phase 3.3 — Supabase Infrastructure Fix

7. **Migration Execution:** Created and applied Payload migrations via the direct Supabase Session connection (port `5432`), bypassing PgBouncer's DDL limitations on the Transaction Pooler (port `6543`).

---

## The Problem

### Issue 1: `number` vs `string` IDs
Payload's Postgres adapter defaults document IDs to `number` (serial auto-increment), while MongoDB used `string` (ObjectId). This broke 57 TypeScript errors across 16 frontend files where Radix UI `<SelectItem value={}>` strictly expects `string`.

**Solution:** Set `idType: 'uuid'` in the `postgresAdapter` config. All IDs became UUID strings, matching the frontend expectations.

### Issue 2: Drizzle ORM Version Mismatch
Payload 3.79.0 bundles `drizzle-orm@0.44.7` internally, but our install pulled `0.45.1`. This caused strict type inference conflicts (`shouldInlineParams` private property mismatch).

**Solution:** Pinned `drizzle-orm` to `0.44.7` to match Payload's internal version.

### Issue 3: Supabase Pooler Blocks DDL
Supabase's Transaction Pooler (`port 6543`, PgBouncer) does not support DDL commands (`CREATE TABLE`, `CREATE TYPE`, etc.). Running `pnpm payload migrate` through the pooler failed with `exit code 1`.

**Solution:**
1. Temporarily switched `DATABASE_URI` to the **direct/session connection** (`port 5432`).
2. Ran `pnpm payload migrate:fresh` to drop and recreate all tables.
3. Switched `DATABASE_URI` back to the **pooler** (`port 6543`) for runtime.
4. Set `push: false` in `payload.config.ts` — auto-push is incompatible with PgBouncer.

---

## What Was Removed

| Package | Reason |
|---|---|
| `@payloadcms/db-mongodb` | Replaced by `@payloadcms/db-postgres` |
| `mongoose` | No longer needed; Drizzle ORM handles all DB operations |

| File | Reason |
|---|---|
| `sync-db.ts` (root) | Temporary script used during debugging; deleted |
| `src/migrations/20260310_225521_init_postgres.*` | Stale migration created before RFC 10 schema changes; replaced |

---

## What Was Added / Modified

### New Files
| File | Purpose |
|---|---|
| `src/payload/collections/finance/access/isActiveOwner.ts` | Read access policy that hides soft-deleted records from non-admin users |
| `src/payload/collections/finance/Transactions/hooks/checkBudgetLimits.ts` | `beforeChange` hook enforcing locked budget limits (create + update delta) |
| `src/payload/collections/finance/Transactions/hooks/updateBudgetSpend.ts` | `afterChange` hook for atomic `currentSpend` increments via Drizzle `sql` |
| `src/migrations/20260310_231650_init.ts` | Full Postgres schema migration (all collections + RFC 10 fields) |
| `src/migrations/20260310_232127_init.ts` | Supplementary migration for latest schema diff |

### Modified Files
| File | Change |
|---|---|
| `src/payload/payload.config.ts` | Swapped `mongooseAdapter` → `postgresAdapter` with `idType: 'uuid'`, `push: false` |
| `src/payload/collections/finance/Transactions/Transactions.ts` | Added `budget`, `status` fields; wired `checkBudgetLimits` + `updateBudgetSpend` hooks |
| `src/payload/collections/finance/Accounts/Accounts.ts` | Added `status` field; switched read access to `isActiveOwner` |
| `src/payload/collections/finance/Budgets/Budgets.ts` | Added `status`, `currentSpend` fields; switched read access to `isActiveOwner` |
| `src/app/app/transactions/actions.ts` | `deleteTransaction` → soft delete via `payload.update({ status: 'deleted' })` |
| `src/app/app/accounts/actions.ts` | `deleteAccount` → soft delete |
| `src/app/app/budget/actions.ts` | `deleteBudget` → soft delete |
| `src/app/app/reports/actions.ts` | Mongoose aggregations → Drizzle `select`/`sum`/`groupBy`/`leftJoin` |
| `src/payload/collections/finance/Transactions/hooks/updateAccountBalance.ts` | Mongoose `$inc` → Drizzle `sql` atomic updates |

---

## Key Architecture Decisions

1. **`idType: 'uuid'`** — Enterprise standard. Prevents ID enumeration attacks and maintains frontend string compatibility.
2. **`push: false`** — Required for Supabase PgBouncer. Schema changes must go through `pnpm payload migrate` with a direct connection.
3. **`drizzle-orm@0.44.7` pinned** — Must match Payload 3.79's internal Drizzle version to avoid type conflicts.
4. **Soft deletes over hard deletes** — Data retention for audit trails; `isActiveOwner` policy hides deleted records transparently.
5. **Future migrations** — Always use the direct connection (port `5432`) for DDL, then switch back to pooler (port `6543`) for runtime.
