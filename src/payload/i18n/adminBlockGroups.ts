import type { StaticTranslation } from './types'

/**
 * Block sidebar groups for admin.group (block selector).
 * Use for block config: admin: { group: adminBlockGroups.content } etc.
 */
export const adminBlockGroups: Record<
  'content' | 'layout' | 'socialProof' | 'media' | 'conversion',
  StaticTranslation
> = {
  content: {
    en: 'Content',
    de: 'Inhalt',
  },
  layout: {
    en: 'Layout',
    de: 'Layout',
  },
  socialProof: {
    en: 'Social Proof',
    de: 'Referenzen',
  },
  media: {
    en: 'Media',
    de: 'Medien',
  },
  conversion: {
    en: 'Conversion',
    de: 'Konversion',
  },
}
