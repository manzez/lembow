'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SuperAdminRoute } from '../../components/ProtectedRoute'

const superAdminSections = [
  {
    icon: '�️',
    title: 'Organizations',
    description: 'Manage parent organizations and their community networks',
    href: '/super-admin/organizations',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '�🏢',
    title: 'All Communities',
    description: 'Manage all communities across the platform',
    href: '/super-admin/communities',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: '👑',
    title: 'Platform Analytics',
    description: 'Global platform metrics and insights',
    href: '/super-admin/analytics',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '🛠️',
    title: 'System Settings',
    description: 'Platform-wide configuration and settings',
    href: '/super-admin/settings',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '👥',
    title: 'User Management',
    description: 'Manage all platform users and permissions',
    href: '/super-admin/users',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: '🔐',
    title: 'Security & Audit',
    description: 'Security logs and audit trails',
    href: '/super-admin/security',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '💰',
    title: 'Financial Overview',
    description: 'Platform-wide financial analytics',
    href: '/super-admin/financials',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '📊',
    title: 'Reports & Exports',
    description: 'Generate and export platform reports',
    href: '/super-admin/reports',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: '🔧',
    title: 'Developer Tools',
    description: 'API management and developer resources',
    href: '/super-admin/developer',
    color: 'from-gray-500 to-gray-600'
  }
]

export default function SuperAdminPage() {
  return (
    <SuperAdminRoute>
      <SuperAdminContent />
    </SuperAdminRoute>
  )
}

function SuperAdminContent() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSections = superAdminSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block p-3 bg-red-500/20 rounded-2xl mb-6">
                <span className="text-4xl">👑</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Super Admin
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Platform-wide management and oversight for all communities and users
              </p>
              
              {/* Warning Banner */}
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl max-w-md mx-auto">
                <p className="text-red-300 text-sm font-medium">
                  ⚠️ Super Admin Access - High-level permissions active
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-lg mx-auto mb-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search admin features…"
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Admin Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-red-500/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-4 text-red-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage →
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link 
                href="/super-admin/communities" 
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Manage Communities
              </Link>
              <Link 
                href="/super-admin/analytics" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Analytics
              </Link>
              <Link 
                href="/super-admin/users" 
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                User Management
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