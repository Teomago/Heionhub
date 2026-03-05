import { LabelFunction } from 'payload'
import { TranslationKeys } from './types'

export const getTranslation = (key: TranslationKeys): LabelFunction => {
  return ({ t }) => {
    return t(key as any)
  }
}
