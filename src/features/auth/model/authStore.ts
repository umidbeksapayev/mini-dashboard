import { create } from 'zustand'
import { AuthUser } from '@/entities/user/types'

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuth: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  hydrateFromStorage: () => void
}

/**
 * Zustand store - auth state management
 * localStorage bilan integratsiya qilingan
 */
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuth: false,

  login: (token: string, user: AuthUser) => {
    // localStorage'ga saqlash
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
    
    // State'ni yangilash
    set({
      token,
      user,
      isAuth: true,
    })
  },

  logout: () => {
    // localStorage'dan o'chirish
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    
    // State'ni tozalash
    set({
      token: null,
      user: null,
      isAuth: false,
    })
  },

  hydrateFromStorage: () => {
    // App ochilganda localStorage'dan ma'lumotlarni yuklash
    const token = localStorage.getItem('auth_token')
    const userStr = localStorage.getItem('auth_user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser
        set({
          token,
          user,
          isAuth: true,
        })
      } catch (error) {
        // Agar parse qilishda xatolik bo'lsa, tozalash
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
  },
}))
