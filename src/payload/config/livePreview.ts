import { generatePreviewPath } from '@/lib/utils'
import type { RootLivePreviewConfig } from 'payload'

export const livePreview: RootLivePreviewConfig = {
  collections: ['pages', 'articles'],
  breakpoints: [
    {
      name: 'mobile',
      label: 'Mobile',
      width: 393,
      height: 852,
    },
    {
      name: 'tablet',
      label: 'Tablet',
      width: 768,
      height: 1024,
    },
    {
      name: 'desktop',
      label: 'Desktop',
      width: 1440,
      height: 900,
    },
  ],
  url: ({ collectionConfig, data }) => {
    if (collectionConfig) {
      switch (collectionConfig?.slug) {
        case 'pages':
          return generatePreviewPath({ pathname: data?.pathname })
        case 'articles':
          return generatePreviewPath({ pathname: data?.pathname })
        default:
          return '/'
      }
    }

    return '/'
  },
}
