import type { GlobalConfig } from 'payload'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { adminMenuGroups } from '@/payload/i18n/adminMenuGroups'
import { access } from '@/payload/utils/access'
import { link } from '@/payload/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: getTranslation('footer:label'),
  typescript: { interface: 'FooterSettings' },
  admin: { group: adminMenuGroups.settings },
  access: {
    read: access.public(),
    update: access(),
  },

  fields: [
    // --- Left: Navigation Section ---
    {
      name: 'navigation',
      label: getTranslation('footer:navigation'),
      type: 'group',
      fields: [
        {
          name: 'title',
          label: getTranslation('general:title'),
          type: 'text',
          localized: true,
          defaultValue: 'Navigation',
        },
        {
          name: 'links',
          label: getTranslation('general:links'),
          type: 'array',
          maxRows: 10,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/payload/fields/link/ui/LinkRowLabel',
            },
          },
          fields: [link({ appearances: false, localizeLabels: true })],
        },
      ],
    },
    // --- Middle: Contact & Social Section ---
    {
      name: 'contact',
      label: getTranslation('footer:contact'),
      type: 'group',
      fields: [
        {
          name: 'title',
          label: getTranslation('general:title'),
          type: 'text',
          localized: true,
          defaultValue: 'Contact',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              label: getTranslation('general:email'),
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'phone',
              label: getTranslation('general:phone'),
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'socialLinks',
          label: getTranslation('footer:socialLinks'),
          type: 'array',
          maxRows: 6,
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'platform',
              label: getTranslation('footer:platform'),
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'X (Twitter)', value: 'x' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Mail', value: 'mail' },
              ],
            },
            {
              name: 'url',
              label: getTranslation('footer:url'),
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // --- Right: Legal Section ---
    {
      name: 'legal',
      label: getTranslation('footer:legal'),
      type: 'group',
      fields: [
        {
          name: 'legalName',
          label: getTranslation('footer:legalName'),
          type: 'text',
          localized: true,
          admin: {
            description: 'Registered legal name of the organization',
          },
        },
        {
          name: 'title',
          label: getTranslation('general:title'),
          type: 'text',
          localized: true,
          defaultValue: 'Legal',
        },
        {
          name: 'links',
          label: getTranslation('general:links'),
          type: 'array',
          maxRows: 10,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/payload/fields/link/ui/LinkRowLabel',
            },
          },
          fields: [link({ appearances: false, localizeLabels: true })],
        },
        {
          name: 'copyright',
          label: getTranslation('footer:copyright'),
          type: 'text',
          localized: true,
          admin: {
            description: getTranslation('footer:copyrightDescription'),
          },
        },
      ],
    },
  ],
}
