import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Toast } from '@/components/ui/Toast'
import { ConciergeWidget } from '@/components/sections/ConciergeWidget'
import { cn } from '@/utils/cn'

/** Resets scroll on navigation — routers do not do this for you. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  // Home hero is full-bleed and sits under the transparent navbar. Every other
  // route needs the navbar's height as top padding so nothing hides beneath it.
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className={cn('flex-1', !isHome && 'pt-18')}>
        <Outlet />
      </main>
      <Footer />
      <ConciergeWidget />
      <Toast />
    </div>
  )
}
