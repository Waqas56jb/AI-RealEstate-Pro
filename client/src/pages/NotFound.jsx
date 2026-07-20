import { ArrowLeft, Search } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-7 py-32 text-center">
      <p className="text-gradient-drift font-display text-8xl font-extrabold sm:text-9xl">404</p>

      <div>
        <h1 className="text-3xl sm:text-4xl">This listing has moved on</h1>
        <p className="mt-3 max-w-md text-lg text-muted">
          The page you were after is gone — sold, withdrawn, or it never existed. Let us point you
          somewhere useful.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button to="/" size="lg">
          <ArrowLeft className="size-4" />
          Back home
        </Button>
        <Button to="/listings" variant="secondary" size="lg">
          <Search className="size-4" />
          Browse listings
        </Button>
      </div>
    </Container>
  )
}
