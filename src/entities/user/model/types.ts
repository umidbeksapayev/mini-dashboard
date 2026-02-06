export interface User {
  id: number
  email: string
  name: string
  username: string
  phone?: string
  website?: string
  address?: {
    street: string
    city: string
  }
}

export interface AuthUser {
  id: number
  email: string
  name: string
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
}
