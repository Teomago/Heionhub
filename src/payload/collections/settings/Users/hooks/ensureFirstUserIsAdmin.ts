import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    const { totalDocs: userCount } = await req.payload.count({ collection: 'users' })

    if (userCount === 0 && !(value || []).includes('admin')) {
      return [...(value || []), 'admin']
    }
  }
}
