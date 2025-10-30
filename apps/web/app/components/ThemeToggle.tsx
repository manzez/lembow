'use client'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')
  const [toggleTheme, setToggleTheme] = useState(() => () => {})

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-16 h-8', 
    lg: 'w-20 h-10'
  }

  const dotSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  useEffect(() => {
    setMounted(true)
    
    try {
      const themeContext = useTheme()
      setTheme(themeContext.theme)
      setToggleTheme(() => themeContext.toggleTheme)
    } catch (error) {
      // Fallback to light theme if provider is not available
      setTheme('light')
      setToggleTheme(() => () => {})
    }
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`${className} flex items-center opacity-50`}>
        <div className={`${sizeClasses[size]} bg-gray-200 rounded-full p-1 transition-colors duration-300`}>
          <div className={`${dotSizes[size]} bg-white rounded-full shadow transform transition-transform duration-300`} />
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center rounded-full transition-all duration-500 ease-in-out
        ${sizeClasses[size]}
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-purple-600 to-violet-600' 
          : 'bg-gradient-to-r from-purple-300 to-violet-300'
        }
        hover:shadow-lg transform hover:scale-110 border-2 border-white/30
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Toggle Dot */}
      <span
        className={`
          inline-block ${dotSizes[size]} rounded-full bg-white shadow-lg transform transition-all duration-500 ease-in-out
          flex items-center justify-center
          ${theme === 'dark' 
            ? `translate-x-${size === 'sm' ? '6' : size === 'md' ? '8' : '10'}` 
            : 'translate-x-1'
          }
        `}
      >
        {/* Theme Icons */}
        <span className="text-xs">
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </span>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-white/80">
        <span className={`text-xs transition-opacity duration-300 ${theme === 'dark' ? 'opacity-40' : 'opacity-100'}`}>
          ☀️
        </span>
        <span className={`text-xs transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-40'}`}>
          🌙
        </span>
      </div>
    </button>
  )
}