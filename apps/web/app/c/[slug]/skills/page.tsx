"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { apiService, type CommunitySkillListing } from '../../../../lib/api'
import { useAuth } from '../../../../contexts/AuthContext'

export default function CommunitySkillsPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug as string
  const [listings, setListings] = useState<CommunitySkillListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'skill' | 'job' | ''>('')
  const [category, setCategory] = useState('')
  const { isAuthenticated, isLoading } = useAuth()

  const load = async () => {
    try {
      setLoading(true)
      const res = await apiService.getCommunitySkills(slug, {
        search: search || undefined,
        type: (type || undefined) as any,
        category: category || undefined,
      })
      if (!res.success) throw new Error(res.error || 'Failed to load skills')
      setListings(res.data?.listings || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const onFilter = (e: React.FormEvent) => {
    e.preventDefault()
    load()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Community Skills & Jobs</h1>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Link href={`/c/${slug}/skills/new`} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Post a listing</Link>
            )}
            <Link href={`/c/${slug}`} className="text-purple-600 hover:text-purple-800">← Back to community</Link>
          </div>
        </div>

        {/* Filters */}
        <form onSubmit={onFilter} className="bg-white rounded-xl shadow p-4 border border-purple-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search skills/jobs..."
              className="px-3 py-2 border rounded-lg"
            />
            <select value={type} onChange={e => setType(e.target.value as any)} className="px-3 py-2 border rounded-lg">
              <option value="">All Types</option>
              <option value="skill">Skill/Service</option>
              <option value="job">Job</option>
            </select>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Category (e.g. catering, tutoring)"
              className="px-3 py-2 border rounded-lg"
            />
            <button type="submit" className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700">Apply</button>
          </div>
        </form>

        {/* Content */}
        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 border text-center text-gray-700">
            <p className="mb-3">No listings yet. Community members can post skills or jobs here to help others.</p>
            {isAuthenticated && (
              <Link href={`/c/${slug}/skills/new`} className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Post a listing</Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-purple-200 shadow hover:shadow-lg transition overflow-hidden">
                {item.photos?.[0] ? (
                  <img src={item.photos[0]} alt={item.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-purple-50 to-violet-50" />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'job' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{item.type === 'job' ? 'Job' : 'Skill'}</span>
                    {item.category && <span className="text-xs text-gray-600">{item.category}</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                  {item.priceOrRate && <p className="text-sm text-purple-700 mb-2">{item.priceOrRate}</p>}
                  {item.description && <p className="text-sm text-gray-600 line-clamp-3 mb-3">{item.description}</p>}
                  <div className="flex gap-2">
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="flex-1 text-center bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700">Call</a>
                    )}
                    {item.whatsapp && (
                      <a href={`https://wa.me/${item.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">WhatsApp</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
