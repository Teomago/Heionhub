'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function createTag(data: { name: string; icon?: string; color?: string }) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Create tag - the beforeChange hook will handle limit enforcement
    // Filter out 'none' or empty values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: any = {
      name: data.name,
      member: user.id,
    }
    if (data.icon && data.icon !== 'none') {
      cleanData.icon = data.icon
    }
    if (data.color && data.color !== 'none') {
      cleanData.color = data.color
    }

    const tag = await payload.create({
      collection: 'tags',
      data: cleanData,
    })

    return { success: true, tag }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create tag'
    return { success: false, error: message }
  }
}

export async function deleteTag(tagId: string) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Verify ownership
    const tag = await payload.findByID({
      collection: 'tags',
      id: tagId,
    })

    if (!tag) {
      return { success: false, error: 'Tag not found' }
    }

    // Check if user owns this tag (system tags have no member)
    const memberId = typeof tag.member === 'string' ? tag.member : tag.member?.id
    if (!memberId || memberId !== user.id) {
      return { success: false, error: 'Cannot delete system tags or tags owned by others' }
    }

    // Delete the tag
    await payload.delete({
      collection: 'tags',
      id: tagId,
    })

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete tag'
    return { success: false, error: message }
  }
}

export async function updateTag(
  tagId: string,
  data: { name?: string; icon?: string; color?: string },
) {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated' }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // Verify ownership
    const tag = await payload.findByID({
      collection: 'tags',
      id: tagId,
    })

    if (!tag) {
      return { success: false, error: 'Tag not found' }
    }

    const memberId = typeof tag.member === 'string' ? tag.member : tag.member?.id
    if (!memberId || memberId !== user.id) {
      return { success: false, error: 'Cannot edit system tags or tags owned by others' }
    }

    // Filter out 'none' values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cleanData: any = {}
    if (data.name) cleanData.name = data.name
    if (data.icon && data.icon !== 'none') cleanData.icon = data.icon
    else if (data.icon === 'none') cleanData.icon = null
    if (data.color && data.color !== 'none') cleanData.color = data.color
    else if (data.color === 'none') cleanData.color = null

    const updated = await payload.update({
      collection: 'tags',
      id: tagId,
      data: cleanData,
    })

    return { success: true, tag: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update tag'
    return { success: false, error: message }
  }
}

export async function getTags() {
  try {
    const payload = await getPayload({ config })
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-member-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', tags: [], limit: 30, count: 0 }
    }

    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    })

    if (!user) {
      return { success: false, error: 'Not authenticated', tags: [], limit: 30, count: 0 }
    }

    // Fetch site settings for limit
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })
    const limit = siteSettings.maxTagsPerMember || 30

    // Fetch all available tags (system + user's)
    const { docs: allTags } = await payload.find({
      collection: 'tags',
      where: {
        or: [{ member: { equals: user.id } }, { member: { exists: false } }],
      },
      limit: 1000,
    })

    // Count user's tags
    const { totalDocs: userTagCount } = await payload.find({
      collection: 'tags',
      where: {
        member: { equals: user.id },
      },
      limit: 0,
    })

    return {
      success: true,
      tags: allTags,
      limit,
      count: userTagCount,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch tags'
    return {
      success: false,
      error: message,
      tags: [],
      limit: 30,
      count: 0,
    }
  }
}
