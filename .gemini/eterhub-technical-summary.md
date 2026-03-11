# EterHub — Comprehensive Technical Summary

> **Generated:** 2026-03-11  
> **Purpose:** Reference document for external AI audits, technical reviews, and onboarding.

---

## 1. Project Overview

### Product Vision
EterHub is a **personal finance SaaS platform** built on top of a **Payload CMS 3.x** headless CMS. It combines a public-facing marketing site (CMS-driven pages, articles, SEO) with a full-featured **Finance App** where authenticated members can track transactions, manage accounts, set budgets, categorize spending, schedule recurring bills, and generate reports.

### Target User
Bilingual (EN/ES) individuals who need a modern personal finance dashboard with bank-account-level transaction tracking, budget enforcement, and scheduled payment automation — all managed through a premium web interface.

### Value Proposition
- **CMS-Driven Marketing Site** — pages, articles, SEO, live preview — all editable from the Payload Admin panel.
- **Finance App** — real-time balance tracking, budget health, CSV import w/ AI-assisted mapping, interactive reports (Recharts).
- **Bilingual First** — full EN/ES support, CMS-controllable via kill-switch, locale-aware routing.
- **Enterprise Auth** — dual auth collections (admin `Users` + customer `Members`), brute-force protection, invitation codes.

### Current Status
| Area | Status |
|---|---|
| CMS Marketing Site | ✅ Functional — Pages, Articles, Header/Footer globals, live preview |
| Finance App | ✅ Functional — Dashboard, Transactions, Accounts, Budgets, Categories, Reports, CSV Import, Scheduled Transactions |
| i18n (EN/ES) | ✅ Functional — Locale routing, dictionary system, CMS kill-switch, admin labels |
| Auth | ✅ Functional — Member registration, login, brute-force protection, session management |
| Deployment | ✅ Vercel — Postgres (Supabase), S3 storage, Upstash Redis |
| Observability | ⚠️ Partial — Sentry installed, `APIError` class created, not fully wired into all actions |
| Testing | ⚠️ Minimal — Vitest unit tests for `dateMath` and `typeGuards` only |
| Payments | ❌ Not started |
| Email Verification | ❌ Designed but not fully implemented in current flow |

### Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.4.11 |
| CMS | Payload CMS | 3.79.0 |
| React | React | 19.2.3 |
| Database | PostgreSQL via Supabase | — |
| ORM/Adapter | `@payloadcms/db-postgres` + Drizzle ORM | 3.79.0 / 0.44.7 |
| Auth | Payload Auth (dual collection) | Built-in |
| Storage | S3 (Supabase Storage via `@payloadcms/storage-s3`) | 3.79.0 |
| Rate Limiting | Upstash Redis + `@upstash/ratelimit` | 1.36.4 / 2.0.8 |
| i18n | `next-intl` | 4.8.3 |
| Styling | Tailwind CSS v4 | 4.2.1 |
| State Management | TanStack React Query | 5.90.21 |
| Forms | TanStack React Form | 1.28.3 |
| Charts | Recharts | 3.7.0 |
| Monitoring | Sentry (`@sentry/nextjs`) | 10.43.0 |
| Testing | Vitest | (devDep) |
| E2E | Playwright | (devDep) |
| Rich Text | Lexical (`@payloadcms/richtext-lexical`) | 3.79.0 |
| Deployment | Vercel | — |
| Package Manager | pnpm | — |
| Email | Brevo (custom adapter) | — |

---

## 2. Architecture

### Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/           # Login, Join pages
│   │   ├── (frontend)/       # Marketing site (catch-all, layout, styles)
│   │   └── app/              # Finance App (dashboard, transactions, etc.)
│   ├── (payload)/admin/      # Payload Admin UI (auto-generated)
│   ├── actions/              # Shared Server Actions (tour, etc.)
│   └── api/                  # API routes (cron, graphql, etc.)
├── components/               # Shared UI components (buttons, ui/, etc.)
├── constants/                # Category icons, etc.
├── hooks/                    # Client-side React hooks
├── i18n/                     # next-intl routing config
├── lib/
│   ├── auth/                 # assertUser, getAuthUser, typeGuards
│   ├── metadata/             # SEO metadata generators
│   ├── payload/              # getPayload utility
│   ├── utils/                # dateMath, getLinkProps, isExpanded, etc.
│   └── variants/             # CVA variant definitions
├── messages/                 # en.json, es.json dictionaries
├── middleware.ts             # Rate limiting + next-intl locale routing
├── migrations/               # Drizzle SQL migrations
├── modules/                  # Marketing site modules (articles, blocks, pages, layout)
├── payload/
│   ├── blocks/               # CMS block definitions (content, layout)
│   ├── collections/
│   │   ├── content/          # Articles, Media, Pages
│   │   ├── finance/          # Accounts, Budgets, Categories, Members, ScheduledTransactions, Transactions
│   │   ├── settings/         # Users, InvitationCodes
│   │   └── system/           # Tags
│   ├── config/               # livePreview config
│   ├── constants/            # Google Fonts, etc.
│   ├── globals/              # Header, Footer, General, SEO, ImportSettings, Invitations, SiteSettings
│   ├── hooks/                # formatConcatenatedFields, etc.
│   ├── i18n/                 # Admin panel translations (en.ts, es.ts)
│   ├── lexical/              # Rich text block/inline configs
│   ├── plugins/              # Payload plugins (SEO, nested-docs, cmdk, etc.)
│   └── utils/                # access builder utility
├── providers/                # QueryProvider, ThemeProvider
├── styles/                   # Global CSS
└── utilities/                # brevoAdapter (email)
```

### Data Flow: Frontend Request → DB

```
Browser → Next.js Middleware (rate limit + locale routing)
       → [locale] route segment
       → Server Component (page.tsx / layout.tsx)
       → Server Action (actions.ts) or direct Payload Local API
       → assertUser() validates session via payload.auth({ headers })
       → payload.find/create/update/delete (Payload Local API)
       → Drizzle ORM → PostgreSQL (Supabase)
       → Hooks fire (updateAccountBalance, checkBudgetLimits, updateBudgetSpend)
       → Response → React Query cache → UI
```

### Auth Flow

1. **Registration:** Member submits `firstName`, `lastName`, `email`, `password` via `/join` → Server Action calls `payload.create({ collection: 'members' })`.
2. **Login:** Member submits `email` + `password` via `/login` → `payload.login({ collection: 'members' })` → JWT session cookie set.
3. **Session Validation:** Every protected route's `layout.tsx` calls `payload.auth({ headers })` → checks `user.collection === 'members'` → redirects to `/login` if invalid.
4. **Server Actions:** All protected Server Actions call `assertUser()` which throws `Error('Unauthorized')` if no valid session.
5. **Admin Users:** Separate `users` collection with role-based access (`admin`, `editor`, `user`).

### User Isolation Strategy
- **Owner-based access control:** Every finance collection has an `owner` field (relationship to `members`).
- **`isActiveOwner` access policy:** Members can only read their own records where `status === 'active'`. Admins (`users` collection) bypass this filter.
- **`access.owner('owner').adminLock()`** — used for create/update/delete; ensures only the owner or an admin can mutate records.
- **Auto-assignment hook:** The `owner` field's `beforeChange` hook auto-sets `owner` to `req.user.id` if not provided, preventing cross-user data leakage.

---

## 3. Database Schema

### Collections

#### Finance Domain

| Collection | Slug | Fields | Key Relationships |
|---|---|---|---|
| **Transactions** | `transactions` | `amount` (number, cents), `type` (income/expense/transfer), `date`, `description`, `status` (active/deleted) | → `accounts`, → `categories`, → `budgets`, → `members` (owner) |
| **Accounts** | `accounts` | `name`, `type` (checking/savings/credit/cash/investment), `balance` (cents), `creditLimit`, `currency`, `color`, `status` | → `members` (owner) |
| **Budgets** | `budgets` | `title` (auto-generated), `name`, `month` (YYYY-MM), `amount` (cents), `locked`, `status`, `currentSpend`, `recurrenceGroupId`, `recurrenceType` | → `categories`, → `members` (owner) |
| **Categories** | `categories` | `name`, `type` (income/expense/transfer), `icon`, `color`, `isDefault` | → `members` (owner, optional for defaults) |
| **Scheduled Transactions** | `scheduled-transactions` | `name`, `amount` (cents), `frequency` (weekly/monthly/yearly), `nextDueDate` | → `categories`, → `accounts`, → `members` (owner) |
| **Members** | `members` | `firstName`, `secondName`, `lastName`, `secondLastName`, `currency`, `hasCompletedTour`, `hasCompletedImportTour` + Payload auth fields (email, password, etc.) | Auth collection |

#### Content Domain

| Collection | Slug | Fields | Notes |
|---|---|---|---|
| **Pages** | `pages` | `title`, `slug`, `pathname`, `isHome`, `layout` (blocks array), meta (SEO plugin) | Localized (en/es), versioned, live preview enabled |
| **Articles** | `articles` | `title`, `slug`, `excerpt`, `content` (Lexical rich text), `generateSlug`, meta | Localized, versioned |
| **Media** | `media` | `alt`, image upload fields | S3 storage via `@payloadcms/storage-s3` |

#### Settings & System

| Collection | Slug | Fields | Notes |
|---|---|---|---|
| **Users** | `users` | `firstName`, `lastName`, `name` (virtual), `roles` (admin/editor/user) | Admin auth collection with brute-force protection |
| **Invitation Codes** | `invitation-codes` | `code` (auto-generated, 14-char hex), `status` (available/used) | Auto-generated via `crypto.randomBytes` |
| **Tags** | `tags` | `name` | System taxonomy |

### Globals

| Global | Slug | Purpose |
|---|---|---|
| **Header** | `header` | Navigation links, logo, CTA button |
| **Footer** | `footer` | Navigation, contact info, social links, legal |
| **General** | `general-settings` | Typography (heading/body fonts), site-wide config |
| **SEO** | `seo-settings` | Site name, tagline, default meta |
| **Import Settings** | `import-settings` | AI prompt template for CSV column mapping |
| **Invitations** | `invitations` | Global invitation settings |
| **Site Settings** | `site-settings` | `enableMultiLanguage` (kill-switch), `defaultLanguage`, `supportedLanguages` |

### Soft Delete Strategy
- Finance collections (`transactions`, `accounts`, `budgets`) have a `status` field with values `active` | `deleted`.
- Records are never physically deleted; Server Actions set `status: 'deleted'` instead.
- The `isActiveOwner` access policy automatically filters out `deleted` records for Members, ensuring they only see `active` records.
- Admins see all records (including deleted) for auditing purposes.

### Migration History

| Migration | File | Purpose |
|---|---|---|
| `20260310_231650_init` | `init.ts` | Full initial schema (all collections, all fields) |
| `20260310_232127_init` | `init.ts` | No-op follow-up (already applied) |
| `20260311_014355_i18n_tables` | `i18n_tables.ts` | Localization columns (`_locales`, `published_locale`, `snapshot`) for Pages and Articles |

---

## 4. Core Features Implemented

### 4.1 Dashboard
- **User perspective:** At-a-glance view of total balance, budget health (progress bars with overspend alerts), upcoming bills, and recent transactions with category icons and color coding.
- **Implementation:** `DashboardClient.tsx` (client component) receives `initialData` from the Server Component `page.tsx` which aggregates data from multiple Payload queries. Uses React Query for client-side caching with `initialData` hydration.
- **Key files:** `src/app/[locale]/app/page.tsx`, `src/app/[locale]/app/components/DashboardClient.tsx`
- **Limitations:** Currency formatting is hardcoded to `en-US` locale formatting; should use the member's preferred currency.

### 4.2 Transactions
- **User perspective:** Full CRUD with type filtering (income/expense/transfer), category assignment, budget linking, date selection. Inline edit/delete actions. Modal-based creation.
- **Implementation:** Server Actions (`actions.ts`) call `assertUser()` then Payload CRUD. Three Payload hooks fire on every change:
  - `updateAccountBalance` — atomically adjusts account balances via raw Drizzle SQL.
  - `checkBudgetLimits` — prevents expense creation if the linked budget is locked.
  - `updateBudgetSpend` — recalculates `currentSpend` on the budget after transaction changes.
- **Key files:** `src/app/[locale]/app/transactions/`, `src/payload/collections/finance/Transactions/hooks/`

### 4.3 Accounts
- **User perspective:** Create checking, savings, credit card, cash, or investment accounts. Balance is tracked in cents. Supports multi-currency (USD, EUR, GBP, COP).
- **Implementation:** Standard CRUD via Server Actions. Balances are updated atomically by Transaction hooks, not by user input.
- **Key files:** `src/app/[locale]/app/accounts/`, `src/payload/collections/finance/Accounts/`

### 4.4 Budgets
- **User perspective:** Monthly budget envelopes linked to categories. Visual progress bars showing spend vs. limit. Lockable budgets that block further spending. Recurrence types (monthly, fixed, indefinite).
- **Implementation:** `currentSpend` is computed by the `updateBudgetSpend` hook. The `checkBudgetLimits` hook on Transactions prevents expenses when `locked === true`.
- **Key files:** `src/app/[locale]/app/budget/`, `src/payload/collections/finance/Budgets/`

### 4.5 Categories
- **User perspective:** Custom income/expense/transfer categories with Lucide icons and hex colors. System-provided default categories (admin-only creation).
- **Implementation:** `isDefault` field is access-controlled so only `users` collection (admins) can create default categories. Access policies ensure members can read both their own and default categories.
- **Key files:** `src/app/[locale]/app/categories/`, `src/payload/collections/finance/Categories/`

### 4.6 Scheduled Transactions (Automated Bills)
- **User perspective:** Define recurring bills (weekly/monthly/yearly) with a name, amount, category, and account. The system auto-creates expense transactions when bills come due.
- **Implementation:** A Vercel CRON job (`/api/cron/process-scheduled`) runs on a schedule, finds all scheduled transactions where `nextDueDate <= today`, creates the corresponding transaction (which triggers balance hooks), then advances the `nextDueDate` using `calculateNextDueDate()` from `dateMath.ts`.
- **Key files:** `src/app/api/cron/process-scheduled/route.ts`, `src/lib/utils/dateMath.ts`
- **Security:** CRON endpoint is protected by `CRON_SECRET` bearer token.

### 4.7 CSV Import with AI Column Mapping
- **User perspective:** Drag-and-drop CSV file, the system uses an AI prompt (configurable via `ImportSettings` global) to map CSV columns to Payload fields, then previews the data before bulk import.
- **Implementation:** Uses PapaParse for CSV parsing, TanStack React Form for the mapping UI, sequential inserts via Server Actions.
- **Key files:** `src/app/[locale]/app/import/`

### 4.8 Reports
- **User perspective:** Interactive financial reports with charts (Recharts) showing spending breakdown by category, income vs. expense trends, etc.
- **Implementation:** Server Actions in `reports/actions.ts` use Drizzle raw SQL aggregations (`select`, `sum`, `groupBy`) for performance.
- **Key files:** `src/app/[locale]/app/reports/`

### 4.9 CMS Marketing Site
- **User perspective:** Public-facing pages and blog articles, fully editable from the Payload Admin panel. Block-based page builder with layout and content blocks.
- **Implementation:** Catch-all route `[[...segments]]/page.tsx` fetches page data by `pathname` or article by `slug`. Supports live preview, SEO plugin metadata, and localized content (en/es).
- **Key files:** `src/app/[locale]/(frontend)/`, `src/modules/`, `src/payload/blocks/`

### 4.10 Onboarding Tour
- **User perspective:** First-time users see an interactive guided tour highlighting key Dashboard features (quick-add buttons, balance card, budget health, recent transactions).
- **Implementation:** Custom `TourProvider` + `useTour` hook with `data-tour-step-id` attributes on target elements. Tour completion is persisted to the `hasCompletedTour` field on the Members collection via a Server Action.
- **Key files:** `src/components/ui/tour/`, `src/lib/tour-constants.ts`, `src/app/actions/tour.ts`

---

## 5. Security & Infrastructure

### Rate Limiting
- **Provider:** Upstash Redis via `@upstash/ratelimit`.
- **Auth endpoints** (`/api/members/login`, `/api/users/login`): **5 requests/minute** with sliding window. Returns `429` with `X-RateLimit-*` headers.
- **App mutations** (POST to `/app` or `/api`): **30 requests/minute** with sliding window.
- **Fail-open:** If Redis is unavailable or KV vars are missing, rate limiting is skipped gracefully — the i18n middleware always runs.
- **Config:** `src/middleware.ts`

### Error Handling
- **`APIError` class** (`src/lib/utils/APIError.ts`): Custom error class for structured error responses.
- **Sentry:** `@sentry/nextjs` v10 installed. `global-error.tsx` and `error.tsx` boundary pages exist.
- **Server Actions:** All protected actions use `assertUser()` which throws on unauthorized access.

### Auth Hardening
- **Brute-force protection:** Both `Users` and `Members` collections have `maxLoginAttempts: 5` and `lockTime: 600000` (10 minutes lockout).
- **Session cookies:** Managed by Payload's built-in auth (HTTP-only, secure cookies).
- **CRON protection:** The `/api/cron/process-scheduled` endpoint validates `Authorization: Bearer ${CRON_SECRET}`.

### Input Validation
- **Zod v4** (`zod@4.3.6`) is a dependency but not yet systematically used across all Server Actions.
- **Payload built-in validation:** `required`, `unique`, `defaultValue`, and `type` constraints on collection fields.

---

## 6. i18n Architecture

### Supported Locales
- `en` (English) — default
- `es` (Spanish)

### Locale Routing
- All routes are under `src/app/[locale]/` — the `[locale]` segment is extracted from the URL (`/en/app`, `/es/app`).
- `next-intl` middleware (`src/middleware.ts`) handles locale detection, default locale redirect, and locale prefix management.
- The middleware matcher excludes `/admin`, `/api`, `/_next`, `/_vercel`, `favicon.ico`, and all dotted filenames.

### Translation System
| Layer | Location | Mechanism |
|---|---|---|
| **Frontend dictionaries** | `src/messages/en.json`, `src/messages/es.json` | Loaded by `next-intl` via `getMessages()` in layout. Client components use `useTranslations('Namespace')`. |
| **Payload Admin UI** | Built-in `@payloadcms/translations` + custom `src/payload/i18n/languages/` | `i18n.supportedLanguages: { en, es }` in `payload.config.ts`. Custom translations merged via `translations` import. |
| **Collection/Field labels** | Inline i18n objects on each collection | `labels: { singular: { en: '…', es: '…' }, plural: { en: '…', es: '…' } }` and per-field `label: { en: '…', es: '…' }`. |
| **Data localization** | Payload `localization` config | `locales: ['en', 'es']`, `defaultLocale: 'en'`, `fallback: true`. Pages and Articles store localized content via `_locales` tables. |

### Dictionary Namespaces (`en.json` / `es.json`)
- `Sidebar` — 9 keys (navigation labels)
- `Dashboard` — 15 keys (title, cards, empty states)
- `Common` — 19 keys (CRUD verbs, field labels)
- `LanguageSwitcher` — 2 keys

### CMS-Driven Kill-Switch
The `SiteSettings` global (`src/payload/globals/SiteSettings.ts`) contains:
- `enableMultiLanguage` (checkbox, default `true`) — when `false`, the `<LanguageSwitcher />` component is hidden from both the public Header and the Finance App sidebar.
- `defaultLanguage` (select: `en` | `es`)
- `supportedLanguages` (multi-select: `['en', 'es']`)

The frontend layout fetches this global at render time and passes `isMultiLangEnabled` as a prop to `<LanguageSwitcher />`.

---

## 7. Pending Work

### Explicitly Unfinished
- **Email verification flow** — Designed in RFC but not fully wired. Members can register without email confirmation.
- **Payment integration** — No payment processing (Stripe, etc.) is implemented.
- **Forgot password (Member)** — The dedicated `/forgot-password` page for members is not confirmed connected.
- **Zod validation** — Zod is installed but not systematically applied to all Server Action inputs.
- **Full Sentry instrumentation** — Sentry is installed but not deeply integrated into all error paths.

### Known Bugs / Fragile Areas
- **`favicon.ico` as locale** — While the middleware now has an explicit exclusion, the `.*\\..*` regex pattern in the matcher has historically been unreliable; a browser or proxy request for `/favicon.ico` could still slip through if the matcher is modified carelessly.
- **Currency hardcoding** — `toLocaleString('en-US', { currency: 'USD' })` is used in `DashboardClient.tsx` instead of reading from the member's `currency` field.
- **next-intl webpack cache warnings** — Harmless but noisy `Parsing of .../next-intl/dist/.../index.js for build dependencies failed` warnings appear on every build.

### Pre-Launch Checklist
- [ ] Domain purchase and DNS configuration
- [ ] Production Sentry DSN configuration
- [ ] Production Upstash Redis (KV) provisioning
- [ ] Email verification flow completion
- [ ] Systematic Zod validation sweep on all Server Actions
- [ ] Performance audit (bundle sizes, SSR waterfall)
- [ ] Security audit (OWASP checklist, CSRF review)
- [ ] Backup and disaster recovery plan for Supabase Postgres
- [ ] SEO audit on marketing pages (structured data, sitemap, robots.txt)

---

## 8. Key Technical Decisions & Rationale

### PostgreSQL over MongoDB
**Decision:** Migrated from MongoDB to PostgreSQL (Supabase) in RFC 09.  
**Rationale:** Finance data is inherently relational (transactions → accounts, transactions → budgets → categories). PostgreSQL provides ACID transactions, atomic SQL updates (used in `updateAccountBalance` via Drizzle `sql`), and native `SUM`/`GROUP BY` for report aggregations. MongoDB's document model created friction with join-heavy queries and lacked transactional guarantees.

### Supabase for Storage & Database
**Decision:** Supabase Postgres (pooled via PgBouncer) + Supabase Storage (S3-compatible).  
**Rationale:** Single platform for both DB and file storage. The pooler (port 6543) handles connection limits for serverless (Vercel) workloads. Direct connection (port 5432) is used only for migrations. The S3-compatible API allows using `@payloadcms/storage-s3` without a separate AWS account.

### Payload CMS 3.x
**Decision:** Built on Payload CMS 3.x (beta → stable) as the core backend framework.  
**Rationale:** Payload 3.x runs natively inside Next.js (no separate server), provides a built-in Admin UI, dual auth collections, access control policies, hooks system, and a Local API that avoids HTTP overhead for Server Components. The collection-based schema definition doubles as both the ORM layer and the admin CRUD interface.

### `next-intl` over `next-i18next`
**Decision:** Used `next-intl` v4 for App Router i18n.  
**Rationale:** `next-intl` has first-class support for the App Router, Server Components, and the `[locale]` folder convention. `next-i18next` is designed for Pages Router. `next-intl` also supports the Turbopack bundler.

### Soft Deletes over Hard Deletes
**Decision:** Finance records use a `status: 'active' | 'deleted'` field instead of actual deletion.  
**Rationale:** Financial data should never be physically destroyed for auditing, compliance, and data integrity. The `isActiveOwner` access policy transparently filters deleted records without requiring changes to UI queries.

### Centralized `assertUser()` Pattern
**Decision:** Created `src/lib/auth/assertUser.ts` as a single DRY utility for all Server Actions.  
**Rationale:** Eliminates duplicated auth boilerplate across ~15 Server Action files. Throws immediately on unauthorized access, guaranteeing that no downstream code runs without a valid user context.

### UUIDs for Primary Keys
**Decision:** `idType: 'uuid'` in the Postgres adapter config.  
**Rationale:** UUIDs prevent ID enumeration attacks and are safe for distributed/serverless environments where auto-increment sequences could conflict.

---

## 9. File Map (Critical Files)

| File | Description |
|---|---|
| `src/payload/payload.config.ts` | Master Payload configuration: DB adapter, S3 storage, i18n, localization, plugins, editor, sharp |
| `src/middleware.ts` | Rate limiting (Upstash) + `next-intl` locale routing middleware |
| `src/i18n.ts` | `next-intl` server config: loads locale messages from `src/messages/` |
| `src/app/[locale]/app/layout.tsx` | Finance App root layout: auth guard, sidebar, modals, tour provider, NextIntlClientProvider |
| `src/app/[locale]/(frontend)/layout.tsx` | Marketing site layout: fonts, theme, Header/Footer, NextIntlClientProvider |
| `src/app/[locale]/(frontend)/[[...segments]]/page.tsx` | Marketing catch-all page: resolves pages by pathname, articles by slug |
| `src/app/[locale]/app/components/DashboardClient.tsx` | Dashboard UI: balance card, budget health, upcoming bills, recent transactions (fully i18n) |
| `src/app/[locale]/app/components/SidebarLayout.tsx` | Finance App sidebar: navigation, theme toggle, LanguageSwitcher, logout |
| `src/app/[locale]/app/transactions/actions.ts` | Transaction CRUD Server Actions with `assertUser()` |
| `src/app/api/cron/process-scheduled/route.ts` | CRON endpoint: processes due scheduled transactions, creates expenses, advances due dates |
| `src/payload/collections/finance/Transactions/Transactions.ts` | Transaction collection: fields, access, hooks registration |
| `src/payload/collections/finance/Transactions/hooks/updateAccountBalance.ts` | Atomic Drizzle SQL hook: adjusts account balances on transaction create/update/delete |
| `src/payload/collections/finance/Transactions/hooks/checkBudgetLimits.ts` | Hook: blocks expense creation when linked budget is locked |
| `src/payload/collections/finance/Transactions/hooks/updateBudgetSpend.ts` | Hook: recalculates `currentSpend` on the budget after transaction changes |
| `src/payload/collections/finance/access/isActiveOwner.ts` | Access policy: owner-only + soft-delete filter for Members, full access for admins |
| `src/payload/collections/finance/Members/index.ts` | Member auth collection: brute-force protection, profile fields, tour flags |
| `src/payload/collections/settings/Users/Users.ts` | Admin auth collection: roles (admin/editor/user), first-user-is-admin hook |
| `src/payload/globals/SiteSettings.ts` | i18n kill-switch: `enableMultiLanguage`, `defaultLanguage`, `supportedLanguages` |
| `src/lib/auth/assertUser.ts` | Centralized Server Action auth guard: validates session, returns typed user + payload instance |
| `src/lib/utils/dateMath.ts` | Date calculation utility for scheduled transaction recurrence |
| `src/messages/en.json` | English dictionary (Sidebar, Dashboard, Common, LanguageSwitcher namespaces) |
| `src/messages/es.json` | Spanish dictionary (same structure as en.json) |
| `src/components/ui/LanguageSwitcher.tsx` | Client component: locale toggle controlled by SiteSettings kill-switch |
| `src/modules/common/data.ts` | `getCachedGlobal()`: locale-aware cached fetcher for Payload globals |
| `src/payload/collections/index.ts` | Collection registry: exports all 12 collections to `payload.config.ts` |

---

*End of document.*
