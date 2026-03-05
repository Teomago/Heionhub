'use client'
import { useRowLabel, useTranslation } from '@payloadcms/ui'
import { TranslationsObject, TranslationKeys } from '@/payload/i18n/types'

export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ link: { label?: string } }>()
  const { t } = useTranslation<TranslationsObject, TranslationKeys>()
  return (
    data?.link?.label || `${t('general:link')} ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`
  )
}

export default LinkRowLabel
