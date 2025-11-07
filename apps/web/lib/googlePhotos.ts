// Google Photos API Service for Community Images
// This service fetches authentic community photos from Google Photos albums

interface GooglePhotosConfig {
  apiKey: string
  albumIds: {
    [communitySlug: string]: string
  }
  fallbackAlbumId?: string
}

interface GooglePhotoItem {
  id: string
  filename: string
  mimeType: string
  baseUrl: string
  mediaMetadata?: {
    width?: string
    height?: string
    creationTime?: string
  }
}

interface GooglePhotosResponse {
  mediaItems: GooglePhotoItem[]
  nextPageToken?: string
}

class GooglePhotosService {
  private config: GooglePhotosConfig
  private cache: Map<string, GooglePhotoItem[]> = new Map()
  private cacheExpiry: Map<string, number> = new Map()
  
  constructor(config: GooglePhotosConfig) {
    this.config = config
  }

  /**
   * Get photos for a specific community
   */
  async getCommunityPhotos(communitySlug: string, limit: number = 20): Promise<string[]> {
    try {
      const albumId = this.config.albumIds[communitySlug] || this.config.fallbackAlbumId
      if (!albumId) {
        console.warn(`No album ID configured for community: ${communitySlug}`)
        return this.getFallbackPhotos(communitySlug)
      }

      // Check cache first
      const cacheKey = `${albumId}-${limit}`
      if (this.isCacheValid(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        return cached ? cached.map(item => this.formatPhotoUrl(item.baseUrl)) : []
      }

      const photos = await this.fetchAlbumPhotos(albumId, limit)
      
      // Cache results for 1 hour
      this.cache.set(cacheKey, photos)
      this.cacheExpiry.set(cacheKey, Date.now() + 60 * 60 * 1000)
      
      return photos.map(photo => this.formatPhotoUrl(photo.baseUrl))
    } catch (error) {
      console.error('Error fetching Google Photos:', error)
      return this.getFallbackPhotos(communitySlug)
    }
  }

  /**
   * Get a single hero image for community cover
   */
  async getCommunityCoverPhoto(communitySlug: string): Promise<string> {
    const photos = await this.getCommunityPhotos(communitySlug, 1)
    return photos[0] || this.getFallbackCoverPhoto(communitySlug)
  }

  /**
   * Get event photos from community album
   */
  async getEventPhotos(communitySlug: string, eventType: string, count: number = 3): Promise<string[]> {
    const photos = await this.getCommunityPhotos(communitySlug, 20)
    
    // Filter photos based on event type if metadata available
    // For now, return random selection from community photos
    const shuffled = photos.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  /**
   * Fetch photos from Google Photos album
   */
  private async fetchAlbumPhotos(albumId: string, limit: number): Promise<GooglePhotoItem[]> {
    const endpoint = `https://photoslibrary.googleapis.com/v1/mediaItems:search`
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        albumId: albumId,
        pageSize: Math.min(limit, 100), // Google Photos API max is 100
        filters: {
          mediaTypeFilter: {
            mediaTypes: ['PHOTO']
          }
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Google Photos API error: ${response.status} ${response.statusText}`)
    }

    const data: GooglePhotosResponse = await response.json()
    return data.mediaItems || []
  }

  /**
   * Format photo URL with size parameters for optimization
   */
  private formatPhotoUrl(baseUrl: string, width: number = 800, height: number = 600): string {
    return `${baseUrl}=w${width}-h${height}-c`
  }

  /**
   * Check if cache is still valid
   */
  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key)
    return expiry ? Date.now() < expiry : false
  }

  /**
   * Fallback to high-quality stock photos when Google Photos fails
   */
  private getFallbackPhotos(communitySlug: string): string[] {
    const authenticPhotos = [
      'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/8764865/pexels-photo-8764865.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ]
    
    return authenticPhotos
  }

  private getFallbackCoverPhoto(communitySlug: string): string {
    // Use community slug to consistently pick same fallback photo
    const fallbacks = this.getFallbackPhotos(communitySlug)
    const index = communitySlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbacks.length
    return fallbacks[index]
  }
}

// Configuration - these should come from environment variables
const googlePhotosConfig: GooglePhotosConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_PHOTOS_API_KEY || '',
  albumIds: {
    'igbo-cardiff': process.env.NEXT_PUBLIC_IGBO_CARDIFF_ALBUM_ID || '',
    'nigerian-london': process.env.NEXT_PUBLIC_NIGERIAN_LONDON_ALBUM_ID || '',
    'ghanaian-manchester': process.env.NEXT_PUBLIC_GHANAIAN_MANCHESTER_ALBUM_ID || '',
  },
  fallbackAlbumId: process.env.NEXT_PUBLIC_FALLBACK_ALBUM_ID || ''
}

// Export singleton instance
export const googlePhotosService = new GooglePhotosService(googlePhotosConfig)

// Helper functions for backward compatibility
export async function getCommunityCoverPhotoFromGoogle(communitySlug: string): Promise<string> {
  return await googlePhotosService.getCommunityCoverPhoto(communitySlug)
}

export async function getEventPhotosFromGoogle(communitySlug: string, eventType: string, count: number = 1): Promise<string[]> {
  return await googlePhotosService.getEventPhotos(communitySlug, eventType, count)
}