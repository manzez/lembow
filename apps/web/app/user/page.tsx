'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { ProtectedRoute } from '../../contexts/AuthContext'
import CommunitySwitcher from '../components/CommunitySwitcher'

const userSections = [
  {
    icon: '👤',
    title: 'My Profile',
    description: 'Manage your personal information and settings',
    href: '/user/profile',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '🤝',
    title: 'My Communities',
    description: 'View and manage your community memberships',
    href: '/user/communities',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '🏠',
    title: 'My Household',
    description: 'View and manage your household members',
    href: '/user/household',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: '💳',
    title: 'My Payments',
    description: 'View payment history and dues',
    href: '/user/payments',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '📅',
    title: 'My Events',
    description: 'Events you\'re attending or interested in',
    href: '/user/events',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '🔔',
    title: 'Notifications',
    description: 'Your personal notifications and updates',
    href: '/user/notifications',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '⚙️',
    title: 'Settings',
    description: 'Account settings and preferences',
    href: '/user/settings',
    color: 'from-gray-500 to-gray-600'
  }
]

export default function UserAreaPage() {
  return (
    <ProtectedRoute>
      <UserAreaContent />
    </ProtectedRoute>
  )
}

function UserAreaContent() {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentCommunityId, setCurrentCommunityId] = useState('')

  // Use real user data from authentication context
  const userCommunities = user?.communities || []
  
  // Set default community to user's primary community
  if (!currentCommunityId && userCommunities.length > 0) {
    const primaryCommunity = userCommunities.find(c => c.isPrimary) || userCommunities[0]
    setCurrentCommunityId(primaryCommunity.id)
  }

  // Mock additional communities for demo - in real app, this would come from API
  const mockCommunities = [
    {
      id: '1',
      name: 'Igbo Cardiff',
      slug: 'igbo-cardiff',
      region: 'Cardiff, UK',
      isPrimary: true,
      role: 'Member',
      organization: {
        id: 'org1',
        name: 'Igbo Union UK'
      }
    },
    {
      id: '2', 
      name: 'Igbo London',
      slug: 'igbo-london',
      region: 'London, UK',
      isPrimary: false,
      role: 'Secretary',
      organization: {
        id: 'org1',
        name: 'Igbo Union UK'
      }
    },
    {
      id: '3',
      name: 'Yoruba Manchester',
      slug: 'yoruba-manchester', 
      region: 'Manchester, UK',
      isPrimary: false,
      role: 'Member',
      organization: {
        id: 'org2',
        name: 'Yoruba Cultural Association'
      }
    }
  ]

  const currentCommunity = mockCommunities.find(c => c.id === currentCommunityId) || mockCommunities[0]

  const filteredSections = userSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block p-3 bg-blue-500/20 rounded-2xl mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Manage your personal profile, household, payments, and community participation
              </p>
              {user && (
                <div className="mt-4 flex items-center justify-center space-x-4 text-slate-400">
                  <span>📧 {user.email}</span>
                  {user.phone && <span>📱 {user.phone}</span>}
                  <button 
                    onClick={logout}
                    className="ml-6 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Community Switcher */}
            {userCommunities.length > 0 && (
              <div className="mb-12 max-w-md mx-auto">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Current Community</h3>
                  <p className="text-slate-400 text-sm">Switch between your communities</p>
                </div>
                <CommunitySwitcher
                  currentCommunity={userCommunities.find(c => c.id === currentCommunityId) || userCommunities[0]}
                  communities={userCommunities}
                  onCommunityChange={setCurrentCommunityId}
                />
                <div className="mt-3 text-center">
                  <p className="text-slate-400 text-sm">
                    Member of {userCommunities.length} {userCommunities.length === 1 ? 'community' : 'communities'}
                  </p>
                </div>
              </div>
            )}

            {/* No Communities Message */}
            {userCommunities.length === 0 && (
              <div className="mb-12 max-w-md mx-auto text-center">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <span className="text-4xl mb-4 block">🏘️</span>
                  <h3 className="text-lg font-semibold text-white mb-2">No Communities Yet</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    You haven't joined any communities yet. Explore and join communities to get started!
                  </p>
                  <Link 
                    href="/user/communities"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Browse Communities
                  </Link>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="max-w-lg mx-auto mb-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search user features…"
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* User Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-4 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Access →
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link 
                href="/user/profile" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Edit Profile
              </Link>
              <Link 
                href="/user/payments" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Payments
              </Link>
              <Link 
                href="/user/events" 
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                My Events
              </Link>
            </div>

            {/* Back to Main */}
            <div className="mt-8">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <span>←</span> Back to Main Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}