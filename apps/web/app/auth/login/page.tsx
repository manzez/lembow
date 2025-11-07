'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Auth disabled - redirect to home
    router.replace('/')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100">
      <div className="text-center">
        <p className="text-gray-600">Authentication disabled for development. Redirecting...</p>
      </div>
    </div>
  )
}