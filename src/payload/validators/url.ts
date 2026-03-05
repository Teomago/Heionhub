import { isValidURL } from '@/lib/utils'
import { TextFieldSingleValidation } from 'payload'
import { TranslationKeys } from '../i18n/types'
import { TFunction } from '@payloadcms/translations'

export const validateURL: TextFieldSingleValidation = (value, { req }) => {
  const t = req.t as TFunction<TranslationKeys>
  if (value && !isValidURL(value)) {
    return t('validation:invalidURL')
  }
  return true
}
