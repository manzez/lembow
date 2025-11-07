'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const sampleEvents = [
  { id: 'football-kids', title: 'Children\'s Football Sessions ⚽', description: 'Age-grouped football activities for children 8-15 years. 4-aside and 5-aside mixed teams. £2 per session.', date: '2025-11-16', time: '08:00', endTime: '14:00', venue: 'Cardiff Sports Centre', price: 2, capacity: 36, registered: 12, category: 'Sports', status: 'Open', isChildrensActivity: true },
  { id: 1, title: 'Igbo Cultural Festival 2025', description: 'Annual celebration of Igbo culture featuring traditional music, dance, and authentic cuisine.', date: '2025-03-15', time: '14:00', endTime: '20:00', venue: 'Cardiff Community Centre', price: 0, capacity: 300, registered: 125, category: 'Cultural', status: 'Open' },
  { id: 2, title: 'New Year Thanksgiving Service', description: 'Community thanksgiving and prayers for the new year with traditional hymns.', date: '2026-01-12', time: '11:00', endTime: '13:00', venue: 'St. David Church Cardiff', price: 0, capacity: 150, registered: 67, category: 'Religious', status: 'Open' },
  { id: 3, title: 'Monthly General Meeting', description: 'Monthly community meeting to discuss upcoming projects and initiatives.', date: '2025-11-08', time: '19:00', endTime: '21:00', venue: 'Cardiff Bay Community Centre', price: 0, capacity: 80, registered: 34, category: 'Meeting', status: 'Members Only' },
  { id: 4, title: 'Igbo Language Classes', description: 'Learn to speak Igbo language with native speakers. Perfect for all ages.', date: '2025-11-15', time: '10:00', endTime: '12:00', venue: 'Cardiff University Hub', price: 15, capacity: 25, registered: 18, category: 'Education', status: 'Open' },
  { id: 5, title: 'Entrepreneurship Workshop', description: 'Learn about business registration, funding opportunities, and networking.', date: '2025-12-03', time: '13:00', endTime: '17:00', venue: 'Cardiff Metropolitan University', price: 25, capacity: 50, registered: 28, category: 'Business', status: 'Open' },
  { id: 6, title: 'Childrens Christmas Party', description: 'Annual Christmas celebration for children and families with games and gifts.', date: '2025-12-21', time: '15:00', endTime: '18:00', venue: 'Cardiff Community Centre', price: 10, capacity: 100, registered: 45, category: 'Family', status: 'Open' },
  { id: 7, title: 'Sunday Football League', description: 'Weekly community football matches. All skill levels welcome!', date: '2025-11-10', time: '09:00', endTime: '12:00', venue: 'Hailey Park', price: 0, capacity: 40, registered: 32, category: 'Sports', status: 'Open' },
  { id: 8, title: 'Women in Business Networking', description: 'Networking event for women entrepreneurs and business professionals.', date: '2025-11-20', time: '18:00', endTime: '20:30', venue: 'The Coal Exchange', price: 20, capacity: 60, registered: 42, category: 'Business', status: 'Open' },
  { id: 9, title: 'Traditional Dance Workshop', description: 'Learn traditional African dances from professional instructors.', date: '2025-11-17', time: '14:00', endTime: '17:00', venue: 'Dance Studio Cardiff', price: 12, capacity: 30, registered: 22, category: 'Cultural', status: 'Open' },
  { id: 10, title: 'Youth Basketball Tournament', description: 'Inter-community basketball tournament for ages 12-18.', date: '2025-11-23', time: '10:00', endTime: '16:00', venue: 'Cardiff Sport Centre', price: 5, capacity: 80, registered: 64, category: 'Sports', status: 'Open' },
  { id: 11, title: 'Community Health Fair', description: 'Free health screenings, wellness talks, and health information.', date: '2025-11-25', time: '10:00', endTime: '15:00', venue: 'Cardiff Royal Infirmary', price: 0, capacity: 200, registered: 87, category: 'Social', status: 'Open' },
  { id: 12, title: 'Professional Development Seminar', description: 'Career advancement strategies and professional skills development.', date: '2025-12-05', time: '09:00', endTime: '13:00', venue: 'Cardiff Business School', price: 30, capacity: 45, registered: 31, category: 'Business', status: 'Open' },
  { id: 13, title: 'Thanksgiving Dinner', description: 'Community thanksgiving dinner with traditional dishes and live music.', date: '2025-11-27', time: '17:00', endTime: '21:00', venue: 'City Hall Cardiff', price: 15, capacity: 150, registered: 98, category: 'Cultural', status: 'Open' },
  { id: 14, title: 'Bible Study Group', description: 'Weekly Bible study and fellowship for community members.', date: '2025-11-13', time: '19:00', endTime: '20:30', venue: 'Community Church Cardiff', price: 0, capacity: 40, registered: 28, category: 'Religious', status: 'Open' },
  { id: 15, title: 'Coding Bootcamp for Teens', description: 'Introduction to programming and web development for teenagers.', date: '2025-12-07', time: '10:00', endTime: '16:00', venue: 'Tech Hub Cardiff', price: 20, capacity: 20, registered: 15, category: 'Education', status: 'Open' },
  { id: 16, title: 'Table Tennis Championship', description: 'Community table tennis tournament. Singles and doubles categories.', date: '2025-11-30', time: '13:00', endTime: '18:00', venue: 'Cardiff Sports Centre', price: 8, capacity: 50, registered: 38, category: 'Sports', status: 'Open' },
  { id: 17, title: 'Annual Charity Gala', description: 'Fundraising gala dinner with live entertainment and auction.', date: '2025-12-14', time: '18:30', endTime: '23:00', venue: 'Cardiff Marriott Hotel', price: 50, capacity: 120, registered: 89, category: 'Social', status: 'Open' },
  { id: 18, title: 'Investment & Finance Workshop', description: 'Learn about investment strategies, savings, and financial planning.', date: '2025-12-10', time: '18:00', endTime: '20:00', venue: 'Cardiff Central Library', price: 0, capacity: 60, registered: 47, category: 'Business', status: 'Open' },
  { id: 19, title: 'Traditional Music Concert', description: 'Evening of traditional African music with live band performances.', date: '2025-12-18', time: '19:00', endTime: '22:00', venue: 'St Davids Hall', price: 18, capacity: 200, registered: 156, category: 'Cultural', status: 'Open' },
  { id: 20, title: 'Family Game Night', description: 'Fun evening of board games and activities for all ages.', date: '2025-11-22', time: '18:00', endTime: '21:00', venue: 'Community Centre Cardiff', price: 5, capacity: 80, registered: 54, category: 'Family', status: 'Open' },
  { id: 21, title: 'Running Club - Parkrun', description: 'Weekly 5K run for fitness enthusiasts and beginners.', date: '2025-11-16', time: '08:00', endTime: '09:30', venue: 'Bute Park', price: 0, capacity: 100, registered: 73, category: 'Sports', status: 'Open' },
  { id: 22, title: 'Mental Health Awareness Talk', description: 'Discussion on mental health in diaspora communities with expert speakers.', date: '2025-12-01', time: '15:00', endTime: '17:00', venue: 'Cardiff University', price: 0, capacity: 75, registered: 52, category: 'Social', status: 'Open' },
  { id: 23, title: 'Easter Service & Fellowship', description: 'Easter Sunday service followed by community fellowship meal.', date: '2026-04-05', time: '10:00', endTime: '14:00', venue: 'Cathedral Road Baptist Church', price: 0, capacity: 180, registered: 112, category: 'Religious', status: 'Open' },
  { id: 24, title: 'Chess Tournament', description: 'Inter-community chess championship. All levels welcome.', date: '2025-12-08', time: '10:00', endTime: '17:00', venue: 'Cardiff Central Library', price: 5, capacity: 40, registered: 29, category: 'Sports', status: 'Open' },
  { id: 25, title: 'New Years Eve Celebration', description: 'Ring in the new year with music, dancing, and countdown celebration.', date: '2025-12-31', time: '20:00', endTime: '01:00', venue: 'The Depot', price: 35, capacity: 250, registered: 198, category: 'Social', status: 'Open' },
  { id: 26, title: 'Skills Exchange Fair', description: 'Share and learn skills from community members - from cooking to coding.', date: '2025-11-29', time: '11:00', endTime: '16:00', venue: 'Butetown Community Centre', price: 0, capacity: 120, registered: 76, category: 'Education', status: 'Open' }
]

const categories = ['All', 'Cultural', 'Religious', 'Meeting', 'Education', 'Business', 'Family', 'Social', 'Sports']

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':')
  return `${hours}:${minutes}`
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = sampleEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community Events</h1>
              <p className="text-sm text-gray-600 mt-1">Discover and join upcoming community gatherings</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900"> Back</Link>
              <Link href="/events/create" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Create Event</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm" />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (<button key={category} onClick={() => setSelectedCategory(category)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{category}</button>))}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200"><p className="text-xs text-gray-600">{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found</p></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEvents.map(event => {
            const href = event.isChildrensActivity ? `/events/${event.id}/football` : `/events/${event.id}`
            
            return (
              <Link key={event.id} href={href} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group">
                {event.isChildrensActivity && (
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-1 text-xs font-bold">
                    👶 CHILDREN'S ACTIVITY
                  </div>
                )}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded uppercase ${event.category === 'Cultural' ? 'bg-purple-100 text-purple-700' : event.category === 'Religious' ? 'bg-blue-100 text-blue-700' : event.category === 'Meeting' ? 'bg-gray-100 text-gray-700' : event.category === 'Education' ? 'bg-green-100 text-green-700' : event.category === 'Business' ? 'bg-orange-100 text-orange-700' : event.category === 'Sports' ? 'bg-red-100 text-red-700' : event.category === 'Family' ? 'bg-pink-100 text-pink-700' : 'bg-indigo-100 text-indigo-700'}`}>{event.category}</span>
                    <span className="text-xs font-semibold text-gray-900">{event.price === 0 ? 'Free' : `£${event.price}`}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">{event.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center text-xs text-gray-600"><Calendar className="w-3 h-3 mr-1.5 flex-shrink-0" /><span className="truncate">{formatDate(event.date)}</span></div>
                  <div className="flex items-center text-xs text-gray-600"><Clock className="w-3 h-3 mr-1.5 flex-shrink-0" /><span>{formatTime(event.time)} - {formatTime(event.endTime)}</span></div>
                  <div className="flex items-center text-xs text-gray-600"><MapPin className="w-3 h-3 mr-1.5 flex-shrink-0" /><span className="truncate">{event.venue}</span></div>
                  <div className="flex items-center text-xs text-gray-600"><Users className="w-3 h-3 mr-1.5 flex-shrink-0" /><span>{event.registered}/{event.capacity} registered</span></div>
                  <div className="pt-2"><div className="w-full bg-gray-200 rounded-full h-1"><div className="bg-purple-600 h-1 rounded-full transition-all" style={{width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`}}></div></div></div>
                </div>
              </Link>
            )
          })}
        </div>
        {filteredEvents.length === 0 && (<div className="text-center py-12 bg-white rounded-lg border border-gray-200"><p className="text-gray-600 mb-4">No events found</p><Link href="/events/create" className="text-purple-600 hover:text-purple-700 font-medium">Create the first event</Link></div>)}
      </div>
    </div>
  )
}
