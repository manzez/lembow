'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function UserCommunitiesPage() {
  const [selectedCommunityId, setSelectedCommunityId] = useState('1')

  // Mock data - in real app, this would come from API
  const userCommunities = [
    {
      id: '1',
      name: 'Igbo Cardiff',
      slug: 'igbo-cardiff',
      region: 'Cardiff, UK',
      joinDate: '2023-01-15',
      isPrimary: true,
      role: 'Member',
      status: 'Active',
      memberNumber: 'IC-001',
      organization: {
        id: 'org1',
        name: 'Igbo Union UK'
      },
      stats: {
        eventsAttended: 12,
        paymentsCurrent: true,
        lastActivity: '2024-10-25'
      }
    },
    {
      id: '2', 
      name: 'Igbo London',
      slug: 'igbo-london',
      region: 'London, UK',
      joinDate: '2023-06-20',
      isPrimary: false,
      role: 'Secretary',
      status: 'Active',
      memberNumber: 'IL-047',
      organization: {
        id: 'org1',
        name: 'Igbo Union UK'
      },
      stats: {
        eventsAttended: 8,
        paymentsCurrent: true,
        lastActivity: '2024-10-28'
      }
    },
    {
      id: '3',
      name: 'Yoruba Manchester',
      slug: 'yoruba-manchester', 
      region: 'Manchester, UK',
      joinDate: '2024-03-10',
      isPrimary: false,
      role: 'Member',
      status: 'Active',
      memberNumber: 'YM-023',
      organization: {
        id: 'org2',
        name: 'Yoruba Cultural Association'
      },
      stats: {
        eventsAttended: 3,
        paymentsCurrent: false,
        lastActivity: '2024-10-15'
      }
    }
  ]

  const selectedCommunity = userCommunities.find(c => c.id === selectedCommunityId) || userCommunities[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-purple-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🤝</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">My Communities</h1>
            <p className="text-slate-400">Manage your memberships across multiple communities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Communities List */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Your Communities</h2>
                  <Link 
                    href="/user/join-community"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    + Join New
                  </Link>
                </div>

                <div className="space-y-3">
                  {userCommunities.map((community) => (
                    <button
                      key={community.id}
                      onClick={() => setSelectedCommunityId(community.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedCommunityId === community.id
                          ? 'bg-purple-500/20 border border-purple-500/50'
                          : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm ${
                          community.isPrimary 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}>
                          {community.isPrimary ? '⭐' : '🏛️'}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{community.name}</div>
                          <div className="text-slate-400 text-xs">{community.region}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              community.status === 'Active' 
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {community.status}
                            </span>
                            {community.role !== 'Member' && (
                              <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                                {community.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{userCommunities.length}</div>
                      <div className="text-xs text-slate-400">Communities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {userCommunities.filter(c => c.isPrimary).length}
                      </div>
                      <div className="text-xs text-slate-400">Primary</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Details */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                {/* Community Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${
                      selectedCommunity.isPrimary 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600'
                    }`}>
                      {selectedCommunity.isPrimary ? '⭐' : '🏛️'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedCommunity.name}</h3>
                      <p className="text-slate-400">{selectedCommunity.region}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {selectedCommunity.isPrimary && (
                          <span className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full font-medium">
                            Primary Community
                          </span>
                        )}
                        <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                          {selectedCommunity.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Member #</div>
                    <div className="text-lg font-bold text-white">{selectedCommunity.memberNumber}</div>
                  </div>
                </div>

                {/* Organization Info */}
                <div className="mb-8 p-4 bg-slate-700/30 rounded-xl">
                  <div className="text-sm text-slate-400 mb-1">Part of Organization</div>
                  <div className="text-lg font-semibold text-white">{selectedCommunity.organization.name}</div>
                </div>

                {/* Membership Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">{selectedCommunity.stats.eventsAttended}</div>
                      <div className="text-slate-400 text-sm mt-1">Events Attended</div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${selectedCommunity.stats.paymentsCurrent ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedCommunity.stats.paymentsCurrent ? '✅' : '⚠️'}
                      </div>
                      <div className="text-slate-400 text-sm mt-1">
                        {selectedCommunity.stats.paymentsCurrent ? 'Payments Current' : 'Payment Due'}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">
                        {new Date(selectedCommunity.stats.lastActivity).toLocaleDateString()}
                      </div>
                      <div className="text-slate-400 text-sm mt-1">Last Activity</div>
                    </div>
                  </div>
                </div>

                {/* Membership Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Membership Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Join Date:</span>
                        <span className="text-white">{new Date(selectedCommunity.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={selectedCommunity.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}>
                          {selectedCommunity.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Role:</span>
                        <span className="text-white">{selectedCommunity.role}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Link 
                        href={`/user/payments?community=${selectedCommunity.id}`}
                        className="block w-full px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-center"
                      >
                        View Payments
                      </Link>
                      <Link 
                        href={`/events?community=${selectedCommunity.id}`}
                        className="block w-full px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors text-center"
                      >
                        Community Events
                      </Link>
                      {!selectedCommunity.isPrimary && (
                        <button className="w-full px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors">
                          Set as Primary
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Community Actions */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/c/${selectedCommunity.slug}`}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300"
                  >
                    Visit Community
                  </Link>
                  {selectedCommunity.role !== 'Member' && (
                    <Link 
                      href="/community-admin"
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-300">
                    Leave Community
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="text-center mt-8">
            <Link 
              href="/user" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span> Back to User Area
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}