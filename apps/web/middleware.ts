import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/me',
  '/notifications',
  '/payments',
  '/events',
  '/community-admin',
  '/super-admin'
]

// Define routes that require admin access
const adminRoutes = [
  '/community-admin',
  '/analytics'
]

// Define routes that require super admin access
const superAdminRoutes = [
  '/super-admin'
]

// Define routes that should redirect authenticated users (like login pages)
const guestOnlyRoutes = [
  '/auth/login',
  '/auth/register'
]

export function middleware(request: NextRequest) {
  // Auth disabled for development - allow all routes
  return NextResponse.next()
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}