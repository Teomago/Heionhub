# RFC 12: Legacy CSV Import Refactor & UX Polish

## Objective
Refactor the legacy CSV bulk import action (`bulkImportTransactions`) to be compatible with our new strict PostgreSQL architecture natively using Payload/Drizzle hooks. Additionally, improve the UX by providing users with a "Magic AI Prompt" to standardize their raw bank strings before uploading.

## 1. Frontend Refactor (UX & AI Tutorial)
**File:** `src/app/app/import/page.tsx` or `ImportClient` / `DropzoneArea` component.

**Action:** Update the user interface to display a set of instructions before the drag-and-drop zone. Underneath a "How to format your CSV" section, we will inject a "Magic AI Prompt" that the user can copy and paste into ChatGPT/Claude along with their raw bank data.

**The Prompt to Include:**
> *Actúa como un asistente financiero. Tengo estos datos bancarios en bruto. Por favor, conviértelos a un formato CSV estricto con los siguientes encabezados exactos: `Date,Description,Amount,Type,CategoryName,AccountName`. Reglas: 1. 'Date' debe ser YYYY-MM-DD. 2. 'Amount' debe ser un número decimal positivo sin símbolos de moneda. 3. 'Type' solo puede ser 'income' o 'expense'. 4. Asigna un 'CategoryName' lógico de 1 o 2 palabras en español. 5. 'AccountName' debe ser '[Nombre de mi cuenta en Eterhub]'. Solo devuélveme el bloque de código CSV.*

## 2. Backend Refactor (`src/app/app/import/actions.ts`)

The legacy action calculates rolling balances in memory and fires inserts asynchronously using `Promise.all` batches of 50. In PostgreSQL, parallel massive inserts that trigger Drizzle `sql` increment atomic hooks on the SAME `Account` record simultaneously will cause severe **Row-Level Lock Contention** (`deadlock detected` or lock wait timeouts) and will bypass the natural sequential sequence of the database.

### What to Keep
- **O(1) Map Lookups:** Retain the logic that queries existing `Accounts` and `Categories` limits 1000, storing them into `accountsMap` and `categoriesMap`. This is highly efficient.
- **Auto-Creation:** Retain the logic that loops over `requiredAccounts` and `requiredCategories` to `payload.create` missing entities dynamically before starting the transaction loop.

### What to Destroy
- **Manual Balance Tracking:** Completely remove the `accountBalancesMap`.
- **Manual Balance Commits:** Completely delete the step at the bottom of the file that does parallel `payload.update` on accounts. Our Drizzle `afterChange` (`updateAccountBalance.ts`) already handles this perfectly at the database level!

### What to Refactor
- **Change `Promise.all` to Sequential `for...of`:** Instead of batching 50 items and firing `Promise.all`, we must iterate sequentially.
  ```typescript
  for (const job of transactionJobs) {
    await payload.create({
      collection: 'transactions',
      data: job.data,
    })
    importedCount++
  }
  ```
  *Why:* This ensures PostgreSQL locks the `Account` row, performs the atomic `sum` increment via the Drizzle hook, releases the lock, and processes the next row. It guarantees 100% data integrity without DB deadlocks.
- **Data Safety:** Ensure the parsing logic `Math.round(amountFloat * 100)` remains to safely cast string floats to integer cents before DB insertion.

## Verification
- Ensure TypeScript (`npx tsc --noEmit`) passes cleanly after refactoring the Server Action.
- Verify the UI displays the Spanish prompt logic beautifully.
