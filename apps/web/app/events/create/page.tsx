'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '../../components/Toast'

const eventCategories = [
  'Cultural', 'Religious', 'Meeting', 'Education', 'Business', 'Family', 'Social', 'Sports', 'Workshop', 'Conference'
]

const venues = [
  'Cardiff Community Centre',
  'St. David\'s Church Cardiff', 
  'Cardiff Bay Community Centre',
  'Cardiff University Community Hub',
  'Cardiff Metropolitan University',
  'Other (specify)'
]

export default function CreateEventPage() {
  const toast = useToast()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    customVenue: '',
    address: '',
    capacity: '',
    price: '',
    requiresRSVP: true,
    isVirtual: false,
    meetingLink: '',
    tags: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Event title is required'
    if (!formData.description.trim()) newErrors.description = 'Event description is required'
    if (!formData.category) newErrors.category = 'Event category is required'
    if (!formData.date) newErrors.date = 'Event date is required'
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (!formData.venue) newErrors.venue = 'Venue is required'
    if (formData.venue === 'Other (specify)' && !formData.customVenue.trim()) {
      newErrors.customVenue = 'Please specify the custom venue'
    }
    if (!formData.organizerName.trim()) newErrors.organizerName = 'Organizer name is required'
    if (!formData.organizerEmail.trim()) newErrors.organizerEmail = 'Organizer email is required'
    
    // Validate email format
    if (formData.organizerEmail && !/\S+@\S+\.\S+/.test(formData.organizerEmail)) {
      newErrors.organizerEmail = 'Please enter a valid email address'
    }
    
    // Validate date is not in the past
    if (formData.date) {
      const eventDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (eventDate < today) {
        newErrors.date = 'Event date cannot be in the past'
      }
    }
    
    // Validate time range
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Show loading toast
      toast.info('Creating event...', 2000)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate potential error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to create event. Please try again.')
      }
      
      toast.success('Event created successfully! 🎉')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          category: '',
          date: '',
          startTime: '',
          endTime: '',
          venue: '',
          customVenue: '',
          address: '',
          capacity: '',
          price: '',
          requiresRSVP: true,
          isVirtual: false,
          meetingLink: '',
          tags: '',
          organizerName: '',
          organizerEmail: '',
          organizerPhone: ''
        })
        setErrors({})
      }, 2000)
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create event')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Create New Event</h1>
                <p className="text-xl opacity-95">Organize and share amazing community events</p>
              </div>
              <Link href="/events" className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-2xl font-bold transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                ← Back to Events
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-purple-200">
            
            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              
              {/* Basic Information */}
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">Event Information</h2>              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 ${
                      errors.title 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                    placeholder="Enter event title"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 resize-none ${
                      errors.description 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                    placeholder="Describe your event, what attendees can expect, and any important details"
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 ${
                      errors.category 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {eventCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 hover:border-purple-300"
                    placeholder="e.g., culture, music, dance, food"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">Date & Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 ${
                      errors.date 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 ${
                      errors.startTime 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                  />
                  {errors.startTime && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.startTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm text-lg transition-all duration-300 ${
                      errors.endTime 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-purple-200 focus:border-purple-500 hover:border-purple-300'
                    }`}
                  />
                  {errors.endTime && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-8">Location</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isVirtual"
                      checked={formData.isVirtual}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">This is a virtual event</span>
                  </label>
                </div>

                {formData.isVirtual ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meeting Link *
                    </label>
                    <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleInputChange}
                      required={formData.isVirtual}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Venue *
                      </label>
                      <select
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required={!formData.isVirtual}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select venue</option>
                        {venues.map(venue => (
                          <option key={venue} value={venue}>{venue}</option>
                        ))}
                      </select>
                    </div>

                    {formData.venue === 'Other (specify)' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Venue *
                        </label>
                        <input
                          type="text"
                          name="customVenue"
                          value={formData.customVenue}
                          onChange={handleInputChange}
                          required={formData.venue === 'Other (specify)'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter venue name"
                        />
                      </div>
                    )}

                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={!formData.isVirtual}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Street address, city, postcode"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Registration & Pricing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Registration & Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Max attendees"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0 for free events"
                  />
                </div>

                <div className="flex items-center pt-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="requiresRSVP"
                      checked={formData.requiresRSVP}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Requires RSVP</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Organizer Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Organizer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer Name *
                  </label>
                  <input
                    type="text"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="organizerEmail"
                    value={formData.organizerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="organizer@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="organizerPhone"
                    value={formData.organizerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+44 7700 900123"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="border-t border-purple-200 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link
                  href="/events"
                  className="px-8 py-4 border-2 border-purple-200 rounded-2xl font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 text-center backdrop-blur-sm"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  className="px-8 py-4 border-2 border-purple-300 bg-white/80 rounded-2xl font-medium text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-purple-400 disabled:to-violet-400 text-white rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-3 text-2xl">⏳</span>
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <span className="mr-3 text-2xl">✨</span>
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

          {/* Preview Card */}
          {formData.title && (
            <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-6">Event Preview</h3>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{formData.title}</h4>
                  {formData.description && (
                    <p className="text-gray-600 mb-3">{formData.description}</p>
                  )}
                </div>
                {formData.category && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formData.category}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {formData.date && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    {new Date(formData.date).toLocaleDateString('en-GB')}
                  </div>
                )}
                {formData.startTime && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🕒</span>
                    {formData.startTime} - {formData.endTime}
                  </div>
                )}
                {(formData.venue || formData.customVenue || formData.isVirtual) && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {formData.isVirtual ? 'Virtual Event' : formData.venue === 'Other (specify)' ? formData.customVenue : formData.venue}
                  </div>
                )}
                {formData.price !== '' && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">💷</span>
                    {formData.price === '0' || formData.price === '' ? 'Free' : `£${formData.price}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}