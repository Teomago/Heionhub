'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

export async function verifyInvitation(code: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'invitation-codes',
    where: {
      code: {
        equals: code.toUpperCase(),
      },
    },
    overrideAccess: true,
  })

  if (docs.length === 0) {
    return { success: false, error: 'INVALID' }
  }

  const invitation = docs[0]

  if (invitation.status === 'used') {
    const invitationsGlobal = await payload.findGlobal({
      slug: 'invitations',
    })

    return {
      success: false,
      error: 'MOCK_VIOLATION',
      message: invitationsGlobal.mockPhrase || 'You dare enter without an invitation?',
    }
  }

  return { success: true }
}

export async function registerMember(formData: FormData, invitationCode: string, locale: string = 'en') {
  // Rate limit: 3 requests per IP per minute
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
      const headersList = await headers()
      const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1'
      const { success: allowed } = await new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 m'),
      }).limit(`register_${ip}`)

      if (!allowed) {
        return { success: false, error: 'RATE_LIMITED', message: 'Too many registration attempts. Please try again later.' }
      }
    } catch (err) {
      console.error('Registration rate limiter failed (Upstash Error):', err)
    }
  }

  const payload = await getPayload({ config })

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const secondName = formData.get('secondName') as string
  const lastName = formData.get('lastName') as string
  const secondLastName = formData.get('secondLastName') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { success: false, error: 'PASSWORDS_DO_NOT_MATCH', message: 'Passwords do not match.' }
  }

  // Determine tier based on invitation code presence
  const hasInvitationCode = invitationCode.trim().length > 0
  let tier: 'free' | 'premium' = 'free'

  // Locale-based currency: 'es' → COP, else USD
  const validLocale = locale === 'es' ? 'es' : 'en'
  const currency = validLocale === 'es' ? 'COP' : 'USD'

  // Begin atomic transaction — all reads and writes happen inside
  const req = { payload } as any
  const transactionID = await payload.db.beginTransaction()
  req.transactionID = transactionID

  try {
    // 1. If invitation code provided, verify AND consume it atomically inside the transaction
    if (hasInvitationCode) {
      const { docs } = await payload.find({
        collection: 'invitation-codes',
        where: {
          code: { equals: invitationCode.toUpperCase() },
          status: { equals: 'available' },
        },
        overrideAccess: true,
        req,
      })

      if (docs.length === 0) {
        // Code doesn't exist or is already used — reject, do not fallback to free
        if (transactionID) {
          await payload.db.rollbackTransaction(transactionID)
        }

        // Check if code exists but is used (for mock violation message)
        const { docs: existingDocs } = await payload.find({
          collection: 'invitation-codes',
          where: { code: { equals: invitationCode.toUpperCase() } },
          overrideAccess: true,
        })

        if (existingDocs.length > 0 && existingDocs[0].status === 'used') {
          const invitationsGlobal = await payload.findGlobal({ slug: 'invitations' })
          return {
            success: false,
            error: 'MOCK_VIOLATION',
            message: invitationsGlobal.mockPhrase || 'You dare enter without an invitation?',
          }
        }

        return { success: false, error: 'INVALID', message: 'Invalid invitation code.' }
      }

      // Mark code as used atomically within the transaction
      await payload.update({
        collection: 'invitation-codes',
        id: docs[0].id,
        data: { status: 'used' },
        overrideAccess: true,
        req,
      })

      tier = 'premium'
    }

    // 2. Create Member with the determined tier (overrideAccess to ensure tier is not stripped)
    await payload.create({
      collection: 'members',
      data: {
        email,
        password,
        firstName,
        secondName,
        lastName,
        secondLastName,
        currency,
        preferredLocale: validLocale,
        tier,
      },
      overrideAccess: true,
      req,
    })

    // 3. Commit — member creation + code burn (if applicable) succeed atomically
    if (transactionID) {
      await payload.db.commitTransaction(transactionID)
    }

    return { success: true }
  } catch (error) {
    // Rollback — member is NOT created, code is NOT burned
    if (transactionID) {
      await payload.db.rollbackTransaction(transactionID)
    }
    console.error('Registration error:', error)
    return { success: false, error: 'REGISTRATION_FAILED', message: 'Failed to create account.' }
  }
}

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const payload = await getPayload({ config })
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const result = await payload.login({
      collection: 'members',
      data: {
        email,
        password,
      },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-member-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })
      return { success: true }
    }

    return { success: false, error: 'LOGIN_FAILED', message: 'Invalid credentials.' }
  } catch (_error) {
    return { success: false, error: 'LOGIN_FAILED', message: 'Invalid credentials.' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-member-token')
  return { success: true }
}
