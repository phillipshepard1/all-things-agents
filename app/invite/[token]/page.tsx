'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PocketBase from 'pocketbase'

interface InviteData {
  id: string
  email: string
  role: string
  expires_at: string
}

export default function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const [token, setToken] = useState<string | null>(null)
  const [invite, setInvite] = useState<InviteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadInvite() {
      const resolvedParams = await params
      setToken(resolvedParams.token)

      const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

      try {
        // Fetch invite by token — use admin-like filter
        const record = await pb.collection('team_invites').getFirstListItem(
          `token = "${resolvedParams.token}" && accepted_at = "" && expires_at > "${new Date().toISOString()}"`
        )

        setInvite({
          id: record.id,
          email: record.email,
          role: record.role,
          expires_at: record.expires_at,
        })
      } catch {
        setError('This invite link is invalid or has expired.')
      }

      setLoading(false)
    }

    loadInvite()
  }, [params])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!invite || !token) return

    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const name = formData.get('name') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setSubmitting(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setSubmitting(false)
      return
    }

    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

      // 1. Create user account via API (needs to be done server-side ideally,
      // but for invite flow we use the public create endpoint)
      await pb.collection('users').create({
        email: invite.email,
        password,
        passwordConfirm: password,
        name,
        role: invite.role,
      })

      // 2. Mark invite as accepted
      await pb.collection('team_invites').update(invite.id, {
        accepted_at: new Date().toISOString(),
      })

      // 3. Redirect to login
      router.push('/login?message=account-created')
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="text-center">
              <div className="h-8 w-40 bg-gray-200 rounded mx-auto animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded mx-auto mt-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#300092] font-[family-name:var(--font-outfit)]">
                Client Keeper
              </h1>
              <p className="text-gray-500 mt-2">Invalid Invitation</p>
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                {error || 'This invite link is invalid or has expired.'}
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Go to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#300092] font-[family-name:var(--font-outfit)]">
              Client Keeper
            </h1>
            <p className="text-gray-500 mt-2">Accept Invitation</p>
          </div>

          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-700">
              You have been invited to join as <strong className="capitalize">{invite.role}</strong>.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={invite.email}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#7a36dd] hover:bg-[#6b2cc4] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
