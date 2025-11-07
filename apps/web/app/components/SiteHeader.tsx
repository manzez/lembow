"use client"

import Link from 'next/link'
import { useState } from 'react'
import RoleIndicator from '../../components/RoleIndicator'
import OrganizationLogo from './OrganizationLogo'
import { useAuth } from '../../contexts/AuthContext'

export default function SiteHeader() {
  const { user } = useAuth()

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Lembow
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">
                  Community Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/communities" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Communities
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Events
            </Link>
            <Link href="/collaboration-analytics" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Collaborations
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Right: User Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-500 hover:text-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
