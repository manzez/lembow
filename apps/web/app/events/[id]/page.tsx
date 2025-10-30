'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Sample event data (in production, this would come from an API)
const eventData = {
  1: {
    id: 1,
    title: 'Igbo Cultural Festival 2025',
    description: 'Annual celebration of Igbo culture featuring traditional music, dance, authentic cuisine, and cultural exhibitions. Join us for a day of heritage celebration with performances by renowned artists, cultural workshops, and authentic Igbo delicacies prepared by our community chefs.',
    fullDescription: `
      The Igbo Cultural Festival 2025 is our most anticipated annual event, celebrating the rich heritage and vibrant traditions of the Igbo people. This year's festival promises to be our biggest yet, with over 300 expected attendees from across Wales and beyond.

      **What to Expect:**
      • Traditional Igbo music and dance performances by acclaimed artists
      • Cultural workshops including traditional craft making and storytelling
      • Authentic Igbo cuisine prepared by community chefs
      • Children's cultural activities and games
      • Art exhibitions featuring contemporary Igbo artists
      • Networking opportunities with community members

      **Schedule:**
      • 2:00 PM - Opening ceremony and welcome address
      • 2:30 PM - Traditional dance performances
      • 3:30 PM - Cultural workshops begin
      • 5:00 PM - Food service and community mingling
      • 6:30 PM - Live music performances
      • 8:00 PM - Closing ceremony

      Join us for this incredible celebration of our culture and heritage!
    `,
    date: '2025-03-15',
    time: '14:00',
    endTime: '20:00',
    venue: 'Cardiff Community Centre',
    address: 'Cardiff Bay, Cardiff CF10 5BZ, Wales',
    coordinates: { lat: 51.4656, lng: -3.1634 },
    price: 0,
    currency: 'GBP',
    capacity: 300,
    registered: 125,
    attendees: [
      { id: 1, name: 'Amara Okafor', avatar: null, status: 'attending', joinedDate: '2025-02-10' },
      { id: 2, name: 'Chike Eze', avatar: null, status: 'attending', joinedDate: '2025-02-12' },
      { id: 3, name: 'Ngozi Adebayo', avatar: null, status: 'maybe', joinedDate: '2025-02-15' },
      { id: 4, name: 'Ikenna Nwankwo', avatar: null, status: 'attending', joinedDate: '2025-02-18' },
      { id: 5, name: 'Chioma Okeke', avatar: null, status: 'attending', joinedDate: '2025-02-20' }
    ],
    category: 'Cultural',
    status: 'Open',
    organizer: 'Igbo Community Wales',
    organizerContact: 'events@igbocommunitywales.org',
    organizerPhone: '+44 7123 456789',
    imageUrl: null,
    gallery: [],
    tags: ['culture', 'music', 'dance', 'food', 'family-friendly'],
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: null,
    communityId: 'igbo-cardiff',
    requirements: ['Bring ID for registration', 'Comfortable clothing for activities', 'Appetite for delicious food!'],
    amenities: ['Free parking available', 'Wheelchair accessible', 'Childcare area', 'First aid on site'],
    FAQ: [
      {
        question: 'Is this event suitable for children?',
        answer: 'Yes! We have dedicated children\'s activities and a childcare area. Children under 12 attend free.'
      },
      {
        question: 'What food will be available?',
        answer: 'We\'ll have authentic Igbo dishes including jollof rice, egusi soup, suya, chin chin, and vegetarian options.'
      },
      {
        question: 'Do I need to bring anything?',
        answer: 'Just bring yourself and your appetite! We recommend comfortable clothing as there will be dancing and activities.'
      }
    ]
  }
  // Add more events as needed
}

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

export default function EventDetailsPage() {
  const params = useParams()
  const eventId = parseInt(params.id as string)
  const event = eventData[eventId as keyof typeof eventData]

  const [userRSVP, setUserRSVP] = useState<'yes' | 'no' | 'maybe' | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'location'>('details')

  const handleRSVP = (response: 'yes' | 'no' | 'maybe') => {
    setUserRSVP(response)
    
    const responseMessages = {
      yes: '🎉 Awesome! You\'re registered for this event!',
      maybe: '🤔 You\'re marked as maybe attending.',
      no: '❌ You\'ve declined this event.'
    }
    
    setToastMessage(responseMessages[response])
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/events" className="text-purple-600 hover:text-purple-800">
            ← Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/events" className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                ← Back to Events
              </Link>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.status === 'Open' ? 'bg-green-500/20 text-green-100' :
                  event.status === 'Members Only' ? 'bg-blue-500/20 text-blue-100' :
                  'bg-red-500/20 text-red-100'
                }`}>
                  {event.status}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.category === 'Cultural' ? 'bg-purple-500/20 text-purple-100' :
                  event.category === 'Religious' ? 'bg-blue-500/20 text-blue-100' :
                  'bg-gray-500/20 text-gray-100'
                }`}>
                  {event.category}
                </div>
              </div>
            </div>

            {/* Event Title and Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 drop-shadow-lg">{event.title}</h1>
                <p className="text-xl opacity-95 mb-6 leading-relaxed">{event.description}</p>
                
                {/* Quick Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-white/90">
                    <span className="text-2xl mr-3">📅</span>
                    <div>
                      <div className="font-semibold">{formatDate(event.date)}</div>
                      <div className="text-sm opacity-80">{formatTime(event.time)} - {formatTime(event.endTime)}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <div className="font-semibold">{event.venue}</div>
                      <div className="text-sm opacity-80">{event.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-2xl mr-3">👥</span>
                    <div>
                      <div className="font-semibold">{event.registered} registered</div>
                      <div className="text-sm opacity-80">of {event.capacity} capacity</div>
                    </div>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="text-2xl mr-3">💰</span>
                    <div>
                      <div className="font-semibold">{event.price === 0 ? 'Free' : `£${event.price}`}</div>
                      <div className="text-sm opacity-80">admission</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - RSVP Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Reserve Your Spot</h3>
                  
                  {/* Capacity Visualization */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{event.registered} registered</span>
                      <span>{event.capacity - event.registered} spots left</span>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full transition-all duration-500 relative overflow-hidden"
                        style={{width: `${(event.registered / event.capacity) * 100}%`}}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  {/* RSVP Status */}
                  {userRSVP && (
                    <div className={`mb-4 p-3 rounded-xl text-center font-bold ${
                      userRSVP === 'yes' ? 'bg-green-100 text-green-800' :
                      userRSVP === 'maybe' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {userRSVP === 'yes' ? '✅ You\'re Attending!' :
                       userRSVP === 'maybe' ? '🤔 You Might Attend' :
                       '❌ You\'re Not Attending'}
                    </div>
                  )}

                  {/* RSVP Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleRSVP('yes')}
                      className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        userRSVP === 'yes' 
                          ? 'bg-green-600 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
                      } ${event.registered >= event.capacity ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? '🚫 Event Full' : '✅ I\'m Attending'}
                    </button>
                    
                    <button 
                      onClick={() => handleRSVP('maybe')}
                      className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        userRSVP === 'maybe' 
                          ? 'bg-orange-600 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      🤔 Maybe Attending
                    </button>
                    
                    <button 
                      onClick={() => handleRSVP('no')}
                      className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        userRSVP === 'no' 
                          ? 'bg-gray-600 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      ❌ Can't Attend
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-200">
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <span className="text-lg mb-1">🤝</span>
                      <span className="text-xs font-medium text-gray-600">Invite</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <span className="text-lg mb-1">💾</span>
                      <span className="text-xs font-medium text-gray-600">Save</span>
                    </button>
                    <button className="flex flex-col items-center p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <span className="text-lg mb-1">📤</span>
                      <span className="text-xs font-medium text-gray-600">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl mb-8 border border-purple-200">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'details', label: 'Event Details', icon: '📋' },
                { id: 'attendees', label: 'Attendees', icon: '👥' },
                { id: 'location', label: 'Location', icon: '📍' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-8">
                  {/* Full Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                      {event.fullDescription.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">What to Bring</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <span className="text-green-500">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Amenities & Facilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-purple-50 rounded-lg p-3">
                          <span className="text-purple-500">🏢</span>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
                    <div className="space-y-4">
                      {event.FAQ.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">{item.question}</h5>
                          <p className="text-gray-700">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendees' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Who's Attending ({event.attendees.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.attendees.map(attendee => (
                      <div key={attendee.id} className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 border border-purple-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full flex items-center justify-center text-white font-bold">
                            {attendee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{attendee.name}</div>
                            <div className="text-sm text-gray-600">Joined {new Date(attendee.joinedDate).toLocaleDateString()}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            attendee.status === 'attending' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {attendee.status === 'attending' ? '✓' : '?'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Location</h3>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200 mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{event.venue}</h4>
                    <p className="text-gray-700 mb-4">{event.address}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                        <span>🗺️</span>
                        <span>Open in Maps</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                        <span>🚗</span>
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <span className="text-4xl mb-4 block">🗺️</span>
                      <p>Interactive map would be displayed here</p>
                      <p className="text-sm">Coordinates: {event.coordinates.lat}, {event.coordinates.lng}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Organizer Contact */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Event Organizer</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {event.organizer.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{event.organizer}</h4>
                  <p className="text-gray-600">{event.organizerContact}</p>
                  <p className="text-gray-600">{event.organizerPhone}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-colors">
                  Contact Organizer
                </button>
              </div>
            </div>
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
                  <p className="text-sm font-medium text-gray-900 mb-1">RSVP Updated!</p>
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
    </div>
  )
}