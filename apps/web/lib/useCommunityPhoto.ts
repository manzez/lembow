import { useState, useEffect } from 'react'
import { getCommunityCoverPhoto, getCommunityCoverPhotoAsync } from './photos'

/**
 * React hook for loading community photos with Google Photos API support
 * Falls back to stock photos if Google Photos API is not configured
 */
export function useCommunityPhoto(communitySlug: string) {
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Start with immediate fallback
        const fallbackUrl = getCommunityCoverPhoto(communitySlug)
        setPhotoUrl(fallbackUrl)
        
        // Try to get better photo from Google Photos API
        const apiUrl = await getCommunityCoverPhotoAsync(communitySlug)
        if (apiUrl !== fallbackUrl) {
          setPhotoUrl(apiUrl)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load photo')
        setPhotoUrl(getCommunityCoverPhoto(communitySlug)) // Ensure we always have a fallback
      } finally {
        setLoading(false)
      }
    }

    if (communitySlug) {
      loadPhoto()
    }
  }, [communitySlug])

  return { photoUrl, loading, error }
}