import { axiosInstance } from '@/shared/api/axiosInstance'
import { AuthResponse, LoginCredentials } from '@/entities/user/types'

/**
 * Login API - fake implementation
 * Real loyihada backend'dan token qaytadi
 */
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // JSONPlaceholder API'da login endpoint yo'q, shuning uchun fake qilamiz
    // Real loyihada:
    // const { data } = await axiosInstance.post('/auth/login', credentials)
    
    // Validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email va parol majburiy')
    }

    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Fake response - har qanday email/password bilan kirish mumkin
    return {
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        username: credentials.email.split('@')[0],
      },
    }
  },

  register: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Bu ham fake
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      token: 'fake-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        username: credentials.email.split('@')[0],
      },
    }
  },
}
