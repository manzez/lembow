'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Users, Calendar, ArrowRight, Building2, TrendingUp, Handshake, GraduationCap, UtensilsCrossed, DollarSign, X } from 'lucide-react'
import { getCommunityCoverPhoto } from '../../lib/photos'

// Sample communities data
const sampleCommunities = [
  { id: 1, name: 'Igbo Community of Wales', location: 'Cardiff, Wales', members: 298, slug: 'igbo-wales', description: 'Premier Igbo cultural organization serving the entire Welsh diaspora community.' },
  { id: 2, name: 'Merseyside Yorùbá Community', location: 'Liverpool, Merseyside', members: 187, slug: 'merseyside-yoruba', description: 'Vibrant Yorùbá community preserving culture and traditions.' },
  { id: 3, name: 'Yoruba Foundation', location: 'London, England', members: 445, slug: 'yoruba-foundation', description: 'Established foundation promoting Yoruba heritage and community development.' },
  { id: 4, name: 'Nigerian Communities UK', location: 'Leeds, West Yorkshire', members: 1250, slug: 'nanc-uk', description: 'Umbrella organization representing Nigerian communities across the UK.' },
  { id: 5, name: 'Bristol African Heritage', location: 'Bristol, England', members: 312, slug: 'bristol-african', description: 'Celebrating African heritage and culture in Bristol.' },
  { id: 6, name: 'Manchester Diaspora Network', location: 'Manchester, England', members: 523, slug: 'manchester-diaspora', description: 'Connecting diaspora communities in Greater Manchester.' }
]

const benefits = [
  { 
    icon: Building2, 
    title: 'Online Platform', 
    description: 'Professional community management without the high operational costs',
    details: 'Get access to a comprehensive digital platform that eliminates expensive hall rentals, manual record-keeping, and administrative overhead. Manage your entire community from anywhere with cloud-based tools that reduce operational costs by up to 80%. Includes member databases, event management, financial tracking, and communication tools - all in one place.'
  },
  { 
    icon: TrendingUp, 
    title: 'Streamlined Collections', 
    description: 'Efficient dues and fundraising - helped communities raise over £1M+',
    details: 'Our automated collection system has helped communities raise over £1 million by streamlining dues and contribution collection. Track every payment with complete transparency, send automated WhatsApp, SMS, and email reminders for outstanding payments, and give community admins a bird\'s-eye view of total collections. Real-time dashboards show payment status, pending amounts, and collection trends - ensuring no contribution is missed and your community stays financially healthy.'
  },
  { 
    icon: Handshake, 
    title: 'Inter-Community Collaboration', 
    description: 'Connect and collaborate with other communities on events and initiatives',
    details: 'Break down silos and build bridges between communities across the UK. Collaborate with training organizations, business development agencies, and other diaspora communities on joint events, cultural exchanges, and initiatives. Partner with educational institutions to deliver programs, work with local councils on community projects, and create powerful networks that amplify your community\'s voice and impact.'
  },
  { 
    icon: Users, 
    title: 'Skills Marketplace', 
    description: 'Members offer services and skills to help each other grow',
    details: 'Unlock the hidden talent within your community! Members can offer professional services - from legal advice to plumbing, IT support to catering, accounting to home repairs. Create a thriving internal economy where community members support each other, share expertise, and build businesses together. Skills directory makes it easy to find the right person for any job.'
  },
  { 
    icon: UtensilsCrossed, 
    title: 'Food Festivals & Catering', 
    description: 'Organize cultural celebrations, food festivals and share authentic recipes',
    details: 'Celebrate your heritage through food! Organize food festivals showcasing traditional cuisine, share authentic family recipes with the community, and connect with professional caterers for events. Our platform helps you manage community catering services, coordinate food vendors, promote culinary events, and preserve cultural food traditions. From intimate gatherings to large festivals - bring people together through the universal language of food.'
  },
  { 
    icon: GraduationCap, 
    title: 'Educational Programs', 
    description: 'Language classes and youth development from around the world',
    details: 'Preserve cultural heritage and empower the next generation! Through our collaboration network, teach children languages from various parts of the world - Igbo, Yoruba, Twi, Somali, Bengali, and more. Coordinate with other communities to share language teachers, organize cultural education programs, and provide youth mentorship. Educational programs include traditional dance, music, history lessons, and life skills - ensuring children stay connected to their roots while thriving in the UK.'
  }
]

export default function CommunitiesPage() {
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showBenefitModal, setShowBenefitModal] = useState(false)
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    communityName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    currentMembers: '',
    aboutCommunity: ''
  })

  const filteredCommunities = sampleCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send to API endpoint
    console.log('Community join request:', formData)
    alert('Thank you! We will contact you within 48 hours to onboard your community.')
    setShowJoinModal(false)
    setFormData({ communityName: '', contactName: '', email: '', phone: '', city: '', currentMembers: '', aboutCommunity: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Community Platform</h1>
            <p className="text-xl text-purple-100 mb-8">Empowering diaspora communities with modern management tools</p>
            <button
              onClick={() => setShowJoinModal(true)}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Join Us - Add Your Community
            </button>
          </div>
        </div>
      </div>

      {/* Communities List - MOVED TO TOP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Active Communities</h2>
            <Link href="/" className="text-sm text-purple-600 hover:text-purple-700">← Back to Home</Link>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search communities by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <Link
                key={community.id}
                href={`/c/${community.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group"
              >
                <div className="relative h-48">
                  <img
                    src={getCommunityCoverPhoto(community.slug)}
                    alt={community.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{community.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {community.location}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {community.members} members
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - MOVED BELOW COMMUNITIES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Communities Choose Us</h2>
          <p className="text-lg text-gray-600">Professional platform, minimal costs, maximum impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedBenefit(benefit)
                setShowBenefitModal(true)
              }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-200 text-left group cursor-pointer"
            >
              <benefit.icon className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{benefit.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
              <div className="text-purple-600 text-sm font-medium flex items-center">
                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-purple-50 rounded-xl p-8 mb-16 border border-purple-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">£1M+</div>
              <div className="text-sm text-gray-600 mt-1">Funds Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600 mt-1">Communities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">15K+</div>
              <div className="text-sm text-gray-600 mt-1">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-gray-600 mt-1">Events Hosted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Join Our Platform</h2>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Join the UK's leading community platform!</strong> We provide professional management tools, 
                  streamlined payment collection, inter-community collaboration, and have helped raise over £1M for communities like yours.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Community/Association Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.communityName}
                    onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Igbo Community of Manchester"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="contact@community.org"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City/Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Manchester, Birmingham"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Members (approx.)</label>
                    <input
                      type="number"
                      value={formData.currentMembers}
                      onChange={(e) => setFormData({ ...formData, currentMembers: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Your Community</label>
                  <textarea
                    value={formData.aboutCommunity}
                    onChange={(e) => setFormData({ ...formData, aboutCommunity: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Tell us about your community, activities, and goals..."
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Benefit Details Modal */}
      {showBenefitModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <selectedBenefit.icon className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">{selectedBenefit.title}</h2>
              </div>
              <button
                onClick={() => setShowBenefitModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-900">{selectedBenefit.description}</p>
              </div>

              <div className="prose prose-purple max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedBenefit.details}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowBenefitModal(false)
                    setShowJoinModal(true)
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Building2 className="w-5 h-5" />
                  Join Us - Add Your Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
