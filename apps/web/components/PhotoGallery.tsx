'use client'
import React, { useState, useEffect } from 'react'
import { Camera, Upload, Edit, Trash2, Star, Eye } from 'lucide-react'

interface CommunityPhoto {
  id: string
  title?: string
  description?: string
  fileName: string
  fileUrl: string
  fileSize?: number
  width?: number
  height?: number
  isFeatured: boolean
  orderIndex: number
  createdAt: string
  uploader: {
    id: string
    firstName: string
    lastName: string
  }
  event?: {
    id: string
    name: string
    startAt: string
  }
}

interface PhotoGalleryProps {
  communitySlug: string
  isAdmin?: boolean
  className?: string
}

export default function PhotoGallery({ 
  communitySlug, 
  isAdmin = false, 
  className = '' 
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<CommunityPhoto | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchPhotos()
  }, [communitySlug])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${communitySlug}/photos?limit=8`
      )
      
      if (!response.ok) {
        // Use mock photos for development
        console.log('API not available, using mock photos')
        const mockPhotos: CommunityPhoto[] = [
          {
            id: '1',
            fileName: 'cultural-festival-2024.jpg',
            fileUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Community Cultural Festival 2024',
            isFeatured: true,
            orderIndex: 1,
            uploader: { id: '1', firstName: 'John', lastName: 'Okafor' },
            createdAt: '2024-08-15T14:30:00Z'
          },
          {
            id: '2',
            fileName: 'annual-meeting.jpg',
            fileUrl: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Annual General Meeting',
            isFeatured: false,
            orderIndex: 2,
            uploader: { id: '2', firstName: 'Mary', lastName: 'Nwosu' },
            createdAt: '2024-09-20T10:00:00Z'
          },
          {
            id: '3',
            fileName: 'youth-education.jpg',
            fileUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Youth Education Program',
            isFeatured: false,
            orderIndex: 3,
            uploader: { id: '3', firstName: 'David', lastName: 'Eze' },
            createdAt: '2024-10-10T16:45:00Z'
          },
          {
            id: '4',
            fileName: 'community-outreach.jpg',
            fileUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Community Outreach Day',
            isFeatured: true,
            orderIndex: 4,
            uploader: { id: '4', firstName: 'Grace', lastName: 'Okeke' },
            createdAt: '2024-10-25T12:15:00Z'
          },
          {
            id: '5',
            fileName: 'traditional-dance.jpg',
            fileUrl: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Traditional Dance Performance',
            isFeatured: false,
            orderIndex: 5,
            uploader: { id: '5', firstName: 'Peter', lastName: 'Ugwu' },
            createdAt: '2024-11-01T18:30:00Z'
          }
        ]
        setPhotos(mockPhotos)
        setLoading(false)
        return
      }
      
      const result = await response.json()
      if (result.success) {
        setPhotos(result.data)
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB')
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('photo', file)
      formData.append('title', '')
      formData.append('description', '')
      formData.append('isFeatured', 'false')

      // You'll need to get the community ID from your auth context or API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/COMMUNITY_ID/photos`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include' // For auth cookies
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      if (result.success) {
        setPhotos(prev => [result.data, ...prev])
        setShowUploadModal(false)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload photo. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/photos/${photoId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setPhotos(prev => prev.filter(p => p.id !== photoId))
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete photo. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className={`photo-gallery ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`photo-gallery ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
          <p className="text-gray-600">Community memories and events</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Camera size={18} />
            Add Photos
          </button>
        )}
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Camera size={48} className="mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Photos Yet</h4>
          <p className="text-gray-600 mb-4">
            {isAdmin ? 'Be the first to add some photos!' : 'Photos will appear here once uploaded by administrators.'}
          </p>
          {isAdmin && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} />
              Upload First Photo
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Photo */}
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}${photo.fileUrl}`}
                alt={photo.title || 'Community photo'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Featured badge */}
              {photo.isFeatured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {photo.title && (
                    <h4 className="font-semibold text-sm mb-1">{photo.title}</h4>
                  )}
                  <div className="text-xs opacity-90">
                    <div>By {photo.uploader.firstName} {photo.uploader.lastName}</div>
                    <div>{formatDate(photo.createdAt)}</div>
                    {photo.event && (
                      <div className="text-yellow-300">{photo.event.name}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons for admins */}
              {isAdmin && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                  <button
                    onClick={() => {
                      setSelectedPhoto(photo)
                      setShowEditModal(true)
                    }}
                    className="p-1.5 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
                    title="Edit photo"
                  >
                    <Edit size={14} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1.5 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </div>
              )}

              {/* Click to view */}
              <button
                onClick={() => setSelectedPhoto(photo)}
                className="absolute inset-0 w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`View photo: ${photo.title || 'Community photo'}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Photo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPEG, PNG, WebP (max 10MB)
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                disabled={uploading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo viewer */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl max-h-full">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}${selectedPhoto.fileUrl}`}
              alt={selectedPhoto.title || 'Community photo'}
              className="max-w-full max-h-full object-contain"
            />
            <div className="bg-white p-4 mt-4 rounded-lg">
              {selectedPhoto.title && (
                <h3 className="font-semibold text-lg mb-2">{selectedPhoto.title}</h3>
              )}
              {selectedPhoto.description && (
                <p className="text-gray-600 mb-2">{selectedPhoto.description}</p>
              )}
              <div className="text-sm text-gray-500">
                Uploaded by {selectedPhoto.uploader.firstName} {selectedPhoto.uploader.lastName} on {formatDate(selectedPhoto.createdAt)}
                {selectedPhoto.event && (
                  <span className="block">From event: {selectedPhoto.event.name}</span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}