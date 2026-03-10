# RFC 02: Security Abstraction (DRY Server Actions)

## Problem Statement

Currently, Server Actions across the Eterhub Finance App (e.g., in `transactions`, `budget`, `accounts`, etc.) independently implement session validation logic. This creates significant technical debt:

1. **Code Duplication:** The exact same boilerplate (fetching payload, getting headers, validating user collection) is repeated at the top of dozens of exported functions.
2. **Security Risk:** If a new developer forgets to copy-paste this block into a new Server Action, that endpoint becomes an unauthenticated, public data-mutation vector.
3. **Rigid Architecture:** If we ever need to modify the auth heuristic (e.g., adding an `isBanned` check, or role-based access control), we would have to manually update 20+ different files.

## Proposed Solution: Centralized Authentication Utility

We will create a centralized authentication utility (an `assertUser` function) that securely extracts the authenticated user and the `Payload` instance. Every Server Action will simply invoke this utility as its first line of code.

---

## Files to be Modified / Created

### 1. New Utility File

- **Target File:** `src/lib/auth/assertUser.ts` (New File)

### 2. Files to Refactor (Server Actions)

A codebase scan identified the following Next.js App Router API files containing Server Actions. We will systematically find and replace the duplicated auth logic in:

- `src/app/app/transactions/actions.ts`
- `src/app/app/budget/actions.ts`
- `src/app/app/accounts/actions.ts`
- `src/app/app/categories/actions.ts`
- `src/app/app/subscriptions/actions.ts`
- `src/app/app/import/actions.ts`
- `src/app/app/actions/auth.ts`

---

## Technical Implementation Details

### The `assertUser` Utility (`src/lib/auth/assertUser.ts`)

This utility will encapsulate the dependency injections (`headers`, `getPayload`) and throw a standard generic error if the user is unauthenticated.

```typescript
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import type { Payload } from 'payload'
import type { User, Member } from '@/payload/payload-types'

export type ValidUser = User | Member

export interface AuthContext {
  user: ValidUser
  payload: Payload
}

/**
 * Validates the current Server Action session.
 * Throws an Error if unauthenticated, halting the Action.
 * Returns the typed User and the ready Payload instance.
 */
export async function assertUser(): Promise<AuthContext> {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    throw new Error('Unauthorized')
  }

  // Type assertion is safe here because of the collection check above
  return { user: user as ValidUser, payload }
}
```

### Server Action Refactor (Before and After Example)

**Before (Current State):**

```typescript
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'

export async function createTransaction(data: any) {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user || (user.collection !== 'members' && user.collection !== 'users')) {
    throw new Error('Unauthorized')
  }

  // ... business logic ...
}
```

**After (Proposed State):**

```typescript
import { assertUser } from '@/lib/auth/assertUser'

export async function createTransaction(data: any) {
  const { user, payload } = await assertUser()

  // ... business logic seamlessly continues, `user` is strongly typed! ...
}
```

## Review Request

This approach removes boilerplate, standardizes security, and makes type-narrowing significantly easier by returning a guaranteed `User | Member` union explicitly (setting the stage for Phase 1 - Point 4 regarding Type Guards).

Please review this implementation plan for approval before execution.
