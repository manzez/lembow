// Lembo Platform Branding Constants
export const LEMBO_BRANDING = {
  platform: {
    name: 'Lembo',
    tagline: 'Connecting Communities Worldwide',
    description: 'The premier platform for African diaspora communities',
    colors: {
      primary: 'from-blue-600 via-purple-600 to-green-600',
      secondary: 'from-green-500 to-blue-600',
      accent: 'from-purple-600 to-blue-600'
    }
  },
  community: {
    name: 'Igbo Community Wales',
    shortName: 'ICW',
    tagline: 'Preserving Heritage, Building Futures',
    description: 'A vibrant community celebrating Igbo culture in Wales',
    colors: {
      primary: 'from-green-600 via-blue-600 to-purple-600',
      secondary: 'from-blue-500 to-purple-600',
      cultural: 'from-orange-500 via-red-500 to-green-600'
    },
    cultural: {
      flag: '🇳🇬',
      colors: ['#008751', '#FFFFFF', '#008751'], // Nigerian flag colors
      symbols: ['🏛️', '🎭', '🎵', '🍽️', '📚']
    }
  }
}

export const LEMBO_STYLES = {
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-green-600',
    secondary: 'bg-gradient-to-r from-green-500 to-blue-600',
    cultural: 'bg-gradient-to-r from-orange-500 via-red-500 to-green-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-orange-500 to-red-500'
  },
  cards: {
    default: 'bg-white rounded-2xl shadow-lg p-6',
    featured: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow-lg p-6',
    cultural: 'bg-gradient-to-br from-green-50 to-orange-50 border border-green-200 rounded-2xl shadow-lg p-6'
  },
  buttons: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105',
    cultural: 'bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105'
  }
}

export const getCulturalFlag = (country: string) => {
  const flags: Record<string, string> = {
    nigeria: '🇳🇬',
    ghana: '🇬🇭',
    cameroon: '🇨🇲',
    kenya: '🇰🇪',
    southafrica: '🇿🇦',
    uk: '🇬🇧',
    canada: '🇨🇦',
    usa: '🇺🇸',
    australia: '🇦🇺'
  }
  return flags[country.toLowerCase()] || '🏛️'
}