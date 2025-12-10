import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Eterhub',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'Organization for everyone',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: "Let's Go",
    },
  ],
}
