import type { FieldHook } from 'payload'

/**
 * Synchronizes pathname with the last breadcrumb URL from @payloadcms/plugin-nested-docs.
 * If the page is marked as home, pathname is always '/'.
 */
export const syncPathname: FieldHook = async ({ data, value, operation }) => {
  if (operation === 'create' || operation === 'update') {
    // Home page always gets '/'
    if (data?.isHome) {
      return '/'
    }

    if (
      data?.breadcrumbs?.at(-1)?.url !== value &&
      data?.breadcrumbs?.at(-1)?.url !== '/undefined'
    ) {
      return data?.breadcrumbs?.at(-1)?.url || ''
    }
  }
}
