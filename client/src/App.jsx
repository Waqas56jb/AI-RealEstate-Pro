import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { Layout } from '@/components/layout/Layout'
import { routes } from '@/routes'

/** Shown while a lazy route chunk loads. Kept minimal to avoid layout shift. */
function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="size-8 animate-spin rounded-full border-3 border-line border-t-brand" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
