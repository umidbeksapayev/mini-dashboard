import { useAuthStore } from '@/features/auth/model/authStore'

/**
 * useAuth - auth store'dan ma'lumotlarni olish uchun helper hook
 */
export function useAuth() {
  const { isAuth, user, token, login, logout } = useAuthStore()
  
  return {
    isAuth,
    user,
    token,
    login,
    logout,
  }
}
