'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface ChatMessage {
  id: string
  sender: string
  avatar: string
  message: string
  timestamp: string
  type: 'text' | 'image' | 'file' | 'event' | 'poll'
  reactions: { emoji: string, count: number, users: string[] }[]
  isOwn: boolean
  replyTo?: string
}

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'general' | 'event' | 'interest' | 'private'
  participants: number
  unreadCount: number
  lastMessage: string
  lastMessageTime: string
  icon: string
}

export default function CommunityChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [activeRoom, setActiveRoom] = useState<string>('general')
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showRoomList, setShowRoomList] = useState(false)
  const [currentUser] = useState('You')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock chat rooms
    setChatRooms([
      {
        id: 'general',
        name: 'General Discussion',
        description: 'Main community chat for all topics',
        type: 'general',
        participants: 247,
        unreadCount: 0,
        lastMessage: 'Welcome to the community! 👋',
        lastMessageTime: '2 min ago',
        icon: '💬'
      },
      {
        id: 'events',
        name: 'Event Planning',
        description: 'Discuss upcoming events and activities',
        type: 'event',
        participants: 89,
        unreadCount: 3,
        lastMessage: 'Cultural Festival planning meeting tomorrow',
        lastMessageTime: '5 min ago',
        icon: '🎉'
      },
      {
        id: 'food',
        name: 'Food & Culture',
        description: 'Share recipes and food experiences',
        type: 'interest',
        participants: 156,
        unreadCount: 1,
        lastMessage: 'Anyone have a good jollof rice recipe?',
        lastMessageTime: '15 min ago',
        icon: '🍛'
      },
      {
        id: 'business',
        name: 'Business Network',
        description: 'Professional networking and opportunities',
        type: 'interest',
        participants: 67,
        unreadCount: 0,
        lastMessage: 'Job opportunity at Cardiff Tech Hub',
        lastMessageTime: '1 hour ago',
        icon: '💼'
      },
      {
        id: 'help',
        name: 'Help & Support',
        description: 'Get help with community resources',
        type: 'general',
        participants: 34,
        unreadCount: 0,
        lastMessage: 'How do I update my profile?',
        lastMessageTime: '2 hours ago',
        icon: '🆘'
      }
    ])

    // Mock messages for active room
    loadMessages('general')
    setIsLoading(false)
  }, [])

  const loadMessages = (roomId: string) => {
    // Mock messages data
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'Community Bot',
        avatar: '🤖',
        message: 'Welcome to the Igbo Community Wales chat! This is where we connect, share, and support each other. Feel free to introduce yourself! 🌟',
        timestamp: '10:00 AM',
        type: 'text',
        reactions: [
          { emoji: '👋', count: 8, users: ['Sarah', 'Mike', 'You'] },
          { emoji: '❤️', count: 12, users: ['Emma', 'David'] }
        ],
        isOwn: false
      },
      {
        id: '2',
        sender: 'Sarah Chen',
        avatar: '👩‍💼',
        message: 'Hello everyone! I\'m new to Cardiff and excited to connect with the community. Looking forward to attending some events soon! 😊',
        timestamp: '10:15 AM',
        type: 'text',
        reactions: [
          { emoji: '🎉', count: 5, users: ['Mike', 'Emma'] },
          { emoji: '👏', count: 3, users: ['David'] }
        ],
        isOwn: false
      },
      {
        id: '3',
        sender: 'Mike Okafor',
        avatar: '👨‍💻',
        message: 'Welcome Sarah! Make sure to check out our Cultural Festival next month. It\'s going to be amazing! 🎭',
        timestamp: '10:18 AM',
        type: 'text',
        reactions: [],
        isOwn: false
      },
      {
        id: '4',
        sender: 'You',
        avatar: '👨‍💼',
        message: 'Great to see new faces! Sarah, if you need any recommendations for places in Cardiff, feel free to ask. We\'re all here to help! 🏴󠁧󠁢󠁷󠁬󠁳󠁿',
        timestamp: '10:22 AM',
        type: 'text',
        reactions: [
          { emoji: '🙏', count: 2, users: ['Sarah', 'Emma'] }
        ],
        isOwn: true
      },
      {
        id: '5',
        sender: 'Emma Nwankwo',
        avatar: '👩‍🎓',
        message: 'Has anyone tried the new Nigerian restaurant on Queen Street? I heard they have amazing suya! 🍖',
        timestamp: '11:30 AM',
        type: 'text',
        reactions: [
          { emoji: '🤤', count: 6, users: ['Mike', 'You', 'David'] },
          { emoji: '😋', count: 4, users: ['Sarah'] }
        ],
        isOwn: false
      },
      {
        id: '6',
        sender: 'David Williams',
        avatar: '👨‍⚕️',
        message: 'Yes! I was there last week. The suya is authentic and the jollof rice is incredible. Highly recommend! 🌟',
        timestamp: '11:35 AM',
        type: 'text',
        reactions: [],
        isOwn: false
      }
    ]

    setMessages(mockMessages)
  }

  useEffect(() => {
    loadMessages(activeRoom)
  }, [activeRoom])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: currentUser,
        avatar: '👨‍💼',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        reactions: [],
        isOwn: true
      }
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji)
        if (existingReaction) {
          if (existingReaction.users.includes(currentUser)) {
            // Remove reaction
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== currentUser) }
                  : r
              ).filter(r => r.count > 0)
            }
          } else {
            // Add reaction
            return {
              ...msg,
              reactions: msg.reactions.map(r => 
                r.emoji === emoji 
                  ? { ...r, count: r.count + 1, users: [...r.users, currentUser] }
                  : r
              )
            }
          }
        } else {
          // New reaction
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1, users: [currentUser] }]
          }
        }
      }
      return msg
    }))
  }

  const activeRoomData = chatRooms.find(room => room.id === activeRoom)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-mauve-50 to-violet-100 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950">
      <div className="flex h-screen">
        
        {/* Sidebar - Chat Rooms */}
        <div className={`${showRoomList ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-purple-200 dark:border-purple-700 transition-transform duration-300`}>
          <div className="p-6 border-b border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Community Chat</h2>
              <button
                onClick={() => setShowRoomList(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <Link href="/dashboard" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium text-sm">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="overflow-y-auto h-full pb-6">
            {chatRooms.map(room => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoom(room.id)
                  setShowRoomList(false)
                }}
                className={`w-full p-4 text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 border-l-4 transition-colors ${
                  activeRoom === room.id
                    ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 dark:border-purple-400'
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{room.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {room.name}
                      </h3>
                      {room.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {room.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {room.participants} members
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {room.lastMessageTime}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowRoomList(true)}
                  className="lg:hidden text-white/90 hover:text-white"
                >
                  ☰
                </button>
                <div className="text-3xl animate-float">{activeRoomData?.icon}</div>
                <div>
                  <h1 className="text-xl font-bold">{activeRoomData?.name}</h1>
                  <p className="text-sm text-white/80">{activeRoomData?.participants} members • {activeRoomData?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <span className="text-xl">📞</span>
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <span className="text-xl">📹</span>
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  <span className="text-xl">⚙️</span>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{animationDelay: `${index * 50}ms`}}>
                <div className={`max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-3xl p-4 shadow-lg ${
                    message.isOwn 
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white ml-4' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-4'
                  }`}>
                    {!message.isOwn && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{message.avatar}</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{message.sender}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                      </div>
                    )}
                    
                    <p className={`leading-relaxed ${message.isOwn ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                      {message.message}
                    </p>
                    
                    {message.isOwn && (
                      <div className="text-xs text-white/80 mt-2 text-right">
                        {message.timestamp}
                      </div>
                    )}
                  </div>

                  {/* Reactions */}
                  {message.reactions.length > 0 && (
                    <div className={`flex flex-wrap gap-2 mt-2 ${message.isOwn ? 'justify-end mr-4' : 'ml-4'}`}>
                      {message.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          onClick={() => addReaction(message.id, reaction.emoji)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                            reaction.users.includes(currentUser)
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-xs">+</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Quick Emoji Reactions */}
                  {!message.reactions.length && (
                    <div className={`flex space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${message.isOwn ? 'justify-end mr-4' : 'ml-4'}`}>
                      {['👍', '❤️', '😂', '😮', '😢', '😡'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(message.id, emoji)}
                          className="text-lg hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-purple-200 dark:border-purple-700 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent resize-none"
                  rows={1}
                />
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  😊
                </button>
              </div>
              
              <button className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <span className="text-xl">📎</span>
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                <span className="text-xl">🚀</span>
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 p-4 z-10">
                <div className="grid grid-cols-6 gap-2">
                  {['😀', '😂', '😍', '🤔', '😢', '😡', '👍', '👎', '❤️', '🎉', '🔥', '💯', '🙏', '👏', '🤝', '💪', '🎯', '⭐'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setNewMessage(prev => prev + emoji)
                        setShowEmojiPicker(false)
                      }}
                      className="text-2xl hover:scale-125 transition-transform p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showRoomList && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setShowRoomList(false)}
        />
      )}
    </div>
  )
}