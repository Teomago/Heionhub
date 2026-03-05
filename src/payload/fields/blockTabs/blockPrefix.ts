import { deepMerge, DeepPartial } from '@/lib/utils'
import { RichTextField } from 'payload'
import { textEditor } from '../../lexical/textEditor'
import { getTranslation } from '@/payload/i18n/getTranslation'

type BlockPrefix = (options?: { overrides?: DeepPartial<RichTextField> }) => RichTextField

export const blockPrefix: BlockPrefix = ({ overrides = {} } = {}) => {
  const field: RichTextField = {
    name: 'prefix',
    label: getTranslation('fields:prefix'),
    type: 'richText',
    editor: textEditor({ headings: ['h2', 'h3', 'h4'] }),
    admin: {
      condition: (_, siblingData) => siblingData?.settings?.withPrefix,
    },
  }

  return deepMerge(field, overrides)
}
