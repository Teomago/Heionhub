import {
  getFinancialDataByTags,
  getFinancialRecordsByType,
} from '@/app/(frontend)/actions/financial-chart'
import { FinancialLineChart } from '@/components/charts/financial-line-chart'
import { RecordsTableReadonly } from '@/components/financial/records-table-readonly'

export default async function ExpensesPage() {
  const chartData = await getFinancialDataByTags('expense')
  const { docs: records } = await getFinancialRecordsByType('expense', 1, 100)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">Detailed view of your expenditures.</p>
      </div>

      <FinancialLineChart
        data={chartData}
        title="Expenses"
        category="expense"
        description="Expense breakdown by category for the current month"
      />

      <RecordsTableReadonly records={records} title="Latest Expense Records" />
    </div>
  )
}
