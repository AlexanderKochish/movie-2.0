import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeId = setTimeout(() => setDebounceValue(value), delay)

    return () => {
      clearTimeout(timeId)
    }
  }, [value, delay])

  return { debounceValue }
}
