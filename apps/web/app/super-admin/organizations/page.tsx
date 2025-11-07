'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SuperAdminRoute } from '../../../components/ProtectedRoute'
import { apiService, Organization } from '../../../lib/api'

export default function SuperAdminOrganizationsPage() {
  return (
    <SuperAdminRoute>
      <OrganizationsContent />
    </SuperAdminRoute>
  )
}

function OrganizationsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOrganizations()
  }, [])

  const loadOrganizations = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiService.getAllOrganizations({
        search: searchTerm || undefined
      })
      
      if (result.success && result.data) {
        setOrganizations(result.data.organizations)
      } else {
        setError(result.error || 'Failed to load organizations')
      }
    } catch (err) {
      console.error('Error loading organizations:', err)
      setError('Failed to load organizations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadOrganizations()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Organizations Management</h1>
            <p className="text-slate-400">Manage parent organizations and their community networks</p>
          </div>

          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizations..."
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300">
              Create Organization
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-slate-400 mt-2">Loading organizations...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-300">{error}</p>
              <button 
                onClick={loadOrganizations}
                className="mt-2 px-4 py-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Organizations Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {organizations.filter(org => 
                org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                org.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (org.description && org.description.toLowerCase().includes(searchTerm.toLowerCase()))
              ).map((org) => (
              <div key={org.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                {/* Organization Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{org.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{org.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                      <span className="text-slate-500">Communities: {org.communityCount || 0}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                      View
                    </button>
                    <button className="px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Organization Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">{org.communityCount || 0}</div>
                    <div className="text-slate-400 text-sm">Communities</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">{org.memberCount || 0}</div>
                    <div className="text-slate-400 text-sm">Total Members</div>
                  </div>
                </div>

                {/* Website */}
                {org.website && (
                  <div className="mb-6">
                    <div className="text-sm text-slate-300 mb-2">Website:</div>
                    <a 
                      href={org.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      {org.website}
                    </a>
                  </div>
                )}

                {/* Management Actions */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-slate-300">Communities ({org.communityCount || 0})</div>
                    <Link 
                      href={`/super-admin/organizations/${org.id}`}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                  <div className="text-center py-4 text-slate-400 text-sm">
                    Click "View Details" to manage communities and members
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* Platform Stats */}
          {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Organizations</h3>
              <p className="text-3xl font-bold text-red-400">{organizations.length}</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Communities</h3>
              <p className="text-3xl font-bold text-blue-400">
                {organizations.reduce((acc, org) => acc + (org.communityCount || 0), 0)}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Total Members</h3>
              <p className="text-3xl font-bold text-green-400">
                {organizations.reduce((acc, org) => acc + (org.memberCount || 0), 0)}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Active Since</h3>
              <p className="text-3xl font-bold text-yellow-400">
                {organizations.length > 0 ? new Date(organizations[0].createdAt).getFullYear() : '2024'}
              </p>
            </div>
          </div>
          )}

          {/* Back Navigation */}
          <div className="text-center">
            <Link 
              href="/super-admin" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span> Back to Super Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}