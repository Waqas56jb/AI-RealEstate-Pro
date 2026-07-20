import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { InstagramIcon, LinkedInIcon, XIcon } from '@/components/ui/BrandIcons'
import { footerNav, site } from '@/data/site'

const socials = [
  { icon: XIcon, label: 'X', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
]

const badges = ['SOC 2 Type II', 'GDPR', 'ISO 27001']

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-panel text-white">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -left-40 top-0 size-125 rounded-full bg-brand/25 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 top-1/2 size-100 rounded-full bg-accent/15 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* -------------------- Newsletter band -------------------- */}
        <div className="flex flex-col items-center gap-6 border-b border-white/10 py-14 text-center">
          <span className="label-mono inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-accent">
            <Sparkles className="size-3.5" />
            The weekly market brief
          </span>
          <h2 className="max-w-2xl text-3xl text-white sm:text-4xl">
            Prices, yields, and what the model is seeing
          </h2>
          <p className="max-w-lg text-ice-2/65">
            One email, Thursday mornings. No fluff — just the numbers that moved and why.
          </p>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-12 w-full rounded-pill border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-ice-2/40 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
            />
            <Button type="submit" variant="navy" className="h-12 shrink-0">
              Subscribe
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>

        {/* -------------------- Link columns -------------------- */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-6">
            <Logo light />
            <p className="max-w-sm text-ice-2/70">
              The AI real estate platform. Instant valuations, listings that learn what you want,
              and every enquiry answered in seconds — on whatever channel your buyer uses.
            </p>

            <div className="flex flex-col gap-2.5 text-sm text-ice-2/70">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-accent" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-accent" />
                {site.phone}
              </a>
              <span className="inline-flex items-center gap-2.5">
                <MapPin className="size-4 text-accent" />
                {site.address}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-ice-2/70 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h3 className="label-mono text-accent">{group.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-ice-2/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------- Compliance badges -------------------- */}
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 py-6">
          <span className="label-mono text-ice-2/45">Trusted &amp; compliant</span>
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-pill border border-white/12 px-3 py-1.5 text-xs font-semibold text-ice-2/70"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* -------------------- Bottom bar -------------------- */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-ice-2/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link to="/about" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link to="/about" className="transition-colors hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark watermark */}
      <div
        className="pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <p className="translate-y-[0.22em] bg-linear-to-b from-white/8 to-transparent bg-clip-text text-center font-display text-[22vw] font-extrabold leading-none text-transparent">
          {site.name}
        </p>
      </div>
    </footer>
  )
}
