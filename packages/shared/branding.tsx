// Lembo Platform Branding Constants and Utilities

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

// Logo Component
export const LemboLogo = ({ size = 'md', variant = 'platform' }: { size?: 'sm' | 'md' | 'lg', variant?: 'platform' | 'community' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  }
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const gradients = {
    platform: LEMBO_BRANDING.platform.colors.primary,
    community: LEMBO_BRANDING.community.colors.primary
  }

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizes[size]} ${sizes[size]} bg-gradient-to-r ${gradients[variant]} rounded-full flex items-center justify-center text-white font-bold ${textSizes[size]}`}>
        L
      </div>
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent ${textSizes[size]}`}>
          {variant === 'platform' ? LEMBO_BRANDING.platform.name : LEMBO_BRANDING.community.shortName}
        </span>
        {size !== 'sm' && (
          <span className="text-sm text-gray-600">
            {variant === 'platform' ? LEMBO_BRANDING.platform.tagline : LEMBO_BRANDING.community.tagline}
          </span>
        )}
      </div>
    </div>
  )
}

// Header Component
export const LemboHeader = ({ title, subtitle, variant = 'platform' }: { title: string, subtitle: string, variant?: 'platform' | 'community' }) => {
  const gradients = {
    platform: LEMBO_BRANDING.platform.colors.primary,
    community: LEMBO_BRANDING.community.colors.primary
  }

  return (
    <div className={`bg-gradient-to-r ${gradients[variant]} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <LemboLogo size="lg" variant={variant} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

// Card Component with Lembo styling
export const LemboCard = ({ children, className = '', variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default' | 'featured' | 'cultural' }) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    featured: 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200',
    cultural: 'bg-gradient-to-br from-green-50 to-orange-50 border border-green-200'
  }

  return (
    <div className={`rounded-2xl shadow-lg p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

// Button Component with Lembo styling
export const LemboButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false 
}: { 
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'cultural' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  disabled?: boolean
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white',
    cultural: 'bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    warning: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95
        ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Status Badge Component
export const LemboStatusBadge = ({ status, text }: { status: 'success' | 'warning' | 'error' | 'info', text: string }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-orange-100 text-orange-800 border border-orange-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[status]}`}>
      {text}
    </span>
  )
}

// Cultural Elements
export const CulturalFlag = ({ country = 'nigeria' }: { country?: 'nigeria' | 'ghana' | 'cameroon' }) => {
  const flags = {
    nigeria: '🇳🇬',
    ghana: '🇬🇭',
    cameroon: '🇨🇲'
  }
  
  return <span className="text-2xl">{flags[country]}</span>
}

export const CulturalPattern = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gradient-to-r from-green-400 via-yellow-400 via-red-400 to-green-400 opacity-10 ${className}`} />
)

// Navigation Component
export const LemboNavigation = ({ currentPage }: { currentPage?: string }) => {
  const navItems = [
    { href: '/', label: 'Communities', icon: '🏛️' },
    { href: '/events', label: 'Events', icon: '📅' },
    { href: '/payments', label: 'Payments', icon: '💳' },
    { href: '/admin', label: 'Admin', icon: '⚙️' }
  ]

  return (
    <nav className="flex space-x-8 py-4">
      {navItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
            currentPage === item.href 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

// Footer Component
export const LemboFooter = () => (
  <footer className="bg-gray-900 text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <LemboLogo size="lg" variant="platform" />
          <p className="mt-4 text-gray-400 max-w-md">
            {LEMBO_BRANDING.platform.description}. Empowering communities across the UK, Canada, USA, Australia, and beyond.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/communities" className="text-gray-400 hover:text-white transition-colors">Find Communities</a></li>
            <li><a href="/events" className="text-gray-400 hover:text-white transition-colors">Upcoming Events</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Lembo</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="mailto:support@lembo.com" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Lembo Platform. Proudly connecting communities worldwide.</p>
      </div>
    </div>
  </footer>
)