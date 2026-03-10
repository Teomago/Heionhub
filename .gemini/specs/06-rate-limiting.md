# RFC 06: Border Security (Rate Limiting)

This document outlines the technical implementation plan for adding border security to the Eterhub application, focusing on Rate Limiting and Brute Force protection as specified in Point 7 of our refactoring tasks.

## Goal Description

Next.js Server Actions are exposed as public POST endpoints. To protect the application from brute-force login attempts and Application-Layer DDoS attacks (which can spike database costs by spamming transaction creations), we need to implement Edge-level rate limiting using Upstash/Vercel KV and native Payload brute-force protection.

## Proposed Changes

### 1. Dependencies [NEW]

We will install the required packages to handle fast, edge-compatible rate limiting:

- `@upstash/ratelimit`
- `@vercel/kv` (or standard `@upstash/redis` depending on the current project setup)

_Command to run: `pnpm add @upstash/ratelimit @vercel/kv`_

---

### 2. Edge Middleware [NEW]

#### [NEW] `src/middleware.ts`

We will create a Next.js Edge Middleware file at the root `src/` directory to intercept incoming requests before they hit the server or database.

**Proposed Logic:**

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

// Create rate limiters
// Strict: 5 requests per minute for Auth
const authRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
})

// Moderate: 30 requests per minute for App Actions / Mutations
const apiRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
})

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const path = req.nextUrl.pathname

  // Apply Strict Limiting to Auth Endpoints
  if (path.startsWith('/api/members/login') || path.startsWith('/api/users/login')) {
    const { success, pending, limit, reset, remaining } = await authRatelimit.limit(`auth_${ip}`)

    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      })
    }
  }

  // Apply Moderate Limiting to Server Actions / App APIs
  // Note: Next.js Server Actions hit the page path with a POST request, or specific API routes.
  if (req.method === 'POST' && (path.startsWith('/app') || path.startsWith('/api'))) {
    const { success, pending, limit, reset, remaining } = await apiRatelimit.limit(`api_${ip}`)

    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  return NextResponse.next()
}

// Configure matcher to only run on API and App routes
export const config = {
  matcher: ['/api/:path*', '/app/:path*'],
}
```

---

### 3. Payload Native Protection [MODIFY]

#### [MODIFY] `src/payload/collections/finance/Members/index.ts` (and Users.ts if necessary)

We will enable Payload CMS's native auth protection configuration to automatically lock accounts after continuous failed attempts.

**Proposed Logic:**

```typescript
export const Members: CollectionConfig = {
  slug: 'members',
  auth: {
    maxLoginAttempts: 5, // Lock after 5 failed attempts
    lockTime: 600000, // Lock for 10 minutes (in milliseconds)
    // ... existing auth config ...
  },
  // ... existing fields ...
}
```

## Verification Plan

### Automated Tests

1. Run `pnpm build` and `npx tsc --noEmit` to verify type safety.

### Manual Verification

1. Attempt to login with invalid credentials 6 times consecutively. Verify that Payload rejects the 6th attempt with a locked account message, enforcing the `maxLoginAttempts` policy.
2. Hit the `/api/members/login` endpoint from a REST tool (like Postman or curl) 6 times within 1 minute. Verify that the Next.js Middleware returns a `429 Too Many Requests` status block on the 6th attempt, confirming Upstash integration behaves correctly.
3. Validate that standard navigation and dashboard data fetching in `/app` are not accidentally blocked.
