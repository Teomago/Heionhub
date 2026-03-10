'use server'

import { assertUser } from '@/lib/auth/assertUser'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().min(2),
  type: z.enum(['income', 'expense', 'transfer']),
  icon: z.string().optional(),
  color: z.string().optional(),
})

export async function createCategory(data: z.infer<typeof createCategorySchema>) {
  const { user, payload } = await assertUser()

  try {
    await payload.create({
      collection: 'categories',
      data: {
        name: data.name,
        type: data.type,
        icon: data.icon,
        color: data.color,
        owner: user.id,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to create category' }
  }

  return { success: true }
}

export async function updateCategory(
  id: string,
  data: Partial<z.infer<typeof createCategorySchema>>,
) {
  const { user, payload } = await assertUser()

  try {
    await payload.update({
      collection: 'categories',
      id,
      data: {
        name: data.name,
        type: data.type,
        icon: data.icon,
        color: data.color,
      },
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to update category' }
  }

  return { success: true }
}

export async function deleteCategory(id: string) {
  const { user, payload } = await assertUser()

  try {
    await payload.delete({
      collection: 'categories',
      id,
    })
  } catch (error) {
    console.error(error)
    return { error: 'Failed to delete category' }
  }

  return { success: true }
}
