'use client'
import { useState, useEffect } from 'react'
import { LoadingSpinner } from '../components/Loading'

interface AnalyticsData {
  overview: {
    totalMembers: number
    activeMembers: number
    totalEvents: number
    upcomingEvents: number
    totalEngagement: number
    growthRate: number
  }
  memberGrowth: {
    month: string
    newMembers: number
    totalMembers: number
  }[]
  eventMetrics: {
    month: string
    eventsCreated: number
    attendance: number
    avgRating: number
  }[]
  engagementData: {
    category: string
    interactions: number
    growth: number
  }[]
  topEvents: {
    id: string
    name: string
    attendees: number
    rating: number
    engagement: number
  }[]
  memberActivity: {
    timeframe: string
    logins: number
    posts: number
    events: number
  }[]
}

interface ChartProps {
  data: any[]
  title: string
  type: 'line' | 'bar' | 'pie'
  color?: string
}

// Enhanced Chart Components with Beautiful Styling
function SimpleLineChart({ data, title, color = 'purple' }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value || d.newMembers || d.attendance || 0))
  
  const getGradientColors = (colorName: string) => {
    switch(colorName) {
      case 'purple': return { from: '#8B5CF6', to: '#A855F7', bg: 'from-purple-500 to-violet-500' }
      case 'green': return { from: '#10B981', to: '#059669', bg: 'from-emerald-500 to-green-500' }
      case 'blue': return { from: '#3B82F6', to: '#2563EB', bg: 'from-blue-500 to-cyan-500' }
      default: return { from: '#8B5CF6', to: '#A855F7', bg: 'from-purple-500 to-violet-500' }
    }
  }
  
  const colors = getGradientColors(color)
  
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-purple-100 dark:border-purple-800 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{title}</h3>
        <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 rounded-2xl">
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Trending Up 📈</span>
        </div>
      </div>
      
      <div className="relative h-64 p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 rounded-2xl border border-purple-200 dark:border-purple-800">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid Lines */}
          {[0, 40, 80, 120, 160, 200].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
              className="text-purple-300 dark:text-purple-700"
              strokeDasharray="5,5"
            />
          ))}
          
          {/* Gradient Fill */}
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.from, stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: colors.to, stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {/* Chart Area */}
          <polygon
            fill={`url(#gradient-${title.replace(/\s/g, '')})`}
            points={`0,200 ${data.map((item, index) => {
              const x = (index / (data.length - 1)) * 400
              const y = 200 - ((item.value || item.newMembers || item.attendance || 0) / maxValue) * 180
              return `${x},${y}`
            }).join(' ')} 400,200`}
            className="animate-shimmer"
          />
          
          {/* Chart Line */}
          <polyline
            fill="none"
            stroke={colors.from}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((item, index) => {
              const x = (index / (data.length - 1)) * 400
              const y = 200 - ((item.value || item.newMembers || item.attendance || 0) / maxValue) * 180
              return `${x},${y}`
            }).join(' ')}
            className="drop-shadow-lg"
          />
          
          {/* Data Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = 200 - ((item.value || item.newMembers || item.attendance || 0) / maxValue) * 180
            const value = item.value || item.newMembers || item.attendance || 0
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke={colors.from}
                  strokeWidth="3"
                  className="hover:r-8 transition-all duration-300 cursor-pointer drop-shadow-lg"
                />
                {/* Hover tooltip */}
                <text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  className="fill-purple-700 dark:fill-purple-300 text-xs font-bold opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  {value.toLocaleString()}
                </text>
              </g>
            )
          })}
        </svg>
        
        {/* Enhanced Labels */}
        <div className="flex justify-between mt-4 px-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {item.month || item.timeframe || `${index + 1}`}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {(item.value || item.newMembers || item.attendance || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SimpleBarChart({ data, title, color = 'purple' }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value || d.interactions || d.eventsCreated || 0))
  
  const getBarGradient = (index: number) => {
    const gradients = [
      'from-purple-500 via-violet-500 to-fuchsia-500',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-green-500 via-emerald-500 to-lime-500',
      'from-orange-500 via-amber-500 to-yellow-500',
      'from-pink-500 via-rose-500 to-red-500',
      'from-indigo-500 via-purple-500 to-violet-500'
    ]
    return gradients[index % gradients.length]
  }
  
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-purple-100 dark:border-purple-800 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 animate-slide-up animation-delay-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{title}</h3>
        <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl">
          <span className="text-sm font-medium text-green-700 dark:text-green-300">High Activity 🚀</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {data.map((item, index) => {
          const value = item.value || item.interactions || item.eventsCreated || 0
          const percentage = (value / maxValue) * 100
          const growth = item.growth || Math.random() * 20 - 5 // Mock growth if not provided
          
          return (
            <div 
              key={index} 
              className="space-y-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getBarGradient(index)} animate-pulse`}></div>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {item.category || item.month || item.name}
                  </span>
                  {growth > 0 && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                      +{growth.toFixed(1)}% ↗️
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                    {value.toLocaleString()}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {percentage.toFixed(1)}% of max
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${getBarGradient(index)} rounded-full transition-all duration-1500 ease-out shadow-lg relative animate-shimmer`}
                    style={{ 
                      width: `${percentage}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Percentage indicator */}
                <div 
                  className="absolute -top-8 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg border border-purple-200 dark:border-purple-700 transition-all duration-1500 ease-out"
                  style={{ 
                    left: `${Math.max(0, Math.min(85, percentage - 5))}%`,
                    animationDelay: `${index * 300}ms`
                  }}
                >
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    {percentage.toFixed(0)}%
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45 border-r border-b border-purple-200 dark:border-purple-700"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Chart Legend */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 rounded-2xl">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-purple-700 dark:text-purple-300">
            📊 Total Interactions: {data.reduce((sum, item) => sum + (item.value || item.interactions || item.eventsCreated || 0), 0).toLocaleString()}
          </span>
          <span className="font-medium text-purple-700 dark:text-purple-300">
            🎯 Average: {Math.round(data.reduce((sum, item) => sum + (item.value || item.interactions || item.eventsCreated || 0), 0) / data.length).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Mock analytics data
  const mockData: AnalyticsData = {
    overview: {
      totalMembers: 1247,
      activeMembers: 892,
      totalEvents: 156,
      upcomingEvents: 15,
      totalEngagement: 23450,
      growthRate: 12.5
    },
    memberGrowth: [
      { month: 'Jul', newMembers: 45, totalMembers: 1120 },
      { month: 'Aug', newMembers: 52, totalMembers: 1172 },
      { month: 'Sep', newMembers: 38, totalMembers: 1210 },
      { month: 'Oct', newMembers: 37, totalMembers: 1247 }
    ],
    eventMetrics: [
      { month: 'Jul', eventsCreated: 12, attendance: 340, avgRating: 4.2 },
      { month: 'Aug', eventsCreated: 15, attendance: 425, avgRating: 4.5 },
      { month: 'Sep', eventsCreated: 11, attendance: 315, avgRating: 4.3 },
      { month: 'Oct', eventsCreated: 18, attendance: 520, avgRating: 4.7 }
    ],
    engagementData: [
      { category: 'Event Participation', interactions: 2340, growth: 15.2 },
      { category: 'Community Posts', interactions: 1850, growth: 8.7 },
      { category: 'Member Connections', interactions: 1420, growth: 22.1 },
      { category: 'Resource Shares', interactions: 890, growth: 5.3 }
    ],
    topEvents: [
      { id: '1', name: 'Cultural Festival 2024', attendees: 156, rating: 4.9, engagement: 95 },
      { id: '2', name: 'Business Networking', attendees: 89, rating: 4.7, engagement: 87 },
      { id: '3', name: 'Community Meetup', attendees: 124, rating: 4.6, engagement: 82 },
      { id: '4', name: 'Tech Workshop', attendees: 67, rating: 4.8, engagement: 78 },
      { id: '5', name: 'Art Exhibition', attendees: 93, rating: 4.5, engagement: 74 }
    ],
    memberActivity: [
      { timeframe: 'Week 1', logins: 450, posts: 89, events: 12 },
      { timeframe: 'Week 2', logins: 520, posts: 97, events: 15 },
      { timeframe: 'Week 3', logins: 480, posts: 76, events: 11 },
      { timeframe: 'Week 4', logins: 590, posts: 112, events: 18 }
    ]
  }

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData(mockData)
      setIsLoading(false)
    }, 1500)
  }, [selectedPeriod])

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  }

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? '↗️' : '↘️'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-violet-300 dark:from-purple-600 dark:to-violet-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-300 to-pink-300 dark:from-fuchsia-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-lg animate-slide-up">
                  Analytics Dashboard
                </h1>
                <p className="text-2xl opacity-95 animate-slide-up animation-delay-300">
                  Deep insights into your community's growth and engagement
                </p>
              </div>
              
              <div className="flex items-center space-x-4 animate-slide-up animation-delay-600">
                <span className="text-white/80">Period:</span>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="7d" className="text-gray-900">Last 7 Days</option>
                  <option value="30d" className="text-gray-900">Last 30 Days</option>
                  <option value="90d" className="text-gray-900">Last 90 Days</option>
                  <option value="1y" className="text-gray-900">Last Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <div className="group bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 animate-bounce-in">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-float">👥</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                    {analyticsData.overview.totalMembers.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Members</div>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-green-500 text-lg">↗️</span>
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                      +{analyticsData.overview.growthRate}%
                    </span>
                  </div>
                  <div className="mt-3 w-full bg-purple-100 dark:bg-purple-900 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-shimmer" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 animate-bounce-in animation-delay-100">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-bounce">🟢</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {analyticsData.overview.activeMembers.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Active Members</div>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                      {((analyticsData.overview.activeMembers / analyticsData.overview.totalMembers) * 100).toFixed(1)}% active
                    </span>
                  </div>
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-spin-slow opacity-20"></div>
                    <div className="absolute inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {Math.round((analyticsData.overview.activeMembers / analyticsData.overview.totalMembers) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 animate-bounce-in">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-pulse-slow">📅</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {analyticsData.overview.totalEvents}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Events</div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                      Upcoming: {analyticsData.overview.upcomingEvents}
                    </span>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-3 h-8 bg-gradient-to-t from-blue-400 to-cyan-400 rounded-sm animate-bounce" style={{animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 animate-bounce-in animation-delay-300">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-pulse">📈</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    {analyticsData.overview.totalEngagement.toLocaleString()}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Engagements</div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <span className="text-orange-500">🔥</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                      This month
                    </span>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 bg-gradient-to-t from-orange-400 to-red-400 rounded-full animate-pulse" 
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 animate-bounce-in animation-delay-400">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-spin-slow">⭐</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    {(analyticsData.eventMetrics.reduce((acc, m) => acc + m.avgRating, 0) / analyticsData.eventMetrics.length).toFixed(1)}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Avg Rating</div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <span className="text-yellow-500">✨</span>
                    <span className="text-pink-600 dark:text-pink-400 font-bold text-sm">
                      Events quality
                    </span>
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <div 
                        key={star} 
                        className={`text-xl animate-bounce ${
                          star <= Math.round((analyticsData.eventMetrics.reduce((acc, m) => acc + m.avgRating, 0) / analyticsData.eventMetrics.length))
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        style={{animationDelay: `${star * 0.1}s`}}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 backdrop-blur-sm rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 animate-bounce-in animation-delay-500">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-6 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-float">🚀</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    +{analyticsData.overview.growthRate}%
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Growth Rate</div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <span className="text-green-500">📈</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      Month over month
                    </span>
                  </div>
                  <div className="relative">
                    <div className="flex justify-center items-end space-x-1 h-8">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-gradient-to-t from-indigo-400 to-purple-400 rounded-t-sm animate-pulse" 
                          style={{
                            width: '8px',
                            height: `${(i + 1) * 6}px`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute -top-2 right-0 text-xs text-indigo-600 animate-bounce">↗️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SimpleLineChart
              data={analyticsData.memberGrowth}
              title="Member Growth Trend"
              type="line"
              color="#8B5CF6"
            />
            
            <SimpleBarChart
              data={analyticsData.engagementData}
              title="Engagement by Category"
              type="bar"
              color="#8B5CF6"
            />
          </div>

          {/* Event Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SimpleLineChart
              data={analyticsData.eventMetrics.map(m => ({ month: m.month, value: m.eventsCreated }))}
              title="Events Created"
              type="line"
              color="#10B981"
            />
            
            <SimpleLineChart
              data={analyticsData.eventMetrics.map(m => ({ month: m.month, value: m.attendance }))}
              title="Event Attendance"
              type="line"
              color="#3B82F6"
            />
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Events */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3 text-3xl">🏆</span>
                  Top Performing Events
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                {analyticsData.topEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-950 rounded-2xl border-2 border-purple-100 dark:border-purple-800 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{event.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.attendees} attendees • ⭐ {event.rating}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {event.engagement}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3 text-3xl">📊</span>
                  Member Activity Trends
                </h2>
              </div>
              
              <div className="p-6">
                <SimpleBarChart
                  data={analyticsData.memberActivity.map(a => ({ 
                    category: a.timeframe, 
                    value: a.logins 
                  }))}
                  title="Weekly Login Activity"
                  type="bar"
                />
              </div>
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <span className="mr-4 text-4xl">💡</span>
                Community Insights & Recommendations
              </h2>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-2xl border-2 border-green-200 dark:border-green-800">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                  Strong Growth
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Your community is growing at {analyticsData.overview.growthRate}% monthly. Keep up the excellent engagement strategies!
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                  High Engagement
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {((analyticsData.overview.activeMembers / analyticsData.overview.totalMembers) * 100).toFixed(1)}% of members are actively engaged. Consider rewarding top contributors.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-6 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
                <div className="text-3xl mb-4">⭐</div>
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-2">
                  Quality Events
                </h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  Average event rating of {(analyticsData.eventMetrics.reduce((acc, m) => acc + m.avgRating, 0) / analyticsData.eventMetrics.length).toFixed(1)}/5.0 shows excellent event quality. Share success stories!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}