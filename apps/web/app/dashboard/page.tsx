'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LoadingSpinner } from '../components/Loading'

interface DashboardStats {
  totalMembers: number
  activeEvents: number
  upcomingEvents: number
  totalEvents: number
  memberGrowth: number
  eventAttendance: number
  myEvents: number
  myRSVPs: number
  notifications: number
  connections: number
}

interface RecentActivity {
  id: string
  type: 'member_joined' | 'event_created' | 'event_rsvp' | 'event_completed' | 'message' | 'connection'
  message: string
  timestamp: string
  user?: string
  event?: string
  avatar?: string
  priority: 'low' | 'medium' | 'high'
  read: boolean
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href: string
  color: string
  count?: number
}

interface UserProfile {
  name: string
  email: string
  avatar: string
  role: string
  joinDate: string
  lastActive: string
  streak: number
}

export default function CommunityDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'calendar'>('overview')
  const [showNotifications, setShowNotifications] = useState(false)

  const quickActions: QuickAction[] = [
    {
      id: 'create-event',
      title: 'Create Event',
      description: 'Organize a new community event',
      icon: '🎉',
      href: '/events/create',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'my-events',
      title: 'My Events',
      description: 'Events you\'re attending',
      icon: '📅',
      href: '/me/events',
      color: 'from-blue-500 to-cyan-500',
      count: stats?.myRSVPs || 0
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'View recent updates',
      icon: '🔔',
      href: '/notifications',
      color: 'from-orange-500 to-red-500',
      count: stats?.notifications || 0
    },
    {
      id: 'manage-members',
      title: 'Manage Members',
      description: 'View and manage community members',
      icon: '👥',
      href: '/members',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'view-events',
      title: 'View Events',
      description: 'See all upcoming and past events',
      icon: '📅',
      href: '/events',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View community insights and metrics',
      icon: '📊',
      href: '/analytics',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'communications',
      title: 'Communications',
      description: 'Send messages and announcements',
      icon: '💬',
      href: '/communications',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure community preferences',
      icon: '⚙️',
      href: '/settings',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  useEffect(() => {
    // Simulate API calls
    const loadData = async () => {
      setIsLoading(true)
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock stats data
      setStats({
        totalMembers: 1247,
        activeEvents: 8,
        upcomingEvents: 15,
        totalEvents: 156,
        memberGrowth: 12.5,
        eventAttendance: 87.3,
        myEvents: 3,
        myRSVPs: 7,
        notifications: 12,
        connections: 89
      })

      // Mock activities data  
      setActivities([
        {
          id: '1',
          type: 'member_joined',
          message: 'Sarah Chen joined the community',
          timestamp: '2 minutes ago',
          user: 'Sarah Chen',
          avatar: '👩‍💼',
          priority: 'low',
          read: false
        },
        {
          id: '2',
          type: 'event_created',
          message: 'Cultural Festival 2024 event was created',
          timestamp: '15 minutes ago',
          event: 'Cultural Festival 2024',
          priority: 'high',
          read: false
        },
        {
          id: '3',
          type: 'event_rsvp',
          message: '5 new RSVPs for Community Meetup',
          timestamp: '1 hour ago',
          event: 'Community Meetup',
          priority: 'medium',
          read: true
        },
        {
          id: '4',
          type: 'event_completed',
          message: 'Cardiff Food Festival completed successfully',
          timestamp: '2 hours ago',
          event: 'Cardiff Food Festival',
          priority: 'medium',
          read: true
        },
        {
          id: '5',
          type: 'connection',
          message: 'David Williams wants to connect with you',
          timestamp: '3 hours ago',
          user: 'David Williams',
          avatar: '👨‍💻',
          priority: 'high',
          read: false
        },
        {
          id: '6',
          type: 'message',
          message: 'New message in "Event Planning" group',
          timestamp: '4 hours ago',
          priority: 'medium',
          read: false
        }
      ])

      // Mock user profile data
      setUserProfile({
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        avatar: '👨‍💼',
        role: 'Community Manager',
        joinDate: 'January 2024',
        lastActive: 'Online now',
        streak: 15
      })

      setIsLoading(false)
    }

    loadData()
  }, [])

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'member_joined':
        return '👋'
      case 'event_created':
        return '✨'
      case 'event_rsvp':
        return '🎫'
      case 'event_completed':
        return '🎊'
      default:
        return '📢'
    }
  }

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'member_joined':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'event_created':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'event_rsvp':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'event_completed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-violet-300 dark:from-purple-600 dark:to-violet-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-300 to-pink-300 dark:from-fuchsia-600 dark:to-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-10 animate-float animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header with User Profile */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Navigation Bar */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                ← Back to Home
              </Link>
              
              {/* User Profile Header */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                  >
                    <span className="text-2xl">🔔</span>
                    {stats && stats.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                        {stats.notifications}
                      </span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {activities.filter(a => !a.read).slice(0, 5).map(activity => (
                          <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-0">
                            <div className="flex items-start space-x-3">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                activity.priority === 'high' ? 'bg-red-100 text-red-600' :
                                activity.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {activity.avatar || getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                                  {activity.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {activity.timestamp}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
                  <div className="text-3xl">{userProfile?.avatar}</div>
                  <div>
                    <div className="font-bold text-lg">{userProfile?.name}</div>
                    <div className="text-sm text-white/80">{userProfile?.role}</div>
                  </div>
                  <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-lg">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium">{userProfile?.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg animate-slide-up">
                Welcome back, {userProfile?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl opacity-95 max-w-3xl mx-auto animate-slide-up animation-delay-300">
                Your community is thriving with {stats?.totalMembers.toLocaleString()} members and {stats?.activeEvents} active events
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-950 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-100 dark:border-purple-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl">
                  <span className="text-3xl">👥</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats?.totalMembers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="text-lg">↗️</span>
                <span className="ml-2 font-semibold">+{stats?.memberGrowth}% this month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-100 dark:border-blue-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in animation-delay-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
                  <span className="text-3xl">🎉</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats?.activeEvents}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Events</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <span className="text-lg">📅</span>
                <span className="ml-2 font-semibold">{stats?.upcomingEvents} upcoming</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-950 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-green-100 dark:border-green-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in animation-delay-400">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats?.eventAttendance}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="text-lg">🎯</span>
                <span className="ml-2 font-semibold">Above average</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-950 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-orange-100 dark:border-orange-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in animation-delay-600">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl">
                  <span className="text-3xl">📈</span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats?.totalEvents}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
                </div>
              </div>
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <span className="text-lg">🚀</span>
                <span className="ml-2 font-semibold">Growing fast</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <span className="mr-3 text-4xl">⚡</span>
                Quick Actions
              </h2>
            </div>
            
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className={`group bg-gradient-to-br ${action.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{action.icon}</span>
                    <h3 className="text-xl font-bold">{action.title}</h3>
                  </div>
                  <p className="text-white/90 group-hover:text-white transition-colors">
                    {action.description}
                  </p>
                  <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span>Get started</span>
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3 text-3xl">📋</span>
                  Recent Activity
                </h2>
              </div>
              
              <div className="p-8 space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-center p-4 rounded-2xl border-2 ${getActivityColor(activity.type)} animate-slide-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-2xl mr-4">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm opacity-75">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Preview */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 dark:border-purple-800 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="mr-3 text-3xl">🎪</span>
                  Upcoming Events
                </h2>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-6 animate-slide-up">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">Cultural Festival 2024</h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Cultural
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Annual celebration of diverse cultures in our community</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">📅</span>
                      Dec 15, 2024
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">👥</span>
                      156 attending
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 animate-slide-up animation-delay-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">Community Meetup</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Social
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Monthly gathering for networking and community building</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">📅</span>
                      Dec 8, 2024
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">👥</span>
                      89 attending
                    </div>
                  </div>
                </div>

                <Link 
                  href="/events"
                  className="block w-full text-center py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View All Events →
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.id}
                href={action.href}
                className={`group relative bg-gradient-to-br ${action.color} text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl animate-float">{action.icon}</div>
                    {action.count !== undefined && action.count > 0 && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="font-bold text-sm">{action.count}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                  <p className="text-white/90 text-sm">{action.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 animate-shimmer"></div>
              </Link>
            ))}
          </div>

          {/* Enhanced Activity Feed */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200 dark:border-purple-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Recent Activity</h2>
                  <p className="text-white/80">Stay updated with what's happening in your community</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeTab === 'overview' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveTab('activities')}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeTab === 'activities' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Activities
                  </button>
                  <button 
                    onClick={() => setActiveTab('calendar')}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                      activeTab === 'calendar' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Calendar
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'activities' && (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className={`flex items-start space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg animate-slide-up ${
                        activity.read 
                          ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                          : 'bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-600'
                      }`}
                      style={{animationDelay: `${index * 50}ms`}}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${getActivityColor(activity.type)}`}>
                        {activity.avatar || getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${activity.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
                          {activity.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                          {activity.priority === 'high' && (
                            <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-lg text-xs font-medium">
                              High Priority
                            </span>
                          )}
                          {!activity.read && (
                            <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-lg text-xs font-medium">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <span className="text-lg">⋮</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium">
                      Load More Activities
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">My Events</h3>
                      <span className="text-2xl">📅</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats?.myRSVPs}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Events you're attending</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">Connections</h3>
                      <span className="text-2xl">🤝</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats?.connections}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Community connections</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">Engagement</h3>
                      <span className="text-2xl">⚡</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{stats?.eventAttendance.toFixed(0)}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Attendance rate</p>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block animate-float">📅</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Calendar View Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Interactive calendar with drag-and-drop event management</p>
                  <Link href="/events/calendar" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    View Events Calendar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}