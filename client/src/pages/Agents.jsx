import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Section'
import { AgentCard } from '@/components/property/AgentCard'
import { PageHeader } from '@/components/sections/PageHeader'
import { CTA } from '@/components/sections/CTA'
import { agents } from '@/data/agents'

export default function Agents() {
  return (
    <>
      <PageHeader
        eyebrow="Human where it counts"
        title="The agents behind the algorithm"
        lead="The AI handles the first three messages and the paperwork. These are the people who walk the property, read the room, and close the deal."
        breadcrumb={[{ label: 'Agents' }]}
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 0.07}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </Container>

      <CTA />
    </>
  )
}
