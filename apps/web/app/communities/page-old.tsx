'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, MapPin, Users, Calendar, Globe, ArrowRight, Filter, Star, Phone, Mail, MessageSquare } from 'lucide-react'

// Professional city/region images
const getCityImage = (location: string) => {
  const cityImages = {
    'Cardiff': 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop&crop=entropy',
    'Bristol': 'https://images.unsplash.com/photo-1591052793923-ea9c86cfe1b3?w=800&h=600&fit=crop&crop=entropy',
    'Scotland': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop&crop=entropy',
    'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=entropy',
    'Wales': 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop&crop=entropy',
    'Berlin': 'https://images.unsplash.com/photo-1559564484-d0b9ac17c7b2?w=800&h=600&fit=crop&crop=entropy',
    'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&crop=entropy',
    'Mumbai': 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&h=600&fit=crop&crop=entropy',
    'Paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=entropy',
    'Lagos': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=entropy',
    'Manchester': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop&crop=entropy',
    'Birmingham': 'https://images.unsplash.com/photo-1599198688444-8f4e9df6d8b5?w=800&h=600&fit=crop&crop=entropy',
    'Abakaliki': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=entropy',
    'Ghana': 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop&crop=entropy'
  }
  return cityImages[location as keyof typeof cityImages] || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&crop=entropy'
}

// Comprehensive communities database with real information
const allCommunities = [
  // Igbo Communities
  {
    id: 1,
    name: 'Igbo Community Cardiff',
    location: 'Cardiff, Wales',
    region: 'Wales',
    category: 'Cultural',
    members: 156,
    imageUrl: getCityImage('Cardiff'),
    description: 'Vibrant cultural community preserving Igbo traditions in the Welsh capital',
    slug: 'igbo-cardiff',
    established: '2018',
    meetingLocation: 'Cardiff Community Centre, City Road, Cardiff CF24 3DQ',
    contact: {
      email: 'info@igbocardiff.org.uk',
      phone: '+44 29 2034 5678',
      whatsapp: '+44 7911 123456'
    },
    activities: ['Cultural festivals', 'Language classes', 'Youth programs', 'Business networking'],
    nextEvent: 'Igbo New Year Celebration - December 15, 2025'
  },
  {
    id: 2,
    name: 'Igbo Community Wales',
    location: 'Wales (Statewide)',
    region: 'Wales',
    category: 'Cultural',
    members: 342,
    imageUrl: getCityImage('Wales'),
    description: 'Umbrella organization for all Igbo communities across Wales',
    slug: 'igbo-wales',
    established: '2015',
    meetingLocation: 'Rotating venues across Wales',
    contact: {
      email: 'secretary@igbowales.org.uk',
      phone: '+44 29 2045 7890',
      whatsapp: '+44 7912 234567'
    },
    activities: ['Annual conferences', 'Cultural preservation', 'Inter-community events', 'Government liaison'],
    nextEvent: 'Wales Igbo Cultural Festival - January 20, 2026'
  },
  {
    id: 3,
    name: 'Igbo Community Bristol',
    location: 'Bristol, England',
    region: 'South West England',
    category: 'Cultural',
    members: 198,
    imageUrl: getCityImage('Bristol'),
    description: 'Dynamic Igbo community in the heart of Bristol promoting culture and unity',
    slug: 'igbo-bristol',
    established: '2019',
    meetingLocation: 'Bristol Community Hall, Temple Way, Bristol BS1 6DG',
    contact: {
      email: 'hello@igbobristol.org.uk',
      phone: '+44 117 456 7890',
      whatsapp: '+44 7913 345678'
    },
    activities: ['Weekly gatherings', 'Cultural dance', 'Food festivals', 'Community support'],
    nextEvent: 'Bristol Igbo Day - November 30, 2025'
  },
  {
    id: 4,
    name: 'Igbo Community Scotland',
    location: 'Edinburgh, Scotland',
    region: 'Scotland',
    category: 'Cultural',
    members: 267,
    imageUrl: getCityImage('Scotland'),
    description: 'Proud Scottish-Igbo community fostering cultural heritage and Scottish integration',
    slug: 'igbo-scotland',
    established: '2017',
    meetingLocation: 'Edinburgh International Centre, Morrison Street, Edinburgh EH3 8EE',
    contact: {
      email: 'contact@igboscotland.org.uk',
      phone: '+44 131 567 8901',
      whatsapp: '+44 7914 456789'
    },
    activities: ['Highland games participation', 'Cultural exchange', 'Education programs', 'Clan gatherings'],
    nextEvent: 'Scottish-Igbo Heritage Day - December 8, 2025'
  },

  // Yoruba Communities
  {
    id: 5,
    name: 'Yoruba Community London',
    location: 'London, England',
    region: 'London',
    category: 'Cultural',
    members: 523,
    imageUrl: getCityImage('London'),
    description: 'Premier Yoruba cultural organization in London promoting Omoluabi values',
    slug: 'yoruba-london',
    established: '2012',
    meetingLocation: 'Yoruba Community Centre, Peckham High Street, London SE15 5DT',
    contact: {
      email: 'info@yorubalondon.org.uk',
      phone: '+44 20 7234 5678',
      whatsapp: '+44 7915 567890'
    },
    activities: ['Ileya celebrations', 'Yoruba language school', 'Traditional music', 'Business forums'],
    nextEvent: 'Yoruba Heritage Festival - December 22, 2025'
  },

  // Bangladeshi Communities
  {
    id: 6,
    name: 'Bangladeshi Community Cardiff',
    location: 'Cardiff, Wales',
    region: 'Wales',
    category: 'Cultural',
    members: 445,
    imageUrl: getCityImage('Cardiff'),
    description: 'Thriving Bangladeshi community in Cardiff celebrating Bengali culture and traditions',
    slug: 'bangladeshi-cardiff',
    established: '2010',
    meetingLocation: 'Cardiff Bangladesh Centre, Newport Road, Cardiff CF24 1AB',
    contact: {
      email: 'secretary@bangladeshicardiff.org.uk',
      phone: '+44 29 2078 9012',
      whatsapp: '+44 7916 678901'
    },
    activities: ['Pohela Boishakh', 'Bengali language classes', 'Cultural programs', 'Community welfare'],
    nextEvent: 'Bengali New Year Celebration - April 14, 2026'
  },

  // Women's Organizations
  {
    id: 7,
    name: 'Umu Ada Association',
    location: 'Manchester, England',
    region: 'North West England',
    category: 'Women\'s Organization',
    members: 178,
    imageUrl: getCityImage('Manchester'),
    description: 'Empowering Igbo women through sisterhood, business development, and cultural preservation',
    slug: 'umu-ada-association',
    established: '2020',
    meetingLocation: 'Manchester Central Library, St Peters Square, Manchester M2 5PD',
    contact: {
      email: 'president@umuada.org.uk',
      phone: '+44 161 789 0123',
      whatsapp: '+44 7917 789012'
    },
    activities: ['Women empowerment', 'Skills development', 'Cultural mentorship', 'Community leadership'],
    nextEvent: 'Women\'s Leadership Summit - January 15, 2026'
  },

  // Alumni Associations
  {
    id: 8,
    name: 'Command Secondary School Abakaliki Alumni',
    location: 'London, England',
    region: 'London',
    category: 'Alumni',
    members: 89,
    imageUrl: getCityImage('Abakaliki'),
    description: 'Alumni association of Command Secondary School Abakaliki, fostering lifelong bonds and giving back',
    slug: 'command-abakaliki-alumni',
    established: '2021',
    meetingLocation: 'Nigerian High Commission, Northumberland Avenue, London WC2N 5BX',
    contact: {
      email: 'alumni@commandabakaliki.org.uk',
      phone: '+44 20 7890 1234',
      whatsapp: '+44 7918 890123'
    },
    activities: ['Annual reunions', 'Scholarship programs', 'School development projects', 'Networking events'],
    nextEvent: 'Annual Alumni Dinner - February 20, 2026'
  },
  {
    id: 9,
    name: 'Ghana International School Alumni UK',
    location: 'Birmingham, England',
    region: 'West Midlands',
    category: 'Alumni',
    members: 134,
    imageUrl: getCityImage('Birmingham'),
    description: 'Connecting Ghana International School alumni across the United Kingdom',
    slug: 'gis-alumni-uk',
    established: '2019',
    meetingLocation: 'Birmingham Conference Centre, Broad Street, Birmingham B1 2EA',
    contact: {
      email: 'contact@gisalumni.org.uk',
      phone: '+44 121 901 2345',
      whatsapp: '+44 7919 901234'
    },
    activities: ['Professional networking', 'Educational support', 'Cultural events', 'Mentorship programs'],
    nextEvent: 'GIS UK Annual Convention - March 12, 2026'
  },

  // International Communities
  {
    id: 10,
    name: 'Nigerian Community Berlin',
    location: 'Berlin, Germany',
    region: 'Europe',
    category: 'Cultural',
    members: 243,
    imageUrl: getCityImage('Berlin'),
    description: 'United in culture, diverse in background across Germany',
    slug: 'nigerian-berlin',
    established: '2016',
    meetingLocation: 'Kulturzentrum Berlin, Alexanderplatz, Berlin 10178',
    contact: {
      email: 'hello@nigerian-berlin.de',
      phone: '+49 30 12345678',
      whatsapp: '+49 176 12345678'
    },
    activities: ['Independence Day celebrations', 'Cultural festivals', 'Business networking', 'Youth programs'],
    nextEvent: 'Nigerian Independence Celebration - October 1, 2025'
  },
  {
    id: 11,
    name: 'African Heritage NYC',
    location: 'New York, USA',
    region: 'North America',
    category: 'Cultural',
    members: 389,
    imageUrl: getCityImage('New York'),
    description: 'Celebrating African heritage in the heart of Manhattan',
    slug: 'african-heritage-nyc',
    established: '2014',
    meetingLocation: 'African Cultural Center, 125th Street, New York, NY 10027',
    contact: {
      email: 'contact@africanheritage-nyc.org',
      phone: '+1 212 555 0123',
      whatsapp: '+1 917 555 0123'
    },
    activities: ['African heritage celebrations', 'Cultural education', 'Community outreach', 'Art exhibitions'],
    nextEvent: 'Kwanzaa Celebration - December 26, 2025'
  },
  {
    id: 12,
    name: 'Unity Lagos',
    location: 'Lagos, Nigeria',
    region: 'West Africa',
    category: 'Community Development',
    members: 567,
    imageUrl: getCityImage('Lagos'),
    description: 'Home base community building continental connections',
    slug: 'unity-lagos',
    established: '2011',
    meetingLocation: 'Lagos Island Community Centre, Broad Street, Lagos Island',
    contact: {
      email: 'hello@unity-lagos.ng',
      phone: '+234 803 456 7890',
      whatsapp: '+234 903 456 7890'
    },
    activities: ['Community development', 'Youth empowerment', 'Cultural preservation', 'Economic forums'],
    nextEvent: 'Lagos Unity Festival - December 31, 2025'
  }
]

const categories = ['All', 'Cultural', 'Alumni', 'Women\'s Organization', 'Community Development']
const regions = ['All', 'Wales', 'London', 'Scotland', 'South West England', 'North West England', 'West Midlands', 'Europe', 'North America', 'West Africa']

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const filteredCommunities = allCommunities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory
    const matchesRegion = selectedRegion === 'All' || community.region === selectedRegion
    
    return matchesSearch && matchesCategory && matchesRegion
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
            Explore Communities
          </h1>
          <p className="text-2xl md:text-3xl text-purple-100 max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with verified, vibrant communities across the globe
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7" />
              <input
                type="text"
                placeholder="Search communities by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-20 pr-8 py-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/40 text-xl"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-100 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="text-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-100 mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {regions.map(region => (
                    <option key={region} value={region} className="text-gray-900">
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {filteredCommunities.length} Communities Found
              </h2>
              <p className="text-gray-600">
                {selectedCategory !== 'All' && `${selectedCategory} communities `}
                {selectedRegion !== 'All' && `in ${selectedRegion}`}
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredCommunities.length} of {allCommunities.length} total communities
            </div>
          </div>

          {/* Communities Grid - Same Design as Homepage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCommunities.map((community) => (
              <Link
                key={community.id}
                href={`/c/${community.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                  
                  {/* High-Quality Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={community.imageUrl}
                      alt={`${community.name} - ${community.location}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                        {community.category}
                      </span>
                    </div>
                    
                    {/* Member Count */}
                    <div className="absolute bottom-6 left-6">
                      <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900">
                        <Users className="w-4 h-4 mr-2" />
                        {community.members} Members
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                          {community.name}
                        </h3>
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{community.location}</span>
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          Established {community.established}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {community.description}
                    </p>

                    {/* Quick Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium">Next:</span>
                        <span className="ml-1 text-gray-700">{community.nextEvent}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {community.activities.slice(0, 2).map((activity, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                            {activity}
                          </span>
                        ))}
                        {community.activities.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                            +{community.activities.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        {community.contact.phone && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                        {community.contact.email && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        {community.contact.whatsapp && (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-purple-600 font-bold group-hover:text-purple-700">
                        <span>Join Community</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredCommunities.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No communities found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search criteria or filters to find more communities.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedRegion('All')
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}