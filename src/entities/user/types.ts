export interface User {
  id: number
  name: string
  email: string
  username: string
  phone?: string
  website?: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company?: {
    name: string
  }
}

export interface AuthUser {
  id: number
  name: string
  email: string
  username: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface UpdateProfilePayload {
  name: string
  email: string
}
