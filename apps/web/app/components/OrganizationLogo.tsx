'use client'
import { useState } from 'react'

interface OrganizationLogoProps {
  organization: {
    id: string
    name: string
    slug: string
    logoUrl?: string | null
  }
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showName?: boolean
  fallbackToInitial?: boolean
}

export default function OrganizationLogo({ 
  organization, 
  size = 'md', 
  className = '', 
  showName = false,
  fallbackToInitial = true
}: OrganizationLogoProps) {
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(organization.name)}&background=8b5cf6&color=ffffff&size=${size === 'sm' ? '24' : size === 'md' ? '40' : size === 'lg' ? '64' : '96'}&bold=true`

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden shadow-lg border-2 border-purple-500/30 bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center`}>
        {organization.logoUrl && !imageError ? (
          <img
            src={organization.logoUrl}
            alt={`${organization.name} logo`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <>
            <img
              src={avatarUrl}
              alt={`${organization.name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (fallbackToInitial && target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).classList.remove('hidden');
                }
              }}
            />
            {fallbackToInitial && (
              <span className={`hidden text-white font-bold ${textSizeClasses[size]}`}>
                {organization.name.charAt(0).toUpperCase()}
              </span>
            )}
          </>
        )}
      </div>
      
      {showName && (
        <div>
          <h3 className="font-bold text-gray-900">{organization.name}</h3>
          <p className="text-sm text-gray-600">@{organization.slug}</p>
        </div>
      )}
    </div>
  )
}