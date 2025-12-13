'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function createRecord(data: {
  type: 'income' | 'expense' | 'saving'
  amount: number
  category: string
  date: string
  description?: string
  isFromBalance?: boolean
  tags?: string[]
}) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Create record with authenticated user as member
    const record = await payload.create({
      collection: 'financial-records',
      data: {
        ...data,
        member: user.id,
      },
    })

    return { success: true, record }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create record'
    return { success: false, error: message }
  }
}

export async function updateRecord(
  recordId: string,
  data: {
    type?: 'income' | 'expense' | 'saving'
    amount?: number
    category?: string
    date?: string
    description?: string
    isFromBalance?: boolean
    tags?: string[]
  },
) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Verify ownership
    const record = await payload.findByID({
      collection: 'financial-records',
      id: recordId,
    })

    if (!record) {
      return { success: false, error: 'Record not found' }
    }

    const memberId = typeof record.member === 'string' ? record.member : record.member?.id
    if (memberId !== user.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Update the record
    const updated = await payload.update({
      collection: 'financial-records',
      id: recordId,
      data,
    })

    return { success: true, record: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update record'
    return { success: false, error: message }
  }
}

export async function deleteRecord(recordId: string) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Verify ownership
    const record = await payload.findByID({
      collection: 'financial-records',
      id: recordId,
    })

    if (!record) {
      return { success: false, error: 'Record not found' }
    }

    // Check if user owns this record
    const memberId = typeof record.member === 'string' ? record.member : record.member?.id
    if (memberId !== user.id) {
      return { success: false, error: 'Unauthorized' }
    }

    // Delete the record
    await payload.delete({
      collection: 'financial-records',
      id: recordId,
    })

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete record'
    return { success: false, error: message }
  }
}
