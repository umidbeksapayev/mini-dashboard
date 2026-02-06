import { UpdateProfilePayload, AuthUser } from '@/entities/user/types'

/**
 * Settings API - fake implementation
 * Real loyihada backend'ga so'rov yuboriladi
 */
export const settingsApi = {
  updateProfile: async (payload: UpdateProfilePayload): Promise<AuthUser> => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Bu yerda real API'ga so'rov yuboriladi
    // const { data } = await axiosInstance.put('/profile', payload)

    // Fake response
    return {
      id: 1,
      name: payload.name,
      email: payload.email,
      username: payload.email.split('@')[0],
    }
  },
}
