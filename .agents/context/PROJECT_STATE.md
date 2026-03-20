# PROJECT STATE — Eterhub
> Last updated: 2026-03-19 · Maintained by Claude (claude-sonnet-4-6) / Antigravity

## Current Version/Status
The application is feature-complete for its core finance management use case. The codebase is stable on PostgreSQL, fully bilingual, and production-ready from a functionality standpoint. The last commits reflect final polish work: hydration error fixes, Hero block improvements, and the income budgets feature. The codebase is clean, with no known critical bugs in production code paths.

## Tech Stack & Core Libraries
- **Framework:** Next.js 15 with the App Router (React Server Components, Server Actions).
- **CMS:** Payload CMS 3 (embedded directly into Next.js).
- **Database:** PostgreSQL on Supabase.
- **ORM:** Drizzle ORM (using raw SQL for specific atomic updates like balance changes).
- **Client State:** TanStack React Query.
- **Forms & Charts:** TanStack Form, Recharts.
- **Styling:** Tailwind CSS v4.
- **Infrastructure:** Upstash Redis (Rate limiting), Sentry (Error monitoring), Brevo (Email), Vercel CRON.

## Architecture Summary & DB Schemas
Eterhub is a bilingual personal finance SaaS platform with two surfaces sharing the same codebase and DB:
1. **Marketing Site:** Content-driven, managed via block builder in CMS.
2. **Finance App:** Private, authenticated dashboard for managing accounts, transactions, budgets, categories, and scheduled bills.

**Database Entities & Schema Concepts:**
- **Users:** Two separate authentications systems. "Members" (finance app users, isolated data) and "Admin Users" (CMS managers).
- **Accounts:** Track balance in cents, currency, color. Balances calculated via atomic SQL. Soft-deleted.
- **Transactions:** Core entity. Has type (income/expense/transfer), amount, date, description, linked to account/category/budget. Soft-deleted.
- **Categories:** Custom and system-provided. Types include income/expense/transfer.
- **Budgets:** Monthly envelopes (YYYY-MM). Can be expense or income. `currentSpend` updated automatically. Locked budgets prevent expenses.
- **Scheduled Transactions:** Recurring bills checked daily via CRON to generate real transactions.

**Security & Data Isolation:**
- Members can only read their own records (`owner` field). Admin users have full access.
- Authentication uses Payload's native auth (HttpOnly secure cookies).
- Pre-generated single-use invitation codes for Member registration.

## Active Integrations
- **Supabase:** PostgreSQL database hosting and S3 storage for images.
- **Upstash Redis:** Rate limiting (5 req/min for auth, 30 req/min for mutations).
- **Vercel:** Hosting and dedicated CRON jobs (protected by bearer token) for daily scheduled transactions.
- **Brevo:** Email delivery.
- **Sentry:** Error tracking and monitoring.
