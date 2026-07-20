import { useCallback, useEffect, useState } from 'react'

/** useState mirrored into localStorage, tolerant of quota/parse failures. */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored))
    } catch {
      // Private mode or quota exceeded — state still works in memory.
    }
  }, [key, stored])

  const set = useCallback((value) => {
    setStored((prev) => (typeof value === 'function' ? value(prev) : value))
  }, [])

  return [stored, set]
}
