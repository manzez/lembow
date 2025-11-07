"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'
import { SuperAdminRoute } from '../../../../components/ProtectedRoute'

interface Organization {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  email: string | null
  phone: string | null
  address: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  communities: Community[]
  settings: {
    allowSelfRegistration: boolean
    requireApproval: boolean
    maxCommunities: number | null
    customDomain: string | null
  }
}

interface Community {
  id: string
  name: string
  slug: string
  region: string | null
  memberCount: number
  isActive: boolean
  createdAt: string
  admin: {
    name: string
    email: string
  }
}

export default function OrganizationDetailsPage() {
  const params = useParams<{ id: string }>()
  const rawId = (params?.id ?? '') as unknown as string | string[]
  const id = Array.isArray(rawId) ? rawId[0] : rawId
  return (
    <SuperAdminRoute>
      <OrganizationDetailsContent organizationId={id} />
    </SuperAdminRoute>
  )
}

function OrganizationDetailsContent({ organizationId }: { organizationId: string }) {
  const { user } = useAuth()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    loadOrganizationDetails()
  }, [organizationId])

  const loadOrganizationDetails = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Mock organization data - replace with actual API call
      const mockOrg: Organization = {
        id: organizationId,
        name: 'Community Connect Foundation',
        slug: 'community-connect',
        description: 'Supporting community-driven initiatives across the country with focus on cultural preservation and social development.',
        website: 'https://communityconnect.org',
        email: 'contact@communityconnect.org',
        phone: '+1-555-0123',
        address: '123 Main St, City, State 12345',
        isActive: true,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-11-01T00:00:00Z',
        settings: {
          allowSelfRegistration: true,
          requireApproval: false,
          maxCommunities: 50,
          customDomain: 'communityconnect.org'
        },
        communities: [
          {
            id: '1',
            name: 'Community Connect London',
            slug: 'cc-london',
            region: 'London, UK',
            memberCount: 156,
            isActive: true,
            createdAt: '2024-02-01T00:00:00Z',
            admin: {
              name: 'John Smith',
              email: 'john@communityconnect.org'
            }
          },
          {
            id: '2',
            name: 'Community Connect Birmingham',
            slug: 'cc-birmingham',
            region: 'Birmingham, UK',
            memberCount: 89,
            isActive: true,
            createdAt: '2024-03-15T00:00:00Z',
            admin: {
              name: 'Sarah Johnson',
              email: 'sarah@communityconnect.org'
            }
          },
          {
            id: '3',
            name: 'Community Connect Manchester',
            slug: 'cc-manchester',
            region: 'Manchester, UK',
            memberCount: 67,
            isActive: true,
            createdAt: '2024-04-10T00:00:00Z',
            admin: {
              name: 'Mike Wilson',
              email: 'mike@communityconnect.org'
            }
          }
        ]
      }

      setOrganization(mockOrg)
      setEditForm({
        name: mockOrg.name,
        description: mockOrg.description || '',
        website: mockOrg.website || '',
        email: mockOrg.email || '',
        phone: mockOrg.phone || '',
        address: mockOrg.address || ''
      })
    } catch (err) {
      setError('Failed to load organization details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // API call to update organization would go here
      setOrganization(prev => prev ? {
        ...prev,
        ...editForm,
        updatedAt: new Date().toISOString()
      } : null)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to save organization details')
    }
  }

  const handleStatusToggle = async () => {
    if (!organization) return

    try {
      // API call to toggle organization status
      setOrganization(prev => prev ? {
        ...prev,
        isActive: !prev.isActive,
        updatedAt: new Date().toISOString()
      } : null)
    } catch (err) {
      setError('Failed to update organization status')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-slate-400 mt-4">Loading organization details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Organization Not Found</h1>
            <p className="text-slate-400 mb-8">{error || 'The requested organization could not be found.'}</p>
            <Link 
              href="/super-admin/organizations"
              className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Back to Organizations
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="inline-block p-3 bg-purple-500/20 rounded-2xl">
                  <span className="text-3xl">🏢</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">{organization.name}</h1>
                  <p className="text-slate-400">/{organization.slug}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  organization.isActive 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {organization.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={handleStatusToggle}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  organization.isActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {organization.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Organization Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Organization Details</h2>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Organization Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Website</label>
                      <input
                        type="url"
                        value={editForm.website}
                        onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 text-sm font-medium mb-2">Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Organization Name</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.name}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.email || 'Not provided'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Phone</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.phone || 'Not provided'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">Website</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.website ? (
                          <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                            {organization.website} ↗
                          </a>
                        ) : 'Not provided'}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.description || 'No description provided'}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 text-sm font-medium mb-2">Address</label>
                      <div className="px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-white">
                        {organization.address || 'No address provided'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Communities */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Communities ({organization.communities.length})</h2>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    + Add Community
                  </button>
                </div>

                <div className="space-y-4">
                  {organization.communities.map(community => (
                    <div key={community.id} className="p-6 bg-slate-900/40 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-white font-semibold text-lg">{community.name}</h3>
                            <span className="text-slate-400 text-sm">/{community.slug}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              community.isActive 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {community.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Region:</span>
                              <div className="text-white">{community.region || 'Not specified'}</div>
                            </div>
                            <div>
                              <span className="text-slate-400">Members:</span>
                              <div className="text-white">{community.memberCount}</div>
                            </div>
                            <div>
                              <span className="text-slate-400">Admin:</span>
                              <div className="text-white">{community.admin.name}</div>
                              <div className="text-slate-400 text-xs">{community.admin.email}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Link
                            href={`/super-admin/communities/${community.id}`}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-sm"
                          >
                            View
                          </Link>
                          <button className="px-3 py-1 bg-slate-600 text-slate-300 rounded hover:bg-slate-500 transition-colors text-sm">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{organization.communities.length}</div>
                    <div className="text-slate-400 text-sm">Communities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">
                      {organization.communities.reduce((sum, c) => sum + c.memberCount, 0)}
                    </div>
                    <div className="text-slate-400 text-sm">Total Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {organization.communities.filter(c => c.isActive).length}
                    </div>
                    <div className="text-slate-400 text-sm">Active Communities</div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Self Registration</span>
                    <span className="text-green-400">
                      {organization.settings.allowSelfRegistration ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Approval Required</span>
                    <span className="text-yellow-400">
                      {organization.settings.requireApproval ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Communities</span>
                    <span className="text-blue-400">
                      {organization.settings.maxCommunities || 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Custom Domain</span>
                    <span className="text-purple-400">
                      {organization.settings.customDomain || 'None'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Metadata</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400">Created:</span>
                    <div className="text-white">
                      {new Date(organization.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Last Updated:</span>
                    <div className="text-white">
                      {new Date(organization.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">ID:</span>
                    <div className="text-slate-300 font-mono text-xs">{organization.id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-12">
            <Link 
              href="/super-admin/organizations"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Back to Organizations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}