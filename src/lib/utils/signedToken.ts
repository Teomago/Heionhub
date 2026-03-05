import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Parse a duration string into milliseconds.
 * Supports: '5m', '1h', '30s', '1d'
 */
function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)(s|m|h|d)$/)
  if (!match) throw new Error(`Invalid duration format: ${duration}`)

  const value = parseInt(match[1], 10)
  const unit = match[2]

  switch (unit) {
    case 's':
      return value * 1000
    case 'm':
      return value * 60 * 1000
    case 'h':
      return value * 60 * 60 * 1000
    case 'd':
      return value * 24 * 60 * 60 * 1000
    default:
      throw new Error(`Unknown duration unit: ${unit}`)
  }
}

function getSecret(): string {
  // FigmaCMS sets its own internal secret via buildFigmaConfig.
  // PAYLOAD_SECRET may not be in .env — fall back to the known default.
  const secret = process.env.PAYLOAD_SECRET || 'MY_SECRET'
  return secret
}

/**
 * Generate an HMAC-SHA256 signed token with optional expiry and scope.
 *
 * @example
 * ```ts
 * const token = generateSignedToken({ scope: 'preview', expiresIn: '1h' })
 * // Returns: 'scope.timestamp.signature'
 * ```
 */
export function generateSignedToken(
  options: {
    scope?: string
    expiresIn?: string
  } = {},
): string {
  const { scope = 'default', expiresIn = '1h' } = options
  const secret = getSecret()

  const expiresAt = Date.now() + parseDuration(expiresIn)
  const payload = `${scope}.${expiresAt}`
  const signature = createHmac('sha256', secret).update(payload).digest('hex')

  return `${payload}.${signature}`
}

/**
 * Verify a signed token.
 *
 * @returns `true` if the token is valid and not expired with matching scope.
 *
 * @example
 * ```ts
 * const isValid = verifySignedToken(token, { scope: 'preview' })
 * ```
 */
export function verifySignedToken(token: string, options: { scope?: string } = {}): boolean {
  const { scope = 'default' } = options

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const [tokenScope, expiresAtStr, signature] = parts

    // Check scope
    if (tokenScope !== scope) return false

    // Check expiry
    const expiresAt = parseInt(expiresAtStr, 10)
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false

    // Verify signature
    const secret = getSecret()
    const payload = `${tokenScope}.${expiresAtStr}`
    const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex')

    const sigBuffer = Buffer.from(signature, 'hex')
    const expectedBuffer = Buffer.from(expectedSignature, 'hex')

    if (sigBuffer.length !== expectedBuffer.length) return false

    return timingSafeEqual(sigBuffer, expectedBuffer)
  } catch {
    return false
  }
}
