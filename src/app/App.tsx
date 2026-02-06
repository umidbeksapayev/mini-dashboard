import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/shared/providers/QueryProvider'
import { useAuthStore } from '@/features/auth/model/authStore'
import { router } from './router'

function App() {
  const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage)

  // App ochilganda localStorage'dan auth ma'lumotlarini yuklash
  useEffect(() => {
    hydrateFromStorage()
  }, [hydrateFromStorage])

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
