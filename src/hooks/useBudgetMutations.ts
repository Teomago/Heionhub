import { useMutation } from '@tanstack/react-query'
import { deleteBudget, toggleBudgetLock } from '@/app/[locale]/app/budget/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export function useDeleteBudget() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteBudget(id)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Budget deleted')
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useToggleBudgetLock() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, locked }: { id: string; locked: boolean }) => {
      const res = await toggleBudgetLock(id, locked)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Budget updated')
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
