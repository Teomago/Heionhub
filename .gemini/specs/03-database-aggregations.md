# RFC 03: Performance & Scaling (Database-Level Aggregations)

## Problem Statement

The user dashboard (`src/app/app/page.tsx`) and the analytics reports page (`src/app/app/reports/page.tsx`) currently suffer from a massive performance bottleneck. They retrieve thousands of raw stringified documents from the database (using `limit: 5000`) and perform grouping, summing, and mapping in the Next.js Node server memory via array `.reduce()` and `.forEach()`.

This approach scales poorly as transaction volume grows, causing:

1. **High Memory Spikes** during peak traffic.
2. **Excessive DB Egress Data** leading to unnecessary bandwidth costs.
3. **Data Truncation** if a power user ever exceeds the hard `5000` document limit.

## Proposed Solution

We will push the heavy lifting to the database layer by implementing strict MongoDB Aggregation Pipelines accessible via Payload Custom Endpoints. We will then wrap the retrieval of these aggregations in Next.js caching to achieve instant page loads.

---

## Technical Implementation Plan

### 1. New Payload Custom Endpoints

We will create and register two custom endpoints attached to the `Transactions` collection in Payload.
Since we are using Mongoose, we have direct access to `req.payload.db.collections['transactions'].aggregate()`.

- **Endpoint A: `/api/transactions/reports/dashboard`**
  - **Purpose:** Calculates Budget Health (summing expenses per category for the current month).
  - **Pipeline Structure:**
    ```javascript
    ;[
      { $match: { owner: userId, date: { $gte: startOfMonth }, type: 'expense' } },
      { $group: { _id: '$category', spentCents: { $sum: '$amount' } } },
    ]
    ```

- **Endpoint B: `/api/transactions/reports/analytics`**
  - **Purpose:** Calculates 12-month Income vs. Expense and Spending Category distribution.
  - **Pipeline Structure (Income/Expense over time):**
    ```javascript
    ;[
      { $match: { owner: userId, date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { month: { $substr: ['$date', 0, 7] }, type: '$type' },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]
    ```

### 2. Frontend Refactoring & Local API Consumption

Instead of hitting the HTTP endpoints (which adds HTTP overhead), best-practice for Next.js App Router within the same repo is to utilize the Payload Local API or a Server Action that directly retrieves the aggregation.

We will create two Server Actions in a new file `src/app/app/reports/actions.ts`:

- `getDashboardAggregations()`
- `getAnalyticsAggregations()`

These actions will access the aggregation pipeline directly via the Payload instance, just like the custom endpoints would. This prevents having to parse JSON over an internal network layer while still letting us leverage Next.js Caching.

`src/app/app/page.tsx` and `src/app/app/reports/page.tsx` will be refactored side-by-side to remove their 100+ lines of reduce logic and instead simply await these new functions.

### 3. Deep Caching Strategy

By moving to aggregations, we drastically reduce memory, but running DB aggregations on every page navigation is still poor for database CPU.

**Implementation:**

1. We will wrap our data-fetching Server Actions in `unstable_cache` from `next/cache`.
2. The cache key will be scoped securely using tags: `['transactions', `user\_${user.id}`]`.
3. In our existing `updateAccountBalance` hooks from **Phase 1: Point 1** (or a new dedicated hook), we will import `revalidateTag` from `next/cache`.
4. Whenever a transaction is `created`, `updated`, or `deleted`, we will fire `revalidateTag('transactions')` (or the specific user tag).

This guarantees that the dashboard and reports pages are served from a blazing-fast static edge cache 99% of the time, and the database aggregation is only parsed exactly once after a user mutates their financial ledger.

## Target Files to Modify

- `src/payload/collections/finance/Transactions/Transactions.ts` (To add endpoints/hooks)
- `src/payload/collections/finance/Transactions/endpoints/` (New directory for aggregation logic)
- `src/app/app/page.tsx` (Refactor to remove `.forEach` and replace with aggregation output)
- `src/app/app/reports/page.tsx` (Refactor to remove `.reduce` and replace with aggregation output)
- `src/app/app/reports/actions.ts` (New file combining aggregations and `unstable_cache`)

---

**Review Request:** Please review this RFC with the Lead Architect. Provide the green light to execute the MongoDB Aggregation code if the strategy is approved.
