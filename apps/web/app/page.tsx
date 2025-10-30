'use client'

import Link from 'next/link'
import { useState } from 'react'

const platformSections = [
  {
    icon: '🏠',
    title: 'Home',
    description: 'Platform overview and welcome',
    href: '/',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '📊',
    title: 'Dashboard',
    description: 'Community insights and management',
    href: '/dashboard',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '🎉',
    title: 'Events',
    description: 'Browse and manage events',
    href: '/events',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: '⭐',
    title: 'Create Event',
    description: 'Organize new community event',
    href: '/events/create',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '👥',
    title: 'Members',
    description: 'Community member directory',
    href: '/members',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: '🌍',
    title: 'Communities',
    description: 'Browse community groups',
    href: '/communities',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: '👤',
    title: 'My Profile',
    description: 'Personal profile and settings',
    href: '/profile',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    icon: '⚙️',
    title: 'Admin',
    description: 'Administrative controls',
    href: '/admin',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: '💬',
    title: 'Chat',
    description: 'Real-time community discussions',
    href: '/chat',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: '🔔',
    title: 'Notifications',
    description: 'Stay updated with alerts',
    href: '/notifications',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: '📈',
    title: 'Analytics',
    description: 'Insights and engagement metrics',
    href: '/analytics',
    color: 'from-violet-500 to-violet-600'
  },
  {
    icon: '💳',
    title: 'Payments',
    description: 'Manage dues and transactions',
    href: '/payments',
    color: 'from-emerald-500 to-emerald-600'
  }
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSections = platformSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section with Image */}
        <section className="py-16">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                    ORGANISE YOUR WAY,
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      MANAGE YOUR GROUPS
                    </span>
                    <br />
                    WITH EASE
                  </h1>
                  
                  <p className="text-xl text-slate-300 mt-6 leading-relaxed">
                    The complete community platform. Connect, engage, and grow your community with powerful tools designed for modern group management.
                  </p>
                </div>

                {/* Email Signup */}
                <div className="max-w-md">
                  <form onSubmit={handleEmailSubmit} className="flex space-x-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <button type="submit" className="btn-primary px-6 py-3 shadow-lg hover:shadow-xl">Get Started</button>
                  </form>
                  <p className="text-sm text-slate-400 mt-2">
                    Start your free trial today. No credit card required.
                  </p>
                </div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-3xl backdrop-blur-sm border border-slate-700 p-8 flex items-center justify-center">
                  {/* Placeholder for community image - using icons to represent community management */}
                  <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                      👥
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform -rotate-2 hover:rotate-1 transition-transform">
                      📅
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform rotate-1 hover:-rotate-2 transition-transform">
                      💬
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform -rotate-1 hover:rotate-3 transition-transform">
                      📊
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform rotate-2 hover:-rotate-1 transition-transform">
                      🎉
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg transform -rotate-3 hover:rotate-2 transition-transform">
                      🌍
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Overview Section */}
        <section className="py-16 bg-slate-800/30 backdrop-blur-sm">
          <div className="container-page">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Platform Overview and Welcome
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover all the powerful features and tools available to manage your community effectively.
              </p>
            </div>

            {/* Local Search for Sections */}
            <div className="max-w-lg mx-auto mb-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sections…"
                className="w-full px-4 py-3 bg-slate-900/40 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Platform Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSections.map((section, index) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group card hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-500/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {section.description}
                  </p>
                  <div className="mt-4 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn-primary px-6 py-3 shadow-lg hover:shadow-xl">Go to Dashboard</Link>
              <Link href="/events/create" className="btn px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl">Create Event</Link>
              <Link href="/chat" className="btn px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl">Join Chat</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
