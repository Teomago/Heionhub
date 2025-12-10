import type { GlobalConfig } from 'payload'

export const Invitations: GlobalConfig = {
  slug: 'invitations',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue:
        'We would like everyone to be in our home, but we do not have that much of an space',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'If you have an invitation code, please put it here',
    },
    {
      name: 'mockPhrase',
      type: 'text',
      required: true,
      defaultValue:
        "So, you dare and try to enter this place without an invitation? I'll tell your mom how bad of a person you're",
    },
  ],
}
