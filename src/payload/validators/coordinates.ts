import { NumberFieldSingleValidation } from 'payload'
import { TFunction } from '@payloadcms/translations'
import { TranslationKeys } from '../i18n/types'

export const validateLongitude: NumberFieldSingleValidation = (value, { req }) => {
  const t = req.t as TFunction<TranslationKeys>

  if (value !== undefined && value !== null && (value < -180 || value > 180)) {
    return t('validation:invalidLongitude')
  }

  return true
}

export const validateLatitude: NumberFieldSingleValidation = (value, { req }) => {
  const t = req.t as TFunction<TranslationKeys>

  if (value !== undefined && value !== null && (value < -90 || value > 90)) {
    return t('validation:invalidLatitude')
  }

  return true
}
