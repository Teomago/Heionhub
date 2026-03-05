import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { collections } from './collections'
import { globals } from './globals'
import { translations } from './i18n'
import { plugins } from './plugins'
import { livePreview } from './config/livePreview'
import { blocks } from './blocks'
import { lexicalBlocks } from './lexical/blocks'
import { inlineBlocks } from './lexical/inlineBlocks'
import { rootEditor } from './lexical'

import brevoAdapter from '@/utilities/brevoAdapter'

import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  email: brevoAdapter(),
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview,
  },
  i18n: {
    supportedLanguages: { en, de },
    translations: {
      ...translations,
      de: {
        ...translations.de,
        cmdkPlugin: {
          loading: 'Lädt...',
          navigate: 'zum Navigieren',
          noResults: 'Keine Ergebnisse gefunden',
          open: 'zum Öffnen',
          search: 'Sammlungen, Globals durchsuchen...',
          searchIn: 'Suchen in {{label}}',
          searchInCollection: 'in Sammlung suchen',
          searchShort: 'Suchen',
        },
      },
    },
  },
  folders: {
    browseByFolder: false,
  },
  blocks: [...blocks, ...inlineBlocks, ...lexicalBlocks],
  globals,
  collections,
  editor: rootEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'us-east-1',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
