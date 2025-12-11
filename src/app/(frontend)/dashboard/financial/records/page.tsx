import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'
import FinancialRecordsClientPage from './records-client'

export default async function FinancialRecordsPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-member-token')?.value

  if (!token) {
    return <div>Access Denied - Please log in</div>
  }

  const { user } = await payload.auth({
    headers: new Headers({
      Authorization: `JWT ${token}`,
    }),
  })

  if (!user) {
    return <div>Access Denied - Please log in</div>
  }

  // Fetch records with depth to populate tags
  const { docs: records } = await payload.find({
    collection: 'financial-records',
    where: {
      member: {
        equals: user.id,
      },
    },
    depth: 2, // Populate Tags and Member
    limit: 100,
    sort: '-date',
  })

  console.log('Fetched records:', records.length) // Debug log

  return <FinancialRecordsClientPage initialRecords={records} />
}
