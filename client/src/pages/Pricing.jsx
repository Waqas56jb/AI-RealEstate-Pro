import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/sections/PageHeader'
import { PricingTable } from '@/components/sections/PricingTable'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Simple, per seat, cancel anytime"
        title="Pricing that pays for itself on one deal"
        lead="Professional costs less than the commission on a single studio flat. Most teams cover it in the first week of after-hours leads."
        breadcrumb={[{ label: 'Pricing' }]}
      />

      <Container className="py-16 lg:py-24">
        <PricingTable />

        <p className="mt-12 text-center text-sm text-muted-2">
          All plans include SSL, GDPR-compliant data handling, and export of everything you put in.
        </p>
      </Container>

      <FAQ />
      <CTA />
    </>
  )
}
