import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

type SeoFieldsOptions = {
  titlePath?: string
  descriptionPath?: string
  imagePath?: string
  hasGenerateFn?:
    | boolean
    | {
        title?: boolean
        description?: boolean
      }
}

export const seoFields = ({
  titlePath = 'meta.title',
  descriptionPath = 'meta.description',
  imagePath = 'meta.image',
  hasGenerateFn = true,
}: SeoFieldsOptions = {}): Field[] => {
  const hasGenerateTitle =
    typeof hasGenerateFn === 'boolean' ? hasGenerateFn : (hasGenerateFn?.title ?? true)

  const hasGenerateDescription =
    typeof hasGenerateFn === 'boolean' ? hasGenerateFn : (hasGenerateFn?.description ?? true)

  return [
    OverviewField({
      titlePath,
      descriptionPath,
      imagePath,
    }),
    MetaTitleField({
      hasGenerateFn: hasGenerateTitle,
    }),
    MetaDescriptionField({
      hasGenerateFn: hasGenerateDescription,
    }),
    PreviewField({
      hasGenerateFn: true,
      titlePath,
      descriptionPath,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    {
      name: 'noIndex',
      label: 'No Index',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Prevent search engines from indexing this page',
      },
    },
  ]
}
