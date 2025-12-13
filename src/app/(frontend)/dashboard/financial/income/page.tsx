import {
  getFinancialDataByTags,
  getFinancialRecordsByType,
} from '@/app/(frontend)/actions/financial-chart'
import { FinancialLineChart } from '@/components/charts/financial-line-chart'
import { RecordsTableReadonly } from '@/components/financial/records-table-readonly'

export default async function IncomePage() {
  const chartData = await getFinancialDataByTags('income')
  const { docs: records } = await getFinancialRecordsByType('income', 1, 100)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Income</h1>
        <p className="text-muted-foreground">Detailed view of your income sources.</p>
      </div>

      <FinancialLineChart
        data={chartData}
        title="Income"
        category="income"
        description="Income breakdown by category for the current month"
      />

      <RecordsTableReadonly records={records} title="Latest Income Records" />
    </div>
  )
}
