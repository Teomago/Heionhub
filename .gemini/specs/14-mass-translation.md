# RFC 14: Mass Translation Sweep — i18n Labels & Frontend Strings

> **Status:** ✅ Executed  
> **Date:** 2026-03-10  
> **Depends on:** RFC 13 (Enterprise i18n Architecture)

---

## 1. Problem Statement

After RFC 13 established the i18n routing infrastructure (`[locale]`, `next-intl`, `SiteSettings` kill-switch), the actual content remained English-only in two critical areas:

1. **Payload CMS Admin Panel** — Collection names, field labels, select option labels, and admin descriptions were hardcoded English strings. Spanish-speaking admins saw an untranslated interface.
2. **Finance App Frontend** — The Dashboard component (`DashboardClient.tsx`) contained 17+ hardcoded English strings (headings, empty states, button labels), and the dictionary files (`en.json` / `es.json`) only had a single `Sidebar` namespace.

---

## 2. Proposed Changes (Executed)

### AREA 1: Payload CMS Admin Labels

Added bilingual `labels` objects (singular/plural) and per-field `label: { en, es }` i18n objects to all four core finance collections.

#### [MODIFY] [Transactions.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Transactions/Transactions.ts)

- Collection `labels`: `{ singular: { en: 'Transaction', es: 'Transacción' }, plural: { en: 'Transactions', es: 'Transacciones' } }`
- 10 field labels localized: `amount`, `type`, `date`, `description`, `account`, `toAccount`, `category`, `budget`, `status`, `owner`
- 5 select option labels localized: `Income/Ingreso`, `Expense/Gasto`, `Transfer/Transferencia`, `Active/Activo`, `Deleted/Eliminado`
- Admin descriptions localized via `{ en: '…', es: '…' } as any`

#### [MODIFY] [Accounts.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Accounts/Accounts.ts)

- Collection `labels`: `{ singular: { en: 'Account', es: 'Cuenta' }, plural: { en: 'Accounts', es: 'Cuentas' } }`
- 8 field labels localized: `name`, `type`, `balance`, `creditLimit`, `currency`, `color`, `status`, `owner`
- 7 select option labels localized: `Checking/Cuenta Corriente`, `Savings/Ahorros`, `Credit Card/Tarjeta de Crédito`, `Cash/Efectivo`, `Investment/Inversión`, `Active/Activo`, `Deleted/Eliminado`

#### [MODIFY] [Budgets.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Budgets/Budgets.ts)

- Collection `labels`: `{ singular: { en: 'Budget', es: 'Presupuesto' }, plural: { en: 'Budgets', es: 'Presupuestos' } }`
- 10 field labels localized: `name`, `month`, `category`, `amount`, `locked`, `status`, `currentSpend`, `recurrenceGroupId`, `recurrenceType`, `owner`
- 5 select option labels localized: `Monthly/Mensual`, `Fixed Duration/Duración Fija`, `Indefinite/Indefinido`, `Active/Activo`, `Deleted/Eliminado`

#### [MODIFY] [Categories.ts](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/payload/collections/finance/Categories/Categories.ts)

- Collection `labels`: `{ singular: { en: 'Category', es: 'Categoría' }, plural: { en: 'Categories', es: 'Categorías' } }`
- 6 field labels localized: `name`, `type`, `icon`, `color`, `isDefault`, `owner`
- 3 select option labels localized: `Income/Ingreso`, `Expense/Gasto`, `Transfer/Transferencia`

---

### AREA 2: Frontend Dictionary Expansion

#### [MODIFY] [en.json](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/messages/en.json)

Added 3 new namespaces to the English dictionary:

| Namespace | Keys | Examples |
|---|---|---|
| `Dashboard` | 15 | `title`, `income`, `expense`, `transfer`, `totalBalance`, `budgetHealth`, `noBudgets`, `upcomingBills`, `noUpcoming`, `due`, `recentActivity`, `noTransactions`, `noDescription`, `uncategorized`, `takeTour` |
| `Common` | 19 | `active`, `deleted`, `save`, `cancel`, `edit`, `delete`, `create`, `loading`, `search`, `filter`, `noResults`, `amount`, `date`, `description`, `type`, `status`, `category`, `account`, `name` |
| `LanguageSwitcher` | 2 | `en`, `es` |

Also added `categories` key to the existing `Sidebar` namespace.

#### [MODIFY] [es.json](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/messages/es.json)

Mirrored the exact same structure with Spanish translations (e.g., `"totalBalance": "Saldo Total"`, `"budgetHealth": "Salud del Presupuesto"`, `"save": "Guardar"`).

---

### AREA 3: Dashboard Component Refactoring

#### [MODIFY] [DashboardClient.tsx](file:///Users/mateoibagon/Documents/GitHub/eterhub/src/app/[locale]/app/components/DashboardClient.tsx)

- Added `import { useTranslations } from 'next-intl'`
- Added `const t = useTranslations('Dashboard')` at the top of the component
- Replaced 17 hardcoded English strings with `t()` calls:

| Before | After |
|---|---|
| `Dashboard` | `{t('title')}` |
| `Income` / `Expense` / `Transfer` | `{t('income')}` / `{t('expense')}` / `{t('transfer')}` |
| `Total Balance` | `{t('totalBalance')}` |
| `Budget Health` | `{t('budgetHealth')}` |
| `No active budgets.` | `{t('noBudgets')}` |
| `Upcoming Bills` | `{t('upcomingBills')}` |
| `No upcoming bills.` | `{t('noUpcoming')}` |
| `Due` | `{t('due')}` |
| `Recent Activity` | `{t('recentActivity')}` |
| `No recent transactions.` | `{t('noTransactions')}` |
| `No description` | `{t('noDescription')}` |
| `Uncategorized` | `{t('uncategorized')}` |
| `Take a Tour` | `{t('takeTour')}` |

---

## 3. Verification

- `npx tsc --noEmit` — **passed with zero errors**
- `pnpm build` — **passed with exit code 0**, 9/9 static pages generated
