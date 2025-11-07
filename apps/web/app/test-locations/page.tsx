// Test Google Places API Integration
// This component demonstrates the location search functionality

'use client'

import { useState, useEffect } from 'react'
import { LocationSearchInput } from '../../lib/useLocationSearch'
import { placesService } from '../../lib/googlePlaces'

interface LocationResult {
  description: string
  main_text: string
  secondary_text: string
}

export default function LocationTestPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null)
  const [apiStatus, setApiStatus] = useState<'checking' | 'working' | 'error'>('checking')
  const [testResults, setTestResults] = useState<string>('')

  const testApiKey = async () => {
    try {
      const isValid = await placesService.validateApiKey()
      setApiStatus(isValid ? 'working' : 'error')
      
      if (isValid) {
        setTestResults('✅ API key is working! Location search is ready.')
      } else {
        setTestResults('❌ API key test failed. Please check your configuration.')
      }
    } catch (error) {
      setApiStatus('error')
      setTestResults(`❌ API error: ${error.message}`)
    }
  }

  // Test API key on component mount
  useEffect(() => {
    testApiKey()
  }, [])

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocation(location)
  }

  const testGeocoding = async () => {
    if (!selectedLocation) return
    
    try {
      const result = await placesService.geocodeAddress(selectedLocation.description)
      if (result) {
        setTestResults(
          `📍 Geocoding successful!\n` +
          `Address: ${result.formatted_address}\n` +
          `Coordinates: ${result.lat}, ${result.lng}\n` +
          `City: ${result.city || 'N/A'}\n` +
          `Country: ${result.country || 'N/A'}`
        )
      } else {
        setTestResults('❌ Geocoding failed')
      }
    } catch (error) {
      setTestResults(`❌ Geocoding error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🗺️ Google Places API Test
            </h1>
            <p className="text-gray-600">
              Test your Google Maps integration for location features
            </p>
          </div>

          {/* API Status */}
          <div className="mb-8 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">API Key Status</h2>
            <div className="flex items-center gap-2">
              {apiStatus === 'checking' && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                  <span>Checking API key...</span>
                </>
              )}
              {apiStatus === 'working' && (
                <>
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-green-700 font-medium">API key is working!</span>
                </>
              )}
              {apiStatus === 'error' && (
                <>
                  <span className="text-red-500 text-xl">❌</span>
                  <span className="text-red-700 font-medium">API key error</span>
                </>
              )}
            </div>
          </div>

          {/* Location Search Test */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Location Search Test</h2>
            <div className="space-y-4">
              <LocationSearchInput
                placeholder="Search for a venue or address... (e.g., Cardiff Community Centre)"
                onLocationSelect={handleLocationSelect}
                className="text-lg"
              />
              
              {selectedLocation && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Selected Location:</h3>
                  <p className="text-green-700">
                    <strong>{selectedLocation.main_text}</strong><br />
                    <span className="text-sm">{selectedLocation.secondary_text}</span>
                  </p>
                  
                  <button
                    onClick={testGeocoding}
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Test Geocoding for this location
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Test Results</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {testResults || 'No tests run yet. Try searching for a location above.'}
              </pre>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">How to Use in Your App</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Event Creation Forms</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Use LocationSearchInput for venue selection in event forms
                </p>
                <code className="text-xs bg-blue-100 p-2 rounded block">
                  {`<LocationSearchInput
  placeholder="Event venue..."
  onLocationSelect={handleVenueSelect}
  types={['establishment']}
/>`}
                </code>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Community Setup</h3>
                <p className="text-green-700 text-sm mb-3">
                  Validate and standardize community addresses
                </p>
                <code className="text-xs bg-green-100 p-2 rounded block">
                  {`const result = await geocodeAddress(address)
if (result) {
  // Use result.lat, result.lng for maps
  // Use result.formatted_address for display
}`}
                </code>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">🚀 Next Steps</h3>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Add location search to event creation forms</li>
              <li>• Integrate address validation in community setup</li>
              <li>• Build "events near me" functionality</li>
              <li>• Add interactive maps to event pages</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}