// Community Photo Library with Google Photos API Integration
// Combines local images with Google Photos API for authentic community imagery

import { googlePhotosService } from './googlePhotos'

interface CommunityPhotos {
  [key: string]: {
    hero: string
    events: string[]
    activities: string[]
    people: string[]
  }
}

// Local fallback photos (kept for offline/backup)
export const localCommunityPhotos: CommunityPhotos = {
  'igbo-cardiff': {
    hero: '/images/communities/igbo-cardiff/hero.jpg',
    events: [
      '/images/communities/igbo-cardiff/cultural-night.jpg',
      '/images/communities/igbo-cardiff/new-year-service.jpg',
      '/images/communities/igbo-cardiff/meeting.jpg'
    ],
    activities: [
      '/images/communities/igbo-cardiff/traditional-dance.jpg',
      '/images/communities/igbo-cardiff/food-preparation.jpg',
      '/images/communities/igbo-cardiff/children-class.jpg'
    ],
    people: [
      '/images/communities/igbo-cardiff/members-group.jpg',
      '/images/communities/igbo-cardiff/elders-meeting.jpg'
    ]
  },
  'nigerian-london': {
    hero: '/images/communities/nigerian-london/hero.jpg',
    events: [
      '/images/communities/nigerian-london/independence-day.jpg',
      '/images/communities/nigerian-london/market-day.jpg'
    ],
    activities: [
      '/images/communities/nigerian-london/networking-event.jpg',
      '/images/communities/nigerian-london/business-seminar.jpg'
    ],
    people: [
      '/images/communities/nigerian-london/community-leaders.jpg'
    ]
  }
}

// Enhanced photo service that can use Google Photos API or fallback to stock photos
export const getCommunityCoverPhoto = (communitySlug: string): string => {
  // First check local community photos
  const photos = localCommunityPhotos[communitySlug]
  if (photos?.hero) return photos.hero
  
  // Expanded collection of high-quality, diverse community photos
  const authenticPhotos = [
    'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // African community gathering
    'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Cultural celebration
    'https://images.pexels.com/photos/8764865/pexels-photo-8764865.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Community meeting
    'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Traditional event
    'https://images.pexels.com/photos/6077375/pexels-photo-6077375.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Community celebration
    'https://images.pexels.com/photos/7176190/pexels-photo-7176190.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Cultural gathering
    'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Community festival
    'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Traditional ceremony
    'https://images.pexels.com/photos/7176301/pexels-photo-7176301.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Community event
    'https://images.pexels.com/photos/6963785/pexels-photo-6963785.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', // Religious gathering
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&h=600&fit=crop', // Group of people
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&h=600&fit=crop', // Community team
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=600&fit=crop', // Diverse group
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=600&fit=crop', // Cultural festival
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&h=600&fit=crop', // Team collaboration
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&h=600&fit=crop', // Business networking
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=600&fit=crop', // Group gathering
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=600&fit=crop', // Community meeting
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=600&fit=crop', // Team celebration
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=600&fit=crop'  // Business community
  ]
  
  // Use community slug to consistently pick same photo
  const index = communitySlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % authenticPhotos.length
  return authenticPhotos[index]
}

// Async version that can fetch from Google Photos API
export const getCommunityCoverPhotoAsync = async (communitySlug: string): Promise<string> => {
  try {
    // Try Google Photos API first (when API keys are configured)
    if (process.env.NEXT_PUBLIC_GOOGLE_PHOTOS_API_KEY) {
      const googlePhoto = await googlePhotosService.getCommunityCoverPhoto(communitySlug)
      if (googlePhoto) return googlePhoto
    }
    
    // Fallback to synchronous method
    return getCommunityCoverPhoto(communitySlug)
  } catch (error) {
    console.error('Error fetching community photo:', error)
    return getCommunityCoverPhoto(communitySlug)
  }
}

export const getEventPhoto = (eventType: string, eventId?: number): string => {
  const eventPhotos = {
    cultural: [
      'https://images.pexels.com/photos/6077375/pexels-photo-6077375.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/7176190/pexels-photo-7176190.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    religious: [
      'https://images.pexels.com/photos/8087166/pexels-photo-8087166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/6963785/pexels-photo-6963785.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    meeting: [
      'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/8764865/pexels-photo-8764865.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    social: [
      'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/7176301/pexels-photo-7176301.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ]
  }
  
  const photos = eventPhotos[eventType as keyof typeof eventPhotos] || eventPhotos.social
  const index = eventId ? eventId % photos.length : 0
  return photos[index]
}