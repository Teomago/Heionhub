import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import { FinancialSummary } from '@/components/financial-summary'
import { getDailyFinancialData } from '../actions/financial-chart'
import { DashboardInteractiveChart } from '@/components/charts/dashboard-interactive-chart'

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
    const member = user as { firstName?: string } | null
    name = member?.firstName || 'Member'
  }

  const chartData = await getDailyFinancialData(undefined, undefined, 'all')

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {name}!</h1>
        <p className="text-muted-foreground">Here is an overview of your financial hub.</p>
      </div>

      <FinancialSummary />

      <DashboardInteractiveChart data={chartData} />
    </div>
  )
}
