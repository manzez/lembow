'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Community {
  id: string
  name: string
  slug: string
  region?: string
  isPrimary: boolean
  role?: string
  organization?: {
    id: string
    name: string
  }
}

interface CommunitySwitcherProps {
  currentCommunity: Community
  communities: Community[]
  onCommunityChange: (communityId: string) => void
}

export default function CommunitySwitcher({ 
  currentCommunity, 
  communities, 
  onCommunityChange 
}: CommunitySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Group communities by organization
  const groupedCommunities = communities.reduce((acc, community) => {
    const orgName = community.organization?.name || 'Independent Communities'
    if (!acc[orgName]) acc[orgName] = []
    acc[orgName].push(community)
    return acc
  }, {} as Record<string, Community[]>)

  return (
    <div className="relative">
      {/* Current Community Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:bg-slate-800/70 transition-all duration-300 w-full"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
          🏛️
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-white font-semibold">{currentCommunity.name}</h3>
          <p className="text-slate-400 text-sm">
            {currentCommunity.region && `${currentCommunity.region} • `}
            {currentCommunity.role || 'Member'}
            {currentCommunity.isPrimary && ' (Primary)'}
          </p>
        </div>
        <div className="text-slate-400">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {Object.entries(groupedCommunities).map(([orgName, orgCommunities]) => (
            <div key={orgName} className="p-2">
              {/* Organization Header */}
              <div className="px-3 py-2 text-slate-300 text-sm font-medium border-b border-slate-700/50 mb-2">
                {orgName}
              </div>
              
              {/* Communities in Organization */}
              {orgCommunities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => {
                    onCommunityChange(community.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    community.id === currentCommunity.id
                      ? 'bg-blue-500/20 border border-blue-500/50'
                      : 'hover:bg-slate-700/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    community.isPrimary 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  }`}>
                    {community.isPrimary ? '⭐' : '🏛️'}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white text-sm font-medium">{community.name}</div>
                    <div className="text-slate-400 text-xs">
                      {community.region && `${community.region} • `}
                      {community.role || 'Member'}
                    </div>
                  </div>
                  {community.id === currentCommunity.id && (
                    <div className="text-blue-400 text-sm">✓</div>
                  )}
                </button>
              ))}
            </div>
          ))}
          
          {/* Join New Community Link */}
          <div className="border-t border-slate-700/50 p-2">
            <Link
              href="/user/join-community"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-200 text-green-400"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-sm">
                ➕
              </div>
              <span className="text-sm font-medium">Join Another Community</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}