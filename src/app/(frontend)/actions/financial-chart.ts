'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function getDailyFinancialData(
  startDate?: string,
  endDate?: string,
  type: 'income' | 'expense' | 'saving' | 'all' = 'all',
) {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) return []

  const { user } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!user) return []

  // Define Range
  const now = new Date()
  // Use UTC to avoid timezone issues
  const start = startDate
    ? new Date(startDate)
    : new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1))
  const end = endDate
    ? new Date(endDate)
    : new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999))

  // Fetch ALL records for the user to calculate running balances
  const { docs } = await payload.find({
    collection: 'financial-records',
    where: {
      member: { equals: user.id },
    },
    limit: 10000,
    sort: 'date',
  })

  // Data Structures
  const dailyData: Record<
    string,
    { income: number; expense: number; saving: number; net: number }
  > = {}

  // Initialize all days in range
  const daysInRange: string[] = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split('T')[0]
    daysInRange.push(dateKey)
    dailyData[dateKey] = { income: 0, expense: 0, saving: 0, net: 0 }
  }

  // --- Day-by-Day Simulation Strategy ---
  // 1. Calculate Initial State (Lifetime) up to `start`
  let initialNet = 0
  let initialSavings = 0

  docs
    .filter((d) => new Date(d.date) < start)
    .forEach((r) => {
      if (r.type === 'income' && r.isFromBalance !== false) initialNet += r.amount
      if (r.type === 'expense' && r.isFromBalance !== false) initialNet -= r.amount
      if (r.type === 'saving') {
        initialSavings += r.amount
        if (r.isFromBalance !== false) initialNet -= r.amount
      }
    })

  let currentNet = initialNet
  let currentSavings = initialSavings
  let currentIncomeMTD = 0
  let currentExpenseMTD = 0

  // 2. Iterate through each day in the range
  console.log(`[FinancialChart] Range: ${startDate} to ${endDate}`)
  console.log(`[FinancialChart] Initial State: Net=${initialNet}, Sav=${initialSavings}`)

  return daysInRange.map((dateStr) => {
    // Find records for this specific day
    const dayRecords = docs.filter((d) => new Date(d.date).toISOString().split('T')[0] === dateStr)

    // Apply changes for this day
    dayRecords.forEach((r) => {
      console.log(
        `[FinancialChart] processing record on ${dateStr}: type=${r.type}, amount=${r.amount}, isFromBalance=${r.isFromBalance}`,
      )
      if (r.type === 'income') {
        currentIncomeMTD += r.amount
        if (r.isFromBalance !== false) currentNet += r.amount
      }
      if (r.type === 'expense') {
        currentExpenseMTD += r.amount
        if (r.isFromBalance !== false) currentNet -= r.amount
      }
      if (r.type === 'saving') {
        currentSavings += r.amount
        if (r.isFromBalance !== false) currentNet -= r.amount
      }
    })

    // Log snapshots for debugging
    if (dayRecords.length > 0) {
      console.log(
        `[FinancialChart] End of ${dateStr}: Net=${currentNet}, IncMTD=${currentIncomeMTD}, Sav=${currentSavings}`,
      )
    }

    const incomeVal = currentIncomeMTD
    const expenseVal = currentExpenseMTD
    const savingVal = type === 'all' || type === 'saving' ? currentSavings : 0 // Saving page implies Balance

    return {
      date: dateStr,
      income: incomeVal,
      expense: expenseVal,
      saving: savingVal,
      net: currentNet,
    }
  })
}

export async function getFinancialRecordsByType(
  type: 'income' | 'expense' | 'saving',
  page = 1,
  limit = 10,
) {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) return { docs: [], totalPages: 0, page: 1 }

  const { user } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!user) return { docs: [], totalPages: 0, page: 1 }

  const result = await payload.find({
    collection: 'financial-records',
    where: {
      and: [{ member: { equals: user.id } }, { type: { equals: type } }],
    },
    sort: '-date',
    page,
    limit,
  })

  return {
    docs: result.docs,
    totalPages: result.totalPages,
    page: result.page,
    totalDocs: result.totalDocs,
  }
}

export async function getFinancialDataByTags(type: 'income' | 'expense' | 'saving') {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) return []

  const { user } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!user) return []

  // Get current month date range
  const now = new Date()
  const currentMonthStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1))

  const { docs } = await payload.find({
    collection: 'financial-records',
    where: {
      and: [
        { member: { equals: user.id } },
        { type: { equals: type } },
        { date: { greater_than_equal: currentMonthStart.toISOString() } },
      ],
    },
    limit: 10000,
    depth: 2, // To populate tags relationship
  })

  // Fetch all tags for the user to get color/icon info
  const { docs: allTags } = await payload.find({
    collection: 'tags',
    where: {
      or: [{ member: { equals: user.id } }, { member: { exists: false } }],
    },
    limit: 1000,
  })

  // Create a map of tag IDs to tag data
  const tagMap = new Map<string, { name: string; color: string; icon: string }>()
  allTags.forEach((tag: { id: string; name: string; color?: string | null; icon?: string | null }) => {
    tagMap.set(tag.id, {
      name: tag.name,
      color: tag.color || '#6b7280', // Default gray if no color
      icon: tag.icon || 'tag',
    })
  })

  // Group by tags
  const groupedByTag: Record<
    string,
    { value: number; color: string; icon: string; name: string }
  > = {}

  docs.forEach((record: { tags?: Array<string | { id: string }> | null; category?: string; amount: number; type: string }) => {
    if (record.tags && Array.isArray(record.tags) && record.tags.length > 0) {
      // If record has tags, group by each tag
      record.tags.forEach((tag: string | { id: string }) => {
        const tagId = typeof tag === 'string' ? tag : tag.id
        const tagData = tagMap.get(tagId)

        if (tagData) {
          if (!groupedByTag[tagId]) {
            groupedByTag[tagId] = {
              value: 0,
              color: tagData.color,
              icon: tagData.icon,
              name: tagData.name,
            }
          }
          groupedByTag[tagId].value += record.amount
        }
      })
    } else {
      // No tags, use category as fallback
      const category = record.category || 'Uncategorized'
      if (!groupedByTag[category]) {
        groupedByTag[category] = {
          value: 0,
          color: '#6b7280', // Default gray
          icon: 'tag',
          name: category,
        }
      }
      groupedByTag[category].value += record.amount
    }
  })

  // Sort by value descending (largest first = innermost ring)
  return Object.entries(groupedByTag)
    .map(([_key, data]) => ({
      tag: data.name,
      value: data.value,
      fill: data.color,
      icon: data.icon,
    }))
    .sort((a, b) => b.value - a.value)
}
