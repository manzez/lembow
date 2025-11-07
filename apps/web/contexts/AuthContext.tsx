'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { apiService, User } from '../lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (emailOrToken: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = user !== null

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const result = await apiService.getCurrentUser()
      if (result.success && result.data) {
        setUser(result.data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (emailOrToken: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Check if it's an email (contains @) or token (doesn't contain @)
      let result
      if (emailOrToken.includes('@')) {
        // Direct email login for development
        result = await apiService.directLogin(emailOrToken)
      } else {
        // Magic link token verification
        result = await apiService.verifyMagicLink(emailOrToken)
      }
      
      if (result.success && result.data) {
        setUser(result.data.user)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsLoading(false)
      // Redirect to login page
      window.location.href = '/auth/login'
    }
  }

  const refreshUser = async () => {
    await checkAuthStatus()
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Simple helper component for basic authentication check
interface BasicProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  fallback?: ReactNode
}

export function BasicProtectedRoute({ 
  children, 
  requireAuth = true, 
  fallback 
}: BasicProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <a 
            href="/auth/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  if (!requireAuth && isAuthenticated) {
    // For pages like login that shouldn't be accessible when authenticated
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Already Signed In</h2>
          <p className="text-gray-600 mb-6">You are already authenticated.</p>
          <a 
            href="/user" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Export for backward compatibility
export const ProtectedRoute = BasicProtectedRoute