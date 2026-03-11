# RFC 17: Full i18n Polish

> **Status:** 🟡 Pending Approval  
> **Date:** 2026-03-11  
> **Depends on:** RFC 14 (Mass Translation Sweep), RFC 16 (Auth Recovery Flow)

---

## Problem Statement

The i18n infrastructure is architecturally sound, but four areas remain untranslated before production:

1. The auth recovery pages (RFC 16) contain 20+ hardcoded English strings.
2. The Header/Footer globals don't localize user-facing text fields — admins can't enter EN/ES variations for nav link labels, CTA text, section titles, or copyright.
3. The Payload Admin UI already loads `es` via `supportedLanguages`, but we should verify full coverage.
4. Password reset emails are always in English, ignoring the member's language preference.

---

## 1. Auth UI Dictionaries

### Problem

`forgot-password/page.tsx` has **14 hardcoded English strings** and `reset-password/page.tsx` has **15 hardcoded English strings** (titles, descriptions, button labels, error/success messages). The `login/page.tsx` also has **8 hardcoded strings**.

### Implementation

#### [MODIFY] [en.json](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/messages/en.json)

Add a new `"Auth"` namespace:

```json
"Auth": {
  "loginTitle": "Welcome Back",
  "loginDescription": "Sign in to your account",
  "email": "Email",
  "password": "Password",
  "signIn": "Sign In",
  "signingIn": "Signing in...",
  "invalidCredentials": "Invalid credentials.",
  "somethingWentWrong": "Something went wrong. Please try again.",
  "forgotPassword": "Forgot your password?",
  "haveInvitation": "Have an invitation code?",
  "forgotTitle": "Forgot Password",
  "forgotDescription": "Enter your email and we'll send you a reset link.",
  "sendResetLink": "Send Reset Link",
  "sending": "Sending...",
  "forgotSuccess": "If that email is registered, we've sent a password reset link. Please check your inbox.",
  "backToLogin": "Back to Login",
  "resetTitle": "Reset Password",
  "resetDescription": "Enter your new password below.",
  "newPassword": "New Password",
  "confirmPassword": "Confirm Password",
  "resetButton": "Reset Password",
  "resetting": "Resetting...",
  "resetSuccess": "Your password has been reset successfully. Redirecting to login...",
  "passwordsMismatch": "Passwords do not match.",
  "passwordMinLength": "Password must be at least 8 characters.",
  "tokenExpired": "Reset link has expired or is invalid.",
  "invalidToken": "Invalid Link",
  "missingToken": "Invalid or missing reset token. Please request a new password reset link.",
  "requestNewLink": "Request New Link",
  "minCharsPlaceholder": "Min. 8 characters",
  "reEnterPlaceholder": "Re-enter your password"
}
```

#### [MODIFY] [es.json](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/messages/es.json)

Mirror the same structure with Spanish translations:

```json
"Auth": {
  "loginTitle": "Bienvenido de Nuevo",
  "loginDescription": "Inicia sesión en tu cuenta",
  "email": "Correo electrónico",
  "password": "Contraseña",
  "signIn": "Iniciar Sesión",
  "signingIn": "Iniciando...",
  "invalidCredentials": "Credenciales inválidas.",
  "somethingWentWrong": "Algo salió mal. Inténtalo de nuevo.",
  "forgotPassword": "¿Olvidaste tu contraseña?",
  "haveInvitation": "¿Tienes un código de invitación?",
  "forgotTitle": "Recuperar Contraseña",
  "forgotDescription": "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.",
  "sendResetLink": "Enviar Enlace",
  "sending": "Enviando...",
  "forgotSuccess": "Si ese correo está registrado, hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.",
  "backToLogin": "Volver al Inicio de Sesión",
  "resetTitle": "Restablecer Contraseña",
  "resetDescription": "Ingresa tu nueva contraseña.",
  "newPassword": "Nueva Contraseña",
  "confirmPassword": "Confirmar Contraseña",
  "resetButton": "Restablecer Contraseña",
  "resetting": "Restableciendo...",
  "resetSuccess": "Tu contraseña ha sido restablecida exitosamente. Redirigiendo al inicio de sesión...",
  "passwordsMismatch": "Las contraseñas no coinciden.",
  "passwordMinLength": "La contraseña debe tener al menos 8 caracteres.",
  "tokenExpired": "El enlace ha expirado o es inválido.",
  "invalidToken": "Enlace Inválido",
  "missingToken": "Token de restablecimiento inválido o faltante. Solicita un nuevo enlace.",
  "requestNewLink": "Solicitar Nuevo Enlace",
  "minCharsPlaceholder": "Mín. 8 caracteres",
  "reEnterPlaceholder": "Re-ingresa tu contraseña"
}
```

#### [MODIFY] [login/page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/login/page.tsx)

Add `useTranslations('Auth')` and replace all 8 hardcoded strings with `t()` calls.

#### [MODIFY] [forgot-password/page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/forgot-password/page.tsx)

Add `useTranslations('Auth')` and replace all 14 hardcoded strings with `t()` calls.

#### [MODIFY] [reset-password/page.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(auth)/reset-password/page.tsx)

Add `useTranslations('Auth')` inside the `ResetPasswordForm` component and replace 15 hardcoded strings.

> [!IMPORTANT]
> The auth layout (`(auth)/layout.tsx`) also has 2 hardcoded strings: "Back to Home" and "EtherHub". These should be added to the `Auth` namespace as well and the layout must be updated.

---

## 2. Globals Localization (Header/Footer Content Fields)

### Problem

The Header and Footer globals use `getTranslation()` for **admin panel labels** (the labels that appear in the Payload CMS editing UI), but the **user-facing text fields** (the actual content displayed on the website) do NOT have `localized: true`. This means admins cannot enter different values for EN and ES.

Affected fields:

| Global | Field | Path | Currently Localized |
|---|---|---|---|
| Header | Logo text | `logo.text` | ❌ |
| Footer | Navigation title | `navigation.title` | ❌ |
| Footer | Contact title | `contact.title` | ❌ |
| Footer | Legal title | `legal.title` | ❌ |
| Footer | Legal name | `legal.legalName` | ❌ |
| Footer | Copyright | `legal.copyright` | ❌ |

Additionally, the `link` field factory (`src/payload/fields/link/link.ts`) accepts a `localizeLabels` option (line 48, 141) that defaults to `false`. The Header and Footer call `link({ appearances: false })` without `localizeLabels: true`, so nav link labels and CTA labels are NOT localized.

### Implementation

#### [MODIFY] [Header.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/globals/Header.ts)

1. Add `localized: true` to the `logo.text` field (line 63).
2. Change `link({ appearances: false })` to `link({ appearances: false, localizeLabels: true })` for both `navLinks` and `cta` groups.

#### [MODIFY] [Footer.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/globals/Footer.ts)

1. Add `localized: true` to all `title` text fields: `navigation.title`, `contact.title`, `legal.title`.
2. Add `localized: true` to `legal.legalName` and `legal.copyright`.
3. Change all `link({ appearances: false })` calls to `link({ appearances: false, localizeLabels: true })` for Navigation and Legal link arrays.

> [!NOTE]
> After these changes, the admin will see a locale switcher (EN/ES tabs) on these specific fields, allowing different text per language.

---

## 3. Admin Panel UI Translations

### Current State

`payload.config.ts` already configures:

```typescript
i18n: {
  supportedLanguages: { en, es },
  translations: { ...translations, es: { ... } },
}
```

The `@payloadcms/translations/languages/es` package (imported as `es` on line 7) provides full Spanish translations for all built-in Payload admin panel buttons, labels, and system messages. This is already wired up correctly.

### Verification Only

No code changes needed. This section requires only **manual verification**:
- Switch the Payload admin locale to ES
- Confirm all generic UI labels (Save, Delete, Publish, etc.) render in Spanish
- Confirm our custom `cmdkPlugin` translations render correctly

---

## 4. Bilingual Reset Emails

### Problem

The `generateEmailHTML` in `Members/index.ts` sends all reset emails in English and hardcodes `/en/reset-password` in the URL. Members who registered from the Spanish UI receive an English email.

### Implementation

#### [MODIFY] [Members/index.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Members/index.ts)

**Step 1:** Add a `preferredLocale` field to the Members collection:

```typescript
{
  name: 'preferredLocale',
  type: 'select',
  defaultValue: 'en',
  required: true,
  options: [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
  ],
  admin: {
    description: 'The user\'s preferred language for emails and system notifications.',
  },
},
```

**Step 2:** Update `generateEmailHTML` to read `user.preferredLocale`:

```typescript
generateEmailHTML: (args) => {
  const token = args?.token || ''
  const user = args?.user || { email: '', preferredLocale: 'en' }
  const locale = user.preferredLocale || 'en'
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const resetURL = `${serverURL}/${locale}/reset-password?token=${token}`

  const strings = {
    en: {
      title: 'Reset Your Password',
      greeting: `Hello, ${user.email}!`,
      body: 'You requested to reset your password. Click the button below to set a new one:',
      button: 'Reset Password',
      expiry: 'This link will expire in 1 hour.',
      ignore: 'If you did not request this, please ignore this email.',
    },
    es: {
      title: 'Restablecer tu Contraseña',
      greeting: `Hola, ${user.email}!`,
      body: 'Solicitaste restablecer tu contraseña. Haz clic en el botón para establecer una nueva:',
      button: 'Restablecer Contraseña',
      expiry: 'Este enlace expirará en 1 hora.',
      ignore: 'Si no solicitaste esto, ignora este correo.',
    },
  }

  const t = strings[locale as keyof typeof strings] || strings.en

  return `...HTML using ${t.title}, ${t.greeting}, etc...`
}
```

**Step 3:** Update `generateEmailSubject`:

```typescript
generateEmailSubject: (args) => {
  const locale = args?.user?.preferredLocale || 'en'
  return locale === 'es'
    ? 'EterHub — Restablecer tu contraseña'
    : 'EterHub — Reset your password'
}
```

#### [MODIFY] [auth.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/(frontend)/actions/auth.ts)

Update `registerMember` to pass the active locale as `preferredLocale`:

```typescript
// Inside registerMember, extract locale from the page context
// The (frontend) layout already has the [locale] param available
// Pass it from the client component or use getLocale()

await payload.create({
  collection: 'members',
  data: {
    email,
    password,
    firstName,
    secondName,
    lastName,
    secondLastName,
    currency: 'COP',
    preferredLocale: locale, // 'en' or 'es' from the registration page context
  },
  req,
})
```

The `InvitationGate` component (which calls `registerMember`) must also pass the locale. Since it's rendered within the `[locale]` route, the locale can be extracted from `useParams()` or passed as a prop.

---

## Verification Plan

### Automated
- `npx tsc --noEmit` — must pass with zero errors
- `pnpm build` — must succeed with exit code 0

### Manual Testing

1. **Auth UI in Spanish:**
   - Navigate to `/es/login` → verify all labels are Spanish
   - Navigate to `/es/forgot-password` → verify Spanish UI
   - Navigate to `/es/reset-password?token=test` → verify Spanish UI

2. **Header/Footer Localization:**
   - Open Payload Admin → Header global → verify locale tabs appear on `logo.text` and link labels
   - Open Payload Admin → Footer global → verify locale tabs on all title fields and copyright

3. **Admin Panel Spanish:**
   - Switch admin locale to ES → verify buttons (Guardar, Eliminar, Publicar) are Spanish

4. **Bilingual Email:**
   - Register a user from `/es/join` → verify `preferredLocale: 'es'` is saved
   - Trigger forgot-password → verify the email body and subject are in Spanish
   - Verify the reset URL contains `/es/reset-password?token=...`
