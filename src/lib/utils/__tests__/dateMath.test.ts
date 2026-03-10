import { describe, it, expect } from 'vitest'
import { calculateNextDueDate } from '../dateMath'

describe('calculateNextDueDate', () => {
  it('adds exactly 1 week correctly', () => {
    // Standard addition
    expect(calculateNextDueDate('2024-01-01T00:00:00.000Z', 'weekly')).toBe(
      '2024-01-08T00:00:00.000Z',
    )

    // Traversing a month boundary
    expect(calculateNextDueDate('2024-01-29T00:00:00.000Z', 'weekly')).toBe(
      '2024-02-05T00:00:00.000Z',
    )
  })

  it('adds exactly 1 month correctly (standard)', () => {
    expect(calculateNextDueDate('2024-01-15T00:00:00.000Z', 'monthly')).toBe(
      '2024-02-15T00:00:00.000Z',
    )
  })

  it('adds exactly 1 month clamping correctly for edge cases (Jan 31 -> Feb 28/29)', () => {
    // Non-leap year: 2023. Jan 31 -> Feb 28
    expect(calculateNextDueDate('2023-01-31T00:00:00.000Z', 'monthly')).toBe(
      '2023-02-28T00:00:00.000Z',
    )

    // Leap year: 2024. Jan 31 -> Feb 29
    expect(calculateNextDueDate('2024-01-31T00:00:00.000Z', 'monthly')).toBe(
      '2024-02-29T00:00:00.000Z',
    )

    // March 31 -> April 30
    expect(calculateNextDueDate('2024-03-31T00:00:00.000Z', 'monthly')).toBe(
      '2024-04-30T00:00:00.000Z',
    )
  })

  it('adds exactly 1 year correctly', () => {
    expect(calculateNextDueDate('2024-01-01T00:00:00.000Z', 'yearly')).toBe(
      '2025-01-01T00:00:00.000Z',
    )
  })

  it('throws an error for invalid date strings', () => {
    expect(() => calculateNextDueDate('not-a-date', 'monthly')).toThrow(
      'Invalid date string provided',
    )
  })
})
