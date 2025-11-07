'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth, ProtectedRoute } from '../../../contexts/AuthContext'
import { apiService } from '../../../lib/api'

export default function UserProfilePage() {
  return (
    <ProtectedRoute>
      <UserProfileContent />
    </ProtectedRoute>
  )
}

function UserProfileContent() {
  const { user, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    whatsapp: ''
  })

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        whatsapp: user.whatsapp || ''
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setMessage('')

    try {
      const result = await apiService.updateMemberProfile(user.id, formData)
      
      if (result.success) {
        setMessage('Profile updated successfully!')
        setIsEditing(false)
        // Refresh user data
        await refreshUser()
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('Error updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  const isProfileIncomplete = !user?.firstName || !user?.lastName

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-500/20 rounded-2xl mb-6">
              <span className="text-4xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">My Profile</h1>
            <p className="text-slate-400">
              {isProfileIncomplete 
                ? 'Complete your profile to get started' 
                : 'Manage your personal information and account settings'
              }
            </p>
          </div>

          {/* Profile Completion Alert */}
          {isProfileIncomplete && (
            <div className="mb-8 mx-auto max-w-2xl">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="text-yellow-400 font-semibold">Complete Your Profile</h3>
                    <p className="text-yellow-300 text-sm">
                      Please add your first and last name to complete your profile setup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`mb-6 mx-auto max-w-2xl p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : 'bg-green-500/10 border border-green-500/30 text-green-400'
            }`}>
              {message}
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    First Name {isProfileIncomplete && '*'}
                  </label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isEditing 
                        ? 'bg-slate-900/40 border-slate-700' 
                        : 'bg-slate-900/20 border-slate-800 cursor-not-allowed'
                    }`}
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Last Name {isProfileIncomplete && '*'}
                  </label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isEditing 
                        ? 'bg-slate-900/40 border-slate-700' 
                        : 'bg-slate-900/20 border-slate-800 cursor-not-allowed'
                    }`}
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 bg-slate-900/20 border border-slate-800 rounded-lg text-slate-400 cursor-not-allowed"
                    placeholder="Email address"
                  />
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isEditing 
                        ? 'bg-slate-900/40 border-slate-700' 
                        : 'bg-slate-900/20 border-slate-800 cursor-not-allowed'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isEditing 
                        ? 'bg-slate-900/40 border-slate-700' 
                        : 'bg-slate-900/20 border-slate-800 cursor-not-allowed'
                    }`}
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-colors ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-blue-600'
                    }`}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setMessage('')
                      // Reset form data
                      if (user) {
                        setFormData({
                          firstName: user.firstName || '',
                          lastName: user.lastName || '',
                          phone: user.phone || '',
                          whatsapp: user.whatsapp || ''
                        })
                      }
                    }}
                    className="px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Communities Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">My Communities</h2>
            
            {user?.communities && user.communities.length > 0 ? (
              <div className="space-y-4">
                {user.communities.map(community => (
                  <div key={community.id} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-lg border border-slate-700">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{community.name}</h3>
                      <p className="text-slate-400 text-sm">{community.organization.name}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        {community.isPrimary && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Primary</span>
                        )}
                        {community.role && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">{community.role}</span>
                        )}
                      </div>
                    </div>
                    <Link 
                      href={`/c/${community.slug}`}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">🏘️</span>
                <h3 className="text-slate-300 font-semibold mb-2">No Communities Yet</h3>
                <p className="text-slate-400 mb-6">Join communities to connect with others and participate in events.</p>
                <Link 
                  href="/user/communities"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Browse Communities
                </Link>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link 
              href="/user"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to User Area
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}