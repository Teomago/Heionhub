# RFC 19B: i18n Completion (Round 2)

## Objective

Finalize the internationalization (i18n) of the Miru Finance App. RFC 18 missed several key pages and deep components. We must eliminate all remaining hardcoded Spanish/English strings and integrate them into the `Miru` namespace.

## Audit & Execution Scope

Antigravity must scan the following directories/components, extract hardcoded text, add the keys to `en.json` and `es.json` (inside the `"Miru"` namespace object), and replace the text with `next-intl`'s `useTranslations('Miru')`:

1. **Accounts (`src/app/[locale]/app/accounts/`)**: Audit all page and sub-component files. Some strings were missed.
2. **Transactions (`src/app/[locale]/app/transactions/`)**: Focus specifically on buttons, table headers, and empty states.
3. **Budget (`src/app/[locale]/app/budget/`)**: The entire page and its internal components currently lack translation.
4. **Scheduled Transactions (`src/app/[locale]/app/scheduled/` or similar)**: Audit the entire module.
5. **Reports (`src/app/[locale]/app/reports/`)**: The entire reports dashboard, including chart labels and summary cards.
6. **Import CSV (`src/app/[locale]/app/import/`)**: Fix the Spanglish issue. Ensure all instructions, table headers, and the new Batch UI (from RFC 19A) use proper translation keys.

## Verification

- Run `npx tsc --noEmit` to ensure no props were broken by the `t()` injection.
- Run `pnpm build` to ensure exit code 0.
