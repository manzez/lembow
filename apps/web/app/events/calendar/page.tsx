'use client'
import { useState } from 'react'
import Link from 'next/link'

// Sample events data for calendar
const calendarEvents = [
  { id: 1, title: 'Monthly General Meeting', date: '2025-11-08', time: '19:00', type: 'meeting' },
  { id: 2, title: 'Igbo Language Classes', date: '2025-11-15', time: '10:00', type: 'education' },
  { id: 3, title: 'Entrepreneurship Workshop', date: '2025-12-03', time: '13:00', type: 'business' },
  { id: 4, title: 'Children\'s Christmas Party', date: '2025-12-21', time: '15:00', type: 'family' },
  { id: 5, title: 'New Year Service', date: '2026-01-12', time: '11:00', type: 'religious' },
  { id: 6, title: 'Cultural Festival 2025', date: '2025-03-15', time: '14:00', type: 'cultural' }
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay())

  // Generate calendar days
  const calendarDays = []
  const currentCalendarDate = new Date(startDate)
  
  for (let week = 0; week < 6; week++) {
    const weekDays = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentCalendarDate)
      const isCurrentMonth = date.getMonth() === currentMonth
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      
      // Find events for this date
      const dateString = date.toISOString().split('T')[0]
      const dayEvents = calendarEvents.filter(event => event.date === dateString)
      
      weekDays.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        events: dayEvents
      })
      
      currentCalendarDate.setDate(currentCalendarDate.getDate() + 1)
    }
    calendarDays.push(weekDays)
    
    // Break if we've filled the month
    if (currentCalendarDate > lastDayOfMonth && week >= 4) break
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentMonth + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-purple-500'
      case 'religious': return 'bg-blue-500'
      case 'meeting': return 'bg-gray-500'
      case 'education': return 'bg-green-500'
      case 'business': return 'bg-orange-500'
      case 'family': return 'bg-pink-500'
      default: return 'bg-blue-500'
    }
  }

  // Get events for selected date
  const selectedDateEvents = selectedDate 
    ? calendarEvents.filter(event => event.date === selectedDate.toISOString().split('T')[0])
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Events Calendar</h1>
              <p className="text-lg opacity-90">Plan ahead and never miss a community event</p>
            </div>
            <Link href="/events" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-medium transition-colors">
              📋 List View
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              {/* Calendar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {months[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      ←
                    </button>
                    <button 
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors text-sm font-medium"
                    >
                      Today
                    </button>
                    <button 
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 bg-gray-50">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-600 border-b">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {calendarDays.flat().map((calDay, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedDate(calDay.date)}
                    className={`min-h-[120px] p-2 border-r border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      !calDay.isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'
                    } ${calDay.isSelected ? 'bg-blue-50 border-blue-300' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${
                        calDay.isToday ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center' : ''
                      }`}>
                        {calDay.day}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {calDay.events.slice(0, 3).map(event => (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                          title={event.title}
                        >
                          {event.time} {event.title}
                        </div>
                      ))}
                      {calDay.events.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{calDay.events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Legend */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Event Types</h3>
              <div className="space-y-3">
                {[
                  { type: 'cultural', label: 'Cultural Events' },
                  { type: 'religious', label: 'Religious' },
                  { type: 'meeting', label: 'Meetings' },
                  { type: 'education', label: 'Education' },
                  { type: 'business', label: 'Business' },
                  { type: 'family', label: 'Family & Kids' }
                ].map(item => (
                  <div key={item.type} className="flex items-center">
                    <div className={`w-4 h-4 rounded ${getEventTypeColor(item.type)} mr-3`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {selectedDate.toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)} mr-2`}></div>
                          <span className="font-medium text-sm">{event.time}</span>
                        </div>
                        <div className="font-semibold text-gray-900">{event.title}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No events scheduled for this date.</p>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/events"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center block transition-colors"
                >
                  📋 All Events
                </Link>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  + Create Event
                </button>
                <Link 
                  href="/admin"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium text-center block transition-colors"
                >
                  ⚙️ Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}