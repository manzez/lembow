'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, MapPin, Users, Calendar, ArrowRight, Phone, Mail, MessageSquare, Handshake } from 'lucide-react'
import { ALL_COMMUNITIES, CATEGORIES, REGIONS } from '../lib/communities-data'

export default function CommunitiesHome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const filteredCommunities = ALL_COMMUNITIES.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory
    const matchesRegion = selectedRegion === 'All' || community.region === selectedRegion
    
    return matchesSearch && matchesCategory && matchesRegion
  })

  const totalMembers = ALL_COMMUNITIES.reduce((sum, community) => sum + community.members, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-32 left-1/4 animate-float">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transform rotate-12">
              <Users className="w-8 h-8 text-white/80" />
            </div>
          </div>
          <div className="absolute top-48 right-1/4 animate-float animation-delay-1000">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transform -rotate-12">
              <MapPin className="w-6 h-6 text-white/80" />
            </div>
          </div>
          <div className="absolute top-64 left-1/6 animate-float animation-delay-2000">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transform rotate-6">
              <Calendar className="w-7 h-7 text-white/80" />
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header Content */}
          <div className="text-center text-white mb-16">
            {/* Community Stats Banner */}
            <div className="inline-flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{ALL_COMMUNITIES.length} Active Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{totalMembers.toLocaleString()}+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">15+ Cities</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                Community
              </span>
            </h1>

            {/* Enhanced Search - Immediately after heading */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Single Row with Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      placeholder="Search communities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 text-lg font-medium"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium appearance-none cursor-pointer min-w-[180px]"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-purple-900 text-white">{cat === 'All' ? 'All Categories' : cat}</option>
                    ))}
                  </select>

                  {/* Region Filter */}
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium appearance-none cursor-pointer min-w-[180px]"
                  >
                    {REGIONS.map(region => (
                      <option key={region} value={region} className="bg-purple-900 text-white">{region === 'All' ? 'All Regions' : region}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Simple tagline after search */}
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Connect with verified, vibrant communities across the UK and beyond
            </p>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Communities Grid - MOVED TO TOP */}
      <section className="py-16 bg-gradient-to-b from-white via-purple-50/30 to-white">
        <div className="container mx-auto px-6">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600">
                  {filteredCommunities.length}
                </span> Communities
              </h2>
              <p className="text-lg text-gray-600">
                Join vibrant communities across the UK and beyond
              </p>
            </div>
            <Link href="/collaboration-analytics" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-xl hover:scale-105 transition-all font-bold">
              <Handshake className="w-5 h-5" />
              Collaborations
            </Link>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCommunities.map((community) => (
              <Link
                key={community.id}
                href={`/c/${community.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 hover:border-purple-300">
                  
                  {/* High-Quality Image with Gradient Overlay */}
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={community.imageUrl}
                      alt={`${community.name} - ${community.location}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-600/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full text-xs font-bold shadow-lg">
                        {community.category}
                      </span>
                    </div>
                    
                    {/* Member Count */}
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center px-2.5 py-1 bg-white rounded-full text-xs font-bold text-gray-900 shadow-lg">
                        <Users className="w-3 h-3 mr-1 text-purple-600" />
                        {community.members}
                      </span>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-2 right-2">
                      <span className="inline-flex items-center px-2 py-1 bg-purple-600/90 backdrop-blur-sm text-white rounded-full text-xs font-bold">
                        <MapPin className="w-3 h-3 mr-1" />
                        {community.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1.5 line-clamp-1">
                        {community.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-xs">
                          <MapPin className="w-3 h-3 mr-1 text-purple-500" />
                          <span className="font-medium truncate">{community.location}</span>
                        </div>
                        <div className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                          Est. {community.established}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2 text-xs">
                      {community.description}
                    </p>

                    {/* Contact Info with Vibrant Colors */}
                    <div className="flex items-center justify-between pt-3 border-t border-purple-100">
                      <div className="flex space-x-1.5">
                        {community.contact.phone && (
                          <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                            <Phone className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        {community.contact.email && (
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                            <Mail className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        {community.contact.whatsapp && (
                          <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-md">
                            <MessageSquare className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-purple-600 font-bold group-hover:text-purple-700 text-xs">
                        <span>View</span>
                        <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCommunities.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No communities found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedRegion('All')
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section with Stats */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Building Connected Communities
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed mb-12">
              From cultural celebrations to business networking, find your tribe and build meaningful connections. By bringing organisations together and making it easier to meet, we foster social cohesion, encourage inclusion, and support integration in local communities.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-purple-200 text-sm">UK Cities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-purple-200 text-sm">Events/Year</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-purple-200 text-sm">Verified</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-purple-200 text-sm">Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
