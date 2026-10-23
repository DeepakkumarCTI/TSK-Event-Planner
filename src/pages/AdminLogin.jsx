
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button, Field } from '../components/UI'

export default function AdminLogin() {
  const { setAdmin } = useApp()
  const nav = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()

    if (
      email.trim().toLowerCase() === 'admin@gmail.com' &&
      password === 'admin123'
    ) {
      setAdmin(true)
      nav('/admin', { replace: true })
    } else {
      setError('Invalid administrator email or password.')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#21131c] px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-tsk-red/30 blur-[110px]" />

        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[110px]" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-10">
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-tsk-red"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        {/* Logo and Heading */}
        <div className="mb-6 flex items-center gap-4">
          <img
            src="/images/tsk-logo.jpg"
            alt="TSK logo"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-tsk-red">
              Private access
            </p>

            <h1 className="font-display text-2xl font-bold">
              Admin portal
            </h1>
          </div>
        </div>

        <p className="text-sm leading-6 text-gray-500">
          Sign in to manage services, bookings, customer enquiries and website
          content.
        </p>

        {/* Login Form */}
        <form onSubmit={submit} className="mt-7 space-y-5">
          <Field
            label="Admin email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
            required
          />

          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
          />

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            <LockKeyhole size={16} />
            Secure login
          </Button>
        </form>

        
      </div>
    </main>
  )
}
