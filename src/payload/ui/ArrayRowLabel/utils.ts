import type { ArrayRowLabelArgs } from './types'

export const customRowLabel = ({
  fieldToUse,
  template = false,
  fallbackLabel,
  templateVariables,
}: ArrayRowLabelArgs) => {
  return {
    path: 'src/payload/ui/ArrayRowLabel',
    clientProps: {
      fieldToUse,
      template: Boolean(template),
      fallbackLabel: fallbackLabel,
      templateVariables,
    },
  }
}
