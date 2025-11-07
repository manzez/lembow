'use client'

import { useAuth } from '../contexts/AuthContext'
import { isSuperAdmin, isCommunityAdmin, getAdminCommunities, getUserPermissions } from '../lib/permissions'

export default function RoleIndicator() {
  const { user } = useAuth()

  if (!user) return null

  const adminCommunities = getAdminCommunities(user)
  const permissions = getUserPermissions(user)

  return (
    <div className="flex items-center space-x-3">
      {/* Role Badge */}
      {isSuperAdmin(user) && (
        <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
          ⚡ Super Admin
        </div>
      )}
      
      {!isSuperAdmin(user) && isCommunityAdmin(user) && (
        <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
          🏛️ Community Admin
        </div>
      )}

      {/* Community Count for Admins */}
      {adminCommunities.length > 0 && (
        <div className="text-xs text-slate-600 hidden md:block">
          Managing {adminCommunities.length} {adminCommunities.length === 1 ? 'community' : 'communities'}
        </div>
      )}

      {/* User Menu Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-700 hidden md:block">
            {user.firstName} {user.lastName}
          </span>
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-4">
            {/* User Info */}
            <div className="pb-3 border-b border-slate-200">
              <div className="font-semibold text-slate-900">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-slate-600">{user.email}</div>
            </div>

            {/* Role Information */}
            <div className="py-3 border-b border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Role & Permissions</div>
              
              {isSuperAdmin(user) && (
                <div className="flex items-center space-x-2 text-sm text-purple-600 mb-1">
                  <span>⚡</span>
                  <span>Super Administrator</span>
                </div>
              )}
              
              {adminCommunities.map(community => (
                <div key={community.id} className="flex items-center space-x-2 text-sm text-blue-600 mb-1">
                  <span>🏛️</span>
                  <span>{community.role} of {community.name}</span>
                </div>
              ))}
              
              {!isSuperAdmin(user) && !isCommunityAdmin(user) && (
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>👤</span>
                  <span>Community Member</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="py-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Quick Actions</div>
              <div className="space-y-1">
                <a href="/me" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">
                  👤 View Profile
                </a>
                <a href="/notifications" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">
                  🔔 Notifications
                </a>
                {isCommunityAdmin(user) && (
                  <a href="/community-admin" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">
                    🏛️ Admin Panel
                  </a>
                )}
                {isSuperAdmin(user) && (
                  <a href="/super-admin" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg">
                    ⚡ Super Admin
                  </a>
                )}
              </div>
            </div>

            {/* Permissions Summary */}
            {permissions.length > 0 && (
              <div className="py-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Active Permissions ({permissions.length})
                </div>
                <div className="flex flex-wrap gap-1">
                  {permissions.slice(0, 6).map(permission => (
                    <span 
                      key={permission}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded"
                    >
                      {permission.replace('_', ' ').toLowerCase()}
                    </span>
                  ))}
                  {permissions.length > 6 && (
                    <span className="px-2 py-1 bg-slate-200 text-slate-500 text-xs rounded">
                      +{permissions.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}