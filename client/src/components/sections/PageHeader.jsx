import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Badge'

/** Compact navy banner shared by every inner page. */
export function PageHeader({ eyebrow, title, lead, breadcrumb = [], children }) {
  return (
    <section className="relative overflow-hidden bg-navy-panel text-white">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 size-100 rounded-full bg-brand/30 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-col items-start gap-5 py-14 sm:py-18">
          {breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ice-2/55">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              {breadcrumb.map((crumb) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}

          <h1 className="max-w-3xl text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h1>

          {lead && <p className="max-w-2xl text-lg leading-relaxed text-ice-2/70">{lead}</p>}

          {children}
        </div>
      </Container>
    </section>
  )
}
