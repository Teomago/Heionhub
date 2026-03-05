import { getTranslation } from '@/payload/i18n/getTranslation'
import { createBlock } from './blockFactory'
import { defaultEditor } from '@/payload/lexical/defaultEditor'

export const RichTextBlock = createBlock({
  slug: 'richText',
  interfaceName: 'RichTextBlockType',
  labels: {
    singular: getTranslation('blocks:richText:singular'),
    plural: getTranslation('blocks:richText:plural'),
  },
  tabs: {
    fields: [
      {
        name: 'data',
        type: 'richText',
        label: getTranslation('general:content'),
        editor: defaultEditor({ headings: ['h2', 'h3', 'h4'] }),
      },
    ],
    defaults: {
      htmlTag: { options: ['section', 'div'], defaultValue: 'div' },
    },
  },
})
