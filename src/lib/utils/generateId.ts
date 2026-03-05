import crypto from 'crypto'

/**
 * Generates a URL-safe random ID using crypto
 * @param {number} [length=8] - Desired length of output ID (max 32)
 * @returns {string} Base64URL-encoded string trimmed to specified length
 * @throws {Error} If length is greater than 32
 * @example
 * generateId() // 'dj3nx8Ua'
 * generateId(4) // 'dj3n'
 * generateId(16) // 'dj3nx8UaK92mPq4R'
 */
export const generateId = (length: number = 8): string => {
  if (length > 32) {
    throw new Error('Maximum length for generateId is 32 characters')
  }
  const bytes = Math.ceil((length * 3) / 4)
  return crypto.randomBytes(bytes).toString('base64url').slice(0, length)
}
