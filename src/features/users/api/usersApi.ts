import { axiosInstance } from '@/shared/api/axiosInstance'
import { User } from '@/entities/user/types'

interface GetUsersParams {
  page?: number
  limit?: number
  q?: string
}

interface GetUsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
}

/**
 * Users API
 * JSONPlaceholder API'dan foydalanadi
 */
export const usersApi = {
  getUsers: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const { page = 1, limit = 10, q = '' } = params
    
    // JSONPlaceholder pagination yo'q, shuning uchun clientda pagination qilamiz
    const { data } = await axiosInstance.get<User[]>('/users')
    
    let filteredData = data
    
    // Search filter
    if (q) {
      const searchLower = q.toLowerCase()
      filteredData = data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower)
      )
    }
    
    // Pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedData = filteredData.slice(start, end)
    
    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit,
    }
  },

  getUserById: async (id: number): Promise<User> => {
    const { data } = await axiosInstance.get<User>(`/users/${id}`)
    return data
  },
}
