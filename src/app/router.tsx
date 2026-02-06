import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { AuthGuard } from '@/shared/providers/AuthGuard'
import { OverviewPage } from '@/pages/OverviewPage'
import { UsersPage } from '@/pages/UsersPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AuthPage } from '@/pages/AuthPage'

/**
 * React Router configuration
 * Protected routes AuthGuard bilan himoyalangan
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    element: <AuthGuard />, // Bu yerdan o'tish uchun auth kerak
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <OverviewPage />,
          },
          {
            path: '/users',
            element: <UsersPage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
