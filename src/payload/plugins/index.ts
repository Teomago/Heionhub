import { autoEnableRichTextLink } from './autoEnableRichTextLink'
// NOTE: imageAspectRatio removed — FigmaCMS manages media sizes/processing
// import { imageAspectRatio } from './imageAspectRatio'
import { nestedDocs } from './nestedDocs'
import { seo } from './seo'
import { payloadSidebar } from 'payload-sidebar-plugin'
import { payloadCmdk } from '@veiag/payload-cmdk'

const sidebar = payloadSidebar({
  // Logical ordering: Content → System → Settings (Header before Footer)
  groupOrder: {
    // English
    Content: 1,
    System: 2,
    Settings: 3,
    // German
    Inhalt: 1,
    System_de: 2,
    Einstellungen: 3,
  },
  enablePinning: true,
  pinnedStorage: 'localStorage',
})

const cmdk = payloadCmdk({
  blurBg: true,
  submenu: {
    enabled: true,
  },
  icons: {
    collections: {
      pages: 'FileText',
      articles: 'Newspaper',
      media: 'Image',
      users: 'Users',
      tags: 'Tag',
    },
    globals: {
      header: 'PanelTop',
      footer: 'PanelBottom',
      'general-settings': 'Settings',
      'seo-settings': 'Search',
    },
  },
})

export const plugins = [autoEnableRichTextLink, nestedDocs, seo, sidebar, cmdk]
