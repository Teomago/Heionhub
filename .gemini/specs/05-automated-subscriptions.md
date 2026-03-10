# RFC 05: Domain Architecture - Automated Subscriptions

## 1. Problem Statement

The `Subscriptions` collection currently acts only as a static visual tracker for recurring bills. It requires users to manually enter transactions each month when a bill hits. We need to automate this process to reflect a true "Scheduled Transactions" system.

## 2. Proposed Solution

We will rename the collection to `ScheduledTransactions` to better reflect its generalized purpose (not just subscriptions, but any recurring scheduled transaction). We will also build a secure daily Cron Job via Next.js App Router that automatically queries for mature scheduled transactions, creates actual `Transactions` records for them, and advances their `nextDueDate` into the future.

---

## 3. Technical Implementation Plan

### A. Collection Renaming & Refactoring

We will rename `Subscriptions` to `ScheduledTransactions` across the Payload config and frontend:

#### Modify Payload Backend

1. **Rename Directory/File:** `src/payload/collections/finance/Subscriptions/` -> `src/payload/collections/finance/ScheduledTransactions/`
2. **Update Config Defaults:** Change `slug: 'subscriptions'` to `slug: 'scheduled-transactions'` in the Collection config.
3. **Update Global Exports:** Update `src/payload/collections/index.ts` to export `ScheduledTransactions`.
4. **Relationship Updates:** Ensure no other collections are hard-referencing the old slug (none currently found, except TypeScript generated types which will be regenerated).

#### Modify Frontend

1. **App Router Paths:** Rename `src/app/app/subscriptions/` to `src/app/app/scheduled-transactions/` (and update links in sidebar/navigation).
2. **Dashboard Integration:** Update `src/app/app/page.tsx` and `DashboardClient.tsx` to query `scheduled-transactions` instead of `subscriptions` and pass them as `upcomingBills`.
3. **Server Actions:** Update the actions in `src/app/app/scheduled-transactions/actions.ts` to mutate the new `scheduled-transactions` collection.

### B. Cron Job Endpoint: Implementation Details

We will create a specialized API route to process the automation securely.

**Proposed File:** `src/app/api/cron/process-scheduled/route.ts`

**Core Logic Flow:**

1. **Security Bypass Authorization:**
   The endpoint will verify a custom header (e.g., `Authorization: Bearer process.env.CRON_SECRET`) to ensure only Vercel (or authorized systems) can trigger it.
2. **Payload Initialization:**
   ```typescript
   import { getPayload } from 'payload'
   import configPromise from '@payload-config'
   const payload = await getPayload({ config: configPromise })
   ```
3. **Querying Mature Transactions:**
   We will utilize the Payload Local API to find all `ScheduledTransactions` where `nextDueDate` is less than or equal to `new Date()`.
   ```typescript
   const now = new Date()
   const dueScheduled = await payload.find({
     collection: 'scheduled-transactions',
     where: {
       nextDueDate: { less_than_equal: now.toISOString() },
       status: { equals: 'active' }, // Respecting future soft-delete architectures
     },
     overrideAccess: true, // System operation, bypassing user auth
     pagination: false,
   })
   ```
4. **Execution Loop:**
   For each due transaction, we will execute two operations atomically using `Promise.all`:
   - **Create actual transaction:** `payload.create({ collection: 'transactions', data: { amount, category, date: nextDueDate, owner, ... } })`
   - **Advance original schedule date:** Calculate the next date based on the `frequency` field (e.g. adding 1 month or 1 year) and update the `ScheduledTransaction`: `payload.update({ collection: 'scheduled-transactions', id, data: { nextDueDate: calculatedNextDate } })`

### C. Automation Scheduling (Vercel)

To ensure this endpoint actually fires daily without user interaction, we will rely on Vercel's native Cron Jobs functionality.

**Proposed File:** `vercel.json` (Root level)

```json
{
  "crons": [
    {
      "path": "/api/cron/process-scheduled",
      "schedule": "0 0 * * *"
    }
  ]
}
```

_(Triggers daily at midnight UTC)_

---

**Review Request:** Please review this Technical Implementation Plan with the Lead Architect. Note that no code modifications will be executed until this plan receives the GREEN LIGHT.
