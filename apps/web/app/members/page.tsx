'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LoadingSpinner } from '../components/Loading'

interface Member {
  id: string
  name: string
  avatar: string
  title: string
  location: string
  joinDate: string
  bio: string
  interests: string[]
  eventsOrganized: number
  eventsAttended: number
  communityRoles: string[]
  isOnline: boolean
  lastActive: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    website?: string
  }
}

interface MemberFilters {
  search: string
  location: string
  interests: string[]
  role: string
  online: boolean
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [filters, setFilters] = useState<MemberFilters>({
    search: '',
    location: '',
    interests: [],
    role: '',
    online: false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock member data
  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '👩🏻‍💼',
      title: 'Community Organizer & Event Coordinator',
      location: 'Cardiff, Wales',
      joinDate: '2023-01-15',
      bio: 'Passionate about bringing communities together through meaningful events and cultural celebrations. Love organizing workshops and networking sessions.',
      interests: ['Event Planning', 'Culture', 'Networking', 'Leadership'],
      eventsOrganized: 12,
      eventsAttended: 34,
      communityRoles: ['Event Organizer', 'Community Leader'],
      isOnline: true,
      lastActive: '2 minutes ago',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarahchen',
        twitter: '@sarahchen_org'
      }
    },
    {
      id: '2',
      name: 'David Williams',
      avatar: '👨🏿‍💻',
      title: 'Software Engineer & Tech Mentor',
      location: 'Cardiff, Wales',
      joinDate: '2023-03-22',
      bio: 'Full-stack developer with 8 years of experience. Enjoy mentoring junior developers and organizing tech meetups in the community.',
      interests: ['Technology', 'Mentoring', 'Innovation', 'Education'],
      eventsOrganized: 5,
      eventsAttended: 22,
      communityRoles: ['Tech Lead', 'Mentor'],
      isOnline: false,
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Amara Okafor',
      avatar: '👩🏿‍🎨',
      title: 'Artist & Cultural Ambassador',
      location: 'Cardiff, Wales',
      joinDate: '2022-11-08',
      bio: 'Visual artist specializing in contemporary African art. Passionate about preserving and sharing cultural heritage through creative expression.',
      interests: ['Art', 'Culture', 'Heritage', 'Creativity'],
      eventsOrganized: 8,
      eventsAttended: 28,
      communityRoles: ['Cultural Ambassador', 'Artist'],
      isOnline: true,
      lastActive: '5 minutes ago',
      socialLinks: {
        instagram: '@amara_art',
        website: 'https://amaraokafor.art'
      }
    },
    {
      id: '4',
      name: 'James Thompson',
      avatar: '👨🏽‍🍳',
      title: 'Chef & Food Culture Enthusiast',
      location: 'Cardiff, Wales',
      joinDate: '2023-06-10',
      bio: 'Professional chef with expertise in African and Caribbean cuisine. Love hosting cooking workshops and food culture events.',
      interests: ['Cooking', 'Food Culture', 'Workshops', 'Heritage'],
      eventsOrganized: 15,
      eventsAttended: 18,
      communityRoles: ['Chef', 'Workshop Leader'],
      isOnline: false,
      lastActive: '3 hours ago'
    },
    {
      id: '5',
      name: 'Fatima Al-Rashid',
      avatar: '👩🏽‍⚕️',
      title: 'Healthcare Professional & Wellness Advocate',
      location: 'Cardiff, Wales',
      joinDate: '2023-02-18',
      bio: 'Registered nurse with a focus on community health and wellness. Organize health awareness events and wellness workshops.',
      interests: ['Healthcare', 'Wellness', 'Community Health', 'Education'],
      eventsOrganized: 7,
      eventsAttended: 25,
      communityRoles: ['Health Advocate', 'Wellness Coach'],
      isOnline: true,
      lastActive: 'Just now'
    },
    {
      id: '6',
      name: 'Marcus Johnson',
      avatar: '👨🏿‍🎓',
      title: 'University Student & Youth Leader',
      location: 'Cardiff, Wales',
      joinDate: '2023-09-05',
      bio: 'Business student at Cardiff University. Active in student organizations and passionate about youth empowerment and leadership development.',
      interests: ['Leadership', 'Youth Development', 'Business', 'Education'],
      eventsOrganized: 3,
      eventsAttended: 19,
      communityRoles: ['Youth Leader', 'Student Representative'],
      isOnline: true,
      lastActive: '10 minutes ago'
    }
  ]

  const allInterests = Array.from(new Set(mockMembers.flatMap(m => m.interests))).sort()
  const allLocations = Array.from(new Set(mockMembers.map(m => m.location))).sort()
  const allRoles = Array.from(new Set(mockMembers.flatMap(m => m.communityRoles))).sort()

  useEffect(() => {
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      setMembers(mockMembers)
      setFilteredMembers(mockMembers)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = members.filter(member => {
      const matchesSearch = filters.search === '' || 
        member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.bio.toLowerCase().includes(filters.search.toLowerCase())

      const matchesLocation = filters.location === '' || member.location === filters.location

      const matchesInterests = filters.interests.length === 0 || 
        filters.interests.some(interest => member.interests.includes(interest))

      const matchesRole = filters.role === '' || member.communityRoles.includes(filters.role)

      const matchesOnline = !filters.online || member.isOnline

      return matchesSearch && matchesLocation && matchesInterests && matchesRole && matchesOnline
    })

    setFilteredMembers(filtered)
  }, [members, filters])

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      interests: [],
      role: '',
      online: false
    })
  }

  const getJoinDuration = (joinDate: string) => {
    const join = new Date(joinDate)
    const now = new Date()
    const months = Math.floor((now.getTime() - join.getTime()) / (1000 * 60 * 60 * 24 * 30))
    return months === 0 ? 'This month' : `${months} month${months > 1 ? 's' : ''} ago`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading community members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-violet-300 dark:from-purple-600 dark:to-violet-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-300 to-pink-300 dark:from-fuchsia-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg animate-slide-up">
                Community Members
              </h1>
              <p className="text-2xl opacity-95 max-w-3xl mx-auto animate-slide-up animation-delay-300">
                Connect with amazing people in our vibrant community
              </p>
              <div className="mt-8 flex items-center justify-center space-x-8 text-lg animate-slide-up animation-delay-600">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">👥</span>
                  <span>{members.length} Members</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🟢</span>
                  <span>{members.filter(m => m.isOnline).length} Online</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  <span>Showing {filteredMembers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Filters & Controls */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 p-8 mb-8">
            
            {/* Search & View Toggle */}
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search members by name, title, or bio..."
                  className="w-full px-6 py-4 border-2 border-purple-200 dark:border-purple-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 dark:bg-gray-700/80 text-lg transition-all duration-300 hover:border-purple-300"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    <span className="mr-2">⊞</span>
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    <span className="mr-2">☰</span>
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700"
                >
                  <option value="">All Locations</option>
                  {allLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700"
                >
                  <option value="">All Roles</option>
                  {allRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.online}
                    onChange={(e) => setFilters(prev => ({ ...prev, online: e.target.checked }))}
                    className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Online Only</span>
                </label>
              </div>

              <div>
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Interest Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Interests</label>
              <div className="flex flex-wrap gap-3">
                {allInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 border-2 ${
                      filters.interests.includes(interest)
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white border-purple-400'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Members Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-bounce-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Member Header */}
                  <div className="bg-gradient-to-br from-purple-500 to-violet-500 p-6 text-white relative">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="text-4xl bg-white/20 rounded-full w-16 h-16 flex items-center justify-center">
                          {member.avatar}
                        </div>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold truncate">{member.name}</h3>
                        <p className="text-white/80 text-sm">{member.location}</p>
                        <p className="text-white/60 text-xs">{member.isOnline ? 'Online' : member.lastActive}</p>
                      </div>
                    </div>
                  </div>

                  {/* Member Content */}
                  <div className="p-6">
                    <p className="font-semibold text-purple-600 dark:text-purple-400 mb-2">{member.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{member.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-2xl">
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{member.eventsOrganized}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Organized</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-2xl">
                        <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{member.eventsAttended}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Attended</div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {member.interests.slice(0, 3).map(interest => (
                          <span
                            key={interest}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                        {member.interests.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                            +{member.interests.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/members/${member.id}`}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white text-center py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        View Profile
                      </Link>
                      <button className="px-4 py-3 bg-white dark:bg-gray-700 border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-2xl font-medium hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                        💬
                      </button>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="px-6 pb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                      Joined {getJoinDuration(member.joinDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="border-b border-purple-100 dark:border-purple-800 last:border-b-0 p-6 hover:bg-purple-50 dark:hover:bg-purple-950 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="relative flex-shrink-0">
                      <div className="text-3xl bg-purple-100 dark:bg-purple-900 rounded-full w-12 h-12 flex items-center justify-center">
                        {member.avatar}
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{member.name}</h3>
                          <p className="text-purple-600 dark:text-purple-400 font-medium">{member.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{member.location}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {member.isOnline ? '🟢 Online' : member.lastActive}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{member.bio}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-purple-600 dark:text-purple-400">
                            📅 {member.eventsOrganized} organized
                          </span>
                          <span className="text-purple-600 dark:text-purple-400">
                            🎫 {member.eventsAttended} attended
                          </span>
                          <span className="text-gray-500 dark:text-gray-500">
                            👤 {getJoinDuration(member.joinDate)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/members/${member.id}`}
                            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            View Profile
                          </Link>
                          <button className="px-3 py-2 bg-white dark:bg-gray-700 border-2 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-xl font-medium hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
                            💬
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Members Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Show All Members
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}