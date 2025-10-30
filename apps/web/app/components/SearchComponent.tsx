'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  type: 'event' | 'member' | 'community' | 'page'
  title: string
  description: string
  href: string
  metadata?: {
    date?: string
    location?: string
    memberCount?: number
    category?: string
    status?: string
  }
}

interface SearchFilters {
  type: 'all' | 'events' | 'members' | 'communities' | 'pages'
  dateRange: 'all' | 'today' | 'week' | 'month'
  location: string
  category: string
}

export default function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    dateRange: 'all',
    location: '',
    category: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Mock data for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'event',
      title: 'Cultural Festival 2024',
      description: 'Annual celebration of diverse cultures in Cardiff',
      href: '/events/cultural-festival-2024',
      metadata: {
        date: 'Dec 15, 2024',
        location: 'Cardiff Community Centre',
        category: 'Cultural',
        status: 'upcoming'
      }
    },
    {
      id: '2',
      type: 'event',
      title: 'Community Meetup',
      description: 'Monthly networking and community building event',
      href: '/events/community-meetup',
      metadata: {
        date: 'Dec 8, 2024',
        location: 'Cardiff Bay Community Centre',
        category: 'Social',
        status: 'upcoming'
      }
    },
    {
      id: '3',
      type: 'member',
      title: 'Sarah Chen',
      description: 'Community organizer and event coordinator',
      href: '/members/sarah-chen',
      metadata: {
        location: 'Cardiff, Wales'
      }
    },
    {
      id: '4',
      type: 'community',
      title: 'Cardiff African Community',
      description: 'Connecting African diaspora in Cardiff and surrounding areas',
      href: '/c/cardiff-african',
      metadata: {
        memberCount: 847,
        location: 'Cardiff, Wales'
      }
    },
    {
      id: '5',
      type: 'event',
      title: 'Business Networking Breakfast',
      description: 'Connect with local entrepreneurs and business owners',
      href: '/events/business-networking',
      metadata: {
        date: 'Dec 12, 2024',
        location: 'Cardiff Metropolitan University',
        category: 'Business',
        status: 'upcoming'
      }
    }
  ]

  // Search functionality
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filteredResults = mockResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                            result.description.toLowerCase().includes(query.toLowerCase())
        
        const matchesType = filters.type === 'all' || 
                           (filters.type === 'events' && result.type === 'event') ||
                           (filters.type === 'members' && result.type === 'member') ||
                           (filters.type === 'communities' && result.type === 'community') ||
                           (filters.type === 'pages' && result.type === 'page')
        
        const matchesLocation = filters.location === '' || 
                               result.metadata?.location?.toLowerCase().includes(filters.location.toLowerCase())
        
        const matchesCategory = filters.category === '' || 
                               result.metadata?.category?.toLowerCase() === filters.category.toLowerCase()

        return matchesQuery && matchesType && matchesLocation && matchesCategory
      })

      setResults(filteredResults)
      setSelectedIndex(-1)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, filters])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            router.push(results[selectedIndex].href)
            handleClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          handleClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, router])

  // Global search hotkey (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
  }

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'event':
        return '🎉'
      case 'member':
        return '👤'
      case 'community':
        return '🌍'
      case 'page':
        return '📄'
      default:
        return '🔍'
    }
  }

  const getResultTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'event':
        return 'Event'
      case 'member':
        return 'Member'
      case 'community':
        return 'Community'
      case 'page':
        return 'Page'
      default:
        return 'Result'
    }
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'event':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'member':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'community':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'page':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
      >
        <span className="text-lg">🔍</span>
        <span className="hidden sm:inline">Search...</span>
        <div className="hidden md:flex items-center space-x-1 text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-lg">
          <span>⌘</span>
          <span>K</span>
        </div>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[9998] animate-fade-in"
            onClick={handleClose}
          />

          {/* Search Panel */}
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl mx-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 z-[9999] animate-slide-up overflow-hidden">
            
            {/* Search Input */}
            <div className="p-6 border-b border-purple-100 dark:border-purple-800">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events, members, communities..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-xl border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                {isLoading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin w-6 h-6 border-2 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-purple-100 dark:border-purple-800">
              <div className="flex flex-wrap gap-3">
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as SearchFilters['type'] }))}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="events">Events</option>
                  <option value="members">Members</option>
                  <option value="communities">Communities</option>
                  <option value="pages">Pages</option>
                </select>

                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Location..."
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-w-0 flex-1"
                />

                <input
                  type="text"
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Category..."
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-w-0 flex-1"
                />
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-96 overflow-y-auto">
              {query.trim() === '' ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <p className="text-lg">Start typing to search across the platform</p>
                  <p className="text-sm mt-2">Search events, members, communities, and more</p>
                </div>
              ) : results.length === 0 && !isLoading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <span className="text-4xl mb-4 block">🤷‍♂️</span>
                  <p className="text-lg">No results found for "{query}"</p>
                  <p className="text-sm mt-2">Try adjusting your search terms or filters</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.href}
                      onClick={handleClose}
                      className={`
                        block p-4 rounded-2xl transition-all duration-300 border-2
                        ${selectedIndex === index
                          ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white border-purple-400'
                          : 'bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-950 border-transparent hover:border-purple-200 dark:hover:border-purple-800'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl mt-1">{getResultIcon(result.type)}</span>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className={`font-semibold text-lg truncate ${
                              selectedIndex === index ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {result.title}
                            </h3>
                            <span className={`
                              px-2 py-1 rounded-lg text-xs font-medium
                              ${selectedIndex === index 
                                ? 'bg-white/20 text-white' 
                                : getTypeColor(result.type)
                              }
                            `}>
                              {getResultTypeLabel(result.type)}
                            </span>
                          </div>
                          
                          <p className={`text-sm mb-2 ${
                            selectedIndex === index ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {result.description}
                          </p>
                          
                          {result.metadata && (
                            <div className={`flex flex-wrap gap-3 text-xs ${
                              selectedIndex === index ? 'text-white/70' : 'text-gray-500 dark:text-gray-500'
                            }`}>
                              {result.metadata.date && (
                                <div className="flex items-center">
                                  <span className="mr-1">📅</span>
                                  {result.metadata.date}
                                </div>
                              )}
                              {result.metadata.location && (
                                <div className="flex items-center">
                                  <span className="mr-1">📍</span>
                                  {result.metadata.location}
                                </div>
                              )}
                              {result.metadata.memberCount && (
                                <div className="flex items-center">
                                  <span className="mr-1">👥</span>
                                  {result.metadata.memberCount.toLocaleString()} members
                                </div>
                              )}
                              {result.metadata.category && (
                                <div className="flex items-center">
                                  <span className="mr-1">🏷️</span>
                                  {result.metadata.category}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">↑↓</span>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">↵</span>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ESC</span>
                    <span>Close</span>
                  </div>
                </div>
                <div>
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}