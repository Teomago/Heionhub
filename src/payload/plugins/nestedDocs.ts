import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

export const nestedDocs = nestedDocsPlugin({
  collections: ['pages'],
  generateLabel: (_, doc) => doc?.title as string,
  // Do not change the `.replace` below. It ensures "/" is allowed for the slug, with breadcrumbs
  generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`.replace(/^\/+/, '/'), ''),
})
