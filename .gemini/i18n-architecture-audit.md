# i18n Architecture Audit Report

**Date:** 2026-03-10
**Focus:** Full-Stack Internationalization State (EN / ES)

Here are the exact answers regarding how translation and localization are currently implemented across the Eterhub stack:

### 1. Payload Data Localization (`payload.config.ts`)
- **Status:** ❌ **Missing**
- **Details:** While RFC 11 successfully configured the `i18n` object for the **Admin UI** (`supportedLanguages: { en, es }`), the core `localization` object (which enables multi-language data at the database level) is completely absent from `payload.config.ts`. Currently, the database only supports a single language.

### 2. Field-Level Localization
- **Status:** ⚠️ **Orphaned Configs**
- **Details:** Scanning the `Pages` and `Articles` collections reveals that several fields (like `blocks`, `title`, and `slug`) are actively configured with `localized: true`. However, because the root `localization` object is missing from `payload.config.ts`, these field-level flags are currently inert and have no effect.

### 3. Next.js Frontend Routing (`src/app/` & `middleware.ts`)
- **Status:** ❌ **Monolingual (English)**
- **Details:** The Next.js App Router does not implement any internationalized routing. There is no dynamic locale segment (e.g., `src/app/[locale]/...`) and `src/middleware.ts` does not contain any locale negotiation or cookie-based routing logic. The frontend is hard-wired to serve a single route tree.

### 4. Finance App Hardcoded Strings (`src/app/app/`)
- **Status:** ❌ **Hardcoded (English)**
- **Details:** The React components in the Finance Portal (such as `DashboardClient.tsx`, `TransactionActions.tsx`) contain entirely hardcoded English UI strings (e.g., `"Total Balance"`, `"Income"`, `"Expense"`, `"Budget Health"`). There is no translation dictionary layer installed (like `next-intl` or `react-i18next`), nor any `t('...')` functions being used.

### 5. Language Switcher UI
- **Status:** ❌ **Missing**
- **Details:** A comprehensive scan of the `src/components/` and layout files confirms there is no `<LanguageSwitcher />` component, dropdown, or toggle mechanism available for the end-user to switch languages.

---

### Conclusion
RFC 11 successfully localized the internal **Payload CMS Admin Tool** for the staff (switching German to Spanish). However, the **End-User Application** (the Next.js frontend and Payload's data layer) has zero i18n infrastructure. It is entirely hardcoded in English.

To achieve true bilingual capability (EN/ES) for the end-users, a massive implementation will be required spanning Next.js dynamic routing, dictionary integration, and Payload data localization.
