import { useEffect, useState } from 'react'

export const useDebouncedValue = <T>(value: T, interval = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, interval)

    return () => {
      clearTimeout(timeout)
    }
  }, [interval, value])

  return debouncedValue
}
