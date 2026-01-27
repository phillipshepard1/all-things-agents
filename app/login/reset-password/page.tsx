'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageState, setPageState] = useState<'loading' | 'form' | 'invalid'>('loading')
  const tokensRef = useRef<{ accessToken: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for hash params synchronously - no Supabase calls
    const hash = window.location.hash
    let newState: 'form' | 'invalid' = 'invalid'

    if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
      const hashParams = new URLSearchParams(hash.substring(1))
      const accessToken = hashParams.get('access_token')

      if (accessToken) {
        tokensRef.current = { accessToken }
        window.history.replaceState(null, '', '/login/reset-password')
        newState = 'form'
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- One-time state initialization on mount
    setPageState(newState)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!tokensRef.current) {
      setError('Session expired. Please request a new reset link.')
      setLoading(false)
      return
    }

    try {
      // Direct API call to Supabase - bypass the client SDK
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokensRef.current.accessToken}`,
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({ password }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        setError(data.error_description || data.msg || 'Failed to update password')
        setLoading(false)
        return
      }

      // Success - redirect to login
      router.push('/login?message=password-updated')
    } catch (err) {
      console.error('Error:', err)
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  if (pageState === 'loading') {
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

  if (pageState === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#300092] font-[family-name:var(--font-outfit)]">
                Client Keeper
              </h1>
              <p className="text-gray-500 mt-2">Invalid or Expired Link</p>
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/login/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Request new reset link
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
            <p className="text-gray-500 mt-2">Set New Password</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Enter new password"
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
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7a36dd] hover:bg-[#6b2cc4] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
            >
              &larr; Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
