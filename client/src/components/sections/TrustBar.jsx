import { Container } from '@/components/ui/Container'
import { partners } from '@/data/site'

/** Duplicated track gives a seamless -50% marquee loop. */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-white py-8">
      <Container>
        <p className="label-mono mb-6 text-center text-muted-2">
          Trusted by teams at
        </p>
      </Container>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-24 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-24 bg-linear-to-l from-white to-transparent" />

        <div className="flex w-max animate-[var(--animate-marquee)] gap-16 pr-16">
          {[...partners, ...partners].map((partner, index) => (
            <span
              key={`${partner}-${index}`}
              aria-hidden={index >= partners.length}
              className="whitespace-nowrap font-display text-xl font-bold text-muted-2/70 transition-colors hover:text-brand"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
