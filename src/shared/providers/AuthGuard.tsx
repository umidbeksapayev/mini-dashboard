import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'

/**
 * AuthGuard - himoyalangan route'lar uchun
 * Agar foydalanuvchi login qilmagan bo'lsa, /login ga yo'naltiradi
 */
export function AuthGuard() {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
