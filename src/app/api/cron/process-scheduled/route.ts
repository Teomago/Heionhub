import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const payload = await getPayload({ config: configPromise })
    const now = new Date()

    const dueScheduled = await payload.find({
      collection: 'scheduled-transactions',
      where: {
        nextDueDate: { less_than_equal: now.toISOString().split('T')[0] },
      },
      overrideAccess: true,
      pagination: false,
    })

    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      errors: [] as string[],
    }

    for (const st of dueScheduled.docs) {
      results.processed++
      try {
        // Step 1: Create actual transaction. This triggers Atomic balances hook
        await payload.create({
          collection: 'transactions',
          data: {
            amount: st.amount,
            category: (typeof st.category === 'object' ? st.category?.id : st.category) as
              | string
              | null,
            account: (typeof st.account === 'object' ? st.account?.id : st.account) as string,
            date: st.nextDueDate,
            type: 'expense', // Assume automated bills are expenses
            description: st.name,
            owner: (typeof st.owner === 'object' ? st.owner?.id : st.owner) as string,
          },
          overrideAccess: true,
        })

        // Step 2: ONLY after step 1 succeeds, safely calculate next due date
        const currentDueDate = new Date(st.nextDueDate)
        // Ensure calculations happen in UTC so dates don't drift across timezones
        let nextYear = currentDueDate.getUTCFullYear()
        let nextMonth = currentDueDate.getUTCMonth()
        let nextDate = currentDueDate.getUTCDate()

        if (st.frequency === 'weekly') {
          nextDate += 7
        } else if (st.frequency === 'monthly') {
          nextMonth += 1
        } else if (st.frequency === 'yearly') {
          nextYear += 1
        }

        const calculatedNextDate = new Date(Date.UTC(nextYear, nextMonth, nextDate))

        await payload.update({
          collection: 'scheduled-transactions',
          id: st.id,
          data: {
            nextDueDate: calculatedNextDate.toISOString().split('T')[0],
          },
          overrideAccess: true,
        })

        results.succeeded++
      } catch (err: any) {
        console.error(`Failed to process scheduled transaction ${st.id}:`, err)
        results.failed++
        results.errors.push(`ID ${st.id}: ${err.message}`)
        // continue to next record to avoid partial failure blocking the entire cron job!
        continue
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Cron job failed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
