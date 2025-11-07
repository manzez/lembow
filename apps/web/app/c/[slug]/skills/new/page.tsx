"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiService } from '../../../../../lib/api'

export default function NewSkillListingPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params?.slug as string
  const [form, setForm] = useState({
    title: '',
    type: 'skill' as 'skill' | 'job',
    category: '',
    description: '',
    priceOrRate: '',
    contactName: '',
    phone: '',
    email: '',
    whatsapp: '',
    city: '',
    region: '',
    photo: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.title || !form.phone) {
      setError('Title and phone are required')
      return
    }
    try {
      setLoading(true)
      const payload = {
        title: form.title,
        type: form.type,
        category: form.category || undefined,
        description: form.description || undefined,
        priceOrRate: form.priceOrRate || undefined,
        contactName: form.contactName || undefined,
        phone: form.phone,
        email: form.email || undefined,
        whatsapp: form.whatsapp || undefined,
        city: form.city || undefined,
        region: form.region || undefined,
        photos: form.photo ? [form.photo] : []
      }
      const res = await apiService.createCommunitySkill(slug, payload as any)
      if (!res.success) throw new Error(res.error || 'Failed to create listing')
      router.push(`/c/${slug}/skills`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Post a Skill or Job</h1>
          <Link href={`/c/${slug}/skills`} className="text-purple-600 hover:text-purple-800">Cancel</Link>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-6 border border-purple-200 space-y-4">
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input name="title" value={form.title} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Affordable catering for small events" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select name="type" value={form.type} onChange={onChange} className="w-full px-3 py-2 border rounded-lg">
                <option value="skill">Skill/Service</option>
                <option value="job">Job</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input name="category" value={form.category} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., catering, tutoring, plumbing" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price/Rate</label>
              <input name="priceOrRate" value={form.priceOrRate} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., £20/hr or Fixed £100" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={onChange} className="w-full px-3 py-2 border rounded-lg min-h-[120px]" placeholder="Brief details about the service or job..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <input name="contactName" value={form.contactName} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input name="phone" value={form.phone} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Required" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" value={form.email} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp</label>
              <input name="whatsapp" value={form.whatsapp} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., +447..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input name="city" value={form.city} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <input name="region" value={form.region} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Photo URL (optional)</label>
              <input name="photo" value={form.photo} onChange={onChange} className="w-full px-3 py-2 border rounded-lg" placeholder="https://..." />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link href={`/c/${slug}/skills`} className="px-4 py-2 border rounded-lg">Cancel</Link>
            <button disabled={loading} type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60">{loading ? 'Saving...' : 'Post Listing'}</button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-3">Note: You must be signed in to post. In development, you can use the email magic link or direct login from the app.</p>
      </div>
    </div>
  )
}
