// API service for Lembow application
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  phone: string | null
  whatsapp: string | null
  isActive: boolean
  communities: UserCommunity[]
}

interface UserCommunity {
  id: string
  name: string
  slug: string
  isPrimary: boolean
  role: string | null
  organization: {
    id: string
    name: string
    slug: string
  }
}

interface Community {
  id: string
  name: string
  slug: string
  region: string | null
  city: string | null
  country: string | null
  memberCount: number
  organization: {
    id: string
    name: string
    slug: string
  }
  isActive: boolean
}

interface Organization {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  logoUrl: string | null
  bannerUrl: string | null
  createdAt: string
  updatedAt: string
  communityCount?: number
  memberCount?: number
}

// Halls directory types
export interface Hall {
  id: string
  name: string
  address?: string
  city?: string
  region?: string
  postcode?: string
  pricePerHour?: number | null
  capacity?: number | null
  email?: string
  phone?: string
  photos: string[]
  description?: string
  availabilityNotes?: string
}

// Community skills/jobs types
export interface CommunitySkillListing {
  id: string
  communitySlug: string
  title: string
  description?: string
  category?: string
  type?: 'skill' | 'job'
  priceOrRate?: string
  contactName?: string
  phone: string
  email?: string
  whatsapp?: string
  city?: string
  region?: string
  photos?: string[]
  isActive?: boolean
  createdAt?: string
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  // Generic API call method
  private async apiCall<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const defaultOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session management
      }

      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, data }
      } else {
        return { 
          success: false, 
          error: data.error || `HTTP ${response.status}` 
        }
      }
    } catch (error) {
      console.error('API call failed:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      }
    }
  }

  // Authentication methods
  async generateMagicLink(email: string): Promise<ApiResponse<{ message: string; token?: string; email: string }>> {
    return this.apiCall('/auth/magic-link', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async verifyMagicLink(token: string): Promise<ApiResponse<{ message: string; user: User }>> {
    return this.apiCall('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  }

  async directLogin(email: string): Promise<ApiResponse<{ message: string; user: User }>> {
    return this.apiCall('/auth/direct-login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.apiCall('/auth/me')
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return this.apiCall('/auth/logout', {
      method: 'POST',
    })
  }

  // Community methods
  async getAllCommunities(params?: {
    search?: string
    organizationId?: string
  }): Promise<ApiResponse<{ communities: Community[] }>> {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.set('search', params.search)
    if (params?.organizationId) queryParams.set('organizationId', params.organizationId)
    
    const query = queryParams.toString()
    const endpoint = `/communities${query ? `?${query}` : ''}`
    
    return this.apiCall(endpoint)
  }

  async getCommunityBySlug(slug: string): Promise<ApiResponse<{ community: Community }>> {
    return this.apiCall(`/communities/${slug}`)
  }

  async getUserCommunities(): Promise<ApiResponse<{ communities: UserCommunity[] }>> {
    return this.apiCall('/user/communities')
  }

  async joinCommunity(communityId: string): Promise<ApiResponse<{ message: string; membership: any }>> {
    return this.apiCall('/user/communities/join', {
      method: 'POST',
      body: JSON.stringify({ communityId }),
    })
  }

  async setPrimaryCommunity(communityId: string): Promise<ApiResponse<{ message: string }>> {
    return this.apiCall('/user/communities/set-primary', {
      method: 'POST',
      body: JSON.stringify({ communityId }),
    })
  }

  // Member management methods (for admins)
  async getCommunityMembers(
    communityId: string,
    params?: {
      page?: number
      limit?: number
      search?: string
      status?: string
    }
  ): Promise<ApiResponse<{ members: any[]; pagination: any }>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    if (params?.search) queryParams.set('search', params.search)
    if (params?.status) queryParams.set('status', params.status)
    
    const query = queryParams.toString()
    const endpoint = `/communities/${communityId}/members${query ? `?${query}` : ''}`
    
    return this.apiCall(endpoint)
  }

  async getMemberDetails(memberId: string): Promise<ApiResponse<{ member: any }>> {
    return this.apiCall(`/members/${memberId}`)
  }

  async updateMemberStatus(
    communityId: string,
    memberId: string,
    data: { status?: string; role?: string }
  ): Promise<ApiResponse<{ message: string; membership: any }>> {
    return this.apiCall(`/communities/${communityId}/members/${memberId}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async updateMemberProfile(
    memberId: string,
    data: {
      firstName?: string
      lastName?: string
      phone?: string
      whatsapp?: string
    }
  ): Promise<ApiResponse<{ message: string; member: any }>> {
    return this.apiCall(`/members/${memberId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Organization management methods (for super admins)
  async getAllOrganizations(params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ organizations: Organization[] }>> {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.set('search', params.search)
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    
    const query = queryParams.toString()
    const endpoint = `/organizations${query ? `?${query}` : ''}`
    
    return this.apiCall(endpoint)
  }

  async getOrganizationById(id: string): Promise<ApiResponse<{ organization: Organization }>> {
    return this.apiCall(`/organizations/${id}`)
  }

  async createOrganization(data: {
    name: string
    slug: string
    description?: string
    website?: string
    logoUrl?: string
  }): Promise<ApiResponse<{ message: string; organization: Organization }>> {
    return this.apiCall('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateOrganization(
    id: string,
    data: {
      name?: string
      description?: string
      website?: string
      logoUrl?: string
    }
  ): Promise<ApiResponse<{ message: string; organization: Organization }>> {
    return this.apiCall(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteOrganization(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.apiCall(`/organizations/${id}`, {
      method: 'DELETE',
    })
  }

  async getOrganizationCommunities(
    organizationId: string,
    params?: {
      search?: string
      page?: number
      limit?: number
    }
  ): Promise<ApiResponse<{ communities: Community[] }>> {
    const queryParams = new URLSearchParams()
    if (params?.search) queryParams.set('search', params.search)
    if (params?.page) queryParams.set('page', params.page.toString())
    if (params?.limit) queryParams.set('limit', params.limit.toString())
    
    const query = queryParams.toString()
    const endpoint = `/organizations/${organizationId}/communities${query ? `?${query}` : ''}`
    
    return this.apiCall(endpoint)
  }

  // Halls directory
  async getHalls(params?: {
    search?: string
    city?: string
    region?: string
    minPrice?: number
    maxPrice?: number
    minCapacity?: number
    maxCapacity?: number
  }): Promise<ApiResponse<{ halls: Hall[]; total: number }>> {
    const qp = new URLSearchParams()
    if (params?.search) qp.set('search', params.search)
    if (params?.city) qp.set('city', params.city)
    if (params?.region) qp.set('region', params.region)
    if (params?.minPrice !== undefined) qp.set('minPrice', String(params.minPrice))
    if (params?.maxPrice !== undefined) qp.set('maxPrice', String(params.maxPrice))
    if (params?.minCapacity !== undefined) qp.set('minCapacity', String(params.minCapacity))
    if (params?.maxCapacity !== undefined) qp.set('maxCapacity', String(params.maxCapacity))
    const query = qp.toString()
    return this.apiCall(`/halls${query ? `?${query}` : ''}`)
  }

  async getHallById(id: string): Promise<ApiResponse<{ hall: Hall }>> {
    return this.apiCall(`/halls/${id}`)
  }

  async createHall(hall: Omit<Hall, 'id'>): Promise<ApiResponse<{ hall: Hall; message: string }>> {
    return this.apiCall('/halls', {
      method: 'POST',
      body: JSON.stringify(hall),
    })
  }

  // Community skills/jobs
  async getCommunitySkills(
    slug: string,
    params?: { search?: string; category?: string; type?: 'skill' | 'job'; city?: string }
  ): Promise<ApiResponse<{ listings: CommunitySkillListing[]; total: number }>> {
    const qp = new URLSearchParams()
    if (params?.search) qp.set('search', params.search)
    if (params?.category) qp.set('category', params.category)
    if (params?.type) qp.set('type', params.type)
    if (params?.city) qp.set('city', params.city)
    const query = qp.toString()
    return this.apiCall(`/communities/${slug}/skills${query ? `?${query}` : ''}`)
  }

  async getCommunitySkillById(
    slug: string,
    id: string
  ): Promise<ApiResponse<{ listing: CommunitySkillListing }>> {
    return this.apiCall(`/communities/${slug}/skills/${id}`)
  }

  async createCommunitySkill(
    slug: string,
    listing: Omit<CommunitySkillListing, 'id' | 'communitySlug' | 'createdAt'>
  ): Promise<ApiResponse<{ listing: CommunitySkillListing; message: string }>> {
    return this.apiCall(`/communities/${slug}/skills`, {
      method: 'POST',
      body: JSON.stringify(listing),
    })
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ ok: boolean; timestamp: string; service: string }>> {
    return this.apiCall('/health')
  }
}

// Create and export a singleton instance
export const apiService = new ApiService()

// Export types for use in components
export type { User, UserCommunity, Community, Organization, ApiResponse }