import { deepMerge, DeepPartial } from '@/lib/utils'
import { RichTextField } from 'payload'
import { textEditor } from '../../lexical/textEditor'
import { getTranslation } from '@/payload/i18n/getTranslation'

type BlockSuffix = (options?: { overrides?: DeepPartial<RichTextField> }) => RichTextField

export const blockSuffix: BlockSuffix = ({ overrides = {} } = {}) => {
  const field: RichTextField = {
    name: 'suffix',
    label: getTranslation('fields:suffix'),
    type: 'richText',
    editor: textEditor({ headings: false }),
    admin: {
      condition: (_, siblingData) => siblingData?.settings?.withSuffix,
    },
  }

  return deepMerge(field, overrides)
}
