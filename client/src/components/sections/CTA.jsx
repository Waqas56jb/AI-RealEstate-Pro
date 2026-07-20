import { ArrowRight, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Section'

export function CTA() {
  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-panel px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div
              className="absolute -right-24 -top-24 size-100 rounded-full bg-accent/25 blur-[120px]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 size-100 rounded-full bg-brand/35 blur-[120px]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-7">
              <h2 className="max-w-2xl text-3xl text-white sm:text-4xl lg:text-5xl">
                Stop losing the lead that messaged at{' '}
                <span className="text-gradient-drift">2am</span>
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-ice-2/70">
                Fourteen days free, no card. Connect one channel and watch the first week of
                after-hours enquiries get answered.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button to="/register" variant="navy" size="lg">
                  Start free trial
                  <ArrowRight className="size-4" />
                </Button>
                <Button to="/contact" variant="outlineLight" size="lg">
                  <MessageCircle className="size-4" />
                  Talk to sales
                </Button>
              </div>

              <p className="label-mono text-ice-2/45">
                No card required · Cancel anytime · Live in under a day
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
