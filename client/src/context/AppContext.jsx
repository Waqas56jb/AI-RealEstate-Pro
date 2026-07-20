import { useCallback, useMemo, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { AppContext } from './app-context'

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('estatly.favorites', [])
  const [compare, setCompare] = useLocalStorage('estatly.compare', [])
  const [user, setUser] = useLocalStorage('estatly.user', null)
  const [toast, setToast] = useState(null)

  const notify = useCallback((message, tone = 'default') => {
    setToast({ message, tone, id: `${message}-${tone}` })
    window.clearTimeout(notify._timer)
    notify._timer = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        notify(prev.includes(id) ? 'Removed from saved' : 'Saved to your shortlist')
        return next
      })
    },
    [setFavorites, notify],
  )

  const toggleCompare = useCallback(
    (id) => {
      setCompare((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id)
        if (prev.length >= 3) {
          notify('You can compare up to 3 homes', 'warn')
          return prev
        }
        notify('Added to compare')
        return [...prev, id]
      })
    },
    [setCompare, notify],
  )

  // Front-end-only session stub. Swap for the real /api/auth/login response.
  const login = useCallback(
    (profile) => {
      setUser({ name: profile.name ?? profile.email.split('@')[0], email: profile.email })
      notify('Welcome back')
    },
    [setUser, notify],
  )

  const logout = useCallback(() => {
    setUser(null)
    notify('Signed out')
  }, [setUser, notify])

  const value = useMemo(
    () => ({
      favorites,
      compare,
      user,
      toast,
      notify,
      toggleFavorite,
      toggleCompare,
      login,
      logout,
      isFavorite: (id) => favorites.includes(id),
      isComparing: (id) => compare.includes(id),
    }),
    [favorites, compare, user, toast, notify, toggleFavorite, toggleCompare, login, logout],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
