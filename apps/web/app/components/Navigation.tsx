'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/events', label: 'Events', icon: '📅' },
    { href: '/me', label: 'My Portal', icon: '👤' },
    { href: '/payments', label: 'Payments', icon: '💳' },
    { href: '/admin', label: 'Admin', icon: '⚙️' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 px-4 py-3 rounded-2xl text-purple-700 hover:text-purple-900 hover:bg-purple-100 transition-all duration-300 font-medium"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-3 rounded-2xl bg-purple-100 hover:bg-purple-200 transition-colors"
      >
        <span className="text-2xl text-purple-600">
          {isMobileMenuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Lembo Navigation
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 transition-colors"
                >
                  <span className="text-xl text-purple-600">✕</span>
                </button>
              </div>

              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 border border-purple-200 hover:shadow-lg transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-purple-900">{item.label}</div>
                      <div className="text-sm text-purple-600">Navigate to {item.label.toLowerCase()}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-100 border border-purple-200">
                <div className="text-sm text-purple-700 text-center">
                  <strong>Lembo Community Platform</strong><br />
                  Connecting African communities worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}