"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiService, type Hall } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'

export default function NewHallPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const isSuperAdmin = !!user?.communities?.some(c => c.role === 'SUPER_ADMIN')

  const [form, setForm] = useState<Omit<Hall, 'id'>>({
    name: '',
    address: '',
    city: '',
    region: '',
    postcode: '',
    pricePerHour: undefined,
    capacity: undefined,
    email: '',
    phone: '',
    photos: [],
    description: '',
    availabilityNotes: '',
  })
  const [photoInput, setPhotoInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!isLoading && !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin access required</h2>
          <p className="text-gray-600">Only super admins can add halls.</p>
        </div>
      </div>
    )
  }

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value
    if (k === 'pricePerHour' || k === 'capacity') {
      setForm(prev => ({ ...prev, [k]: v === '' ? undefined : Number(v) }))
    } else {
      setForm(prev => ({ ...prev, [k]: v }))
    }
  }

  const addPhoto = () => {
    const urls = photoInput.split(',').map(s => s.trim()).filter(Boolean)
    if (urls.length) {
      setForm(prev => ({ ...prev, photos: Array.from(new Set([...(prev.photos || []), ...urls])) }))
      setPhotoInput('')
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    const res = await apiService.createHall(form)
    if (res.success && res.data) {
      setSuccess('Hall added successfully')
      // Redirect back to directory after a short delay
      setTimeout(() => router.push('/halls'), 800)
    } else {
      setError(res.error || 'Failed to create hall')
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Add a hall</h1>
        <p className="text-gray-600 mb-6">Add venues for communities to discover. People will contact halls directly.</p>

        <form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input required value={form.name} onChange={update('name')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={update('address')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={form.city} onChange={update('city')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <input value={form.region} onChange={update('region')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
              <input value={form.postcode} onChange={update('postcode')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input type="number" min={0} value={form.capacity ?? ''} onChange={update('capacity')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per hour (£)</label>
              <input type="number" min={0} value={form.pricePerHour ?? ''} onChange={update('pricePerHour')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={update('email')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input value={form.phone} onChange={update('phone')} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photos (URLs)</label>
              <div className="flex gap-2">
                <input
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="Paste one or more image URLs (comma separated)"
                  className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <button type="button" onClick={addPhoto} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">Add</button>
              </div>
              {form.photos?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.photos.map((p, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-100">
                      {p.length > 40 ? p.slice(0, 40) + '…' : p}
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }))} className="text-purple-700/70 hover:text-purple-900">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={update('description')} rows={4} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability notes</label>
              <textarea value={form.availabilityNotes} onChange={update('availabilityNotes')} rows={3} className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
            </div>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
          {success && <div className="mt-4 text-sm text-green-700">{success}</div>}

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" disabled={saving} className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-60">
              {saving ? 'Saving…' : 'Create hall'}
            </button>
            <button type="button" onClick={() => router.push('/halls')} className="text-gray-600 text-sm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
