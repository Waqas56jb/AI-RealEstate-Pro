import { lazy } from 'react'

/**
 * Single route table. Every page is code-split — the marketing home page
 * should not ship the dashboard's tables.
 */
export const routes = [
  { path: '/', Component: lazy(() => import('@/pages/Home')) },
  { path: '/listings', Component: lazy(() => import('@/pages/Listings')) },
  { path: '/property/:slug', Component: lazy(() => import('@/pages/PropertyDetail')) },
  { path: '/valuation', Component: lazy(() => import('@/pages/Valuation')) },
  { path: '/agents', Component: lazy(() => import('@/pages/Agents')) },
  { path: '/pricing', Component: lazy(() => import('@/pages/Pricing')) },
  { path: '/about', Component: lazy(() => import('@/pages/About')) },
  { path: '/contact', Component: lazy(() => import('@/pages/Contact')) },
  { path: '/login', Component: lazy(() => import('@/pages/Login')) },
  { path: '/register', Component: lazy(() => import('@/pages/Register')) },
  { path: '/dashboard', Component: lazy(() => import('@/pages/Dashboard')) },
  { path: '*', Component: lazy(() => import('@/pages/NotFound')) },
]
