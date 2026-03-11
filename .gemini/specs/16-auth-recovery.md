# RFC 16: Auth Recovery Flow (Forgot Password / Reset Password)

> **Status:** 🟡 Pending Approval  
> **Date:** 2026-03-11  
> **Depends on:** RFC 15 (Security Hardening), Payload 3.x Auth Operations  
> **Payload Docs Reference:** `.gemini/docs/payloadcms/authentication/operations.mdx`, `.gemini/docs/payloadcms/authentication/email.mdx`

---

## Background

Members can register and log in via the `(auth)` route group, but there is no way to recover a lost password. Payload 3.x provides built-in `forgotPassword` and `resetPassword` operations on any auth-enabled collection. These operations:

1. **`POST /api/members/forgot-password`** — Accepts `{ email }`. If the email exists, Payload generates a one-time token, stores it on the member document (`resetPasswordToken`, `resetPasswordExpiration`), and sends an email via the configured email adapter (Brevo) with a link containing the token.
2. **`POST /api/members/reset-password`** — Accepts `{ token, password }`. Payload validates the token, checks expiration, hashes the new password, clears the token fields, and **returns the user object with a fresh JWT token** (`{ user, token, exp }`) — effectively auto-logging the user in.

> [!WARNING]
> **Critical from Payload Docs:** By default, Payload's forgot-password email links to the **Admin Panel** (`${serverURL}/admin/reset/${token}`), NOT a custom frontend page. We **MUST** override `auth.forgotPassword.generateEmailHTML` on the `Members` collection to point to our own `/reset-password?token=...` page. Without this override, members will be sent to the Payload admin panel — which they don't have access to.

---

## 1. Forgot Password Page

### [NEW] [page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/forgot-password/page.tsx)

A Client Component (`'use client'`) mirroring the existing login page design (same Card, Input, Button, Label components from `@/components/ui/`).

#### UI Design

- **Card Title:** "Forgot Password"
- **Card Description:** "Enter your email and we'll send you a reset link."
- **Fields:** Single `email` input (type `email`, required)
- **Submit Button:** "Send Reset Link" (with loading state: "Sending...")
- **Back Link:** "Back to Login" → navigates to `/login`

#### API Call

```typescript
const res = await fetch('/api/members/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
})
```

#### Security Rule: Email Enumeration Prevention

> [!CAUTION]
> The UI **MUST NOT** reveal whether the email exists in the database.

Regardless of the API response (200 or 400), the component will:
1. Always show the **same success message**: *"If that email is registered, we've sent a password reset link. Please check your inbox."*
2. Never render error text like "Email not found" or "User does not exist."
3. The only error the UI should surface is a network-level failure (catch block).

```typescript
try {
  await fetch('/api/members/forgot-password', { ... })
  // ALWAYS show success — even if the email doesn't exist
  setStatus('success')
} catch {
  setError('Something went wrong. Please try again.')
}
```

---

## 2. Reset Password Page

### [NEW] [page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/reset-password/page.tsx)

A Client Component mirroring the same Card design, accepting a `?token=xyz` query parameter.

#### Token Extraction

```typescript
import { useSearchParams } from 'next/navigation'

const searchParams = useSearchParams()
const token = searchParams.get('token')
```

If `token` is null or empty, the page should display an error: *"Invalid or missing reset token. Please request a new password reset link."*

#### UI Design

- **Card Title:** "Reset Password"
- **Card Description:** "Enter your new password below."
- **Fields:**
  - `newPassword` (type `password`, required, minLength 8)
  - `confirmPassword` (type `password`, required)
- **Client-side validation:** `newPassword === confirmPassword` before submitting. Show error *"Passwords do not match"* if they differ.
- **Submit Button:** "Reset Password" (with loading state: "Resetting...")

#### API Call

```typescript
const res = await fetch('/api/members/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, password: newPassword }),
})
```

#### Success Behavior

Per the Payload docs, a successful `reset-password` response returns:
```json
{
  "user": { "email": "...", "id": "..." },
  "token": "fresh-jwt-token...",
  "exp": 1609619861
}
```

This means Payload **auto-logs the user in** on password reset. On success (`res.ok`):
1. Show a success message: *"Your password has been reset successfully."*
2. After 2 seconds, redirect to `/app` (since they're now authenticated) via `router.push('/app')`

On failure:
- Show error from API response: `data?.errors?.[0]?.message || 'Reset link has expired or is invalid.'`

---

## 3. Members Collection: `generateEmailHTML` Override

### The Critical Override

Per the Payload docs (`.gemini/docs/payloadcms/authentication/email.mdx`), Payload's default forgot-password email links users to `${serverURL}/admin/reset/${token}`. Members do **NOT** have admin panel access, so we **MUST** override the email template in the `Members` collection config.

#### [MODIFY] [Members/index.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Members/index.ts)

Add `auth.forgotPassword` configuration:

```typescript
auth: {
  // ... existing auth config (tokenExpiration, maxLoginAttempts, etc.)
  forgotPassword: {
    expiration: 3600000, // 1 hour (in milliseconds)
    generateEmailHTML: ({ token, user }) => {
      const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const resetURL = `${serverURL}/en/reset-password?token=${token}`
      
      return `
        <!doctype html>
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Reset Your Password</h1>
            <p>Hello, ${user.email}!</p>
            <p>You requested to reset your password. Click the link below:</p>
            <p><a href="${resetURL}">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you did not request this, please ignore this email.</p>
          </body>
        </html>
      `
    },
    generateEmailSubject: () => {
      return `EterHub — Reset your password`
    },
  },
},
```

> [!IMPORTANT]
> The reset URL hardcodes `/en/` as the locale prefix. The email is generic enough for both EN and ES users. A future enhancement could read the user's preferred locale.

---

## 4. Payload Config: `serverURL`

### Problem

Payload uses `serverURL` to construct the password reset link in the email body. The link follows the format:

```
${serverURL}/reset-password?token=${token}
```

Currently, `payload.config.ts` does **not** define `serverURL`. This means:
- In development, Payload may default to `http://localhost:3000` or omit the hostname entirely.
- In production, the email link would be broken or point to localhost.

### Fix

#### [MODIFY] [payload.config.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/payload.config.ts)

Add `serverURL` to the Payload config:

```typescript
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  // ... rest of config
})
```

> [!NOTE]
> Per the Payload docs: *"if you do not have a `config.serverURL` set, Payload will attempt to create one for you if the `forgot-password` operation was triggered via REST or GraphQL by looking at the incoming `req`. But this is not supported if you are calling `payload.forgotPassword()` via the Local API."* Since we're calling via REST from the client, `serverURL` is technically optional — but setting it explicitly is safer and required if we ever call `forgotPassword` via Local API.



---

## 4. Login Page Integration

#### [MODIFY] [login/page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/login/page.tsx)

Add a "Forgot password?" link below the password field or in the card footer:

```tsx
<Button
  variant="link"
  className="w-full text-muted-foreground hover:text-foreground"
  onClick={() => router.push('/forgot-password')}
>
  Forgot your password?
</Button>
```

---

## Verification Plan

### Automated
- `npx tsc --noEmit` — must pass with zero errors
- `pnpm build` — must succeed with exit code 0

### Manual Testing

1. **Forgot Password (Happy Path):**
   - Navigate to `/en/forgot-password`
   - Enter a registered email → submit
   - Verify the generic success message appears ("If that email is registered...")
   - Check the dev console for the email log (since `BREVO_EMAILS_ACTIVE=false` in dev, the email body will be logged to the server console with the reset link)

2. **Forgot Password (Enumeration Prevention):**
   - Enter a non-existent email → submit
   - Verify the **exact same** success message appears — no "email not found" error

3. **Reset Password (Happy Path):**
   - Copy the `?token=xyz` from the console-logged email
   - Navigate to `/en/reset-password?token=xyz`
   - Enter matching passwords → submit
   - Verify success message appears and redirects to `/app`
   - Verify you're logged in and can access the dashboard

4. **Reset Password (Expired Token):**
   - Use an old or invalid token → submit
   - Verify error message appears ("Reset link has expired or is invalid.")

5. **Reset Password (Missing Token):**
   - Navigate to `/en/reset-password` without `?token=`
   - Verify the error message appears ("Invalid or missing reset token...")
