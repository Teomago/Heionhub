# RFC 08: Test Automation (Unit Testing)

This document outlines the technical implementation plan for entering the "Hacker Phase" by introducing automated unit testing to the Eterhub application. The goal is to ensure our core utility logic and date mathematics are unbreakable before proceeding to complex database migrations.

## Goal Description

We need to establish a robust, fast, and pure TypeScript testing environment using `vitest`. The initial test coverage will focus on:

1.  **Type Guards:** Ensuring our custom authentication type guards (`isMember`, `isAdminUser`) correctly validate payload objects.
2.  **Date Mathematics (Cron Idempotency):** Ensuring that our scheduled transaction math (e.g., adding exactly 1 month to January 31st) resolves predictably without drift. We will extract this logic into a pure utility function to make it fully testable.

## Proposed Changes

### 1. Dependencies [NEW]

We will install `vitest` as a dev dependency to run our test suite. Since we are testing pure TypeScript functions (not React components yet), we do not need `@testing-library/react` at this stage.

_Command to run: `pnpm add -D vitest`_

---

### 2. Configuration [NEW]

#### [NEW] `vitest.config.ts`

We will create a Vite configuration file specifically for Vitest to understand our project structure and TypeScript path aliases (e.g., `@/lib/...`).

**Proposed Logic:**

```typescript
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node', // We are testing pure TS logic, not the DOM
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    globals: true, // Allows using describe/it/expect without importing
  },
})
```

_(Note: We will also need to install `vite-tsconfig-paths` as a dev dependency: `pnpm add -D vite-tsconfig-paths`)_

---

### 3. Date Math Utility [NEW]

#### [NEW] `src/lib/utils/dateMath.ts`

We will extract the next-due-date calculation logic from our Cron endpoint into a pure, testable function.

**Proposed Logic:**

```typescript
export function calculateNextDueDate(
  currentDateStr: string,
  frequency: 'weekly' | 'monthly' | 'yearly',
): string {
  const date = new Date(currentDateStr)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided')
  }

  // Use UTC to prevent timezone drift during midnight cron executions
  if (frequency === 'weekly') {
    date.setUTCDate(date.getUTCDate() + 7)
  } else if (frequency === 'monthly') {
    // JavaScript's setMonth automatically handles edge cases (e.g. Jan 31 + 1 month = Mar 3)
    // If we strictly want Feb 28/29, we would need to clamp the date.
    // For standard billing, clamping is best practice:
    const targetMonth = date.getUTCMonth() + 1
    date.setUTCMonth(targetMonth)

    // If the month jumped too far (e.g., target was Feb but we landed in Mar), clamp to last day of target month
    if (date.getUTCMonth() !== targetMonth % 12) {
      date.setUTCDate(0) // 0th day is the last day of the previous month
    }
  } else if (frequency === 'yearly') {
    date.setUTCFullYear(date.getUTCFullYear() + 1)
  }

  return date.toISOString()
}
```

---

### 4. Test Files [NEW]

#### [NEW] `src/lib/auth/__tests__/typeGuards.test.ts`

Testing our custom type guards.

```typescript
import { describe, it, expect } from 'vitest'
import { isMember, isAdminUser } from '../typeGuards'

describe('Type Guards', () => {
  it('identifies a Member correctly', () => {
    const member = { collection: 'members', id: '123' }
    expect(isMember(member)).toBe(true)
  })

  it('rejects an Admin when checking for Member', () => {
    const admin = { collection: 'users', id: '123' }
    expect(isMember(admin)).toBe(false)
  })

  // ... tests for isAdminUser, nulls, undefined, and malformed objects
})
```

#### [NEW] `src/lib/utils/__tests__/dateMath.test.ts`

Testing the exact idempotency logic for scheduled transactions described above.

```typescript
import { describe, it, expect } from 'vitest'
import { calculateNextDueDate } from '../dateMath'

describe('calculateNextDueDate', () => {
  it('adds exactly 1 month clamping correctly (Jan 31 -> Feb 28/29)', () => {
    // Non-leap year: 2023
    const next1 = calculateNextDueDate('2023-01-31T00:00:00.000Z', 'monthly')
    expect(next1).toBe('2023-02-28T00:00:00.000Z')

    // Leap year: 2024
    const next2 = calculateNextDueDate('2024-01-31T00:00:00.000Z', 'monthly')
    expect(next2).toBe('2024-02-29T00:00:00.000Z')
  })

  it('adds exactly 1 week correctly', () => {
    const next = calculateNextDueDate('2024-01-01T00:00:00.000Z', 'weekly')
    expect(next).toBe('2024-01-08T00:00:00.000Z')
  })

  it('adds exactly 1 year correctly', () => {
    const next = calculateNextDueDate('2024-01-01T00:00:00.000Z', 'yearly')
    expect(next).toBe('2025-01-01T00:00:00.000Z')
  })
})
```

---

### 5. Package Scripts [MODIFY]

#### [MODIFY] `package.json`

We will add standard test runner scripts.

```json
"scripts": {
  // ... existing scripts
  "test": "vitest run",
  "test:watch": "vitest"
}
```

## Verification Plan

### Automated Tests

1. Run `pnpm test`. `vitest` will execute both `typeGuards.test.ts` and `dateMath.test.ts`.
2. We must see 100% pass rates on these test suites before considering this phase complete.
