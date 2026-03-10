# RFC 07: Observability (Centralized Error Handling)

This document outlines the technical implementation plan for adding robust observability and centralized error handling to the Eterhub application, as specified in Phase 2 of our refactoring tasks.

## Goal Description

Currently, the application lacks visibility into production crashes and validation errors, relying on basic `console.error()`. We will integrate Sentry to capture both frontend and backend errors, and implement a custom `APIError` class to safely expose user-friendly messages while keeping stack traces secure.

## Proposed Changes

### 1. Dependencies [NEW]

We will install Sentry's Next.js SDK, which automatically instruments the Next.js App Router (frontend) and API routes (backend).

_Command to run: `npx @sentry/wizard@latest -i nextjs`_
_(Alternatively, install `@sentry/nextjs` manually if the wizard is not feasible in the automated workflow)._

---

### 2. Custom Error Class [NEW]

#### [NEW] `src/lib/utils/APIError.ts`

We will create a custom error class that distinguishes between "Public" errors (safe to render to the user, like validation or budget limits) and "Private" errors (unexpected crashes, database timeouts).

**Proposed Logic:**

```typescript
export class APIError extends Error {
  public statusCode: number
  public isPublic: boolean

  constructor(message: string, statusCode: number = 500, isPublic: boolean = false) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.isPublic = isPublic

    // Restore prototype chain
    Object.setPrototypeOf(this, APIError.prototype)
  }
}
```

---

### 3. Server Actions Refactoring [MODIFY]

#### [MODIFY] `src/app/app/transactions/actions.ts` (and other action files)

We will wrap server action logic in robust `try/catch` and use Sentry to capture the full error context, including the user's ID.

**Proposed Logic Pattern:**

```typescript
import * as Sentry from '@sentry/nextjs'
import { APIError } from '@/lib/utils/APIError'

export async function someServerAction(data) {
  try {
    const { user, payload } = await assertUser()
    // ... business logic ...
  } catch (error) {
    // 1. Capture the crash remotely in Sentry
    Sentry.captureException(error, {
      user: { id: typeof user !== 'undefined' ? user.id : 'anonymous' },
      extra: { inputData: data },
    })

    // 2. Safely return to the client
    if (error instanceof APIError && error.isPublic) {
      return { success: false, error: error.message }
    }

    // Fallback for private/unexpected errors
    return {
      success: false,
      error: 'An unexpected application error occurred. Our team has been notified.',
    }
  }
}
```

---

### 4. Next.js App Router Error Handling [MODIFY & NEW]

- **`src/app/global-error.tsx`**: Add or update the global error boundary to catch and report root-level layout crashes to Sentry.
- **`src/app/app/error.tsx`**: Update the Dashboard-level error boundary to log client-side rendering failures using `Sentry.captureException(error)`.

---

### 5. Payload CMS Backend Error Interception [MODIFY]

#### [MODIFY] `src/payload/payload.config.ts`

Payload 3.0 provides native error handling hooks and custom logger options. We will wrap the Payload logger or inject Sentry into Payload's `onInit` or global error formatting.

**Proposed Logic:**
In the configuration, we can hook into Payload's lifecycle or customized error handler (if applicable), or simply let the Sentry Next.js SDK auto-instrument the Next.js API route that handles Payload (`src/app/(payload)/api/[...slug]/route.ts`).

For explicit logging:

```typescript
import * as Sentry from '@sentry/nextjs'

// Inside payload.config.ts
export default buildConfig({
  // ...
  onInit: async (payload) => {
    payload.logger.info('Payload initialized.')
  },
  // Payload error handler (if using custom Express/Next wrappers)
})
```

_Note: The `@sentry/nextjs` SDK natively catches unhandled promise rejections and API route crashes, so Payload DB operations throwing errors will automatically be caught at the Next.js boundary._

## Environment Variables

- `SENTRY_DSN`: The Sentry Data Source Name to route events.
- `SENTRY_AUTH_TOKEN`: (For builds) To upload sourcemaps.
- _(These should be added to `.env` and Vercel)._

## Verification Plan

### Automated Tests

1. Verify `pnpm build` completes normally and Sentry registers the Next.js plugin in the build output.

### Manual Verification

1. **Frontend Crash Test:** Trigger a deliberate `throw new Error('Test Client Crash')` in a client component and verify it is caught by `error.tsx` and logged to the Sentry dashboard.
2. **Server Action Test:** Trigger a deliberate `throw new Error('Test Server Crash')` in a Server Action. Verify:
   - The UI displays the generic safe fallback message.
   - Sentry receives the full stack trace and the User ID tag attached via `Sentry.captureException`.
3. **APIError Test:** Throw an `new APIError('Custom validation message', 400, true)` and verify the UI displays "Custom validation message" exactly.
