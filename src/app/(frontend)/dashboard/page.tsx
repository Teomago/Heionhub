import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { FinancialSummary } from '@/components/financial-summary'

export default async function DashboardPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  let name = 'Member'

  if (token) {
    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })
    const member = user as any
    name = member?.firstName || 'Member'
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {name}!</h1>
        <p className="text-muted-foreground">Here is an overview of your financial hub.</p>
      </div>

      <FinancialSummary />

      <div className="min-h-[50vh] flex-1 rounded-xl bg-neutral-900/20 border border-neutral-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No recent transactions.</p>
      </div>
    </div>
  )
}
