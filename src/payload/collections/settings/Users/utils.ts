import type { DefaultValue } from 'payload'

export const setDefaultUserRole: DefaultValue = async ({ req }) => {
  const payload = req.payload
  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  if (userCount === 0) {
    return ['admin']
  }
  return ['user']
}
