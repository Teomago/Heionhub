import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => {
      // Admins can read all
      if (user?.collection === 'users') return true

      // Members can read their own AND system tags (no member)
      if (user?.collection === 'members') {
        return {
          or: [
            {
              member: {
                equals: user.id,
              },
            },
            {
              member: {
                exists: false,
              },
            },
          ],
        }
      }

      return false
    },
    create: ({ req: { user } }) => {
      // Admins can create
      if (user?.collection === 'users') return true
      // Members can create
      if (user?.collection === 'members') return true
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'members') {
        return {
          member: {
            equals: user.id,
          },
        }
      }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'members') {
        return {
          member: {
            equals: user.id,
          },
        }
      }
      return false
    },
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === 'create' && req.user?.collection === 'members') {
          // Enforce Limit
          const { payload } = req

          // Fetch global limit
          const siteSettings = await payload.findGlobal({
            slug: 'site-settings',
          })
          const limit = siteSettings.maxTagsPerMember || 30

          // Count existing tags for this member
          const { totalDocs } = await payload.find({
            collection: 'tags',
            where: {
              member: {
                equals: req.user.id,
              },
            },
            limit: 0, // No docs needed, just count
          })

          if (totalDocs >= limit) {
            throw new Error(`You have reached the limit of ${limit} custom tags.`)
          }

          // Ensure member is set to current user if not provided (though safely should be)
          if (!data.member && req.user) {
            data.member = req.user.id
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'color',
      type: 'text', // Changed to text to accept hex values
      admin: {
        description: 'Color for the tag badge (hex value)',
      },
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Food', value: 'food' },
        { label: 'Car', value: 'car' },
        { label: 'Utility', value: 'utility' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Health', value: 'health' },
        { label: 'Education', value: 'education' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Travel', value: 'travel' },
        { label: 'Other', value: 'other' },
        { label: 'Wallet', value: 'wallet' },
        { label: 'Credit', value: 'credit' },
        { label: 'Laptop', value: 'laptop' },
        { label: 'Coffee', value: 'coffee' },
        { label: 'Gift', value: 'gift' },
        { label: 'Pill', value: 'pill' },
        { label: 'Gym', value: 'gym' },
        { label: 'Book', value: 'book' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Bus', value: 'bus' },
        { label: 'Train', value: 'train' },
        { label: 'Bike', value: 'bike' },
        { label: 'Fuel', value: 'fuel' },
        { label: 'Wrench', value: 'wrench' },
        { label: 'Hammer', value: 'hammer' },
        { label: 'Paint', value: 'paint' },
        { label: 'Scissors', value: 'scissors' },
        { label: 'Shirt', value: 'shirt' },
        { label: 'Dollar', value: 'dollar' },
        { label: 'Trending', value: 'trending' },
        { label: 'Piggy', value: 'piggy' },
        { label: 'Coins', value: 'coins' },
        { label: 'Receipt', value: 'receipt' },
        { label: 'Tag', value: 'tag' },
        { label: 'Phone', value: 'phone' },
        { label: 'TV', value: 'tv' },
        { label: 'Game', value: 'game' },
        { label: 'Camera', value: 'camera' },
        { label: 'Headphones', value: 'headphones' },
        { label: 'Watch', value: 'watch' },
        { label: 'Pizza', value: 'pizza' },
        { label: 'Beer', value: 'beer' },
        { label: 'Wine', value: 'wine' },
        { label: 'Ice Cream', value: 'icecream' },
        { label: 'Cake', value: 'cake' },
        { label: 'Apple', value: 'apple' },
        { label: 'Carrot', value: 'carrot' },
        { label: 'Fish', value: 'fish' },
        { label: 'Egg', value: 'egg' },
        { label: 'Soup', value: 'soup' },
        { label: 'Candy', value: 'candy' },
        { label: 'Popcorn', value: 'popcorn' },
        { label: 'Cookie', value: 'cookie' },
        { label: 'Donut', value: 'donut' },
        { label: 'Croissant', value: 'croissant' },
        { label: 'Rain', value: 'rain' },
        { label: 'Sun', value: 'sun' },
        { label: 'Moon', value: 'moon' },
        { label: 'Star', value: 'star' },
        { label: 'Sparkles', value: 'sparkles' },
        { label: 'Trophy', value: 'trophy' },
        { label: 'Award', value: 'award' },
        { label: 'Medal', value: 'medal' },
      ],
      admin: {
        description: 'Optional icon for the tag.',
      },
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: false, // Optional means "System Tag"
      index: true,
      admin: {
        description: 'Owner of the tag. Leave empty for System Tag (visible to all).',
        // Determine how to handle this field visibility for members?
        // Ideally members shouldn't see/edit this, simpler to just set it via hook?
        // Payload doesn't easily hide fields conditionally by user type in the schema definition without separate configs,
        // but we can set access.read to false for members if we want, or just leave it.
      },
      access: {
        create: () => false, // Members cannot manually set this field (handled by hook usually, or hidden)
        update: () => false,
        read: ({ req: { user } }) => user?.collection === 'users', // Only admins see who owns it
      },
    },
  ],
}
