import { LoginForm } from '@/features/auth/ui/LoginForm'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/shared/hooks/useAuth'

export function AuthPage() {
  const { isAuth } = useAuth()

  // Agar allaqachon login qilgan bo'lsa, dashboard'ga redirect
  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm />
    </div>
  )
}
