import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Play, Search, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { photo } from '@/data/images'

const ROTATING = ['answered by AI', 'priced in seconds', 'matched to you', 'never missed']

const HERO_STATS = [
  { value: '128k+', label: 'Listings indexed' },
  { value: '2.4s', label: 'Median AI reply' },
  { value: '96%', label: 'Valuation accuracy' },
  { value: '41k', label: 'Deals closed' },
]

export function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING.length), 3800)
    return () => clearInterval(timer)
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    navigate(`/listings?query=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* ---------- Full-bleed background ---------- */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.img
          src={photo('photo-1613977257363-707ba9348227', { w: 2400, q: 85 })}
          alt=""
          fetchPriority="high"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: 'easeOut' }}
          className="size-full object-cover"
        />
        {/* Layered scrims: vertical for text contrast, radial to focus the centre */}
        <div className="absolute inset-0 bg-linear-to-b from-navy/85 via-navy/70 to-navy/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,22,52,0.55)_100%)]" />
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>

      {/* Colour glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 size-125 rounded-full bg-brand/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 size-100 rounded-full bg-accent/20 blur-[140px]"
        aria-hidden="true"
      />

      {/* ---------- Centred content (fills the space above the stats rail) ---------- */}
      <Container className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-8 pt-24 text-center sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col items-center"
        >
          <span className="label-mono inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/8 px-4 py-1.5 text-ice-2 backdrop-blur-md">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3 fill-accent text-accent" />
              ))}
            </span>
            Rated 4.9 by 2,400+ agents
          </span>

          <h1 className="mt-6 text-4xl leading-[1.06] text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            Every property enquiry,
            <br />
            {/* Six-stop gradient at 220% width, drifting on a 7s loop */}
            <span className="text-gradient-drift">{ROTATING[wordIndex]}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ice-2/75 sm:text-lg">
            Estatly values any home in three seconds, learns what your buyers want, and answers them
            on WhatsApp, Instagram and voice — at 2am, in their language, from live listing data.
          </p>

          {/* ---------- Search ---------- */}
          <form onSubmit={onSubmit} className="mt-7 w-full max-w-xl">
            <div className="flex flex-col gap-2 rounded-3xl border border-white/18 bg-white/10 p-2 shadow-lift backdrop-blur-2xl sm:flex-row sm:rounded-pill">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ice-2/55" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="City, neighbourhood, or describe your ideal home"
                  aria-label="Search properties"
                  className="h-12 w-full rounded-pill bg-transparent pl-13 pr-4 text-white placeholder:text-ice-2/50 focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 shrink-0 sm:px-8">
                <Search className="size-4.5" />
                Search
              </Button>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
              <span className="label-mono text-ice-2/45">Popular</span>
              {['Waterfront villas', 'Under $1M', 'New builds', 'High yield'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => navigate(`/listings?query=${encodeURIComponent(chip)}`)}
                  className="rounded-pill border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-ice-2/70 transition-all hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  {chip}
                </button>
              ))}
            </div>
          </form>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button to="/valuation" variant="navy" size="lg">
              Value my home free
              <ArrowRight className="size-4" />
            </Button>
            <Button to="/listings" variant="outlineLight" size="lg">
              <Play className="size-4" />
              Browse 128,000 listings
            </Button>
          </div>
        </motion.div>
      </Container>

      {/* ---------- Bottom stats rail (in flow, flush to the fold) ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <Container className="px-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-b-0 border-white/12 bg-white/8 backdrop-blur-2xl lg:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-0.5 bg-navy/20 px-4 py-4 text-center transition-colors hover:bg-white/5"
              >
                <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="label-mono text-ice-2/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </section>
  )
}
