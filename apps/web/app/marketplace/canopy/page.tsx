'use client'

import { useState } from 'react'
import { Tent, MapPin, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const PROVIDERS = [
  {
    id: 1,
    name: 'Premier Event Hire',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2d0?w=400&h=300&fit=crop',
    phone: '+44 7700 900011',
    email: 'info@premiereventhire.com',
    services: [
      { category: 'Marquees', items: ['Small (30 guests)', 'Medium (60 guests)', 'Large (150+ guests)'], from: '£400' },
      { category: 'Bouncy Castles', items: ['Small (kids)', 'Medium (teens)', 'Large (adults)'], from: '£150' },
      { category: 'Chairs', items: ['Folding chairs', 'Padded chairs', 'Chiavari chairs'], from: '£2/chair' },
      { category: 'Tables', items: ['Round (8-10 guests)', 'Rectangle (6-8 guests)', 'Cocktail tables'], from: '£15/table' },
      { category: 'Heaters', items: ['Halogen heaters', 'Patio heaters', 'Gas heaters'], from: '£40' }
    ]
  },
  {
    id: 2,
    name: 'Midlands Party Rentals',
    location: 'Birmingham',
    image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400&h=300&fit=crop',
    phone: '+44 7700 900012',
    email: 'hire@midlandsparty.com',
    services: [
      { category: 'Marquees', items: ['Garden marquee', 'Wedding marquee', 'Corporate marquee'], from: '£350' },
      { category: 'Bouncy Castles', items: ['Themed castles', 'Obstacle courses', 'Inflatable slides'], from: '£120' },
      { category: 'Chairs', items: ['White chairs', 'Wood chairs', 'Luxury chairs'], from: '£1.80/chair' },
      { category: 'Tables', items: ['Banquet tables', 'Cocktail tables', 'Display tables'], from: '£12/table' },
      { category: 'Heaters', items: ['Electric heaters', 'Outdoor heaters'], from: '£35' }
    ]
  },
  {
    id: 3,
    name: 'Northern Events Co.',
    location: 'Manchester',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
    phone: '+44 7700 900013',
    email: 'bookings@northernevents.co.uk',
    services: [
      { category: 'Marquees', items: ['Clear-span marquee', 'Traditional marquee', 'Stretch tent'], from: '£500' },
      { category: 'Bouncy Castles', items: ['Classic castle', 'Character themed', 'Combo units'], from: '£140' },
      { category: 'Chairs', items: ['Stacking chairs', 'Banquet chairs', 'Cross-back chairs'], from: '£2.50/chair' },
      { category: 'Tables', items: ['Round tables', 'Trestle tables', 'High tables'], from: '£18/table' },
      { category: 'Heaters', items: ['Mushroom heaters', 'Pyramid heaters'], from: '£45' }
    ]
  },
  {
    id: 4,
    name: 'Scottish Event Solutions',
    location: 'Glasgow',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    phone: '+44 7700 900014',
    email: 'hello@scottishevents.com',
    services: [
      { category: 'Marquees', items: ['Frame marquee', 'Pagoda tent', 'Festival tent'], from: '£380' },
      { category: 'Bouncy Castles', items: ['Indoor inflatables', 'Outdoor inflatables', 'Water slides'], from: '£130' },
      { category: 'Chairs', items: ['Plastic chairs', 'Padded chairs', 'Director chairs'], from: '£1.50/chair' },
      { category: 'Tables', items: ['Dining tables', 'Buffet tables', 'Cake tables'], from: '£14/table' },
      { category: 'Heaters', items: ['Portable heaters', 'Standing heaters'], from: '£38' }
    ]
  }
]

const EQUIPMENT_CATEGORIES = [
  {
    name: 'Marquees & Tents',
    description: 'Various sizes for outdoor events',
    icon: '⛺'
  },
  {
    name: 'Bouncy Castles',
    description: 'Fun inflatables for all ages',
    icon: '🏰'
  },
  {
    name: 'Chairs',
    description: 'Comfortable seating options',
    icon: '🪑'
  },
  {
    name: 'Tables',
    description: 'Multiple styles and sizes',
    icon: '🪑'
  },
  {
    name: 'Heaters',
    description: 'Keep guests warm outdoors',
    icon: '🔥'
  }
]

export default function CanopyRentalPage() {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    equipment: {
      marquees: false,
      bouncyCastles: false,
      chairs: false,
      tables: false,
      heaters: false
    },
    additionalInfo: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProvider) return
    
    const provider = PROVIDERS.find(p => p.id === selectedProvider)
    const selectedEquipment = Object.entries(formData.equipment)
      .filter(([_, selected]) => selected)
      .map(([name]) => name)
    
    console.log('Equipment rental request:', { provider, ...formData, selectedEquipment })
    
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEquipmentToggle = (equipment: keyof typeof formData.equipment) => {
    setFormData({
      ...formData,
      equipment: {
        ...formData.equipment,
        [equipment]: !formData.equipment[equipment]
      }
    })
  }

  const selectedProviderData = selectedProvider ? PROVIDERS.find(p => p.id === selectedProvider) : null
  const selectedEquipmentList = Object.entries(formData.equipment)
    .filter(([_, selected]) => selected)
    .map(([name]) => name.charAt(0).toUpperCase() + name.slice(1))

  if (submitted && selectedProviderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tent className="w-10 h-10 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quote Request Sent!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Your equipment rental request has been sent to <span className="font-bold text-blue-600">{selectedProviderData.name}</span>. 
            They will contact you within 24 hours with availability and pricing.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <p className="text-blue-800 font-medium mb-3">Event Details:</p>
            <div className="text-left space-y-2 text-sm text-blue-700">
              <p>📅 <span className="font-semibold">Date:</span> {formData.eventDate}</p>
              <p>📍 <span className="font-semibold">Location:</span> {formData.eventLocation}</p>
              <p>🏙️ <span className="font-semibold">City:</span> {formData.city}</p>
              <p>👥 <span className="font-semibold">Guest Count:</span> {formData.guestCount}</p>
            </div>
          </div>

          {selectedEquipmentList.length > 0 && (
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-6 mb-8">
              <p className="text-cyan-800 font-medium mb-3">Requested Equipment:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedEquipmentList.map((equipment) => (
                  <span key={equipment} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium">
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
            <p className="text-purple-800 font-medium mb-4">What happens next?</p>
            <div className="space-y-3 text-left text-sm text-purple-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</div>
                <p>{selectedProviderData.name} will review your requirements</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</div>
                <p>You'll receive a detailed quote via phone or email</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</div>
                <p>Confirm your booking and arrange delivery/setup</p>
              </div>
            </div>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Tent className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Event Equipment Rental
            </h1>
            <p className="text-xl text-blue-100">
              Marquees, bouncy castles, chairs, tables, and heaters for your perfect event
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Available Equipment
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {EQUIPMENT_CATEGORIES.map((category) => (
                <div key={category.name} className="bg-white rounded-2xl p-6 text-center border-2 border-gray-100">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provider Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Choose Your Provider
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className={`bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedProvider === provider.id 
                    ? 'ring-4 ring-blue-500 shadow-2xl' 
                    : 'border-2 border-gray-100 hover:shadow-xl hover:border-blue-300'
                }`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProvider === provider.id && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{provider.name}</h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {provider.location}
                  </div>

                  <div className="space-y-3">
                    {provider.services.map((service) => (
                      <div key={service.category} className="border-t border-gray-100 pt-3 first:border-0 first:pt-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{service.category}</span>
                          <span className="text-blue-600 font-bold text-sm">{service.from}</span>
                        </div>
                        <p className="text-xs text-gray-500">{service.items.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          {selectedProvider && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-gray-100 p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Request Quote from {selectedProviderData?.name}
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="For delivery planning"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Location *</label>
                    <input
                      type="text"
                      name="eventLocation"
                      required
                      placeholder="Full address or venue name"
                      value={formData.eventLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Guest Count *</label>
                    <input
                      type="number"
                      name="guestCount"
                      required
                      placeholder="e.g. 100"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Equipment Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Select Equipment Needed *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.equipment.marquees}
                        onChange={() => handleEquipmentToggle('marquees')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900 font-medium">Marquees & Tents</span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.equipment.bouncyCastles}
                        onChange={() => handleEquipmentToggle('bouncyCastles')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900 font-medium">Bouncy Castles</span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.equipment.chairs}
                        onChange={() => handleEquipmentToggle('chairs')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900 font-medium">Chairs</span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.equipment.tables}
                        onChange={() => handleEquipmentToggle('tables')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900 font-medium">Tables</span>
                    </label>
                    
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors md:col-span-2">
                      <input
                        type="checkbox"
                        checked={formData.equipment.heaters}
                        onChange={() => handleEquipmentToggle('heaters')}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-900 font-medium">Halogen/Patio Heaters</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Requirements</label>
                  <textarea
                    name="additionalInfo"
                    rows={3}
                    placeholder="Specific sizes, quantities, setup requirements, etc."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Request Quote
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-sm text-gray-500">
                  {selectedProviderData?.name} will contact you within 24 hours
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
