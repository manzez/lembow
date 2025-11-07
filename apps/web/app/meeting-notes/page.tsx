'use client'
import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import MeetingMinutes from '../../components/MeetingMinutes'

// Mock data for demonstration
const mockEvent = {
  id: 'event-123',
  name: 'Monthly Community Meeting',
  startAt: '2025-11-03T14:00:00Z',
  venue: 'Community Center, Main Hall',
  description: 'Our regular monthly meeting to discuss community matters and upcoming events.'
}

const mockAgenda = [
  {
    id: 'agenda-1',
    title: 'Welcome and Introductions',
    description: 'Welcome new members and brief introductions',
    orderIndex: 0,
    duration: 15,
    presenter: 'John Smith',
    status: 'COMPLETED' as const,
    notes: 'Welcomed 3 new community members'
  },
  {
    id: 'agenda-2', 
    title: 'Treasurer\'s Report',
    description: 'Monthly financial update and budget review',
    orderIndex: 1,
    duration: 20,
    presenter: 'Mary Johnson',
    status: 'IN_PROGRESS' as const
  },
  {
    id: 'agenda-3',
    title: 'Upcoming Events Planning',
    description: 'Discussion of holiday celebration and year-end activities',
    orderIndex: 2,
    duration: 30,
    presenter: 'Community Committee',
    status: 'PENDING' as const
  }
]

export default function MeetingPage() {
  const [minutes, setMinutes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveMinutes = async (minutesData: any) => {
    setIsLoading(true)
    try {
      // In a real app, this would call your API
      console.log('Saving meeting minutes:', minutesData)
      
      const response = await fetch(`/api/events/${mockEvent.id}/minutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(minutesData)
      })

      if (response.ok) {
        const result = await response.json()
        setMinutes(result.data)
        console.log('Minutes saved successfully:', result)
      } else {
        throw new Error('Failed to save minutes')
      }
    } catch (error) {
      console.error('Error saving minutes:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meeting Notes</h1>
              <p className="mt-2 text-gray-600">Create and manage meeting minutes with voice recording capabilities</p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Event Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(mockEvent.startAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(mockEvent.startAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-400 mt-1" />
                    <div className="text-sm text-gray-900">
                      {mockEvent.venue}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-gray-400 mt-1" />
                    <div className="text-sm text-gray-900">
                      Estimated: 2 hours
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users size={16} className="text-gray-400 mt-1" />
                    <div className="text-sm text-gray-900">
                      15 attendees expected
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agenda Items:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress:</span>
                    <span className="font-medium text-blue-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-gray-600">1</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Features Available</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Voice Recording</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Auto Transcription</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Action Items Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Agenda Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Auto-sharing with Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    ✓ <span>Community Page Display</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Minutes Interface */}
          <div className="lg:col-span-3">
            <MeetingMinutes
              eventId={mockEvent.id}
              eventDetails={mockEvent}
              initialMinutes={{
                title: mockEvent.name,
                agenda: mockAgenda,
                actionItems: [
                  {
                    id: '1',
                    task: 'Follow up with new member orientations',
                    assignee: 'Sarah Wilson',
                    dueDate: '2025-11-10',
                    completed: false
                  }
                ]
              }}
              onSave={handleSaveMinutes}
            />
          </div>
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🎯 Meeting Notes Demo Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">📋 Agenda Tab</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Click "Edit" to modify agenda items</li>
                <li>• Add new items with durations</li>
                <li>• Update status as meeting progresses</li>
                <li>• Reorder items by dragging</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">📝 Notes Tab</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Write meeting summary</li>
                <li>• Record key decisions</li>
                <li>• Create action items with assignees</li>
                <li>• Set visibility preferences</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">🎤 Voice Tab</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• Record voice notes during meeting</li>
                <li>• Upload audio files</li>
                <li>• Auto-transcription (simulated)</li>
                <li>• Link recordings to agenda items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}