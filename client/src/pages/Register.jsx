import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input } from '@/components/ui/Input'
import { useApp } from '@/context/app-context'
import { cn } from '@/utils/cn'

const ROLES = [
  { id: 'buyer', label: 'Buying or renting' },
  { id: 'seller', label: 'Selling my home' },
  { id: 'agent', label: 'Agent or brokerage' },
]

export default function Register() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [role, setRole] = useState('buyer')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    // Replace with POST /api/auth/register.
    await new Promise((resolve) => setTimeout(resolve, 800))
    login({ name: form.name, email: form.email })
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Start your 14-day trial"
      lead="No card required. Connect one channel and see the first week of after-hours leads answered."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:text-brand-dark">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">I am…</span>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setRole(option.id)}
                aria-pressed={role === option.id}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all',
                  role === option.id
                    ? 'border-brand bg-brand-soft text-brand'
                    : 'border-line-2 text-muted hover:border-brand hover:text-brand',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <Field label="Full name">
          <Input
            required
            icon={User}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Jordan Ellis"
          />
        </Field>

        <Field label="Work email">
          <Input
            required
            type="email"
            icon={Mail}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="jordan@brokerage.com"
          />
        </Field>

        <Field label="Password" hint="At least 8 characters, one number.">
          <Input
            required
            minLength={8}
            type="password"
            icon={Lock}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="••••••••"
          />
        </Field>

        <Checkbox
          required
          label={
            <>
              I agree to the{' '}
              <Link to="/about" className="font-semibold text-brand">
                terms
              </Link>{' '}
              and{' '}
              <Link to="/about" className="font-semibold text-brand">
                privacy policy
              </Link>
            </>
          }
        />

        <Button type="submit" size="lg" disabled={busy} className="w-full">
          {busy ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
