import type { TextFieldSingleValidation } from 'payload'
import type { Media } from '@/payload-types'

export const validateAlt: TextFieldSingleValidation = (value, { data }) => {
  const siblingData: Partial<Omit<Media, 'alt'>> = data

  // If upload is an image, alt text is required.
  if (siblingData.mimeType?.startsWith('image') && !value) {
    return 'Alt text is required for images'
  }

  return true
}
