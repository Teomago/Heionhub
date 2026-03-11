'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { ParsedTransactionRow } from './components/DropzoneArea'

export async function bulkImportTransactions(data: ParsedTransactionRow[]) {
  const startTime = Date.now()
  let user, payload
  try {
    const auth = await assertUser()
    user = auth.user
    payload = auth.payload
  } catch (e) {
    return { success: false, error: 'You must be logged in to import transactions.' }
  }

  try {
    // 1. Fetch User's existing Categories and Accounts to map against
    const existingAccountsRes = await payload.find({
      collection: 'accounts',
      where: {
        owner: { equals: user.id },
      },
      limit: 1000,
    })

    const existingCategoriesRes = await payload.find({
      collection: 'categories',
      where: {
        owner: { equals: user.id },
      },
      limit: 1000,
    })

    // Create tracking maps for fast O(1) lookups during the loop
    const accountsMap = new Map<string, string>(
      existingAccountsRes.docs.map((acc) => [acc.name.toLowerCase(), acc.id]),
    )
    const categoriesMap = new Map<string, string>(
      existingCategoriesRes.docs.map((cat) => [cat.name.toLowerCase(), cat.id]),
    )

    let importedCount = 0

    // 2. Pre-process required accounts and categories
    const requiredAccounts = new Set<string>()
    const requiredCategories = new Set<string>()

    for (const row of data) {
      if (!row.Date || !row.Amount || !row.Type) continue
      requiredAccounts.add((row.AccountName?.trim() || 'Default Account').toLowerCase())
      requiredCategories.add((row.CategoryName?.trim() || 'Uncategorized').toLowerCase())
    }

    // A. Auto-create missing Accounts sequentially (usually very few)
    for (const accName of requiredAccounts) {
      if (!accountsMap.has(accName)) {
        const originalName =
          data
            .find((r) => (r.AccountName?.trim() || 'Default Account').toLowerCase() === accName)
            ?.AccountName?.trim() || 'Default Account'

        const newAcc = await payload.create({
          collection: 'accounts',
          data: {
            name: originalName,
            type: 'checking',
            balance: 0,
            currency: 'USD',
            owner: user.id,
          },
        })
        accountsMap.set(accName, newAcc.id)
      }
    }

    // B. Auto-create missing Categories sequentially (usually very few)
    for (const catName of requiredCategories) {
      if (!categoriesMap.has(catName)) {
        const firstUsageRow = data.find(
          (r) => (r.CategoryName?.trim() || 'Uncategorized').toLowerCase() === catName,
        )
        const originalName = firstUsageRow?.CategoryName?.trim() || 'Uncategorized'
        const categoryType = (
          firstUsageRow?.Type?.toLowerCase() === 'income' ? 'income' : 'expense'
        ) as 'income' | 'expense'

        const newCat = await payload.create({
          collection: 'categories',
          data: {
            name: originalName,
            color: '#9CA3AF',
            type: categoryType,
            owner: user.id,
          },
        })
        categoriesMap.set(catName, newCat.id)
      }
    }

    // 3. Build array of transaction jobs and calculate memory balances
    const transactionJobs = []

    for (const row of data) {
      if (!row.Date || !row.Amount || !row.Type) continue

      const amountFloat =
        typeof row.Amount === 'string'
          ? parseFloat(row.Amount.replace(/[^0-9.-]+/g, ''))
          : row.Amount
      const amountInCents = Math.round(amountFloat * 100)

      const accName = (row.AccountName?.trim() || 'Default Account').toLowerCase()
      const catName = (row.CategoryName?.trim() || 'Uncategorized').toLowerCase()

      const accIdTarget = accountsMap.get(accName)!
      const catIdTarget = categoriesMap.get(catName)!
      const transactionType = (row.Type.toLowerCase() === 'income' ? 'income' : 'expense') as
        | 'income'
        | 'expense'

      transactionJobs.push({
        collection: 'transactions',
        data: {
          description: row.Description?.trim() || 'Imported Transaction',
          amount: amountInCents,
          type: transactionType,
          date: new Date(row.Date).toISOString(),
          account: accIdTarget,
          category: catIdTarget,
          owner: user.id,
        },
      })
    }

    // 4. Execute transaction creations SEQUENTIALLY to respect Postgres Row-Level Locks.
    // Drizzle will automatically run the atomic updateAccountBalance afterChange hook per row.
    for (const job of transactionJobs) {
      await payload.create({
        collection: job.collection as 'transactions',
        data: job.data,
      })
      importedCount++
    }

    const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(2)

    return { success: true, count: importedCount, timeElapsed }
  } catch (error) {
    console.error('Error in bulkImportTransactions:', error)
    return { success: false, error: 'A critical server error occurred trying to ingest the CSV.' }
  }
}
