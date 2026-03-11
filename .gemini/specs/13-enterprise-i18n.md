# RFC 13: Enterprise i18n Architecture & CMS-Driven Localization

## Objective
To implement absolute bilingual support (English and Latin American Spanish) across the entire stack. This architecture goes beyond a simple frontend translation layer—it establishes a robust Next.js App Router `[locale]` system powered by `next-intl`, synchronized with Payload CMS data localization, and dynamically controllable via a centralized Payload Global setting.

---

## 1. Payload CMS Configuration

We must enable Payload's native database-level localization and create a control center for the site's language rules.

### A. Data Localization
**File:** `src/payload/payload.config.ts`
Provide the core localization configuration so fields marked with `localized: true` become bilingual in the database.
```typescript
localization: {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  fallback: true,
}
```

### B. Global Control Panel
**File:** `src/payload/globals/SiteSettings.ts` (or modify existing settings)
Create a new Payload Global configuration that allows administrators to dynamically control the i18n behavior of the Next.js frontend without redeploying.
- **Fields:**
  - `enableMultiLanguage`: `checkbox` (default: `true`) — "Enable bilingual routing and the frontend Language Switcher."
  - `defaultLanguage`: `select` (`'en' | 'es'`) — "The default language for new visitors."
  - `supportedLanguages`: `select` with `hasMany: true` (`['en', 'es']`) — "The languages currently active on the site."

---

## 2. Next.js App Router Restructuring (`[locale]`)

We will adopt the industry-leading **`next-intl`** library to handle App Router translations and locale segments gracefully.

### A. Folder Restructuring
Both the marketing frontend and the finance web app must be nested under a dynamic `[locale]` segment to support URLs like `/es/app/dashboard` or `/en/login`.
- **Action:** Move the contents of `src/app/(frontend)/` and `src/app/app/` into `src/app/[locale]/(frontend)/` and `src/app/[locale]/app/` respectively.

### B. Smart Middleware Routing
**File:** `src/middleware.ts`
The middleware will handle locale negotiation (checking the `Accept-Language` header or a user-preference cookie) and rewrite/redirect traffic.
- **Action:** Integrate `next-intl/middleware` to match the preferred locale.
- **CMS Integration:** If we dynamically fetch the `SiteSettings` Global and `enableMultiLanguage` is `false`, the middleware will forcefully bypass locale negotiation and route all traffic to the `defaultLanguage` ('en').

---

## 3. The Dictionary System & UI

We will decouple hardcoded UI text into isolated translation files.

### A. Dictionary Storage
**Directory:** `src/messages/`
- Create `en.json` (English) and `es.json` (Spanish).
- Structure them hierarchically (e.g., `{"dashboard": {"totalBalance": "Total Balance", "income": "Income"}}`).

### B. Component Refactoring
- **Action:** Inside `src/app/[locale]/...`, update page files and React components (like `DashboardClient.tsx`, `TransactionActions.tsx`) to pull text dynamically.
- **Implementation:**
  ```tsx
  import { useTranslations } from 'next-intl';

  export function DashboardClient() {
    const t = useTranslations('dashboard');
    return <div>{t('totalBalance')}</div>;
  }
  ```

---

## 4. The Smart `<LanguageSwitcher />` Component

We need a bespoke UI element for users to toggle their preferred language, built to respect the CMS constraints.

### A. Component Design
- **Action:** Create `src/components/ui/LanguageSwitcher.tsx`.
- **Implementation:** A dropdown or toggle button representing "EN | ES".

### B. CMS-Driven Rendering
- **Action:** Before rendering, the component must read the `SiteSettings` configuration (either fetched directly or passed down via Layout).
- **Logic:** 
  - If `SiteSettings.enableMultiLanguage === false`, return `null` (the switcher hides completely).
  - If `true`, render the toggle. Clicking it should trigger the `next-intl` router to push the path to the alternative locale segment (e.g., `/app/dashboard` → `/es/app/dashboard`) and set the `NEXT_LOCALE` cookie.
