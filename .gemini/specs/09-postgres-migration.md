# RFC 09: The Great Migration (MongoDB to PostgreSQL)

This document outlines the technical implementation plan for migrating Eterhub's database architecture from MongoDB to PostgreSQL via Payload CMS's native adapter. This prepares the application for robust, relational, and enterprise-grade scale.

## Goal Description

We need to swap our Payload database adapter from `@payloadcms/db-mongodb` to `@payloadcms/db-postgres`. This migration fundamentally changes the underlying engine from Mongoose to Drizzle ORM. Therefore, any previously implemented "escape hatches" (raw MongoDB driver code) must be rewritten into raw SQL or Drizzle ORM equivalents.

## Proposed Changes

### 1. Dependencies [MODIFY]

We will swap the Payload database adapters.

**Uninstall:**

- `@payloadcms/db-mongodb`
- `mongoose`

**Install:**

- `@payloadcms/db-postgres`
- `graphql` _(Required internal dependency for Payload's PG adapter)_

_Commands:_

```bash
pnpm remove @payloadcms/db-mongodb mongoose
pnpm add @payloadcms/db-postgres graphql
```

---

### 2. Payload Configuration [MODIFY]

#### [MODIFY] `src/payload/payload.config.ts`

Swap the adapter definition.

**Proposed Logic:**

```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  // ...
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
```

---

### 3. Critical Refactoring: Drizzle ORM Escape Hatches [MODIFY]

Since we used `mongoose` raw access in RFC 01 and RFC 03, we must rewrite these specific files to use Drizzle ORM, which is accessible natively via `payload.db.drizzle` and `payload.db.tables`.

#### A. RFC 01 (Atomic Updates)

_Files affected: e.g., `src/payload/collections/finance/Transactions/hooks/updateAccountBalances.ts`_

Replacing MongoDB's `$inc` modifier with Drizzle's direct `sql` literal execution:

```typescript
import { sql, eq } from 'drizzle-orm'

// Inside the transaction hook (after retrieving payload):
const accountsTable = payload.db.tables.accounts

// Atomic Increment via Drizzle SQL
await payload.db.drizzle
  .update(accountsTable)
  .set({
    balance: sql`${accountsTable.balance} + ${amountInCents}`,
  })
  .where(eq(accountsTable.id, accountId))
```

#### B. RFC 03 (Database Aggregations)

_Files affected: `src/app/app/reports/actions.ts`_

Replacing MongoDB's `.aggregate([{ $group: ... }])` pipeline with Drizzle's SQL equivalents (`select`, `sum`, `groupBy`):

```typescript
import { eq, and, gte, lte, sum, sql, desc } from 'drizzle-orm'

// Inside the reports Server Action:
const txTable = payload.db.tables.transactions
const catTable = payload.db.tables.categories // If joins are needed

const results = await payload.db.drizzle
  .select({
    categoryId: txTable.category,
    total: sum(txTable.amount).mapWith(Number), // Drizzle returns sums as strings in PG safely, cast or map to Number
  })
  .from(txTable)
  .where(
    and(
      eq(txTable.owner, user.id),
      eq(txTable.type, 'expense'),
      gte(txTable.date, startDate.toISOString()),
      lte(txTable.date, endDate.toISOString()),
    ),
  )
  .groupBy(txTable.category)
  .orderBy(desc(sum(txTable.amount)))
```

_(Note: We will import helper functions like `eq`, `and`, `sum`, `sql` directly from `drizzle-orm`)._

## Environment Variables

- `DATABASE_URI`: Must be updated from a `mongodb+srv://...` format to a standard PostgreSQL connection string (`postgresql://username:password@host:5432/database`).

## Verification Plan

### Automated Tests

1. Run `payload generate:types` to ensure schema coherence.
2. Run standard `pnpm test` logic (which covers pure TS logic and won't hit DB).

### Manual Verification

1. **Migration Execution:** Run local dev to trigger Payload's auto-generation of PostgreSQL tables.
2. **Atomic Logic Test:** Create a transaction in the CMS and verify that the linked `Account.balance` strictly increments exactly without race conditions.
3. **Aggregation Test:** Open the `/app/reports` dashboard to verify that Drizzle aggregates and grouping queries successfully cast and render identically to the previous MongoDB aggregation implementation.
