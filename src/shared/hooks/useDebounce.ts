import { useEffect, useState } from 'react'

/**
 * useDebounce hook - qiymatni delay bilan qaytaradi
 * Searchda foydalanish uchun juda qulay
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
