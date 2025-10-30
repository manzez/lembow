import { City } from './cities'

export interface Community {
  id: string
  slug: string
  name: string
  description: string
  cityId: string
  city?: City
  
  // Visual branding
  logoUrl?: string
  bannerImageUrl?: string
  photos: string[]
  
  // Content sections
  aboutUs: string
  mission?: string
  vision?: string
  
  // Contact information
  contactEmail: string
  contactPhone?: string
  whatsappNumber?: string
  address?: string
  
  // Social media
  facebookUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  youtubeUrl?: string
  
  // Settings
  membershipDuesAmount: number
  currency: string
  memberCount: number
  foundedYear?: number
  
  // Status
  isActive: boolean
  isVerified: boolean
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  communityId: string
  title: string
  description: string
  startDate: Date
  endDate?: Date
  venue: string
  address?: string
  ticketPrice?: number
  isOnline: boolean
  onlineLink?: string
  imageUrl?: string
  
  // Accessibility
  wheelchairAccess: boolean
  stepFree: boolean
  interpreterAvailable: boolean
  sensoryFriendly: boolean
  
  // RSVP
  maxAttendees?: number
  currentAttendees: number
  rsvpDeadline?: Date
  
  // Status
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  
  createdAt: Date
  updatedAt: Date
}

export interface Member {
  id: string
  communityId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  whatsappNumber?: string
  
  // Membership
  membershipStatus: 'active' | 'inactive' | 'pending' | 'suspended'
  joinDate: Date
  membershipType: 'individual' | 'family' | 'student' | 'senior'
  
  // Dues
  duesStatus: 'current' | 'overdue' | 'exempt'
  lastPaymentDate?: Date
  nextDueDate?: Date
  
  // Profile
  profileImageUrl?: string
  bio?: string
  occupation?: string
  skills?: string[]
  interests?: string[]
  
  // Privacy
  isPublic: boolean
  showContact: boolean
  
  createdAt: Date
  updatedAt: Date
}

// Sample UK communities data
export const SAMPLE_UK_COMMUNITIES: Partial<Community>[] = [
  {
    slug: 'igbo-cardiff',
    name: 'Igbo Community Wales',
    description: 'A vibrant community of Igbo people living in Wales, celebrating our culture and supporting each other.',
    cityId: 'cardiff',
    contactEmail: 'info@igbocommunitywales.org',
    contactPhone: '+44 7700 900123',
    whatsappNumber: '+44 7700 900123',
    membershipDuesAmount: 25,
    currency: 'GBP',
    memberCount: 156,
    foundedYear: 2018,
    aboutUs: 'The Igbo Community Wales is a registered non-profit organization dedicated to promoting Igbo culture, language, and traditions in Wales. We organize cultural events, provide support to new immigrants, and foster unity among Igbo people living in Wales.',
    mission: 'To preserve and promote Igbo culture while integrating successfully into Welsh society.',
    vision: 'A thriving Igbo community that serves as a bridge between Nigeria and Wales.',
    facebookUrl: 'https://facebook.com/igbocommunitywales',
    instagramUrl: 'https://instagram.com/igbocommunitywales',
    isActive: true,
    isVerified: true
  },
  {
    slug: 'yoruba-london',
    name: 'Yoruba Cultural Association London',
    description: 'Preserving Yoruba heritage and culture in the heart of London.',
    cityId: 'london',
    contactEmail: 'contact@yorubalondon.org',
    membershipDuesAmount: 30,
    currency: 'GBP',
    memberCount: 284,
    foundedYear: 2015,
    aboutUs: 'We are the largest Yoruba cultural organization in London, bringing together families to celebrate our rich heritage through festivals, language classes, and community support programs.',
    isActive: true,
    isVerified: true
  },
  {
    slug: 'igbo-manchester',
    name: 'Igbo Association Manchester',
    description: 'Manchester\'s premier Igbo cultural and social organization.',
    cityId: 'manchester',
    contactEmail: 'hello@igbomanchester.co.uk',
    membershipDuesAmount: 20,
    currency: 'GBP',
    memberCount: 89,
    foundedYear: 2020,
    aboutUs: 'A young and dynamic community focused on supporting Igbo families in Greater Manchester through cultural preservation and professional networking.',
    isActive: true,
    isVerified: true
  },
  {
    slug: 'hausa-birmingham',
    name: 'Hausa Community Birmingham',
    description: 'Bringing together the Hausa community in Birmingham and surrounding areas.',
    cityId: 'birmingham',
    contactEmail: 'info@hausabirmingham.org',
    membershipDuesAmount: 18,
    currency: 'GBP',
    memberCount: 67,
    foundedYear: 2019,
    aboutUs: 'We organize cultural events, provide community support, and maintain our Hausa traditions while embracing our British identity.',
    isActive: true,
    isVerified: true
  },
  {
    slug: 'edo-glasgow',
    name: 'Edo Cultural Association Scotland',
    description: 'The voice of Edo people in Scotland.',
    cityId: 'glasgow',
    contactEmail: 'contact@edoscotland.org',
    membershipDuesAmount: 22,
    currency: 'GBP',
    memberCount: 45,
    foundedYear: 2021,
    aboutUs: 'We are committed to preserving Edo culture and supporting our members through cultural events, educational programs, and community initiatives.',
    isActive: true,
    isVerified: true
  }
]