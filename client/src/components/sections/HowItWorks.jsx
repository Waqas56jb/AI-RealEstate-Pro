import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { howItWorks } from '@/data/site'

export function HowItWorks() {
  return (
    <Section bg="ice">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps from browsing to keys"
        lead="No forms that go nowhere, no waiting on a callback that never comes."
      />

      <div className="relative mt-14">
        {/* Connector line behind the step numbers, desktop only */}
        <div
          className="absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-line-2 to-transparent lg:block"
          aria-hidden="true"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.1} className="relative">
              <div className="flex flex-col gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-white font-display text-lg font-extrabold text-brand shadow-card ring-1 ring-line">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="leading-relaxed text-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
