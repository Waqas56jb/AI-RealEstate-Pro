import { Link } from 'react-router-dom'
import { Quote, Sparkles } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { photo } from '@/data/images'

/** Split auth shell: form on the left, navy proof panel on the right. */
export function AuthLayout({ title, lead, footer, children }) {
  return (
    <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <Logo className="mb-10 lg:hidden" />

          <h1 className="text-3xl">{title}</h1>
          <p className="mt-2.5 text-muted">{lead}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-muted">{footer}</p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-navy-panel lg:block">
        <img
          src={photo('photo-1600585154340-be6161a56a0c', { w: 1200 })}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="absolute -right-24 top-1/3 size-100 rounded-full bg-accent/25 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between p-14">
          <Logo light />

          <div className="max-w-md">
            <Quote className="size-10 text-accent" />
            <blockquote className="mt-6 font-display text-2xl font-bold leading-snug text-white">
              “My team stopped losing weekend leads overnight. The AI qualifies, we close. Our
              conversion is up 38% on the same ad spend.”
            </blockquote>
            <p className="mt-5 text-sm text-ice-2/60">
              Marcus Adeyemi · Principal, Adeyemi Property
            </p>
          </div>

          <div className="flex items-center gap-6 border-t border-white/10 pt-8 text-sm text-ice-2/55">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              128k listings
            </span>
            <span>96% valuation accuracy</span>
            <Link to="/pricing" className="ml-auto transition-colors hover:text-white">
              See pricing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
