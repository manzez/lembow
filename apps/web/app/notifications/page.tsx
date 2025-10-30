'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Notification {
  id: string
  type: 'event' | 'message' | 'connection' | 'system' | 'reminder'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionText?: string
  avatar?: string
  sender?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          type: 'event',
          title: 'Event Starting Soon!',
          message: 'Cultural Festival 2025 starts in 2 hours. Don\'t forget to bring your ID for registration.',
          timestamp: '2 minutes ago',
          read: false,
          priority: 'high',
          actionUrl: '/events/1',
          actionText: 'View Event',
          avatar: '🎭'
        },
        {
          id: '2',
          type: 'connection',
          title: 'New Connection Request',
          message: 'Sarah Chen wants to connect with you. You both attended "Monthly Community Meetup".',
          timestamp: '15 minutes ago',
          read: false,
          priority: 'medium',
          actionUrl: '/connections/requests',
          actionText: 'Respond',
          avatar: '👩‍💼',
          sender: 'Sarah Chen'
        },
        {
          id: '3',
          type: 'message',
          title: 'New Group Message',
          message: 'You have 3 new messages in "Event Planning" group discussion.',
          timestamp: '1 hour ago',
          read: true,
          priority: 'medium',
          actionUrl: '/messages/group/1',
          actionText: 'View Messages',
          avatar: '💬'
        },
        {
          id: '4',
          type: 'event',
          title: 'RSVP Confirmation',
          message: 'Your RSVP for "Igbo Language Classes" has been confirmed. Event is tomorrow at 10:00 AM.',
          timestamp: '2 hours ago',
          read: true,
          priority: 'medium',
          actionUrl: '/events/4',
          actionText: 'Event Details',
          avatar: '✅'
        },
        {
          id: '5',
          type: 'system',
          title: 'Profile Views',
          message: 'Your profile was viewed 12 times this week. Update your bio to get more connections!',
          timestamp: '3 hours ago',
          read: false,
          priority: 'low',
          actionUrl: '/profile/edit',
          actionText: 'Update Profile',
          avatar: '👀'
        },
        {
          id: '6',
          type: 'reminder',
          title: 'Weekly Check-in',
          message: 'How was your week? Share your community activities and connect with others.',
          timestamp: '1 day ago',
          read: true,
          priority: 'low',
          actionUrl: '/weekly-checkin',
          actionText: 'Check In',
          avatar: '📝'
        },
        {
          id: '7',
          type: 'event',
          title: 'Event Cancelled',
          message: 'Unfortunately, "Cardiff Food Festival" scheduled for next week has been cancelled due to weather concerns.',
          timestamp: '2 days ago',
          read: false,
          priority: 'high',
          actionUrl: '/events',
          actionText: 'Find Other Events',
          avatar: '❌'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read
    if (filter === 'high') return notification.priority === 'high'
    return true
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event': return '🎉'
      case 'message': return '💬'
      case 'connection': return '🤝'
      case 'system': return '⚙️'
      case 'reminder': return '📅'
      default: return '🔔'
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
      case 'medium': return 'border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20'
      case 'low': return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading notifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <Link href="/dashboard" className="text-white/90 hover:text-white font-medium px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                ← Back to Dashboard
              </Link>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors backdrop-blur-sm"
                >
                  Mark All Read
                </button>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="font-bold text-lg">{notifications.filter(n => !n.read).length}</span>
                  <span className="text-sm ml-1">unread</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                🔔 Notifications
              </h1>
              <p className="text-xl opacity-95 max-w-2xl mx-auto">
                Stay updated with the latest community activities and important updates
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Tabs */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-200 dark:border-purple-700 mb-8 overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
                { id: 'high', label: 'Priority', count: notifications.filter(n => n.priority === 'high').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    filter === tab.id
                      ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    filter === tab.id 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-200 dark:border-purple-700 p-12 text-center">
                <span className="text-6xl mb-4 block">📭</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'unread' 
                    ? "You've read all your notifications. Great job staying on top of things!"
                    : "When you have new notifications, they'll appear here."
                  }
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] animate-slide-up ${
                    !notification.read 
                      ? getPriorityColor(notification.priority)
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Avatar/Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        notification.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                        notification.priority === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {notification.avatar || getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-bold text-lg ${
                            !notification.read 
                              ? 'text-gray-900 dark:text-gray-100' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                            )}
                            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>

                        <p className={`mb-4 leading-relaxed ${
                          !notification.read 
                            ? 'text-gray-800 dark:text-gray-200' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {notification.message}
                        </p>

                        {notification.sender && (
                          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-3">
                            From: {notification.sender}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                          {notification.actionUrl && (
                            <Link
                              href={notification.actionUrl}
                              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {notification.actionText || 'View'}
                            </Link>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium transition-colors"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredNotifications.length > 0 && (
            <div className="text-center mt-8">
              <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium">
                Load More Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}