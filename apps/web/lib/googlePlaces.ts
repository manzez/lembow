// Google Places API Service for Lembow Communities
// Handles location search, autocomplete, and geocoding for events and communities

interface PlaceDetails {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  types: string[]
  rating?: number
  price_level?: number
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }>
}

interface PlacesSearchResult {
  predictions: Array<{
    place_id: string
    description: string
    structured_formatting: {
      main_text: string
      secondary_text: string
    }
    types: string[]
  }>
}

interface GeocodeResult {
  lat: number
  lng: number
  formatted_address: string
  city?: string
  country?: string
  postcode?: string
}

class GooglePlacesService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    
    if (!this.apiKey) {
      console.warn('Google Maps API key not found. Location features will be limited.')
    }
  }

  /**
   * Search for places with autocomplete
   * Perfect for event location selection
   */
  async searchPlaces(query: string, types: string[] = []): Promise<PlacesSearchResult> {
    if (!this.apiKey) {
      return { predictions: [] }
    }

    try {
      const typeFilter = types.length > 0 ? `&types=${types.join('|')}` : ''
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${this.apiKey}${typeFilter}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Places API error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Places search error:', error)
      return { predictions: [] }
    }
  }

  /**
   * Get detailed information about a specific place
   */
  async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    if (!this.apiKey) {
      return null
    }

    try {
      const fields = 'place_id,name,formatted_address,geometry,types,rating,price_level,photos'
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Place details error: ${response.status}`)
      }
      
      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Place details error:', error)
      return null
    }
  }

  /**
   * Convert address to coordinates (geocoding)
   */
  async geocodeAddress(address: string): Promise<GeocodeResult | null> {
    if (!this.apiKey) {
      return null
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Geocoding error: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.results.length === 0) {
        return null
      }

      const result = data.results[0]
      const location = result.geometry.location
      
      // Extract address components
      let city, country, postcode
      result.address_components?.forEach((component: any) => {
        if (component.types.includes('locality')) {
          city = component.long_name
        }
        if (component.types.includes('country')) {
          country = component.long_name
        }
        if (component.types.includes('postal_code')) {
          postcode = component.long_name
        }
      })

      return {
        lat: location.lat,
        lng: location.lng,
        formatted_address: result.formatted_address,
        city,
        country,
        postcode
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  /**
   * Find nearby places (e.g., venues for events)
   */
  async findNearbyPlaces(lat: number, lng: number, radius: number = 1000, type: string = ''): Promise<PlaceDetails[]> {
    if (!this.apiKey) {
      return []
    }

    try {
      const typeParam = type ? `&type=${type}` : ''
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}${typeParam}&key=${this.apiKey}`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Nearby search error: ${response.status}`)
      }
      
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error('Nearby search error:', error)
      return []
    }
  }

  /**
   * Get photo URL for a place
   */
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    if (!this.apiKey || !photoReference) {
      return ''
    }
    
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`
  }

  /**
   * Validate if API key is working
   */
  async validateApiKey(): Promise<boolean> {
    if (!this.apiKey) {
      return false
    }

    try {
      // Simple test query
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=London&inputtype=textquery&key=${this.apiKey}`)
      return response.ok
    } catch (error) {
      return false
    }
  }
}

// Export singleton instance
export const placesService = new GooglePlacesService()

// Helper functions for common use cases
export async function searchEventVenues(query: string): Promise<PlacesSearchResult> {
  return await placesService.searchPlaces(query, ['establishment', 'point_of_interest'])
}

export async function geocodeEventAddress(address: string): Promise<GeocodeResult | null> {
  return await placesService.geocodeAddress(address)
}

export async function findVenuesNearCommunity(lat: number, lng: number): Promise<PlaceDetails[]> {
  return await placesService.findNearbyPlaces(lat, lng, 5000, 'establishment')
}

// UK-specific city suggestions for communities
export const ukCitySuggestions = [
  'London',
  'Manchester', 
  'Birmingham',
  'Leeds',
  'Glasgow',
  'Sheffield',
  'Bradford',
  'Liverpool',
  'Edinburgh',
  'Cardiff',
  'Belfast',
  'Bristol',
  'Leicester',
  'Coventry',
  'Nottingham',
  'Newcastle',
  'Sunderland',
  'Brighton',
  'Hull',
  'Plymouth',
  'Stoke-on-Trent',
  'Wolverhampton',
  'Derby',
  'Swansea',
  'Southampton',
  'Salford',
  'Aberdeen',
  'Westminster',
  'Portsmouth',
  'York'
]

export default placesService