'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { Permission, hasPermission, canAccessAdminRoutes, canAccessSuperAdminRoutes } from '../lib/permissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  permission?: Permission
  requireAdmin?: boolean
  requireSuperAdmin?: boolean
  fallback?: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  permission, 
  requireAdmin = false,
  requireSuperAdmin = false,
  fallback,
  redirectTo 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-slate-400 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user is authenticated
  if (!user) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Authentication Required</h1>
            <p className="text-slate-400 mb-8">
              You need to be logged in to access this page.
            </p>
            <Link 
              href={redirectTo || "/auth/login"}
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check super admin requirements
  if (requireSuperAdmin && !canAccessSuperAdminRoutes(user)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🚫</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Super Admin Access Required</h1>
            <p className="text-slate-400 mb-8">
              You need super administrator privileges to access this page.
            </p>
            <Link 
              href={redirectTo || "/dashboard"}
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check admin requirements
  if (requireAdmin && !canAccessAdminRoutes(user)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🛡️</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Administrator Access Required</h1>
            <p className="text-slate-400 mb-8">
              You need administrator privileges to access this page.
            </p>
            <Link 
              href={redirectTo || "/dashboard"}
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:blue-600 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check specific permission
  if (permission && !hasPermission(user, permission)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-yellow-500/20 rounded-2xl mb-6">
              <span className="text-4xl">⚠️</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Insufficient Permissions</h1>
            <p className="text-slate-400 mb-8">
              You don't have the required permissions to access this feature.
            </p>
            <Link 
              href={redirectTo || "/dashboard"}
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If all checks pass, render the protected content
  return <>{children}</>
}

// Convenience components for common protection scenarios
export function AdminRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requireAdmin'>) {
  return (
    <ProtectedRoute requireAdmin={true} {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function SuperAdminRoute({ children, ...props }: Omit<ProtectedRouteProps, 'requireSuperAdmin'>) {
  return (
    <ProtectedRoute requireSuperAdmin={true} {...props}>
      {children}
    </ProtectedRoute>
  )
}

// Hook for checking permissions in components
export function usePermissions() {
  const { user } = useAuth()
  
  return {
    hasPermission: (permission: Permission) => hasPermission(user, permission),
    canAccessAdmin: () => canAccessAdminRoutes(user),
    canAccessSuperAdmin: () => canAccessSuperAdminRoutes(user),
    user
  }
}