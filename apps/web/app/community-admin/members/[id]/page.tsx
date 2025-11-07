"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'
import { AdminRoute } from '../../../../components/ProtectedRoute'
import { apiService } from '../../../../lib/api'

interface MemberDetails {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string | null
  whatsapp: string | null
  isActive: boolean
  createdAt: string
  communities: Array<{
    id: string
    name: string
    slug: string
    organization: {
      id: string
      name: string
    }
    joinDate: string
    status: string
    role: string | null
    isPrimary: boolean
  }>
}

export default function MemberDetailsPage() {
  const params = useParams<{ id: string }>()
  const rawId = (params?.id ?? '') as unknown as string | string[]
  const id = Array.isArray(rawId) ? rawId[0] : rawId
  return (
    <AdminRoute permission="MANAGE_MEMBERS">
      <MemberDetailsContent memberId={id} />
    </AdminRoute>
  )
}

function MemberDetailsContent({ memberId }: { memberId: string }) {
  const { user } = useAuth()
  const [member, setMember] = useState<MemberDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  // Check if user has admin access
  const adminCommunities = user?.communities?.filter(c => 
    c.role && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(c.role)
  ) || []

  useEffect(() => {
    loadMemberDetails()
  }, [memberId])

  const loadMemberDetails = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await apiService.getMemberDetails(memberId)
      
      if (result.success && result.data) {
        setMember(result.data.member)
      } else {
        setError(result.error || 'Failed to load member details')
      }
    } catch (err) {
      setError('Error loading member details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (communityId: string, newStatus: string) => {
    setIsUpdating(true)
    setUpdateMessage('')

    try {
      const result = await apiService.updateMemberStatus(communityId, memberId, {
        status: newStatus
      })

      if (result.success) {
        setUpdateMessage('Member status updated successfully')
        // Reload member details to get updated data
        await loadMemberDetails()
      } else {
        setUpdateMessage(`Error: ${result.error}`)
      }
    } catch (err) {
      setUpdateMessage('Error updating member status')
    } finally {
      setIsUpdating(false)
    }
  }

  // Check access permissions
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
              You need to be a community administrator to view member details.
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-slate-400 mt-4">Loading member details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Member Not Found</h1>
            <p className="text-slate-400 mb-8">{error || 'The requested member could not be found.'}</p>
            <Link 
              href="/community-admin/members"
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Member Management
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-green-500/20 rounded-2xl mb-6">
              <span className="text-4xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Member Details</h1>
            <p className="text-slate-400">View and manage member information</p>
          </div>

          {/* Update Message */}
          {updateMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              updateMessage.includes('Error') 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : 'bg-green-500/10 border border-green-500/30 text-green-400'
            }`}>
              {updateMessage}
            </div>
          )}

          {/* Member Information */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                  {member.firstName} {member.lastName}
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                  {member.email}
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                  {member.phone || 'Not provided'}
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">WhatsApp</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                  {member.whatsapp || 'Not provided'}
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Account Status</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    member.isActive 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Member Since</label>
                <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                  {new Date(member.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Community Memberships */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Community Memberships</h2>
            
            {member.communities && member.communities.length > 0 ? (
              <div className="space-y-4">
                {member.communities.map(community => {
                  // Check if current user is admin of this community
                  const userCommunity = adminCommunities.find(c => c.id === community.id)
                  const canManage = userCommunity && ['COMMUNITY_ADMIN', 'SUPER_ADMIN'].includes(userCommunity.role || '')
                  
                  return (
                    <div key={community.id} className="p-6 bg-slate-900/40 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{community.name}</h3>
                          <p className="text-slate-400 text-sm mb-3">{community.organization.name}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Status:</span>
                              <div className="mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  community.status === 'ACTIVE'
                                    ? 'bg-green-500/20 text-green-400'
                                    : community.status === 'LAPSED'
                                    ? 'bg-red-500/20 text-red-400'
                                    : community.status === 'PAUSED'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {community.status}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-slate-400">Role:</span>
                              <div className="mt-1 text-white">
                                {community.role || 'Member'}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-slate-400">Joined:</span>
                              <div className="mt-1 text-white">
                                {new Date(community.joinDate).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-slate-400">Primary:</span>
                              <div className="mt-1">
                                {community.isPrimary ? (
                                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                                    Yes
                                  </span>
                                ) : (
                                  <span className="text-slate-500">No</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {canManage && (
                          <div className="ml-6">
                            <select
                              value={community.status}
                              onChange={(e) => handleStatusUpdate(community.id, e.target.value)}
                              disabled={isUpdating}
                              className="px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                              <option value="ACTIVE">Active</option>
                              <option value="LAPSED">Lapsed</option>
                              <option value="PAUSED">Paused</option>
                              <option value="TRANSFER_PENDING">Transfer Pending</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">🏘️</span>
                <h3 className="text-slate-300 font-semibold mb-2">No Community Memberships</h3>
                <p className="text-slate-400">This member is not part of any communities yet.</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link 
              href="/community-admin/members"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
            >
              ← Back to Member Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}