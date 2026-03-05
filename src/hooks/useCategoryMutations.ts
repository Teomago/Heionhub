import { useMutation } from '@tanstack/react-query'
import { deleteCategory, updateCategory } from '@/app/app/categories/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export function useDeleteCategory() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCategory(id)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Category deleted')
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

// Optional: if we want to use mutation for update (CategoryForm handles it currently via router.refresh)
// But for future or if we move CategoryForm to use mutation:
export function useUpdateCategory() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateCategory(id, data)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Category updated')
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
