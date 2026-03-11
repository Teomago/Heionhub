import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from '@/lib/utils/APIError'
import * as Sentry from '@sentry/nextjs'

function getId(relation: any): string | undefined {
  if (!relation) return undefined
  return typeof relation === 'object' ? relation.id : relation
}

export const checkBudgetLimits: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const budgetId = getId(data.budget)
  if (!budgetId || data.type !== 'expense') return data

  try {
    const budget = await req.payload.findByID({
      collection: 'budgets',
      id: budgetId,
    })

    // budget amount is our limit field in the schema
    const budgetLimit = budget.amount as number
    const currentSpend = budget.currentSpend as number

    if (!budget || !budget.locked) return data

    let overLimit = false

    if (operation === 'create') {
      if (currentSpend + data.amount > budgetLimit) {
        overLimit = true
      }
    } else if (operation === 'update') {
      const previousAmount = originalDoc?.amount || 0
      const delta = data.amount - previousAmount

      if (currentSpend + delta > budgetLimit) {
        overLimit = true
      }
    }

    if (overLimit) {
      throw new APIError('This transaction exceeds the locked budget limit.', 400, true)
    }
  } catch (error) {
    if (error instanceof APIError) throw error // Re-throw business logic errors as-is
    Sentry.captureException(error, {
      extra: { budgetId, hook: 'checkBudgetLimits' },
    })
    throw error
  }

  return data
}
