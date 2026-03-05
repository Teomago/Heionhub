import { TFunction } from '@payloadcms/translations'
import { TextFieldValidation } from 'payload'
import { TranslationKeys } from '../i18n/types'

export const validateTextTwentyFourHourFormat: TextFieldValidation = (value, { req }) => {
  const t = req.t as TFunction<TranslationKeys>
  if (value && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
    return t('validation:invalidTwentyFourHourFormat')
  }
  return true
}
