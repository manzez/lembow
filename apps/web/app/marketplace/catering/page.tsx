'use client'

import { useState } from 'react'
import { UtensilsCrossed, MapPin, Phone, Mail, Users, Star, Search } from 'lucide-react'

const CATERERS = [
  {
    id: 1,
    name: 'Manuels Kitchen',
    cuisine: 'Nigerian',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&h=350&fit=crop',
    specialties: ['Jollof Rice', 'Suya', 'Pounded Yam', 'Egusi Soup'],
    minGuests: 30,
    priceRange: '££',
    rating: 4.9,
    phone: '+44 7700 900021',
    email: 'info@manuelskitchen.com',
    description: 'Authentic Nigerian cuisine with traditional recipes passed down through generations.'
  },
  {
    id: 2,
    name: 'Owerri Foods',
    cuisine: 'Nigerian',
    location: 'Birmingham',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=350&fit=crop',
    specialties: ['Fufu', 'Bitterleaf Soup', 'Pepper Soup', 'Moi Moi'],
    minGuests: 25,
    priceRange: '££',
    rating: 4.8,
    phone: '+44 7700 900022',
    email: 'bookings@owerrifoods.co.uk',
    description: 'Specializing in Eastern Nigerian dishes with fresh, locally-sourced ingredients.'
  },
  {
    id: 3,
    name: 'Ola Catering',
    cuisine: 'Nigerian',
    location: 'Manchester',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=350&fit=crop',
    specialties: ['Asaro', 'Efo Riro', 'Ofada Rice', 'Ayamase'],
    minGuests: 40,
    priceRange: '££',
    rating: 4.7,
    phone: '+44 7700 900023',
    email: 'hello@olacatering.com',
    description: 'Premium Nigerian catering for weddings, parties, and corporate events.'
  },
  {
    id: 4,
    name: 'Lahore Delights',
    cuisine: 'Pakistani',
    location: 'Leeds',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=350&fit=crop',
    specialties: ['Biryani', 'Karahi', 'Nihari', 'Haleem'],
    minGuests: 30,
    priceRange: '££',
    rating: 4.9,
    phone: '+44 7700 900024',
    email: 'catering@lahoredelights.com',
    description: 'Traditional Pakistani and North Indian cuisine with rich, aromatic flavors.'
  },
  {
    id: 5,
    name: 'Istanbul Feast',
    cuisine: 'Turkish',
    location: 'London',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=350&fit=crop',
    specialties: ['Kebabs', 'Mezze Platters', 'Baklava', 'Lahmacun'],
    minGuests: 35,
    priceRange: '££',
    rating: 4.8,
    phone: '+44 7700 900025',
    email: 'events@istanbulfeast.co.uk',
    description: 'Authentic Turkish cuisine with Mediterranean influences and stunning presentation.'
  },
  {
    id: 6,
    name: 'Warsaw Kitchen',
    cuisine: 'Polish',
    location: 'Bristol',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500&h=350&fit=crop',
    specialties: ['Pierogi', 'Bigos', 'Żurek', 'Gołąbki'],
    minGuests: 25,
    priceRange: '££',
    rating: 4.7,
    phone: '+44 7700 900026',
    email: 'info@warsawkitchen.com',
    description: 'Hearty Polish comfort food perfect for weddings and family gatherings.'
  },
  {
    id: 7,
    name: 'Kingston Spice',
    cuisine: 'Jamaican',
    location: 'Birmingham',
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=500&h=350&fit=crop',
    specialties: ['Jerk Chicken', 'Curry Goat', 'Ackee & Saltfish', 'Rice & Peas'],
    minGuests: 30,
    priceRange: '££',
    rating: 4.9,
    phone: '+44 7700 900027',
    email: 'bookings@kingstonspice.com',
    description: 'Vibrant Caribbean flavors with authentic Jamaican cooking techniques.'
  }
]

const CUISINES = ['All', 'Nigerian', 'Pakistani', 'Turkish', 'Polish', 'Jamaican']

export default function CateringPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('All')

  const filteredCaterers = CATERERS.filter((caterer) => {
    const matchesSearch = caterer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caterer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCuisine = selectedCuisine === 'All' || caterer.cuisine === selectedCuisine
    return matchesSearch && matchesCuisine
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-red-800 to-orange-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Catering Services
            </h1>
            <p className="text-xl text-orange-100">
              Delicious cuisine from around the world for your special events
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-10 backdrop-blur-lg bg-gray-50/95">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search caterers or dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Cuisine Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    selectedCuisine === cuisine
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-500'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Caterers Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {filteredCaterers.length === 0 ? (
              <div className="text-center py-16">
                <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No caterers found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-orange-600">{filteredCaterers.length}</span> caterer{filteredCaterers.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredCaterers.map((caterer) => (
                    <div
                      key={caterer.id}
                      className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-300"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={caterer.image}
                          alt={caterer.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">{caterer.rating}</span>
                        </div>
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {caterer.cuisine}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{caterer.name}</h3>

                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {caterer.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Min {caterer.minGuests} guests
                          </div>
                          <div className="font-bold text-orange-600">
                            {caterer.priceRange}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {caterer.description}
                        </p>

                        <div className="mb-6">
                          <p className="text-xs font-semibold text-gray-700 mb-2">SPECIALTIES:</p>
                          <div className="flex flex-wrap gap-2">
                            {caterer.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <a
                            href={`tel:${caterer.phone}`}
                            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-bold text-center hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`mailto:${caterer.email}`}
                            className="flex-1 bg-white text-orange-600 border-2 border-orange-600 py-3 rounded-xl font-bold text-center hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Browse & Choose</h3>
                <p className="text-sm text-gray-600">
                  Explore our diverse selection of professional caterers
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Contact Directly</h3>
                <p className="text-sm text-gray-600">
                  Call or email to discuss your event requirements
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Book & Enjoy</h3>
                <p className="text-sm text-gray-600">
                  Finalize your menu and enjoy delicious food at your event
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
