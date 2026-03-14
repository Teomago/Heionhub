import { getPayload } from 'payload'
import config from '@payload-config'
import { Where } from 'payload'

async function purgeTransactions() {
  const isDryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config })
  
  payload.logger.info(`Starting transaction purge... Dry run: ${isDryRun}`)

  try {
    // 1. Fetch all valid member IDs to identify orphaned items
    const members = await payload.find({
      collection: 'members',
      limit: 100000,
      pagination: false,
      depth: 0,
    })
    
    const validMemberIds = members.docs.map((m) => m.id)

    // 2. Identify soft-deleted or orphaned transactions
    const query: Where = {
      or: [
        {
          status: {
            equals: 'deleted',
          },
        },
        {
          owner: {
            not_in: validMemberIds,
          },
        },
      ],
    }

    const { totalDocs } = await payload.find({
      collection: 'transactions',
      where: query,
      limit: 1, // We only need the count for the dry run log
      depth: 0,
    })

    if (totalDocs === 0) {
      payload.logger.info('No transactions found matching the purge criteria.')
      process.exit(0)
    }

    payload.logger.info(`Found ${totalDocs} transaction(s) either marked as deleted or orphaned.`)

    if (isDryRun) {
      payload.logger.info('[DRY RUN] Exiting without deleting any records.')
      process.exit(0)
    }

    // 3. Perform hard deletion
    payload.logger.info('Executing hard delete...')
    await payload.db.deleteMany({
      collection: 'transactions',
      where: query,
    })
    
    payload.logger.info(`Successfully purged ${totalDocs} transaction(s).`)
    process.exit(0)
  } catch (error: any) {
    payload.logger.error(error, 'Error occurred during purge')
    process.exit(1)
  }
}

purgeTransactions()
