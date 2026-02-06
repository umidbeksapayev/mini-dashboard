import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { User } from '@/entities/user/types'

interface UseUsersQueryParams {
  page: number
  limit?: number
  q?: string
}

interface UsersQueryData {
  data: User[]
  total: number
  page: number
  limit: number
}

/**
 * useUsersQuery - foydalanuvchilar ro'yxatini olish uchun hook
 * React Query bilan caching va automatic refetching
 */
export function useUsersQuery(
  params: UseUsersQueryParams
): UseQueryResult<UsersQueryData> {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 30 * 1000, // 30 soniya davomida ma'lumot fresh hisoblanadi
    gcTime: 5 * 60 * 1000, // 5 daqiqa cache'da saqlanadi (eski cacheTime)
  })
}

/**
 * useUserQuery - bitta foydalanuvchi ma'lumotini olish uchun hook
 */
export function useUserQuery(id: number): UseQueryResult<User> {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getUserById(id),
    staleTime: 30 * 1000,
    enabled: !!id, // id bo'lsa fetch qiladi
  })
}
