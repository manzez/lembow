import { useState, useEffect, useCallback } from 'react'
import { placesService, ukCitySuggestions } from './googlePlaces'

interface LocationSuggestion {
  place_id: string
  description: string
  main_text: string
  secondary_text: string
}

interface UseLocationSearchProps {
  onLocationSelect?: (location: LocationSuggestion) => void
  types?: string[]
  minQueryLength?: number
}

/**
 * React hook for location search with autocomplete
 * Perfect for event location and community address forms
 */
export function useLocationSearch({ 
  onLocationSelect, 
  types = [], 
  minQueryLength = 2 
}: UseLocationSearchProps = {}) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debounced search function
  const searchLocations = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        // If no API key, show UK cities for basic functionality
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          const filteredCities = ukCitySuggestions
            .filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5)
            .map(city => ({
              place_id: `uk-city-${city.toLowerCase()}`,
              description: `${city}, UK`,
              main_text: city,
              secondary_text: 'UK'
            }))
          setSuggestions(filteredCities)
          setLoading(false)
          return
        }

        // Use Google Places API
        const results = await placesService.searchPlaces(searchQuery, types)
        const formattedSuggestions = results.predictions.map(prediction => ({
          place_id: prediction.place_id,
          description: prediction.description,
          main_text: prediction.structured_formatting.main_text,
          secondary_text: prediction.structured_formatting.secondary_text
        }))
        
        setSuggestions(formattedSuggestions)
      } catch (error) {
        console.error('Location search error:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [types, minQueryLength]
  )

  // Debounce search requests
  useEffect(() => {
    const timer = setTimeout(() => {
      searchLocations(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, searchLocations])

  const selectLocation = (location: LocationSuggestion) => {
    setQuery(location.main_text)
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect?.(location)
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return {
    query,
    setQuery,
    suggestions,
    loading,
    showSuggestions,
    setShowSuggestions,
    selectLocation,
    clearSearch
  }
}

/**
 * Location search input component with autocomplete dropdown
 */
interface LocationSearchInputProps {
  placeholder?: string
  value?: string
  onLocationSelect: (location: LocationSuggestion) => void
  types?: string[]
  className?: string
}

export function LocationSearchInput({
  placeholder = "Search for location...",
  value = "",
  onLocationSelect,
  types = [],
  className = ""
}: LocationSearchInputProps) {
  const {
    query,
    setQuery,
    suggestions,
    loading,
    showSuggestions,
    setShowSuggestions,
    selectLocation
  } = useLocationSearch({ onLocationSelect, types })

  // Set initial value
  useEffect(() => {
    if (value && !query) {
      setQuery(value)
    }
  }, [value, query])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.place_id}
              onClick={() => selectLocation(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">
                {suggestion.main_text}
              </div>
              <div className="text-sm text-gray-500">
                {suggestion.secondary_text}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}