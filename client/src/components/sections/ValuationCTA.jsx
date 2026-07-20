import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Section'
import { photo } from '@/data/images'
import { formatPrice } from '@/utils/format'

const points = [
  'Price band with the comparables attached',
  'Twelve-month forecast for your postcode',
  'No agent call unless you ask for one',
]

export function ValuationCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-line bg-ice p-8 shadow-soft sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>Free · 3 seconds · No signup</Eyebrow>
              <h2 className="text-3xl sm:text-4xl">
                What is your home
                <br />
                actually worth today?
              </h2>
              <p className="text-lg leading-relaxed text-muted">
                Twelve million transactions behind every estimate. You get the number, the band
                around it, and the sales that produced it — not a lead-capture form.
              </p>

              <ul className="flex flex-col gap-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-muted">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    {point}
                  </li>
                ))}
              </ul>

              <Button to="/valuation" size="lg">
                Get my valuation
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="relative">
              <img
                src={photo('photo-1600585154340-be6161a56a0c', { w: 900 })}
                alt="A modern home exterior at golden hour"
                loading="lazy"
                className="aspect-4/3 w-full rounded-2xl object-cover shadow-card"
              />

              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-white p-5 shadow-lift sm:left-auto sm:right-6 sm:w-64">
                <p className="label-mono text-muted-2">Estimated value</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-ink">
                  {formatPrice(1_284_000)}
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-line">
                  <div className="h-full w-[94%] rounded-pill bg-linear-100 from-brand-light to-accent" />
                </div>
                <p className="mt-2 text-xs text-muted-2">94% confidence · ±6.2% band</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
