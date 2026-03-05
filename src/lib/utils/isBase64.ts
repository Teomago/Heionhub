/**
 * Check if a string is valid Base64 encoded.
 */
export const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str
  } catch {
    return false
  }
}
