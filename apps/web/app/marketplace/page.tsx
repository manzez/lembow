'use client'

import Link from 'next/link'
import { Building2, Tent, UtensilsCrossed, Music, Package, ArrowRight, Star, Users, Calendar, Sparkles } from 'lucide-react'

const MARKETPLACE_CATEGORIES = [
  {
    id: 'halls',
    name: 'Hall Hire',
    icon: Building2,
    description: 'Community halls and venues for your events',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50',
    href: '/halls',
    providers: '15+ Venues',
    popular: true
  },
  {
    id: 'canopy',
    name: 'Canopy & Equipment',
    icon: Tent,
    description: 'Marquees, bouncy castles, chairs, tables & heaters',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
    href: '/marketplace/canopy',
    providers: '4 Providers'
  },
  {
    id: 'catering',
    name: 'Food & Catering',
    icon: UtensilsCrossed,
    description: 'Nigerian, Pakistani, Turkish, Polish, Jamaican cuisine',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-50 to-red-50',
    href: '/marketplace/catering',
    providers: '7 Caterers',
    popular: true
  },
  {
    id: 'dj',
    name: 'DJ Booking',
    icon: Music,
    description: 'Professional DJs for your celebrations',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50',
    href: '/marketplace/dj',
    providers: '4 DJs'
  },
  {
    id: 'courier',
    name: 'Courier Services',
    icon: Package,
    description: 'International door-to-door delivery',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    href: '/marketplace/courier',
    providers: 'Trusted Partners'
  }
]

const STATS = [
  { label: 'Service Providers', value: '30+', icon: Users },
  { label: 'Events Hosted', value: '500+', icon: Calendar },
  { label: 'Happy Customers', value: '2,000+', icon: Star }
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-violet-300 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Your One-Stop Event Solution</span>
            </div>
          </div>

          <div className="text-center text-white mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Community
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 animate-pulse">
                Marketplace
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Everything you need for unforgettable events — halls, catering, DJs, equipment & more
            </p>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full -mb-1">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Browse Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional providers trusted by communities across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {MARKETPLACE_CATEGORIES.map((category) => {
              const Icon = category.icon
              
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group"
                >
                  <div className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 ${
                    category.popular
                      ? 'ring-4 ring-yellow-400 shadow-2xl' 
                      : 'border-2 border-gray-100 hover:shadow-2xl hover:border-gray-300'
                  }`}>
                    {/* Image/Icon Header */}
                    <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${category.gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      
                      {/* Popular Badge */}
                      {category.popular && (
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900 text-sm">Popular</span>
                        </div>
                      )}

                      {/* Provider Count Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-gray-900">
                        {category.providers}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      {/* CTA Button */}
                      <div className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${category.gradient} text-white py-3 rounded-xl font-bold group-hover:shadow-lg transition-all`}>
                        <span>Explore Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
                  <Icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Browse Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore our curated selection of trusted event service providers
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Book or Contact</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit your request or contact providers directly via phone or email
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Enjoy Your Event</h3>
              <p className="text-gray-600 leading-relaxed">
                Relax and celebrate while professionals take care of everything
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Plan Your Event?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Connect with professional service providers in your community today
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
