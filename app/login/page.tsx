'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { login } from './actions'

function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  const urlError = searchParams.get('error')
  const message = searchParams.get('message')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#300092] font-[family-name:var(--font-outfit)]">
            Client Keeper
          </h1>
          <p className="text-gray-500 mt-2">Admin Portal</p>
        </div>

        {/* Success Message */}
        {message === 'password-updated' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">
              Your password has been updated. Please sign in with your new password.
            </p>
          </div>
        )}

        {message === 'account-created' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">
              Your account has been created. Please sign in to continue.
            </p>
          </div>
        )}

        {/* Error Messages */}
        {(error || urlError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {error || (urlError === 'unauthorized' ? 'You do not have admin access.' : 'An error occurred.')}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="/login/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7a36dd] hover:bg-[#6b2cc4] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  )
}

function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <div className="h-8 w-40 bg-gray-200 rounded mx-auto animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded mx-auto mt-2 animate-pulse" />
        </div>
        <div className="space-y-6">
          <div>
            <div className="h-4 w-12 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
