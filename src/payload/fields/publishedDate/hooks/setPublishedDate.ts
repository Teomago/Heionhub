import { FieldHook } from 'payload'

const toMidnightUTC = (dateInput: string | Date): string => {
  const date = new Date(dateInput)
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString()
}

/**
 * Hook that automatically sets the publishedDate field when a document is published
 * and the publishedDate field is empty.
 *
 * @returns FieldHook that sets publishedDate to current date (UTC midnight) when status becomes 'published'
 */
export const setPublishedDate: FieldHook = ({ value, siblingData }) => {
  if (!value && siblingData?._status === 'published') {
    return toMidnightUTC(new Date())
  }

  return value
}
