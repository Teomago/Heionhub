# RFC 11: Internationalization (i18n) Spanish

## Objective
Eradicate legacy German (`de`) configurations from the previous agency template and introduce Latin American Spanish (`es`) across both the Payload CMS Backend and the Next.js Frontend.

## 1. Payload Admin UI (i18n)
We need to update the Payload config to use the official Spanish translation for the Admin UI.

**File:** `src/payload/payload.config.ts`
- **Action:** Replace `@payloadcms/translations/languages/de` with `@payloadcms/translations/languages/es`.
- **Action:** Update the `i18n.supportedLanguages` array to `{ en, es }`.
- **Action:** Update the `i18n.translations.de` override for the `cmdkPlugin` to `i18n.translations.es`, providing Spanish translations for the command palette (e.g., `loading: 'Cargando...'`, `search: 'Buscar...'`).

## 2. Payload Custom Translations
There is a custom translations folder that currently exports `en` and `de`.

**Directory:** `src/payload/i18n/`
- **Action:** Rename `src/payload/i18n/languages/de.ts` (or `.json`) to `es.ts`.
- **Action:** Translate the custom strings inside from German to Spanish.
- **Action:** Update `src/payload/i18n/index.ts` to export `es` instead of `de`.

## 3. Data Localization
*Note: Currently, `localization` does not appear to be explicitly defined in `payload.config.ts` for field-level data localization. If it is added or exists elsewhere, it must be configured as follows:*

- **Action:** If data localization is introduced, configure it in `payload.config.ts`:
  ```typescript
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
  }
  ```
- **Action:** Ensure any collections or globals with `localized: true` are aware of the new `es` locale.

## 4. Frontend Refactor (Next.js)
The Next.js App Router might be checking for `de` in URL segments or using a dictionary approach.

- **Action:** Check `next.config.js` or `src/middleware.ts` for any `i18n` routing configuration (e.g., `locales: ['en', 'de']`) and switch `de` to `es`.
- **Action:** Update any frontend dictionaries (`src/dictionaries/` or `src/i18n/` if they exist in the Next.js app) from German to Spanish.
- **Action:** If the `html` tag is hardcoded in `src/app/layout.tsx` (e.g., `<html lang="de">`), dynamically set it or change the default to `en`/`es`.

## Verification Plan
1. **Admin UI:** Log into Payload Admin and change the account language to Spanish. Verify the UI and CMD-K palette are in Spanish.
2. **Build Test:** Run `npx tsc --noEmit` and `pnpm build` to ensure no internal imports (like `import { de } from ...`) are broken.
