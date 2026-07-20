import { Container } from '@/components/ui/Container'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/sections/PageHeader'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'
import { aboutValues, officeImages } from '@/data/site'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Founded 2023 · San Francisco"
        title="We got tired of waiting three days for a callback"
        lead="Estatly started when our founder messaged eleven agents about one listing and heard back from two — a week later. The house had already sold."
        breadcrumb={[{ label: 'About' }]}
      />

      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {officeImages.map((image, index) => (
            <Reveal key={image} delay={index * 0.08}>
              <img
                src={image}
                alt=""
                loading="lazy"
                className="aspect-4/3 w-full rounded-2xl object-cover shadow-card"
              />
            </Reveal>
          ))}
        </div>
      </Container>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="What we believe"
            title="Three things we will not compromise on"
            lead="Every roadmap argument gets settled against these."
          />

          <div className="flex flex-col gap-5">
            {aboutValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <Card className="p-7">
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{value.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Stats />

      <Section bg="ice">
        <SectionHeading
          eyebrow="Where we are going"
          title="Coverage in every market our customers sell in"
          lead="Full valuation models are live in the US, Canada, the UAE and the UK. Australia and Singapore are in training now, with concierge and recommendations already working worldwide."
        />
      </Section>

      <CTA />
    </>
  )
}
