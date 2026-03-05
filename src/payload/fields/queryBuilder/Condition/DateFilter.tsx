'use client'
import type { ConditionalDateProps, DateFieldClient, Operator } from 'payload'
import { getTranslation } from '@payloadcms/translations'
import { DatePicker, useTranslation } from '@payloadcms/ui'

interface DateFilterProps {
  disabled: boolean
  field: DateFieldClient
  onChange: (value: unknown) => void
  operator: Operator
  value: Date | string
}

export const DateFilter: React.FC<DateFilterProps> = ({
  disabled,
  field: { admin },
  onChange,
  value,
}) => {
  const date = (admin?.date ?? {}) as ConditionalDateProps
  const { i18n, t } = useTranslation()

  const placeholderLabel = admin?.placeholder as Record<string, string> | string | undefined
  const placeholder = placeholderLabel
    ? String(getTranslation(placeholderLabel, i18n))
    : t('general:enterAValue')

  return (
    <div className="condition-value-date">
      <DatePicker
        {...date}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
        value={value}
      />
    </div>
  )
}
