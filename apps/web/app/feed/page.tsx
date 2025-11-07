'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  Filter,
  Search,
  Plus,
  Camera,
  Smile,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Star,
  ExternalLink,
  Bell,
  Globe,
  PoundSterling
} from 'lucide-react'
import { getEventPhoto, getCommunityCoverPhoto } from '../../lib/photos'

// Sample social feed data - Facebook-style posts for communities
const socialFeedData = [
  {
    id: 1,
    type: 'event',
    communitySlug: 'igbo-cardiff',
    author: {
      name: 'Igbo Community Cardiff',
      avatar: 'https://ui-avatars.com/api/?name=Igbo+Cardiff&background=8b5cf6&color=fff',
      isVerified: true,
      location: 'Cardiff, Wales'
    },
    timestamp: '2 hours ago',
    content: {
      text: '🎉 Our Cultural Night is happening THIS Saturday! Come experience authentic Igbo music, dance, and incredible food. Bring your friends and family - everyone is welcome! 🇳🇬',
      images: [getEventPhoto('cultural', 1)],
      event: {
        name: 'Cultural Night Celebration',
        date: 'Nov 15, 2025',
        time: '7:00 PM',
        venue: 'Bethnal Green Town Hall',
        price: '£15',
        attending: 42,
        interested: 128
      }
    },
    engagement: {
      likes: 156,
      comments: 23,
      shares: 8,
      reactions: {
        love: 89,
        thumbsUp: 45,
        wow: 22
      }
    },
    comments: [
      {
        id: 1,
        author: 'Amara Okafor',
        avatar: 'https://ui-avatars.com/api/?name=Amara+Okafor&background=ec4899&color=fff',
        text: 'Cannot wait! My whole family is coming 🥳',
        timestamp: '1 hour ago',
        likes: 12
      },
      {
        id: 2,
        author: 'Chidi Okwu',
        avatar: 'https://ui-avatars.com/api/?name=Chidi+Okwu&background=06b6d4&color=fff',
        text: 'Will there be Jollof rice? Asking for a friend... 😋',
        timestamp: '45 minutes ago',
        likes: 8
      }
    ]
  },
  {
    id: 2,
    type: 'market',
    communitySlug: 'nigerian-london',
    author: {
      name: 'Nigerian Community London',
      avatar: 'https://ui-avatars.com/api/?name=Nigerian+London&background=f59e0b&color=fff',
      isVerified: true,
      location: 'Peckham, London'
    },
    timestamp: '4 hours ago',
    content: {
      text: '🛒 Weekend African Food Market is LIVE at Peckham Square! Fresh plantains, yams, palm oil, and more. Support our local vendors! Open until 6 PM today.',
      images: [getEventPhoto('social', 1), getEventPhoto('social', 2)],
      market: {
        name: 'Peckham African Market',
        location: 'Peckham Square, SE15 5DQ',
        hours: '9 AM - 6 PM',
        vendors: 15,
        categories: ['Fresh Produce', 'Spices', 'Meat', 'Clothing']
      }
    },
    engagement: {
      likes: 203,
      comments: 45,
      shares: 31
    },
    comments: [
      {
        id: 1,
        author: 'Funmi Adebayo',
        avatar: 'https://ui-avatars.com/api/?name=Funmi+Adebayo&background=10b981&color=fff',
        text: 'Best prices in London! Got everything I needed 💚',
        timestamp: '2 hours ago',
        likes: 15
      }
    ]
  },
  {
    id: 3,
    type: 'collaboration',
    communitySlug: 'heritage-paris',
    author: {
      name: 'Heritage Community Paris',
      avatar: 'https://ui-avatars.com/api/?name=Heritage+Paris&background=ef4444&color=fff',
      isVerified: true,
      location: 'Paris, France'
    },
    timestamp: '6 hours ago',
    content: {
      text: '🤝 Exciting news! We\'re partnering with 3 other communities for a massive Unity Festival in London this December! This is going to be HUGE - 4 communities, 1000+ people, amazing food, music, and culture. Who\'s in? 🎪',
      images: ['https://source.unsplash.com/800x400/?festival,multicultural'],
      collaboration: {
        communities: ['Heritage Paris', 'Igbo Cardiff', 'Nigerian London', 'Ghanaian Manchester'],
        expectedAttendees: 1200,
        date: 'Dec 20, 2025',
        venue: 'O2 Arena, London'
      }
    },
    engagement: {
      likes: 445,
      comments: 89,
      shares: 67
    },
    comments: []
  },
  {
    id: 4,
    type: 'meeting',
    communitySlug: 'unity-lagos',
    author: {
      name: 'Unity Lagos',
      avatar: 'https://ui-avatars.com/api/?name=Unity+Lagos&background=7c3aed&color=fff',
      isVerified: true,
      location: 'Victoria Island, Lagos'
    },
    timestamp: '1 day ago',
    content: {
      text: '📋 Monthly Community Meeting - Tomorrow 6 PM! We\'ll discuss our upcoming youth scholarship program, new member applications, and planning for the Christmas celebration. Light refreshments provided. See you there! 🤝',
      meeting: {
        type: 'Monthly Community Meeting',
        agenda: ['Youth Scholarship Program', 'New Member Applications', 'Christmas Celebration Planning'],
        venue: 'Community Center Hall',
        date: 'Nov 4, 2025',
        time: '6:00 PM',
        expectedAttendees: 45
      }
    },
    engagement: {
      likes: 67,
      comments: 12,
      shares: 4
    },
    comments: []
  },
  {
    id: 5,
    type: 'announcement',
    communitySlug: 'lembow-platform',
    author: {
      name: 'Lembow Platform',
      avatar: 'https://ui-avatars.com/api/?name=Lembow&background=6366f1&color=fff',
      isVerified: true,
      location: 'Platform Update'
    },
    timestamp: '1 day ago',
    content: {
      text: '🎉 NEW FEATURE: Community Collaboration Analytics is now live! See how communities across the UK are working together, track partnership impact, and discover collaboration opportunities. Check it out! 📊',
      images: ['https://source.unsplash.com/800x400/?analytics,dashboard,community'],
      link: {
        title: 'UK Community Collaboration Analytics',
        description: 'Track partnerships, measure impact, celebrate unity across Britain',
        url: '/collaboration-analytics'
      }
    },
    engagement: {
      likes: 234,
      comments: 56,
      shares: 78
    },
    comments: []
  }
]

export default function SocialFeed() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')

  const filters = [
    { id: 'all', label: 'All Updates', count: socialFeedData.length },
    { id: 'event', label: 'Events', count: socialFeedData.filter(p => p.type === 'event').length },
    { id: 'market', label: 'Markets', count: socialFeedData.filter(p => p.type === 'market').length },
    { id: 'meeting', label: 'Meetings', count: socialFeedData.filter(p => p.type === 'meeting').length },
    { id: 'collaboration', label: 'Collaborations', count: socialFeedData.filter(p => p.type === 'collaboration').length }
  ]

  const filteredPosts = selectedFilter === 'all' 
    ? socialFeedData 
    : socialFeedData.filter(post => post.type === selectedFilter)

  const handleReaction = (postId: number, reaction: string) => {
    // Handle reaction logic
    console.log(`Reacted ${reaction} to post ${postId}`)
  }

  const handleComment = (postId: number, comment: string) => {
    // Handle comment logic
    console.log(`Commented on post ${postId}: ${comment}`)
  }

  const handleShare = (postId: number) => {
    // Handle share logic
    console.log(`Shared post ${postId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-2xl font-bold text-purple-600">
                Lembow
              </Link>
              
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search communities, events, markets..."
                  className="pl-10 pr-4 py-2 w-80 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setShowNewPost(!showNewPost)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar - Filters & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Discover</h3>
              
              <div className="space-y-2 mb-6">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      selectedFilter === filter.id
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link href="/events/create" className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    📅 Create Event
                  </Link>
                  <Link href="/communities/invite" className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    🤝 Send Invite
                  </Link>
                  <Link href="/markets/add" className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    🛒 Add Market
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* New Post Box */}
            {showNewPost && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    U
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="What's happening in your community?"
                      className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-purple-600">
                          <Camera className="w-5 h-5 mr-2" />
                          Photo
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-purple-600">
                          <Calendar className="w-5 h-5 mr-2" />
                          Event
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-purple-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          Location
                        </button>
                      </div>
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Feed Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{post.author.name}</span>
                            {post.author.isVerified && (
                              <Star className="w-4 h-4 text-blue-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-2">
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{post.author.location}</span>
                            <Globe className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-gray-900 mb-4 leading-relaxed">{post.content.text}</p>
                    
                    {/* Event Card */}
                    {post.content.event && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{post.content.event.name}</h4>
                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.content.event.price}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                            {post.content.event.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-purple-600" />
                            {post.content.event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                            {post.content.event.venue}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-purple-600" />
                            {post.content.event.attending} attending
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                            I'm Going
                          </button>
                          <button className="flex-1 bg-white text-purple-600 border border-purple-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                            Interested
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Market Card */}
                    {post.content.market && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{post.content.market.name}</h4>
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.content.market.vendors} vendors
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          <div className="flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-2 text-green-600" />
                            {post.content.market.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-600" />
                            {post.content.market.hours}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.content.market.categories.map((category, idx) => (
                            <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </button>
                      </div>
                    )}

                    {/* Collaboration Card */}
                    {post.content.collaboration && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Multi-Community Collaboration</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Expected Attendees:</span>
                            <span className="ml-1">{post.content.collaboration.expectedAttendees.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="font-medium">Date:</span>
                            <span className="ml-1">{post.content.collaboration.date}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Venue:</span>
                            <span className="ml-1">{post.content.collaboration.venue}</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700">Participating Communities:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.content.collaboration.communities.map((community, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                {community}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Join Collaboration
                        </button>
                      </div>
                    )}

                    {/* Images */}
                    {post.content.images && (
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        {post.content.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt="Post content"
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Engagement Bar */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{post.engagement.likes} likes</span>
                        <span>{post.engagement.comments} comments</span>
                        <span>{post.engagement.shares} shares</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-around py-2 border-t border-gray-100">
                      <button 
                        onClick={() => handleReaction(post.id, 'like')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50">
                        <MessageCircle className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      <button 
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      <Link 
                        href={`/c/${post.communitySlug}/donate`}
                        className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
                      >
                        <PoundSterling className="w-5 h-5" />
                        <span>Support</span>
                      </Link>
                    </div>

                    {/* Comments Section */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <img
                              src={comment.avatar}
                              alt={comment.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                <div className="font-semibold text-sm text-gray-900">{comment.author}</div>
                                <div className="text-gray-800">{comment.text}</div>
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span>{comment.timestamp}</span>
                                <button className="hover:text-purple-600">Like</button>
                                <button className="hover:text-blue-600">Reply</button>
                                <span>{comment.likes} likes</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Community Highlights & Trends */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Trending Near You */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Trending Near You</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#CulturalNight</div>
                      <div className="text-sm text-gray-600">156 posts</div>
                    </div>
                    <div className="text-orange-500">🔥</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#AfricanMarket</div>
                      <div className="text-sm text-gray-600">89 posts</div>
                    </div>
                    <div className="text-orange-500">📈</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">#UnityFestival</div>
                      <div className="text-sm text-gray-600">67 posts</div>
                    </div>
                    <div className="text-orange-500">⭐</div>
                  </div>
                </div>
              </div>

              {/* Suggested Communities */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Communities Near You</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img
                      src="https://ui-avatars.com/api/?name=Ghanaian+Birmingham&background=22c55e&color=fff"
                      alt="Ghanaian Birmingham"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Ghanaian Community Birmingham</div>
                      <div className="text-sm text-gray-600">2.3km away • 234 members</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img
                      src="https://ui-avatars.com/api/?name=Somali+Bristol&background=f59e0b&color=fff"
                      alt="Somali Bristol"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Somali Community Bristol</div>
                      <div className="text-sm text-gray-600">5.7km away • 189 members</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">Your Community Impact</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Events Attended</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Communities Joined</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Connections Made</span>
                    <span className="font-bold">47</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}