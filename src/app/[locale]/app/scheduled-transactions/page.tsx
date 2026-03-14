import React from 'react'
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/buttons/Button'
import { Plus } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function ScheduledTransactionsPage() {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    redirect('/login')
  }

  const t = await getTranslations('Miru.scheduled')

  const scheduledTransactionsRaw = await payload.find({
    collection: 'scheduled-transactions',
    where: { owner: { equals: user.id } },
    sort: 'nextDueDate',
    pagination: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <Button asChild>
          <Link href="?addScheduled=true">
            <Plus className="mr-2 h-4 w-4" />
            {t('addSubscription')}
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {scheduledTransactionsRaw.docs.length === 0 ? (
              <div className="flex justify-center py-10 text-muted-foreground">
                {t('noTransactions')}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scheduledTransactionsRaw.docs.map((sub) => {
                  const amount = sub.amount / 100
                  return (
                    <div
                      key={sub.id}
                      className="flex flex-col justify-between rounded-lg border p-4 shadow-sm"
                    >
                      <div className="mb-4">
                        <div className="font-semibold text-lg">{sub.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {sub.frequency}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          {t('due')}{new Date(sub.nextDueDate).toLocaleDateString()}
                        </div>
                        <div className="font-bold text-lg">
                          {amount.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
