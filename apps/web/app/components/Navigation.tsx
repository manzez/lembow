'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { hasPermission, canAccessAdminRoutes, canAccessSuperAdminRoutes } from '../../lib/permissions'

export default function Navigation() {
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Base navigation items available to all users
  const baseNavItems = [
    { href: '/', label: 'Home', icon: '🏠', permission: null },
    { href: '/dashboard', label: 'Dashboard', icon: '📊', permission: 'VIEW_DASHBOARD' },
    { href: '/events', label: 'Events', icon: '📅', permission: 'VIEW_EVENTS' },
  ]

  // Admin navigation items
  const adminNavItems = [
    { href: '/community-admin', label: 'Community Admin', icon: '🏛️', permission: 'MANAGE_MEMBERS' },
    { href: '/community-admin/members', label: 'Manage Members', icon: '👥', permission: 'MANAGE_MEMBERS' },
    { href: '/community-admin/events', label: 'Manage Events', icon: '📅', permission: 'MANAGE_EVENTS' },
    { href: '/analytics', label: 'Analytics', icon: '📈', permission: 'VIEW_ANALYTICS' },
  ]

  // Super admin navigation items
  const superAdminNavItems = [
    { href: '/super-admin', label: 'Super Admin', icon: '⚡', permission: 'SUPER_ADMIN_ACCESS' },
    { href: '/super-admin/organizations', label: 'Organizations', icon: '🏢', permission: 'MANAGE_ORGANIZATIONS' },
    { href: '/super-admin/communities', label: 'All Communities', icon: '🌐', permission: 'MANAGE_COMMUNITIES' },
  ]

  // Filter navigation items based on user permissions
  const getVisibleNavItems = () => {
    const items = [...baseNavItems]
    
    // Add user-specific items if authenticated
    if (user) {
      items.push({ href: '/me', label: 'Profile', icon: '👤', permission: null })
      items.push({ href: '/notifications', label: 'Notifications', icon: '🔔', permission: 'VIEW_NOTIFICATIONS' })
      items.push({ href: '/payments', label: 'Payments', icon: '�', permission: 'VIEW_PAYMENTS' })
    }
    
    // Add admin items if user has admin permissions
    if (canAccessAdminRoutes(user)) {
      items.push(...adminNavItems)
    }
    
    // Add super admin items if user has super admin permissions
    if (canAccessSuperAdminRoutes(user)) {
      items.push(...superAdminNavItems)
    }
    
    // Filter items based on specific permissions
    return items.filter(item => 
      !item.permission || hasPermission(user, item.permission as any)
    )
  }

  const navItems = getVisibleNavItems()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 px-4 py-3 rounded-2xl text-purple-700 hover:text-purple-900 hover:bg-purple-100 transition-all duration-300 font-medium"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-3 rounded-2xl bg-purple-100 hover:bg-purple-200 transition-colors"
      >
        <span className="text-2xl text-purple-600">
          {isMobileMenuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  {user?.communities?.find(c => c.isPrimary)?.organization ? (
                    <>
                      <div className="h-8 w-8 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.communities.find(c => c.isPrimary)?.organization.name || '')}&background=8b5cf6&color=ffffff&size=32&bold=true`}
                          alt={user.communities.find(c => c.isPrimary)?.organization.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden h-8 w-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {user.communities.find(c => c.isPrimary)?.organization.name?.charAt(0) || 'L'}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                        {user.communities.find(c => c.isPrimary)?.organization.name || 'Lembo Navigation'}
                      </h2>
                    </>
                  ) : (
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                      Lembo Navigation
                    </h2>
                  )}
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 transition-colors"
                >
                  <span className="text-xl text-purple-600">✕</span>
                </button>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 border border-purple-200 hover:shadow-lg transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-purple-900">{item.label}</div>
                      <div className="text-sm text-purple-600">Navigate to {item.label.toLowerCase()}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200">
                <div className="text-sm text-purple-700 text-center">
                  {user?.communities?.find(c => c.isPrimary)?.organization ? (
                    <>
                      <strong>{user.communities.find(c => c.isPrimary)?.organization.name}</strong><br />
                      <span className="text-xs text-purple-600">Powered by Lembo Platform</span>
                    </>
                  ) : (
                    <>
                      <strong>Lembo Community Platform</strong><br />
                      Connecting African communities worldwide
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}