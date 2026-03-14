import { useMutation } from '@tanstack/react-query'
import { deleteAccount, updateAccount } from '@/app/[locale]/app/accounts/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export function useDeleteAccount() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteAccount(id)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Account deleted')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateAccount() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await updateAccount(id, data)
      if (res?.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      toast.success('Account updated')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      router.refresh()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
