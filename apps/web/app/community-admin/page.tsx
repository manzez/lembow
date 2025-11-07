'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AdminRoute } from '../../components/ProtectedRoute'

const communityAdminSections = [
  {
    icon: '👥',
    title: 'Members',
    description: 'Manage community members and households',
    href: '/community-admin/members',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '🌳',
    title: 'Branches & Network',
    description: 'Manage sister communities and branches',
    href: '/community-admin/branches',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: '📅',
    title: 'Events',
    description: 'Create and manage community events',
    href: '/community-admin/events',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: '💰',
    title: 'Dues & Payments',
    description: 'Track member payments and dues',
    href: '/community-admin/payments',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Community insights and reports',
    href: '/community-admin/analytics',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '🏪',
    title: 'Sellers Directory',
    description: 'Manage community business directory',
    href: '/community-admin/sellers',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: '📢',
    title: 'Campaigns',
    description: 'Create and manage community campaigns',
    href: '/community-admin/campaigns',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '🔔',
    title: 'Communications',
    description: 'Send notifications and messages',
    href: '/community-admin/communications',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: '⚙️',
    title: 'Community Settings',
    description: 'Configure community preferences',
    href: '/community-admin/settings',
    color: 'from-gray-500 to-gray-600'
  }
]

export default function CommunityAdminPage() {
  return (
    <AdminRoute>
      <CommunityAdminContent />
    </AdminRoute>
  )
}

function CommunityAdminContent() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSections = communityAdminSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block p-3 bg-green-500/20 rounded-2xl mb-6">
                <span className="text-4xl">🏛️</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Community Admin
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Manage your community members, events, and activities
              </p>
              
              {/* Community Info */}
              <div className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl max-w-md mx-auto">
                <p className="text-green-300 text-sm font-medium">
                  🏛️ Managing: <span className="font-bold">Igbo Cardiff Community</span>
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-lg mx-auto mb-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search management features…"
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Community Admin Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-500/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-4 text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage →
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link 
                href="/community-admin/members" 
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Manage Members
              </Link>
              <Link 
                href="/community-admin/events" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Event
              </Link>
              <Link 
                href="/community-admin/analytics" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Analytics
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