import { useEffect, useState } from 'react'

type SetValue<T> = (value: T | ((val: T) => T)) => void

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const isClient = typeof window !== 'undefined'

  const getInitialValue = (): T => {
    if (isClient) {
      try {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
      } catch (error) {
        console.error('Error retrieving value from localStorage:', error)
      }
    }
    return initialValue
  }

  const [value, setValue] = useState<T>(getInitialValue)

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error setting value in localStorage:', error)
      }
    }
  }, [isClient, key, value])

  return [value, setValue]
}

export default useLocalStorage
