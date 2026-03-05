import { createBlock } from '@/payload/blocks/blockFactory'
import { adminBlockGroups } from '@/payload/i18n/adminBlockGroups'
import { defaultEditor } from '@/payload/lexical'
import { getTranslation } from '@/payload/i18n/getTranslation'
import { customRowLabel } from '@/payload/ui/ArrayRowLabel/utils'

export const ContactFormBlock = createBlock({
  slug: 'contactForm',
  interfaceName: 'ContactFormBlockType',
  labels: {
    singular: getTranslation('blocks:contactForm:label'),
    plural: getTranslation('blocks:contactForm:label'),
  },
  admin: {
    group: adminBlockGroups.conversion,
  },
  availableIn: ['root', 'layout'],
  tabs: {
    fields: {
      general: [
        {
          name: 'heading',
          type: 'text',
          label: getTranslation('blocks:contactForm:heading'),
        },
        {
          name: 'body',
          type: 'richText',
          label: getTranslation('blocks:contactForm:body'),
          editor: defaultEditor(),
        },
        {
          name: 'fields',
          type: 'array',
          label: getTranslation('blocks:contactForm:fields'),
          minRows: 1,
          admin: {
            components: {
              RowLabel: customRowLabel({
                fieldToUse: 'name',
                fallbackLabel: 'Field {{index + 1}}',
              }),
            },
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: getTranslation('blocks:contactForm:fieldName'),
            },
            {
              name: 'fieldType',
              type: 'select',
              required: true,
              defaultValue: 'text',
              label: getTranslation('blocks:contactForm:fieldType'),
              admin: { isClearable: false },
              options: [
                { label: getTranslation('blocks:contactForm:fieldTypeText'), value: 'text' },
                { label: getTranslation('blocks:contactForm:fieldTypeEmail'), value: 'email' },
                { label: getTranslation('blocks:contactForm:fieldTypeTel'), value: 'tel' },
                {
                  label: getTranslation('blocks:contactForm:fieldTypeTextarea'),
                  value: 'textarea',
                },
                { label: getTranslation('blocks:contactForm:fieldTypeSelect'), value: 'select' },
              ],
            },
            {
              name: 'required',
              type: 'checkbox',
              label: getTranslation('blocks:contactForm:fieldRequired'),
              defaultValue: false,
            },
            {
              name: 'placeholder',
              type: 'text',
              label: getTranslation('blocks:contactForm:fieldPlaceholder'),
            },
            {
              name: 'options',
              type: 'array',
              label: getTranslation('blocks:contactForm:fieldOptions'),
              admin: {
                condition: (_data: any, siblingData: any) => siblingData.fieldType === 'select',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: getTranslation('blocks:contactForm:optionLabel'),
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: getTranslation('blocks:contactForm:optionValue'),
                },
              ],
            },
          ],
        },
        {
          name: 'submitLabel',
          type: 'text',
          label: getTranslation('blocks:contactForm:submitLabel'),
          defaultValue: 'Submit',
        },
        {
          name: 'successMessage',
          type: 'text',
          label: getTranslation('blocks:contactForm:successMessage'),
          defaultValue: 'Thank you! We will get back to you soon.',
        },
        {
          name: 'endpoint',
          type: 'text',
          label: getTranslation('blocks:contactForm:endpoint'),
          admin: {
            description: getTranslation('blocks:contactForm:endpointDescription'),
          },
        },
      ],
    },
  },
})
