# RFC 19A: CSV Import Batch Processing & UX

## Objective

Resolve the Vercel 504 Gateway Timeout (300s limit) occurring during massive CSV imports (e.g., 1000+ rows) by migrating the iteration logic to the client side. Implement robust UI feedback to prevent users from interrupting the process.

## Technical Strategy

### 1. Client-Side Chunking Logic

- **Target File:** The main CSV import client component (e.g., `src/app/[locale]/app/import/components/ImportTutorialTour.tsx` or wherever the submit handler lives).
- **Algorithm:** - After parsing the CSV, evaluate the total length of the array (`totalRows`).
  - If `totalRows <= 59`: Send the entire array to the Server Action in a single request.
  - If `totalRows >= 60`: Split the array into chunks of `50` records each.
  - **Execution:** Iterate through the chunks using a sequential `for...of` loop. `await` the Server Action for each chunk before sending the next one to avoid hammering the database connections.

### 2. UX & Loading State (The Shield)

- **State Management:** Introduce `isImporting` (boolean) and `importedCount` (number).
- **Blocking Modal/Overlay:**
  - When `isImporting` becomes `true`, trigger a full-screen or prominent modal overlay.
  - **Constraint:** This modal MUST NOT be closable by clicking outside or pressing Escape while `isImporting` is true. Navigation must be discouraged/blocked visually.
- **Progress Indicator:** - Inside the modal, display a live counter: `"Importing {importedCount} of {totalRows} transactions..."` (use `next-intl` keys if possible, or fallback to plain text to be translated in RFC 19B).
  - Include a spinner or progress bar.
- **Success State:**
  - Once the loop finishes, update the modal text to: `"✓ {totalRows} transactions successfully imported."`
  - Provide a "Close / Continue" button that refreshes the router (`router.refresh()`) to show the new data.

### Verification

- Ensure the Server Action is configured to accept partial arrays safely without wiping existing data.
- Run `pnpm build` to ensure no Type errors are introduced.
