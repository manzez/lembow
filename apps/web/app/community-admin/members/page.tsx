'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { AdminRoute } from '../../../components/ProtectedRoute'
import { apiService } from '../../../lib/api'

interface Member {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string | null
  whatsapp: string | null
  joinDate: string
  status: 'ACTIVE' | 'LAPSED' | 'PAUSED' | 'TRANSFER_PENDING'
  role: string | null
  isPrimary: boolean
  community: {
    name: string
    slug: string
  }
}

interface PaginationData {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNext: boolean
  hasPrev: boolean
}

export default function CommunityAdminMembersPage() {
  return (
    <AdminRoute permission="MANAGE_MEMBERS">
      <MemberManagementContent />
    </AdminRoute>
  )
}

function MemberManagementContent() {
  const { user } = useAuth()
  const [members, setMembers] = useState<Member[]>([])
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCommunityId, setSelectedCommunityId] = useState('')

  // Get user's admin communities
  const adminCommunities = user?.communities?.filter(c => 
    c.role && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
  ) || []

  // Set default community
  useEffect(() => {
    if (!selectedCommunityId && adminCommunities.length > 0) {
      const primaryCommunity = adminCommunities.find(c => c.isPrimary) || adminCommunities[0]
      setSelectedCommunityId(primaryCommunity.id)
    }
  }, [adminCommunities, selectedCommunityId])

  // Load members when community, search, or filters change
  useEffect(() => {
    if (selectedCommunityId) {
      loadMembers()
    }
  }, [selectedCommunityId, searchTerm, statusFilter, currentPage])

  const loadMembers = async () => {
    if (!selectedCommunityId) return

    setIsLoading(true)
    setError('')

    try {
      const result = await apiService.getCommunityMembers(selectedCommunityId, {
        page: currentPage,
        limit: 20,
        search: searchTerm || undefined,
        status: statusFilter || undefined
      })

      if (result.success && result.data) {
        setMembers(result.data.members)
        setPagination(result.data.pagination)
      } else {
        setError(result.error || 'Failed to load members')
        setMembers([])
        setPagination(null)
      }
    } catch (err) {
      setError('Error loading members')
      setMembers([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page
    loadMembers()
  }

  const handleStatusUpdate = async (memberId: string, newStatus: string) => {
    if (!selectedCommunityId) return

    try {
      const result = await apiService.updateMemberStatus(selectedCommunityId, memberId, {
        status: newStatus
      })

      if (result.success) {
        // Reload members to get updated data
        loadMembers()
      } else {
        setError(result.error || 'Failed to update member status')
      }
    } catch (err) {
      setError('Error updating member status')
    }
  }

  // If user has no admin communities, show message
  if (adminCommunities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🚫</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-8">
              You need to be a community administrator to access member management.
            </p>
            <Link 
              href="/user"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to User Area
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-green-500/20 rounded-2xl mb-6">
              <span className="text-4xl">👥</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Member Management</h1>
            <p className="text-slate-400">Manage community members and their roles</p>
          </div>

          {/* Community Selector */}
          {adminCommunities.length > 1 && (
            <div className="mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select Community</h3>
                <select
                  value={selectedCommunityId}
                  onChange={(e) => setSelectedCommunityId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {adminCommunities.map(community => (
                    <option key={community.id} value={community.id}>
                      {community.name} - {community.organization.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="LAPSED">Lapsed</option>
                  <option value="PAUSED">Paused</option>
                  <option value="TRANSFER_PENDING">Transfer Pending</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Members Table */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Community Members</h2>
                {pagination && (
                  <p className="text-slate-400 text-sm mt-1">
                    {pagination.totalCount} members total
                  </p>
                )}
              </div>
              <button 
                onClick={loadMembers}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Refresh
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-slate-400 mt-4">Loading members...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">👥</span>
                <h3 className="text-slate-300 font-semibold mb-2">No Members Found</h3>
                <p className="text-slate-400">
                  {searchTerm || statusFilter 
                    ? 'Try adjusting your search filters.' 
                    : 'No members in this community yet.'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Name</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Email</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Phone</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Status</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Role</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Joined</th>
                        <th className="text-left py-4 px-4 text-slate-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                          <td className="py-4 px-4 text-white">
                            <div>
                              <div className="font-medium">
                                {member.firstName} {member.lastName}
                              </div>
                              {member.isPrimary && (
                                <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded mt-1">
                                  Primary Community
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-400">{member.email}</td>
                          <td className="py-4 px-4 text-slate-400">
                            {member.phone || member.whatsapp || '-'}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === 'ACTIVE'
                                ? 'bg-green-500/20 text-green-400'
                                : member.status === 'LAPSED'
                                ? 'bg-red-500/20 text-red-400'
                                : member.status === 'PAUSED'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-orange-500/20 text-orange-400'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-400">
                            {member.role || 'Member'}
                          </td>
                          <td className="py-4 px-4 text-slate-400">
                            {new Date(member.joinDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Link
                                href={`/community-admin/members/${member.id}`}
                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-sm"
                              >
                                View
                              </Link>
                              <select
                                value={member.status}
                                onChange={(e) => handleStatusUpdate(member.id, e.target.value)}
                                className="px-2 py-1 bg-slate-700 text-white rounded text-sm border border-slate-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                              >
                                <option value="ACTIVE">Active</option>
                                <option value="LAPSED">Lapsed</option>
                                <option value="PAUSED">Paused</option>
                                <option value="TRANSFER_PENDING">Transfer Pending</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-slate-400 text-sm">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={!pagination.hasPrev}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          pagination.hasPrev
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!pagination.hasNext}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          pagination.hasNext
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link 
              href="/community-admin"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to Community Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}