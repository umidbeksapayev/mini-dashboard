import { QueryClient } from '@tanstack/react-query'

/**
 * React Query client - global configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Failed query'larni 1 marta retry qiladi
      refetchOnWindowFocus: false, // Window focus bo'lganda refetch qilmaydi
      staleTime: 30 * 1000, // 30 soniya davomida ma'lumot fresh hisoblanadi
    },
  },
})
