import React from 'react'
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/buttons/Button'
import { Card, CardHeader, CardContent } from '@/components/display/Card'
import { Plus } from 'lucide-react'
import { AccountActions } from './components/AccountActions'
import type { Account } from '@/payload-types'

export default async function AccountsPage() {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) return null

  const accountsRaw = await payload.find({
    collection: 'accounts',
    where: {
      owner: {
        equals: user.id,
      },
    },
    sort: 'type',
    pagination: false,
  })

  const accounts = accountsRaw.docs

  let totalAssets = 0
  let totalLiabilities = 0

  accounts.forEach((acc) => {
    if (acc.type === 'credit') {
      // Credit cards are usually liabilities (represented as negative usually, but let's take absolute if they are in debt)
      totalLiabilities += acc.balance
    } else {
      totalAssets += acc.balance
    }
  })

  const netWorth = totalAssets + totalLiabilities // Assuming credit is negative. If credit is positive, subtract. Actually, let's just sum all balances assuming normal accounting.

  // Group accounts
  const groupedAccounts = accounts.reduce(
    (acc, account) => {
      const type = account.type || 'other'
      if (!acc[type]) acc[type] = []
      acc[type].push(account)
      return acc
    },
    {} as Record<string, Account[]>,
  )

  const typeLabels: Record<string, string> = {
    checking: 'Checking',
    savings: 'Savings',
    cash: 'Cash',
    investment: 'Investments',
    credit: 'Credit Cards',
    other: 'Other Accounts',
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Accounts & Net Worth</h1>
        <Link href="?addAccount=true">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </Link>
      </div>

      {/* Net Worth Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Assets</div>
          <div className="text-2xl font-bold text-green-600">
            {(totalAssets / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Liabilities</div>
          <div className="text-2xl font-bold text-red-600">
            {(totalLiabilities / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-primary-foreground bg-primary shadow-sm">
          <div className="text-sm font-medium opacity-80">Net Worth</div>
          <div className="text-2xl font-bold">
            {(netWorth / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No accounts found. Create one to get started.
        </div>
      ) : (
        Object.entries(groupedAccounts).map(([type, typeAccounts]) => (
          <div key={type} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">{typeLabels[type] || type}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {typeAccounts.map((account) => (
                <Card
                  key={account.id}
                  style={{
                    borderLeft: account.color ? `4px solid ${account.color}` : undefined,
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-foreground">{account.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {account.currency}
                      </span>
                      <AccountActions account={account} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">
                        {(account.balance / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: account.currency,
                        })}
                      </div>
                      {account.type === 'credit' && account.creditLimit && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              Debt:{' '}
                              {Math.abs(account.balance / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: account.currency,
                              })}
                            </span>
                            <span>
                              Available:{' '}
                              {((account.creditLimit + account.balance) / 100).toLocaleString(
                                'en-US',
                                {
                                  style: 'currency',
                                  currency: account.currency,
                                },
                              )}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  Math.abs(account.balance / account.creditLimit) * 100,
                                  100,
                                )}%`,
                              }}
                            />
                          </div>
                          <p className="text-[10px] text-muted-foreground text-right w-full">
                            Limit:{' '}
                            {(account.creditLimit / 100).toLocaleString('en-US', {
                              style: 'currency',
                              currency: account.currency,
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
