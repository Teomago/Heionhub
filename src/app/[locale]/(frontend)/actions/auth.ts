'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function verifyInvitation(code: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'invitation-codes',
    where: {
      code: {
        equals: code.toUpperCase(),
      },
    },
  })

  if (docs.length === 0) {
    return { success: false, error: 'INVALID' }
  }

  const invitation = docs[0]

  if (invitation.status === 'used') {
    // Fetch mock phrase from Global
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

export async function registerMember(formData: FormData, invitationCode: string) {
  const payload = await getPayload({ config })

  // 1. Verify code again just in case
  const verify = await verifyInvitation(invitationCode)
  if (!verify.success) {
    return verify
  }

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

  try {
    // 2. Create Member
    await payload.create({
      collection: 'members',
      data: {
        email,
        password,
        firstName,
        secondName,
        lastName,
        secondLastName,
        currency: 'USD',
      },
    })

    // 3. Mark code as used
    // Find ID first
    const { docs } = await payload.find({
      collection: 'invitation-codes',
      where: {
        code: {
          equals: invitationCode.toUpperCase(),
        },
      },
    })

    if (docs.length > 0) {
      await payload.update({
        collection: 'invitation-codes',
        id: docs[0].id,
        data: {
          status: 'used',
        },
      })
    }

    return { success: true }
  } catch (error) {
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
