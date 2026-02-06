import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsersApi, getUserByIdApi, updateUserApi } from '../api/usersApi'
import type { User } from '@/entities/user/model/types'

interface UseUsersQueryParams {
  page?: number
  limit?: number
  q?: string
}

/**
 * Users ro'yxatini olish uchun React Query hook
 * Caching + stale time bilan
 */
export const useUsersQuery = (params: UseUsersQueryParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsersApi(params),
    staleTime: 30000, // 30 sekund davomida fresh deb hisoblanadi
    gcTime: 5 * 60 * 1000, // 5 daqiqa cache'da saqlanadi
  })
}

/**
 * Bitta user detailini olish
 */
export const useUserQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserByIdApi(id!),
    enabled: id !== null, // Faqat id bor bo'lsa fetch qiladi
    staleTime: 30000,
  })
}

/**
 * User update mutation
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUserApi(id, data),
    onSuccess: (updatedUser) => {
      // Cache'ni yangilash
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['user', updatedUser.id], updatedUser)
    },
  })
}
