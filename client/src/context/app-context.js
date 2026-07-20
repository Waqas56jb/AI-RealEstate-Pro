import { createContext, useContext } from 'react'

/**
 * Context object + consumer hook live here (no components) so that
 * AppContext.jsx can export only <AppProvider>, keeping React Fast Refresh
 * happy — a file that exports a component should not also export non-components.
 */
export const AppContext = createContext(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside <AppProvider>')
  return context
}
