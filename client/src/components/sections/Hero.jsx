import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin, Play, Search, Sparkles, Star } from 'lucide-react'
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
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* ---------- Full-bleed background ---------- */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.img
          src={photo('photo-1613977257363-707ba9348227', { w: 2400, q: 85 })}
          alt=""
          fetchPriority="high"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: 'easeOut' }}
          className="size-full object-cover"
        />
        {/* Layered scrims: vertical for text contrast, radial to focus the centre */}
        <div className="absolute inset-0 bg-linear-to-b from-navy/85 via-navy/70 to-navy/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,22,52,0.55)_100%)]" />
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>

      {/* Colour glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 size-150 rounded-full bg-brand/25 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 size-125 rounded-full bg-accent/20 blur-[150px]"
        aria-hidden="true"
      />

      {/* ---------- Centred content ---------- */}
      <Container className="relative z-10 pb-40 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <span className="label-mono inline-flex items-center gap-2.5 rounded-pill border border-white/15 bg-white/8 px-4 py-2 text-ice-2 backdrop-blur-md">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3 fill-accent text-accent" />
              ))}
            </span>
            Rated 4.9 by 2,400+ agents
          </span>

          <h1 className="mt-8 text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Every property enquiry,
            <br />
            {/* Six-stop gradient at 220% width, drifting on a 7s loop */}
            <span className="text-gradient-drift">{ROTATING[wordIndex]}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ice-2/75 sm:text-xl">
            Estatly values any home in three seconds, learns what your buyers actually want, and
            answers them on WhatsApp, Instagram and voice — at 2am, in their language, from live
            listing data.
          </p>

          {/* ---------- Search ---------- */}
          <form onSubmit={onSubmit} className="mt-10 w-full max-w-2xl">
            <div className="flex flex-col gap-2 rounded-3xl border border-white/18 bg-white/10 p-2 shadow-lift backdrop-blur-2xl sm:flex-row sm:rounded-pill">
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-ice-2/55" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="City, neighbourhood, or describe your ideal home"
                  aria-label="Search properties"
                  className="h-14 w-full rounded-pill bg-transparent pl-13 pr-4 text-white placeholder:text-ice-2/50 focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 shrink-0 sm:px-8">
                <Search className="size-4.5" />
                Search
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
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

          <div className="mt-10 flex flex-wrap justify-center gap-3">
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

      {/* ---------- Bottom stats rail ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-b-0 border-white/12 bg-white/8 backdrop-blur-2xl lg:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-navy/20 px-4 py-6 text-center transition-colors hover:bg-white/5"
              >
                <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="label-mono text-ice-2/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* ---------- Scroll cue ---------- */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-36 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <span className="grid size-10 place-items-center rounded-full border border-white/20 text-ice-2/60 backdrop-blur-md">
          <ChevronDown className="size-4" />
        </span>
      </motion.div>

      {/* Floating proof chip — kept off small screens so it never crowds the copy */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-10 top-32 z-10 hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-2xl xl:block"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-whatsapp/20">
            <span className="size-2.5 animate-pulse rounded-full bg-whatsapp" />
          </span>
          <div className="text-left">
            <p className="text-xs font-bold text-white">New WhatsApp lead</p>
            <p className="text-[11px] text-ice-2/60">Answered in 2.4s</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        className="absolute left-10 top-1/2 z-10 hidden rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur-2xl xl:block"
      >
        <p className="label-mono inline-flex items-center gap-1.5 text-accent">
          <Sparkles className="size-3" />
          AI match
        </p>
        <p className="mt-1 font-display text-3xl font-extrabold text-white">96%</p>
        <p className="text-[11px] text-ice-2/60">Azure Cliff Residence</p>
      </motion.div>
    </section>
  )
}
