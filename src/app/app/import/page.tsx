import { ImportClient } from './components/ImportClient'
import { tourSteps } from '@/lib/tour-constants'
import { getPayload } from '@/lib/payload/getPayload'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Import Transactions | EtherHub Finance',
  description: 'Bulk import your transactions via CSV.',
}

export default async function ImportPage() {
  const payload = await getPayload()
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  let tutorialUrl = 'https://www.youtube.com/watch?v=10XdeMVqK6Q'
  let hasCompletedImportTour = false

  if (user && 'hasCompletedImportTour' in user) {
    hasCompletedImportTour = user.hasCompletedImportTour as boolean
  }

  try {
    const settings = await payload.findGlobal({
      slug: 'import-settings' as any,
    })
    if (settings && typeof settings === 'object' && 'tutorialUrl' in settings) {
      tutorialUrl = settings.tutorialUrl as string
    }
  } catch (error) {
    console.error('Failed to fetch import settings payload global', error)
  }

  return (
    <div className="flex flex-col gap-6" data-tour-step-id={tourSteps.importTutorial}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bulk Import</h1>
        <p className="text-muted-foreground">
          Upload a CSV file to import multiple past transactions instantly.
        </p>
      </div>

      <ImportClient tutorialUrl={tutorialUrl} hasCompletedImportTour={hasCompletedImportTour} />
    </div>
  )
}
