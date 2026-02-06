import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Bu yerda real API base URL qo'yiladi
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: har bir requestga token qo'shadi
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor: 401 error bo'lsa tokenni o'chiradi va logout qiladi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token invalid yoki expired
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      
      // Login sahifasiga redirect (bu yerda router history yo'q, shuning uchun window.location ishlatamiz)
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)
