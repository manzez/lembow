'use client'

import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { ProtectedRoute } from '../../components/ProtectedRoute'
import { 
  hasPermission, 
  canAccessAdminRoutes, 
  canAccessSuperAdminRoutes, 
  getAdminCommunities,
  isSuperAdmin,
  isCommunityAdmin 
} from '../../lib/permissions'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user } = useAuth()

  if (!user) return null

  const adminCommunities = getAdminCommunities(user)
  const canAccessAdmin = canAccessAdminRoutes(user)
  const canAccessSuperAdmin = canAccessSuperAdminRoutes(user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-green-500/20 rounded-2xl mb-6">
              <span className="text-4xl">📊</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-slate-400 mb-6">
              Here's your personalized dashboard based on your role and permissions
            </p>
            
            {/* Role Badges */}
            <div className="flex justify-center space-x-3 mb-8">
              {isSuperAdmin(user) && (
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full">
                  ⚡ Super Administrator
                </span>
              )}
              {adminCommunities.map(community => (
                <span key={community.id} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full">
                  🏛️ {community.role} - {community.name}
                </span>
              ))}
              {!isSuperAdmin(user) && !isCommunityAdmin(user) && (
                <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full">
                  👤 Community Member
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Standard User Actions */}
            <Link href="/me" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">My Profile</h3>
                    <p className="text-slate-400 text-sm">Manage your personal information</p>
                  </div>
                </div>
              </div>
            </Link>

            {hasPermission(user, 'VIEW_EVENTS') && (
              <Link href="/events" className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Events</h3>
                      <p className="text-slate-400 text-sm">View upcoming community events</p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(user, 'VIEW_PAYMENTS') && (
              <Link href="/payments" className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Payments</h3>
                      <p className="text-slate-400 text-sm">Manage dues and payments</p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {hasPermission(user, 'VIEW_NOTIFICATIONS') && (
              <Link href="/notifications" className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Notifications</h3>
                      <p className="text-slate-400 text-sm">Check your messages and alerts</p>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Admin Actions */}
            {canAccessAdmin && (
              <>
                <Link href="/community-admin" className="group">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl">
                        <span className="text-2xl">🏛️</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Admin Panel</h3>
                        <p className="text-slate-400 text-sm">Community administration</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {hasPermission(user, 'MANAGE_MEMBERS') && (
                  <Link href="/community-admin/members" className="group">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                          <span className="text-2xl">👥</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Manage Members</h3>
                          <p className="text-slate-400 text-sm">View and manage community members</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {hasPermission(user, 'VIEW_ANALYTICS') && (
                  <Link href="/analytics" className="group">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                          <span className="text-2xl">📈</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Analytics</h3>
                          <p className="text-slate-400 text-sm">Community insights and reports</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )}

            {/* Meeting Minutes - Available to all members */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Latest Meeting Minutes</h3>
                  <p className="text-slate-400 text-sm">Stay updated with community decisions</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Sample meeting minutes - replace with real API data */}
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">Free4All Bristol Weekly Meeting</h4>
                    <span className="text-xs text-slate-400">Oct 26, 2025</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2 line-clamp-2">Discussed upcoming tournaments and equipment needs. Approved new training schedule.</p>
                  <Link 
                    href="/c/free4all-bristol-wed/meetings"
                    className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                  >
                    Read full minutes →
                  </Link>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">Rougemont Netball Committee</h4>
                    <span className="text-xs text-slate-400">Oct 19, 2025</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2 line-clamp-2">Strategic planning meeting focused on winter season and community outreach programs.</p>
                  <Link 
                    href="/c/rougemont-netball-newport/meetings"
                    className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                  >
                    Read full minutes →
                  </Link>
                </div>
                
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">Avu Diaspora AGM 2025</h4>
                    <span className="text-xs text-slate-400">Oct 5, 2025</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-2 line-clamp-2">Annual general meeting with committee elections and strategic plan approval.</p>
                  <Link 
                    href="/c/avu-diaspora-main/meetings"
                    className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                  >
                    Read full minutes →
                  </Link>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-600">
                <Link 
                  href="/meetings"
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors flex items-center gap-2"
                >
                  <span>📋</span>
                  View all meeting minutes
                </Link>
              </div>
            </div>

            {/* Super Admin Actions */}
            {canAccessSuperAdmin && (
              <>
                <Link href="/super-admin" className="group">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-xl">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Super Admin</h3>
                        <p className="text-slate-400 text-sm">System-wide administration</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {hasPermission(user, 'MANAGE_ORGANIZATIONS') && (
                  <Link href="/super-admin/organizations" className="group">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                          <span className="text-2xl">🏢</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Organizations</h3>
                          <p className="text-slate-400 text-sm">Manage organizations</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Community Summary */}
          {user.communities && user.communities.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.communities.map(community => (
                  <div key={community.id} className="p-4 bg-slate-900/40 rounded-lg border border-slate-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{community.name}</h3>
                        <p className="text-slate-400 text-sm">{community.organization.name}</p>
                        {community.role && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                            {community.role}
                          </span>
                        )}
                      </div>
                      {community.isPrimary && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity would go here */}
        </div>
      </div>
    </div>
  )
}