"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Users, Phone, Mail, Building2, Filter } from 'lucide-react'
import { apiService, type Hall } from '../../lib/api'

export default function HallsDirectoryPage() {
  const [halls, setHalls] = useState<Hall[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [minCapacity, setMinCapacity] = useState<number | ''>('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')

  const load = async () => {
    setLoading(true)
    setError(null)
    const res = await apiService.getHalls({
      search: search || undefined,
      city: city || undefined,
      region: region || undefined,
      minCapacity: typeof minCapacity === 'number' ? minCapacity : undefined,
      maxPrice: typeof maxPrice === 'number' ? maxPrice : undefined,
    })
    if (res.success && res.data) {
      setHalls(res.data.halls)
    } else {
      setError(res.error || 'Failed to load halls')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onApplyFilters = async (e: React.FormEvent) => {
    e.preventDefault()
    await load()
  }

  const cities = useMemo(() => {
    const s = new Set<string>()
    halls.forEach(h => h.city && s.add(h.city))
    return Array.from(s).sort()
  }, [halls])

  const regions = useMemo(() => {
    const s = new Set<string>()
    halls.forEach(h => h.region && s.add(h.region))
    return Array.from(s).sort()
  }, [halls])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center text-white mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Community Halls Directory</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Find Community Halls
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                Across the UK
              </span>
            </h1>

            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-10">
              We help connect communities. Browse venues and contact halls directly to check availability—no booking with us, just easier connections that strengthen social cohesion and inclusion.
            </p>

            {/* Search Form */}
            <form onSubmit={onApplyFilters} className="max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                {/* Main Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search by name, address, or postcode..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-6 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 text-lg font-medium"
                  />
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">City</label>
                    <input
                      list="cityOptions"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Any city"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium"
                    />
                    <datalist id="cityOptions">
                      {cities.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Region</label>
                    <input
                      list="regionOptions"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Any region"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium"
                    />
                    <datalist id="regionOptions">
                      {regions.map((r) => (
                        <option key={r} value={r} />
                      ))}
                    </datalist>
                  </div>

                  {/* Min Capacity */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Min Capacity</label>
                    <input
                      type="number"
                      min={0}
                      value={minCapacity}
                      onChange={(e) => setMinCapacity(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 100"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium"
                    />
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Max Price (£/hr)</label>
                    <input
                      type="number"
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 60"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 font-medium"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch(''); setCity(''); setRegion(''); setMinCapacity(''); setMaxPrice(''); load()
                    }}
                    className="text-white/80 hover:text-white text-sm font-medium underline"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="submit"
                    className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Filter className="w-5 h-5" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-white">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Admin Link */}
          <div className="mb-6">
            <Link 
              href="/halls/new" 
              className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 font-medium"
            >
              <Building2 className="w-4 h-4" />
              Are you a super admin? Add a hall
            </Link>
          </div>

          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {halls.length} {halls.length === 1 ? 'Hall' : 'Halls'} Available
            </h2>
            <p className="text-gray-600">
              Browse and contact venues directly
            </p>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading halls...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-600">{error}</div>
          ) : halls.length === 0 ? (
            <div className="py-20 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No halls found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {halls.map((hall) => (
                <div
                  key={hall.id}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Hall Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    {hall.photos?.[0] ? (
                      <img
                        src={hall.photos[0]}
                        alt={hall.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-violet-100">
                        <Building2 className="w-16 h-16 text-purple-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Price Badge */}
                    {hall.pricePerHour != null && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-purple-700">
                          £{hall.pricePerHour}/hr
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                      {hall.name}
                    </h3>
                    
                    <div className="flex items-start text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">
                        {[hall.address, hall.city, hall.postcode].filter(Boolean).join(', ')}
                      </span>
                    </div>

                    {hall.capacity && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-full">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">
                            Capacity: {hall.capacity}
                          </span>
                        </div>
                      </div>
                    )}

                    {hall.availabilityNotes && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {hall.availabilityNotes}
                      </p>
                    )}

                    {/* Contact Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      {hall.phone && (
                        <a
                          href={`tel:${hall.phone}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                      )}
                      {hall.email && (
                        <a
                          href={`mailto:${hall.email}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
