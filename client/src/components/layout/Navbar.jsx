import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, LayoutDashboard, Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { navLinks } from '@/data/site'
import { useApp } from '@/context/app-context'
import { useScrolled } from '@/hooks/useScrolled'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(40)
  const { pathname } = useLocation()
  const { favorites, user } = useApp()

  useLockBodyScroll(open)

  // The home hero is dark and full-bleed, so the bar floats transparent over it
  // until you scroll. Every other page has a light top, so it stays solid there.
  const overHero = pathname === '/' && !scrolled && !open
  const solid = !overHero

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-soft)]',
        solid
          ? 'border-b border-line bg-white/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <nav className="flex h-18 items-center justify-between gap-6">
          <Logo light={overHero} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.to.split('?')[0]
              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={cn(
                      'rounded-pill px-4 py-2 text-sm font-semibold transition-colors',
                      active
                        ? overHero
                          ? 'bg-white/15 text-white'
                          : 'bg-brand-soft text-brand'
                        : overHero
                          ? 'text-ice-2/80 hover:bg-white/10 hover:text-white'
                          : 'text-muted hover:bg-brand-soft hover:text-brand',
                    )}
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <NavLink
              to="/dashboard?tab=saved"
              aria-label="Saved homes"
              className={cn(
                'relative hidden size-10 place-items-center rounded-full transition-colors sm:grid',
                overHero
                  ? 'text-ice-2/80 hover:bg-white/10 hover:text-white'
                  : 'text-muted hover:bg-brand-soft hover:text-brand',
              )}
            >
              <Heart className="size-4.5" />
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4.5 place-items-center rounded-full bg-accent text-[10px] font-bold text-navy">
                  {favorites.length}
                </span>
              )}
            </NavLink>

            {user ? (
              <Button
                to="/dashboard"
                variant={overHero ? 'outlineLight' : 'secondary'}
                size="sm"
                className="hidden sm:inline-flex"
              >
                <LayoutDashboard className="size-4" />
                {user.name}
              </Button>
            ) : (
              <Button
                to="/login"
                variant="ghost"
                size="sm"
                className={cn('hidden sm:inline-flex', overHero && 'text-white hover:bg-white/10')}
              >
                Sign in
              </Button>
            )}

            <Button to="/valuation" variant={overHero ? 'navy' : 'primary'} size="sm" className="hidden sm:inline-flex">
              Free valuation
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={cn(
                'grid size-10 place-items-center rounded-full transition-colors lg:hidden',
                overHero ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-brand-soft hover:text-brand',
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}

function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border-t border-line bg-white lg:hidden"
    >
      <Container className="flex flex-col gap-1 py-5">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            onClick={onClose}
            className="rounded-xl px-4 py-3 font-display text-lg font-bold text-ink transition-colors hover:bg-brand-soft hover:text-brand"
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
          <Button to="/login" variant="secondary" onClick={onClose}>
            Sign in
          </Button>
          <Button to="/valuation" onClick={onClose}>
            Free valuation
          </Button>
        </div>
      </Container>
    </motion.div>
  )
}
