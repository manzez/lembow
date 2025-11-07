'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function JoinCommunityPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [requestedCommunities, setRequestedCommunities] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Communities', icon: '🌍' },
    { id: 'african', name: 'African Heritage', icon: '🌍' },
    { id: 'asian', name: 'Asian Heritage', icon: '🏮' },
    { id: 'caribbean', name: 'Caribbean', icon: '🏝️' },
    { id: 'european', name: 'European', icon: '🏰' },
    { id: 'other', name: 'Other', icon: '🤝' }
  ]

  // Mock data - in real app, this would come from API
  const availableCommunities = [
    {
      id: '4',
      name: 'Yoruba London',
      slug: 'yoruba-london',
      region: 'London, UK',
      country: 'United Kingdom',
      category: 'african',
      members: 234,
      description: 'Preserving Yoruba culture and traditions in London',
      organization: { name: 'Yoruba Cultural Association', id: 'org2' },
      isPublic: true,
      requiresApproval: true,
      logoUrl: null
    },
    {
      id: '5',
      name: 'Pakistani Manchester',
      slug: 'pakistani-manchester', 
      region: 'Manchester, UK',
      country: 'United Kingdom',
      category: 'asian',
      members: 156,
      description: 'Supporting Pakistani heritage and community in Manchester',
      organization: { name: 'Pakistani Heritage Foundation', id: 'org3' },
      isPublic: true,
      requiresApproval: false,
      logoUrl: null
    },
    {
      id: '6',
      name: 'Caribbean Birmingham',
      slug: 'caribbean-birmingham',
      region: 'Birmingham, UK', 
      country: 'United Kingdom',
      category: 'caribbean',
      members: 89,
      description: 'Celebrating Caribbean culture and community spirit',
      organization: null,
      isPublic: true,
      requiresApproval: true,
      logoUrl: null
    },
    {
      id: '7',
      name: 'Polish Glasgow',
      slug: 'polish-glasgow',
      region: 'Glasgow, UK',
      country: 'United Kingdom', 
      category: 'european',
      members: 67,
      description: 'Polish community maintaining traditions and connections',
      organization: { name: 'Polish Cultural Centre UK', id: 'org4' },
      isPublic: true,
      requiresApproval: false,
      logoUrl: null
    },
    {
      id: '8',
      name: 'Igbo Manchester',
      slug: 'igbo-manchester',
      region: 'Manchester, UK',
      country: 'United Kingdom',
      category: 'african', 
      members: 45,
      description: 'Igbo community branch in Manchester',
      organization: { name: 'Igbo Union UK', id: 'org1' },
      isPublic: true,
      requiresApproval: true,
      logoUrl: null
    }
  ]

  const filteredCommunities = availableCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinRequest = (communityId: string) => {
    if (!requestedCommunities.includes(communityId)) {
      setRequestedCommunities([...requestedCommunities, communityId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-500/20 rounded-2xl mb-6">
              <span className="text-4xl">🤝</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Join New Communities</h1>
            <p className="text-slate-400">Discover and connect with communities that match your interests</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search communities by name, location, or description..."
                  className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCommunities.map((community) => {
              const hasRequested = requestedCommunities.includes(community.id)
              
              return (
                <div key={community.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300">
                  {/* Community Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                      🏛️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{community.name}</h3>
                      <p className="text-slate-400 text-sm">{community.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-300 font-medium">{community.members}</div>
                      <div className="text-xs text-slate-400">members</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {community.description}
                  </p>

                  {/* Organization Badge */}
                  {community.organization && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                        Part of {community.organization.name}
                      </span>
                    </div>
                  )}

                  {/* Join Requirements */}
                  <div className="mb-4">
                    <div className={`flex items-center gap-2 text-xs ${
                      community.requiresApproval ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      <span>{community.requiresApproval ? '⏳' : '✅'}</span>
                      <span>
                        {community.requiresApproval ? 'Requires approval' : 'Instant join'}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleJoinRequest(community.id)}
                    disabled={hasRequested}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      hasRequested
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : community.requiresApproval
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    }`}
                  >
                    {hasRequested 
                      ? (community.requiresApproval ? 'Request Sent' : 'Joined!')
                      : (community.requiresApproval ? 'Request to Join' : 'Join Community')
                    }
                  </button>
                </div>
              )
            })}
          </div>

          {/* No Results */}
          {filteredCommunities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No communities found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or category filter</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-300">
                Suggest a New Community
              </button>
            </div>
          )}

          {/* Pending Requests Summary */}
          {requestedCommunities.length > 0 && (
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Pending Requests</h3>
              <p className="text-blue-300 text-sm mb-4">
                You have {requestedCommunities.length} pending community join request{requestedCommunities.length > 1 ? 's' : ''}. 
                You'll be notified when they're processed.
              </p>
              <Link 
                href="/user/notifications"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                View Notifications →
              </Link>
            </div>
          )}

          {/* Back Navigation */}
          <div className="text-center">
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