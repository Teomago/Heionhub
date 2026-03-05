import type { Field } from 'payload'
import type { Block } from 'payload'
import { blockTabs } from '@/payload/fields/blockTabs'
import { linkGroup } from '@/payload/fields/link/linkGroup'
import { manualSpace } from '@/payload/fields/manualSpace'
import { align } from '@/payload/fields/align'
import { getTranslation } from '@/payload/i18n/getTranslation'

/** Design-tab fields: margins and alignment (inline block; no block-level settings). */
const callToActionDesignFields: Field[] = [
  {
    name: 'marginTop',
    type: 'group',
    label: getTranslation('blocks:callToAction:marginTop'),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          manualSpace({
            overrides: {
              name: 'mobile',
              label: getTranslation('general:mobile'),
            },
          }),
          manualSpace({
            overrides: {
              name: 'tablet',
              label: getTranslation('general:tablet'),
            },
          }),
          manualSpace({
            overrides: {
              name: 'desktop',
              label: getTranslation('general:desktop'),
            },
          }),
        ],
      },
    ],
  },
  {
    name: 'marginBottom',
    type: 'group',
    label: getTranslation('blocks:callToAction:marginBottom'),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          manualSpace({
            overrides: {
              name: 'mobile',
              label: getTranslation('general:mobile'),
            },
          }),
          manualSpace({
            overrides: {
              name: 'tablet',
              label: getTranslation('general:tablet'),
            },
          }),
          manualSpace({
            overrides: {
              name: 'desktop',
              label: getTranslation('general:desktop'),
            },
          }),
        ],
      },
    ],
  },
  {
    name: 'align',
    type: 'group',
    label: getTranslation('fields:align'),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          align({
            overrides: {
              name: 'mobile',
              label: getTranslation('general:mobile'),
            },
          }),
          align({
            overrides: {
              name: 'tablet',
              label: getTranslation('general:tablet'),
              defaultValue: 'none',
            },
          }),
          align({
            overrides: {
              name: 'desktop',
              label: getTranslation('general:desktop'),
              defaultValue: 'none',
            },
          }),
        ],
      },
    ],
  },
]

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  labels: {
    singular: getTranslation('blocks:callToAction:singular'),
    plural: getTranslation('blocks:callToAction:plural'),
  },
  interfaceName: 'CallToActionBlockType',
  fields: blockTabs({
    variant: 'inline',
    fields: {
      general: [linkGroup()],
      design: callToActionDesignFields,
    },
  }),
}
