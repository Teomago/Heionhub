export function calculateNextDueDate(
  currentDateStr: string,
  frequency: 'weekly' | 'monthly' | 'yearly',
): string {
  const date = new Date(currentDateStr)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided')
  }

  // Use UTC to prevent timezone drift during midnight cron executions
  if (frequency === 'weekly') {
    date.setUTCDate(date.getUTCDate() + 7)
  } else if (frequency === 'monthly') {
    // JavaScript's setMonth automatically handles edge cases (e.g. Jan 31 + 1 month = Mar 3)
    // For standard billing, clamping is best practice (Jan 31 -> Feb 28)
    const targetMonth = date.getUTCMonth() + 1
    date.setUTCMonth(targetMonth)

    // If the month jumped too far (e.g., target was Feb but we landed in Mar), clamp to last day of target month
    if (date.getUTCMonth() !== targetMonth % 12) {
      date.setUTCDate(0) // 0th day is the last day of the previous month
    }
  } else if (frequency === 'yearly') {
    date.setUTCFullYear(date.getUTCFullYear() + 1)
  }

  return date.toISOString()
}
