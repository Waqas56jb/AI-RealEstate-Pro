import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, Input } from '@/components/ui/Input'
import { useApp } from '@/context/app-context'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    // Replace with POST /api/auth/login — token goes to localStorage['estatly.token'].
    await new Promise((resolve) => setTimeout(resolve, 700))
    login({ email: form.email })
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Welcome back"
      lead="Sign in to your shortlist, saved searches and lead inbox."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="font-semibold text-brand hover:text-brand-dark">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Email">
          <Input
            required
            type="email"
            icon={Mail}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@company.com"
          />
        </Field>

        <Field label="Password">
          <Input
            required
            type="password"
            icon={Lock}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="••••••••"
          />
        </Field>

        <div className="flex items-center justify-between">
          <Checkbox label="Keep me signed in" defaultChecked />
          <Link to="/contact" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" disabled={busy} className="w-full">
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-2">
          <span className="h-px flex-1 bg-line" />
          or continue with
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="secondary">
            Google
          </Button>
          <Button type="button" variant="secondary">
            Apple
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
