import type { Field, LabelFunction, StaticLabel } from 'payload'
import type { LinkAppearance } from './types'
import { linkableCollections } from '../../constants/linkableCollections'
import { selectSize } from '../selectSize'
import { deepMerge } from '@/lib/utils'
import { getTranslation } from '@/payload/i18n/getTranslation'

export const appearanceOptions: Record<
  LinkAppearance,
  { label: LabelFunction | StaticLabel; value: string }
> = {
  default: {
    label: getTranslation('fields:default'),
    value: 'default',
  },
  secondary: {
    label: getTranslation('fields:secondary'),
    value: 'secondary',
  },
  outline: {
    label: getTranslation('fields:outline'),
    value: 'outline',
  },
  ghost: {
    label: getTranslation('fields:ghost'),
    value: 'ghost',
  },
  destructive: {
    label: getTranslation('fields:destructive'),
    value: 'destructive',
  },
  link: {
    label: getTranslation('fields:link'),
    value: 'link',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearance[] | false
  disableLabel?: boolean
  localizeLabels?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  localizeLabels = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    label: getTranslation('general:link'),
    type: 'group',
    interfaceName: 'LinkProps',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            label: getTranslation('fields:type'),
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: getTranslation('fields:internalLink'),
                value: 'reference',
              },
              {
                label: getTranslation('fields:customUrl'),
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            label: getTranslation('fields:openInNewTab'),
            type: 'checkbox',
            defaultValue: false,
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
          },
        ],
      },
    ],
  }

  let linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      label: getTranslation('fields:documentToLinkTo'),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
        width: '50%',
      },
      relationTo: [...linkableCollections],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: getTranslation('fields:customUrl'),
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        width: '50%',
      },
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes = linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    })) as Field[]

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          label: getTranslation('general:label'),
          localized: localizeLabels,
          admin: {
            width: '50%',
          },
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = Object.values(appearanceOptions)

    if (appearances) {
      appearanceOptionsToUse = appearances.map((option) => appearanceOptions[option])
    }

    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'appearance',
          type: 'select',
          label: getTranslation('fields:appearance'),
          admin: {
            width: '33.333%',
            description: getTranslation('fields:appearanceDescription'),
          },
          defaultValue: 'default',
          options: appearanceOptionsToUse,
        },
        selectSize(),
      ],
    })
  }

  return deepMerge(linkResult, overrides)
}
