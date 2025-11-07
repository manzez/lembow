'use client'

import { useState } from 'react'
import { Music, MapPin, Calendar, Phone, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const DJS = [
  {
    id: 1,
    name: 'DJ Ace',
    specialties: ['Afrobeats', 'Hip Hop', 'R&B'],
    location: 'London',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    phone: '+44 7700 900001',
    email: 'djace@example.com',
    experience: '10+ years'
  },
  {
    id: 2,
    name: 'DJ Bella',
    specialties: ['Reggae', 'Dancehall', 'Soca'],
    location: 'Birmingham',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    phone: '+44 7700 900002',
    email: 'djbella@example.com',
    experience: '8+ years'
  },
  {
    id: 3,
    name: 'DJ Crown',
    specialties: ['Bollywood', 'Bhangra', 'Top 40'],
    location: 'Manchester',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    phone: '+44 7700 900003',
    email: 'djcrown@example.com',
    experience: '12+ years'
  },
  {
    id: 4,
    name: 'DJ Elite',
    specialties: ['House', 'EDM', 'Disco'],
    location: 'Leeds',
    image: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=400&h=400&fit=crop',
    phone: '+44 7700 900004',
    email: 'djelite@example.com',
    experience: '7+ years'
  }
]

export default function DJBookingPage() {
  const [selectedDJ, setSelectedDJ] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    eventDate: '',
    eventType: '',
    duration: '',
    venueAddress: '',
    guestCount: '',
    additionalInfo: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDJ) return
    
    const dj = DJS.find(d => d.id === selectedDJ)
    console.log('DJ booking request:', { dj, ...formData })
    
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const selectedDJData = selectedDJ ? DJS.find(d => d.id === selectedDJ) : null

  if (submitted && selectedDJData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-10 h-10 text-pink-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Request Sent!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Your DJ booking request has been sent to <span className="font-bold text-pink-600">{selectedDJData.name}</span>. 
            They will contact you within 24 hours to discuss availability and finalize the booking.
          </p>

          <div className="bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 mb-8">
            <p className="text-pink-800 font-medium mb-3">Event Summary:</p>
            <div className="text-left space-y-2 text-sm text-pink-700">
              <p>📅 <span className="font-semibold">Date:</span> {formData.eventDate}</p>
              <p>🎉 <span className="font-semibold">Type:</span> {formData.eventType}</p>
              <p>⏱️ <span className="font-semibold">Duration:</span> {formData.duration}</p>
              <p>📍 <span className="font-semibold">Location:</span> {formData.city}</p>
              <p>👥 <span className="font-semibold">Guest Count:</span> {formData.guestCount}</p>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
            <p className="text-purple-800 font-medium mb-2">
              📞 {selectedDJData.name} will reach out via:
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-purple-700">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedDJData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Email</span>
              </div>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Back to Marketplace
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-900 via-purple-800 to-pink-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book a Professional DJ
            </h1>
            <p className="text-xl text-pink-100">
              Experienced DJs for weddings, parties, and corporate events
            </p>
          </div>
        </div>
      </section>

      {/* DJ Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Choose Your DJ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {DJS.map((dj) => (
              <div
                key={dj.id}
                className={`bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedDJ === dj.id 
                    ? 'ring-4 ring-pink-500 shadow-2xl scale-105' 
                    : 'border-2 border-gray-100 hover:shadow-xl hover:border-pink-300'
                }`}
                onClick={() => setSelectedDJ(dj.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dj.image}
                    alt={dj.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedDJ === dj.id && (
                    <div className="absolute inset-0 bg-pink-600/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dj.name}</h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {dj.location}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dj.specialties.map((specialty) => (
                      <span key={specialty} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {dj.experience} experience
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          {selectedDJ && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book {selectedDJData?.name}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="To find closest DJ"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    >
                      <option value="">Select type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="graduation">Graduation</option>
                      <option value="other">Other Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                    <select
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    >
                      <option value="">Select duration</option>
                      <option value="2-hours">2 hours</option>
                      <option value="3-hours">3 hours</option>
                      <option value="4-hours">4 hours</option>
                      <option value="5-hours">5 hours</option>
                      <option value="6-hours">6+ hours</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Venue Address *</label>
                    <input
                      type="text"
                      name="venueAddress"
                      required
                      placeholder="Event location"
                      value={formData.venueAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Guest Count *</label>
                    <input
                      type="number"
                      name="guestCount"
                      required
                      placeholder="e.g. 150"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      rows={3}
                      placeholder="Music preferences, special requests, etc."
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Send Booking Request
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-sm text-gray-500">
                  {selectedDJData?.name} will contact you within 24 hours
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
