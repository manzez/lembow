'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')

  const requestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:4000/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'AUTH' })
      })

      const data = await response.json()
      
      if (data.token) {
        setToken(data.token)
        setMessage('Magic link token generated! (In production, this would be sent via email)')
      } else {
        setMessage('Error generating magic link')
      }
    } catch (error) {
      setMessage('Error connecting to API. Make sure the API server is running on port 4000.')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyToken = async () => {
    if (!token) return

    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await response.json()
      
      if (data.ok) {
        setMessage(`Successfully verified! Welcome ${data.payload.email}`)
        // In real app, you would:
        // 1. Store the token in localStorage/cookies
        // 2. Redirect to dashboard
        // 3. Set user context
      } else {
        setMessage('Invalid or expired token')
      }
    } catch (error) {
      setMessage('Error verifying token')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Enter your email for a magic link</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <form onSubmit={requestMagicLink} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          {token && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Development Token:</h3>
              <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                {token}
              </div>
              <button
                onClick={verifyToken}
                className="mt-3 w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Token
              </button>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </div>

        <div className="text-center">
          <a href="/" className="text-blue-600 hover:text-blue-500 text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}