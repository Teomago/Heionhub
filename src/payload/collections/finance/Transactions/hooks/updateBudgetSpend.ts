import type { CollectionAfterChangeHook } from 'payload'
import { sql, eq } from 'drizzle-orm'

// Helper to determine if we are adding or subtracting from the budget
function calculateDirectionalAmount(
  type: 'income' | 'expense' | 'transfer',
  amount: number,
): number {
  if (type === 'expense') return amount
  // Budgets generally only track expenses in this app model
  return 0
}

function getId(relation: any): string | undefined {
  if (!relation) return undefined
  return typeof relation === 'object' ? relation.id : relation
}

async function applyDelta(payload: any, budgetId: string | undefined, amountToInject: number) {
  if (amountToInject === 0 || !budgetId) return

  try {
    const budgetsTable = payload.db.tables['budgets']

    if (budgetsTable) {
      await payload.db.drizzle
        .update(budgetsTable)
        .set({
          currentSpend: sql`${budgetsTable.currentSpend} + ${amountToInject}`,
        })
        .where(eq(budgetsTable.id, budgetId))
    }
  } catch (error) {
    console.error('Failed to apply atomic delta to budget spend:', error)
  }
}

export const updateBudgetSpend: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req: { payload },
}) => {
  let deltaAmount = 0
  const budgetId = getId(doc.budget)

  if (operation === 'create') {
    deltaAmount = calculateDirectionalAmount(doc.type, doc.amount)
    await applyDelta(payload, budgetId, deltaAmount)
  } else if (operation === 'update') {
    const prevBudgetId = getId(previousDoc?.budget)

    if (
      doc.amount === previousDoc?.amount &&
      doc.type === previousDoc?.type &&
      budgetId === prevBudgetId &&
      doc.status === previousDoc?.status
    ) {
      return doc
    }

    if (previousDoc?.status !== 'deleted' && doc.status === 'deleted') {
      deltaAmount = -calculateDirectionalAmount(previousDoc.type, previousDoc.amount)
      await applyDelta(payload, prevBudgetId, deltaAmount)
      return doc
    }

    if (previousDoc?.status === 'deleted' && doc.status !== 'deleted') {
      const restoreDelta = calculateDirectionalAmount(doc.type, doc.amount)
      await applyDelta(payload, budgetId, restoreDelta)
      return doc
    }

    if (previousDoc?.status !== 'deleted') {
      const oldDelta = -calculateDirectionalAmount(
        previousDoc?.type || 'expense',
        previousDoc?.amount || 0,
      )
      await applyDelta(payload, prevBudgetId, oldDelta)
    }

    if (doc.status !== 'deleted') {
      const newDelta = calculateDirectionalAmount(doc.type, doc.amount)
      await applyDelta(payload, budgetId, newDelta)
    }
  }

  return doc
}
