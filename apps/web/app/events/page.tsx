'use client'
import { useState } from 'react'
import Link from 'next/link'

// Sample events data - comprehensive event information
const sampleEvents = [
  {
    id: 1,
    title: 'Igbo Cultural Festival 2025',
    description: 'Annual celebration of Igbo culture featuring traditional music, dance, authentic cuisine, and cultural exhibitions. Join us for a day of heritage celebration with performances by renowned artists.',
    date: '2025-03-15',
    time: '14:00',
    endTime: '20:00',
    venue: 'Cardiff Community Centre',
    address: 'Cardiff Bay, Cardiff CF10 5BZ, Wales',
    price: 0,
    currency: 'GBP',
    capacity: 300,
    registered: 125,
    category: 'Cultural',
    status: 'Open',
    organizer: 'Igbo Community Wales',
    organizerContact: 'events@igbocommunitywales.org',
    imageUrl: null,
    tags: ['culture', 'music', 'dance', 'food', 'family-friendly'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  },
  {
    id: 2,
    title: 'New Year Thanksgiving Service',
    description: 'Community thanksgiving and prayers for the new year. A spiritual gathering to give thanks and set intentions for the coming year with traditional prayers and hymns.',
    date: '2026-01-12',
    time: '11:00',
    endTime: '13:00',
    venue: 'St. David\'s Church Cardiff',
    address: '15 Charles Street, Cardiff CF10 2SF, Wales',
    price: 0,
    currency: 'GBP',
    capacity: 150,
    registered: 67,
    category: 'Religious',
    status: 'Open',
    organizer: 'Igbo Community Wales',
    organizerContact: 'events@igbocommunitywales.org',
    imageUrl: null,
    tags: ['thanksgiving', 'prayer', 'spiritual', 'community'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  },
  {
    id: 3,
    title: 'Monthly General Meeting',
    description: 'Monthly community meeting to discuss upcoming projects, initiatives, and community matters. All members are encouraged to attend and participate in community decisions.',
    date: '2025-11-08',
    time: '19:00',
    endTime: '21:00',
    venue: 'Cardiff Bay Community Centre',
    address: 'Hemingway Road, Cardiff Bay CF10 4JY, Wales',
    price: 0,
    currency: 'GBP',
    capacity: 80,
    registered: 34,
    category: 'Meeting',
    status: 'Members Only',
    organizer: 'Igbo Community Wales',
    organizerContact: 'admin@igbocommunitywales.org',
    imageUrl: null,
    tags: ['meeting', 'members', 'governance', 'community'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  },
  {
    id: 4,
    title: 'Igbo Language Classes - Beginner Level',
    description: 'Learn to speak Igbo language with native speakers. Perfect for children and adults who want to connect with their heritage or learn about Igbo culture.',
    date: '2025-11-15',
    time: '10:00',
    endTime: '12:00',
    venue: 'Cardiff University Community Hub',
    address: '40-41 Park Place, Cardiff CF10 3BB, Wales',
    price: 15,
    currency: 'GBP',
    capacity: 25,
    registered: 18,
    category: 'Education',
    status: 'Open',
    organizer: 'Igbo Community Wales Education Committee',
    organizerContact: 'education@igbocommunitywales.org',
    imageUrl: null,
    tags: ['education', 'language', 'culture', 'children', 'adults'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  },
  {
    id: 5,
    title: 'Entrepreneurship Workshop: Starting Your Business in Wales',
    description: 'Workshop for aspiring entrepreneurs in the Nigerian diaspora. Learn about business registration, funding opportunities, and networking with successful business owners.',
    date: '2025-12-03',
    time: '13:00',
    endTime: '17:00',
    venue: 'Cardiff Metropolitan University',
    address: 'Llandaff Campus, Western Avenue, Cardiff CF5 2YB, Wales',
    price: 25,
    currency: 'GBP',
    capacity: 50,
    registered: 28,
    category: 'Business',
    status: 'Open',
    organizer: 'Igbo Business Network Wales',
    organizerContact: 'business@igbocommunitywales.org',
    imageUrl: null,
    tags: ['business', 'entrepreneurship', 'workshop', 'networking'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  },
  {
    id: 6,
    title: 'Children\'s Christmas Party',
    description: 'Annual Christmas celebration for children and families. Features games, gift exchanges, traditional Christmas carols, and special appearance by Father Christmas!',
    date: '2025-12-21',
    time: '15:00',
    endTime: '18:00',
    venue: 'Cardiff Community Centre',
    address: 'Cardiff Bay, Cardiff CF10 5BZ, Wales',
    price: 10,
    currency: 'GBP',
    capacity: 100,
    registered: 45,
    category: 'Family',
    status: 'Open',
    organizer: 'Igbo Community Wales Family Committee',
    organizerContact: 'families@igbocommunitywales.org',
    imageUrl: null,
    tags: ['christmas', 'children', 'family', 'celebration', 'gifts'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff'
  }
]

const categories = ['All', 'Cultural', 'Religious', 'Meeting', 'Education', 'Business', 'Family', 'Social']

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':')
  const date = new Date()
  date.setHours(parseInt(hours), parseInt(minutes))
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [userRSVPs, setUserRSVPs] = useState<{[eventId: number]: 'yes' | 'no' | 'maybe'}>({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // RSVP Handler
  const handleRSVP = (eventId: number, response: 'yes' | 'no' | 'maybe') => {
    setUserRSVPs(prev => ({
      ...prev,
      [eventId]: response
    }))
    
    const responseMessages = {
      yes: '✅ You\'re attending! We can\'t wait to see you there! 🎉',
      maybe: '🤔 You\'re marked as maybe. Hope to see you there!',
      no: '❌ You\'ve declined this event.'
    }
    
    setToastMessage(responseMessages[response])
    setShowToast(true)
    
    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000)
  }

  const filteredEvents = sampleEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-lg">Community Events</h1>
              <p className="text-xl opacity-95 max-w-3xl mx-auto leading-relaxed">
                Discover upcoming events, cultural celebrations, and community gatherings. 
                Connect with your heritage and build lasting friendships.
              </p>
            </div>
        </div>
      </div>

        {/* Navigation */}
        <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                ← Back to Communities
              </Link>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/admin" 
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Admin Panel
                </Link>
                <Link
                  href="/events/create"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  + Create Event
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Filters and Search */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-purple-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-purple-400 text-xl">🔍</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg transform scale-105'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-purple-50 rounded-2xl p-1 border border-purple-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white text-purple-600 shadow-lg transform scale-105' : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                📊 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white text-purple-600 shadow-lg transform scale-105' : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                📋 List
              </button>
            </div>
          </div>
        </div>

        {/* Events Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Events Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => {
              const userRSVP = userRSVPs[event.id]
              const isUserAttending = userRSVP === 'yes'
              return (
              <div key={event.id} className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                isUserAttending ? 'border-green-300 ring-2 ring-green-100' : 'border-purple-200'
              }`}>
                
                {/* User RSVP Status Banner */}
                {userRSVP && (
                  <div className={`px-4 py-2 text-center text-sm font-bold ${
                    userRSVP === 'yes' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                    userRSVP === 'maybe' ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' :
                    'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  }`}>
                    {userRSVP === 'yes' ? '✅ You\'re Attending!' : 
                     userRSVP === 'maybe' ? '🤔 You Might Attend' : 
                     '❌ You\'re Not Attending'}
                  </div>
                )}

                {/* Event Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${
                  event.category === 'Cultural' ? 'from-purple-500 to-fuchsia-600' :
                  event.category === 'Religious' ? 'from-blue-500 to-indigo-600' :
                  event.category === 'Meeting' ? 'from-gray-500 to-slate-600' :
                  event.category === 'Education' ? 'from-green-500 to-teal-600' :
                  event.category === 'Business' ? 'from-orange-500 to-red-600' :
                  'from-pink-500 to-rose-600'
                } flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <span className="text-5xl animate-float relative z-10">
                    {event.category === 'Cultural' ? '�' :
                     event.category === 'Religious' ? '🙏' :
                     event.category === 'Meeting' ? '👥' :
                     event.category === 'Education' ? '📚' :
                     event.category === 'Business' ? '💼' :
                     '👨‍👩‍👧‍👦'}
                  </span>
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                      event.category === 'Religious' ? 'bg-blue-100 text-blue-800' :
                      event.category === 'Meeting' ? 'bg-gray-100 text-gray-800' :
                      event.category === 'Education' ? 'bg-green-100 text-green-800' :
                      event.category === 'Business' ? 'bg-orange-100 text-orange-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {event.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      event.status === 'Open' ? 'bg-green-100 text-green-800' :
                      event.status === 'Members Only' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🕒</span>
                      {formatTime(event.time)} - {formatTime(event.endTime)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">👥</span>
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {event.price === 0 ? 'Free' : `£${event.price}`}
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(event.registered / event.capacity) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* RSVP Actions */}
                  <div className="space-y-3">
                    {/* RSVP Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        RSVP Status
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-green-600">Available</span>
                      </div>
                    </div>

                    {/* Capacity Visualization */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Registered: {event.registered}</span>
                        <span>Capacity: {event.capacity}</span>
                      </div>
                      <div className="relative w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full transition-all duration-500 relative overflow-hidden"
                          style={{width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`}}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                    </div>

                    {/* RSVP Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                          event.registered >= event.capacity 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
                        }`}
                        disabled={event.registered >= event.capacity}
                        onClick={() => handleRSVP(event.id, 'yes')}
                      >
                        {event.registered >= event.capacity ? '🚫 Full' : '✅ Attending'}
                      </button>
                      <button 
                        className="flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl"
                        onClick={() => handleRSVP(event.id, 'maybe')}
                      >
                        🤔 Maybe
                      </button>
                      <Link 
                        href={`/events/${event.id}`}
                        className="flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl text-center"
                      >
                        👁️ Details
                      </Link>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors">
                        <span>🤝</span>
                        <span className="text-xs font-medium">Invite Friends</span>
                      </button>
                      <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors">
                        <span>💾</span>
                        <span className="text-xs font-medium">Save Event</span>
                      </button>
                      <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors">
                        <span>📤</span>
                        <span className="text-xs font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  
                  {/* Event Image */}
                  <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🎉</span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                          event.category === 'Religious' ? 'bg-blue-100 text-blue-800' :
                          event.category === 'Meeting' ? 'bg-gray-100 text-gray-800' :
                          event.category === 'Education' ? 'bg-green-100 text-green-800' :
                          event.category === 'Business' ? 'bg-orange-100 text-orange-800' :
                          'bg-pink-100 text-pink-800'
                        }`}>
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          event.status === 'Open' ? 'bg-green-100 text-green-800' :
                          event.status === 'Members Only' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {event.price === 0 ? 'Free' : `£${event.price}`}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📅</span>
                        <div>
                          <div className="font-medium">{formatDate(event.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🕒</span>
                        <div>
                          <div className="font-medium">{formatTime(event.time)} - {formatTime(event.endTime)}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📍</span>
                        <div>
                          <div className="font-medium">{event.venue}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">👥</span>
                        <div>
                          <div className="font-medium">{event.registered}/{event.capacity}</div>
                          <div className="text-xs">registered</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(event.registered / event.capacity) * 100}%`}}
                        ></div>
                      </div>
                      <button 
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          event.registered >= event.capacity 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity ? 'Event Full' : 'RSVP Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No events match your search "${searchQuery}"`
                : selectedCategory !== 'All' 
                  ? `No events found in ${selectedCategory} category`
                  : 'No events are currently scheduled'
              }
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
              Create New Event
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 p-6 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🎉</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">RSVP Confirmed!</p>
                <p className="text-sm text-gray-600">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-lg">×</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}