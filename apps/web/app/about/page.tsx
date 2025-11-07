'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, MapPin, Users, Calendar, Globe, Heart, CreditCard, Bell, TrendingUp, Star, ArrowRight, CheckCircle, Clock, Handshake, Award, MessageCircle, Play, Shield, Zap } from 'lucide-react'
import OrganizationLogo from '../components/OrganizationLogo'

// Professional city images using high-quality Unsplash photos
const getCityImage = (location: string) => {
  const cityImages = {
    'Cardiff': 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop&crop=entropy',
    'Berlin': 'https://images.unsplash.com/photo-1559564484-d0b9ac17c7b2?w=800&h=600&fit=crop&crop=entropy', 
    'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&crop=entropy',
    'Mumbai': 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&h=600&fit=crop&crop=entropy',
    'Paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=entropy',
    'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=entropy',
    'Lagos': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=entropy'
  }
  return cityImages[location as keyof typeof cityImages] || 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&crop=entropy'
}

// Sample upcoming events across communities
const upcomingEvents = [
  {
    id: 1,
    name: "Cultural Night Celebration",
    community: "Igbo Community Cardiff",
    date: "Nov 15, 2025",
    time: "7:00 PM",
    attending: 42,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    price: "£15"
  },
  {
    id: 2,
    name: "Business Networking Mixer",
    community: "Nigerian Community Berlin",
    date: "Nov 20, 2025", 
    time: "6:30 PM",
    attending: 28,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    price: "Free"
  },
  {
    id: 3,
    name: "Youth Football Tournament",
    community: "Heritage Community Paris",
    date: "Nov 22, 2025",
    time: "10:00 AM", 
    attending: 65,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    price: "£5"
  }
]

// Featured Communities with high-quality data
const featuredCommunities = [
  {
    id: 1,
    name: 'Igbo Community Cardiff',
    location: 'Cardiff, UK',
    members: 156,
    image: '👥',
    imageUrl: getCityImage('Cardiff'),
    description: 'Vibrant cultural community preserving Igbo traditions in Wales',
    slug: 'igbo-cardiff'
  },
  {
    id: 2,
    name: 'Nigerian Community Berlin',
    location: 'Berlin, Germany',
    members: 243,
    image: '🎭',
    imageUrl: getCityImage('Berlin'),
    description: 'United in culture, diverse in background across Germany',
    slug: 'nigerian-berlin'
  },
  {
    id: 3,
    name: 'African Heritage NYC',
    location: 'New York, USA',
    members: 389,
    image: '🌟',
    imageUrl: getCityImage('New York'),
    description: 'Celebrating African heritage in the heart of Manhattan',
    slug: 'african-heritage-nyc'
  },
  {
    id: 4,
    name: 'Diaspora Mumbai',
    location: 'Mumbai, India',
    members: 178,
    image: '🕯️',
    imageUrl: getCityImage('Mumbai'),
    description: 'Bridging cultures across continents from India',
    slug: 'diaspora-mumbai'
  },
  {
    id: 5,
    name: 'Heritage Community Paris',
    location: 'Paris, France',
    members: 201,
    image: '🎨',
    imageUrl: getCityImage('Paris'),
    description: 'Cultural excellence in the City of Light',
    slug: 'heritage-paris'
  },
  {
    id: 6,
    name: 'Unity Lagos',
    location: 'Lagos, Nigeria',
    members: 567,
    image: '🌍',
    imageUrl: getCityImage('Lagos'),
    description: 'Home base community building continental connections',
    slug: 'unity-lagos'
  }
]

// Member testimonials with professional profiles
const memberStories = [
  {
    id: 1,
    name: "Dr. Amara Okafor",
    community: "Igbo Community Cardiff",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
    quote: "Lembow has transformed how our community stays connected. The platform's intuitive design makes managing events and payments effortless.",
    role: "Community Leader & Software Engineer"
  },
  {
    id: 2,
    name: "Kemi Adebayo", 
    community: "Nigerian Community Berlin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    quote: "The financial transparency and automated systems have revolutionized our community operations. Members love the convenience.",
    role: "Marketing Director"
  },
  {
    id: 3,
    name: "Chidi Okonkwo",
    community: "Heritage Community Paris", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Never missing community events anymore. The smart reminder system and social features keep everyone engaged and informed.",
    role: "Business Owner"
  }
]

export default function About() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCommunities = featuredCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen Professional Design */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 opacity-95"></div>
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop&crop=entropy"
            alt="Global Community Connection"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8">
              🌍 About Lembow — Connecting Communities Since 2025
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block">LEMBOW</span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-purple-300 mt-2">
                Where Communities Thrive Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Join a sophisticated global network of vibrant cultural communities. Discover premium events, 
              connect with verified members, and build meaningful relationships that transcend borders.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              href="/communities"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Globe className="w-6 h-6 mr-3" />
              Explore Communities
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/feed"
              className="group inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-6 h-6 mr-3" />
              Discover Local Events
            </Link>

            <Link 
              href="/collaboration-analytics"
              className="group inline-flex items-center px-10 py-5 bg-white text-purple-700 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Handshake className="w-6 h-6 mr-3" />
              Collaboration Network
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Professional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-5xl font-black text-purple-300 mb-2">500+</div>
              <div className="text-gray-300 text-lg">Active Communities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-300 mb-2">50K+</div>
              <div className="text-gray-300 text-lg">Global Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-purple-300 mb-2">25+</div>
              <div className="text-gray-300 text-lg">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship micro-banner */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-6">
          <Link href="/collaboration-analytics" className="block group">
            <div className="w-full rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">Flagship</span>
                <span className="text-sm md:text-base text-gray-700">
                  Lembow Collaboration Network — measuring cross‑community impact and supporting social integration and cohesion across the UK
                </span>
              </div>
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <span className="hidden sm:inline">Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Everything You Need to 
              <span className="text-purple-600"> Connect</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Professional-grade tools designed to bring communities together and create lasting connections worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Social Discovery Feed</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Discover local events, premium food markets, exclusive community meetings, and curated cultural experiences. 
                Stay connected with sophisticated neighborhood activities.
              </p>
              <Link 
                href="/feed"
                className="inline-flex items-center text-purple-600 font-bold hover:text-purple-700 text-lg group"
              >
                Explore Feed
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Intelligent Events</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                AI-powered event discovery with premium RSVP management, smart calendar integration, 
                and social verification to ensure you attend the most valuable gatherings.
              </p>
              <Link 
                href="/events"
                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 text-lg group"
              >
                View Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Secure Payments</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Bank-grade security for community dues, premium event tickets, 
                and charitable donations with transparent tracking and intelligent automated systems.
              </p>
              <Link 
                href="/payments"
                className="inline-flex items-center text-green-600 font-bold hover:text-green-700 text-lg group"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Collaboration Network</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our flagship feature: measure, celebrate, and grow cross‑community partnerships. Showcase joint events,
                impact metrics, and recognition badges.
              </p>
              <Link 
                href="/collaboration-analytics"
                className="inline-flex items-center text-rose-600 font-bold hover:text-rose-700 text-lg group"
              >
                Explore Collaborations
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Search */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                Find Your 
                <span className="text-purple-600"> Community</span>
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed">
                Connect with verified, vibrant communities across the globe
              </p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7" />
              <input
                type="text"
                placeholder="Search by community name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-20 pr-8 py-6 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-xl shadow-xl"
              />
            </div>
          </div>

          {/* Featured Communities Grid */}
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
                    <div className="absolute bottom-6 left-6">
                      <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900">
                        <Users className="w-4 h-4 mr-2" />
                        {community.members} Members
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {community.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{community.location}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {community.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 font-bold group-hover:text-purple-700 text-lg">
                        Join Community
                      </span>
                      <ArrowRight className="w-5 h-5 text-purple-600 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-violet-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Trusted by 
              <span className="text-purple-600"> Leaders</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Community leaders worldwide trust Lembow to manage their most important connections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberStories.map((story) => (
              <div key={story.id} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <img 
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{story.name}</h4>
                    <p className="text-purple-600 font-medium">{story.role}</p>
                    <p className="text-sm text-gray-500">{story.community}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Connect?
          </h2>
          <p className="text-2xl text-purple-100 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of community leaders who trust Lembow to manage their most valuable connections.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center px-12 py-6 bg-white text-purple-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Heart className="w-6 h-6 mr-3" />
              Get Started Today
            </Link>
            <Link
              href="/communities"
              className="inline-flex items-center px-12 py-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-6 h-6 mr-3" />
              Browse Communities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
