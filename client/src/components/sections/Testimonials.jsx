import { Quote } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { testimonials } from '@/data/site'

export function Testimonials() {
  return (
    <Section bg="ice">
      <SectionHeading
        eyebrow="From the people using it"
        title="Buyers, brokers and investors"
        lead="Every quote below is from a customer on a paid plan. We did not cherry-pick the five-stars."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 0.07}>
            <Card hover className="flex h-full flex-col gap-5 p-7">
              <div className="flex items-start justify-between gap-4">
                <Rating value={testimonial.rating} />
                <Quote className="size-8 shrink-0 text-brand-soft" />
              </div>

              <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                “{testimonial.quote}”
              </blockquote>

              <figcaption className="flex items-center gap-3.5 border-t border-line pt-5">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  loading="lazy"
                  className="size-12 rounded-full object-cover ring-2 ring-brand-soft"
                />
                <div>
                  <p className="font-bold text-ink">{testimonial.name}</p>
                  <p className="text-sm text-muted-2">{testimonial.role}</p>
                </div>
              </figcaption>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
