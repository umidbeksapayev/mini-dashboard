export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  users: {
    list: '/users',
    byId: (id: number) => `/users/${id}`,
  },
  profile: {
    update: '/profile',
  },
} as const
