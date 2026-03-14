# RFC 20: Data Ownership & Privacy Compliance

## 1. Objective
Ensure full privacy compliance by implementing hard-delete mechanisms across the user lifecycle and providing users (and admins) with the tools necessary to manage their data footprint. This RFC focuses on cascading deletions, bulk data removal, administrative cleanup, and targeted UX improvements.

## 2. Requirements

### 2.1. Cascading Account Deletion (Members Hook)
When a Member deletes their account (or an admin deletes a Member), we must strictly adhere to the Right to Erasure (Privacy Policy compliance). 
- **Implementation:** Add an `afterDelete` hook to the `Members` collection (`src/payload/collections/finance/Members/index.ts`).
- **Action:** Execute a Hard Delete (`payload.delete`) for all associated records tied to the deleted Member's `id`.
- **Target Collections:**
  - `transactions`
  - `accounts`
  - `budgets`
  - `categories`
  - `scheduled-transactions`

### 2.2. Nuke Button & Bulk Delete (Transactions UX)
Users need the ability to wipe their transaction history easily, bypassing the current soft-delete (`status`) implementation.
- **Nuke Button ("Delete All Transactions"):**
  - Add a dedicated button in the Transactions UI.
  - Require a strict double-confirmation modal (e.g., typing "DELETE" to confirm).
  - Triggers a Server Action to Hard Delete all transactions for the authenticated user.
- **Bulk Delete:**
  - Implement a checkbox selection feature in the Transactions list.
  - Implement a "Delete Selected" action that triggers a Hard Delete Server Action for the selected transaction IDs.

### 2.3. Admin Cleanup Script
Provide a secure mechanism for Super Admins to permanently purge orphaned or soft-deleted transactions, specifically mitigating the database bloat from recent failed large-scale CSV imports.
- **Implementation:** Design a one-off utility script or a secure, admin-only endpoint.
- **Action:** Query for all transactions where `status === 'deleted'` or where the `owner` no longer exists, and perform a Hard Delete across the database.

### 2.4. UX Fixes (Hydration & Loading States)
Improve the overall stability and feedback of the Transactions UI.
- **Hydration Error #418:** Resolve the React Hydration Mismatch in the transactions list, which is likely caused by server/client date formatting inconsistencies (e.g., using `new Date().toLocaleDateString()` directly in the render tree without a client-side layout effect or a standardized formatter).
- **Loading States:** Ensure all destructive actions (Nuke, Bulk Delete, Single Delete) utilize a `disabled={isLoading}` state alongside loading spinners (e.g., `Loader2` from `lucide-react`) to prevent double submissions.

## 3. Implementation Plan
- **Phase 1:** Add the `afterDelete` hook to the `Members` collection.
- **Phase 2:** Implement the Server Actions for Bulk Delete and Nuke All.
- **Phase 3:** Update the `Transactions` UI to include the checkboxes, Nuke button, and loading states. Fix the Hydration error.
- **Phase 4:** Create and document the Admin Cleanup Script.
