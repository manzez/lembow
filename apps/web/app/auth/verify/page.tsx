"use client"
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import Link from 'next/link'

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <VerifyToken />
    </Suspense>
  )
}

function VerifyToken() {
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link. No token provided.')
      return
    }
    ;(async () => {
      try {
        const success = await login(token)
        if (success) {
          setStatus('success')
          setMessage('Successfully verified! Redirecting to your dashboard...')
          setTimeout(() => { window.location.href = '/dashboard' }, 2000)
        } else {
          setStatus('error')
          setMessage('Invalid or expired verification token. Please request a new magic link.')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred during verification. Please try again.')
        console.error('Verification error:', error)
      }
    })()
  }, [searchParams, login])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">
            {status === 'loading' && '⏳'}
            {status === 'success' && '✅'}
            {status === 'error' && '❌'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {status === 'loading' && 'Verifying...'}
            {status === 'success' && 'Welcome!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 space-y-4">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Verifying your magic link...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-medium">{message}</div>
              <div className="animate-pulse text-sm text-gray-500">Taking you to your dashboard...</div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{message}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Link href="/auth/login" className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-center transition-colors">
                  Request New Magic Link
                </Link>
                <Link href="/" className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}