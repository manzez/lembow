'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

interface NavigationItem {
  label: string
  href: string
  icon: string
  description: string
}

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: '🏠',
      description: 'Platform overview and welcome'
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      description: 'Community insights and management'
    },
    {
      label: 'Events',
      href: '/events',
      icon: '🎉',
      description: 'Browse and manage events'
    },
    {
      label: 'Create Event',
      href: '/events/create',
      icon: '✨',
      description: 'Organize new community event'
    },
    {
      label: 'Members',
      href: '/members',
      icon: '👥',
      description: 'Community member directory'
    },
    {
      label: 'Communities',
      href: '/c',
      icon: '🌍',
      description: 'Browse community groups'
    },
    {
      label: 'My Profile',
      href: '/me',
      icon: '👤',
      description: 'Personal profile and settings'
    },
    {
      label: 'Admin',
      href: '/admin',
      icon: '⚙️',
      description: 'Platform administration'
    }
  ]

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Navigation Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[9999] lg:hidden bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border-2 border-white/20"
        aria-label="Toggle navigation menu"
      >
        <div className="flex flex-col space-y-1.5 w-6 h-6">
          <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9990] lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-white via-purple-50 to-violet-100 
        dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 backdrop-blur-xl z-[9995] lg:hidden
        transform transition-transform duration-500 ease-in-out shadow-2xl border-l-2 border-purple-200 dark:border-purple-800
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Navigation Header */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Navigation</h2>
            <div className="flex items-center space-x-3">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors text-2xl"
              >
                ×
              </button>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-4">Explore the Lembo platform</p>
        </div>

        {/* Navigation Items */}
        <div className="p-6 space-y-2 overflow-y-auto h-full pb-32">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                group block p-4 rounded-2xl transition-all duration-300 border-2
                animate-slide-up hover:shadow-lg transform hover:scale-105
                ${isActiveRoute(item.href)
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white border-purple-400 shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-500 text-gray-700 dark:text-gray-200 hover:text-white border-purple-200 dark:border-purple-700 hover:border-purple-400'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-4">{item.icon}</span>
                <span className="font-semibold text-lg">{item.label}</span>
              </div>
              <p className={`text-sm ml-10 transition-colors ${
                isActiveRoute(item.href) 
                  ? 'text-white/80' 
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-white/80'
              }`}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-gray-900 via-purple-50/50 dark:via-purple-950/50 to-transparent">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-4 text-white text-center">
            <p className="font-semibold">Lembo Platform</p>
            <p className="text-sm text-white/80">Connecting Communities</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Indicator */}
      <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center space-x-4">
        <ThemeToggle />
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-white/20">
          <div className="flex items-center space-x-3">
            <span className="text-lg">🎯</span>
            <span className="font-semibold">
              {navigationItems.find(item => isActiveRoute(item.href))?.label || 'Lembo Platform'}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}