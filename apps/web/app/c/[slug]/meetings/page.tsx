"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../../contexts/AuthContext'

interface MeetingMinutes {
  id: string
  title: string
  meetingDate: string
  location?: string
  summary?: string
  agenda?: string[]
  decisions?: string[]
  actionItems?: Array<{item: string, assignee: string, deadline: string}>
  attendees?: string[]
  absentees?: string[]
  documents?: string[]
  isApproved: boolean
  creator: { firstName: string, lastName: string }
  approver?: { firstName: string, lastName: string }
}

export default function CommunityMeetingMinutesPage() {
  const params = useParams<{ slug: string }>()
  const rawSlug = (params?.slug ?? '') as unknown as string | string[]
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const { user } = useAuth()
  const [meetingMinutes, setMeetingMinutes] = useState<MeetingMinutes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMinutes, setSelectedMinutes] = useState<MeetingMinutes | null>(null)

  // Mock community data based on slug
  const getCommunityData = (slug: string) => {
    const communities = {
      'free4all-bristol-wed': {
        name: 'Free4All Bristol Wednesday',
        description: 'Weekly football sessions every Wednesday at 6pm',
        location: 'Stoke Gifford Council 3G pitch, Little Stoke Park, Bristol, BS34 6HR',
        schedule: 'Every Wednesday at 6:00 PM',
        memberCount: 24,
        organization: 'Free4All Football Group',
        icon: '⚽'
      },
      'free4all-bristol-sat': {
        name: 'Free4All Bristol Saturday',
        description: 'Weekend football sessions every Saturday at 10am',
        location: 'Goals Bristol Sports Complex, WISE Campus, New Road, Bristol',
        schedule: 'Every Saturday at 10:00 AM',
        memberCount: 18,
        organization: 'Free4All Football Group',
        icon: '⚽'
      },
      'rougemont-netball-newport': {
        name: 'Rougemont Netball Newport',
        description: 'Competitive netball club in Newport, Gwent',
        location: 'Newport Sports Centre',
        schedule: 'Every Wednesday and Saturday',
        memberCount: 16,
        organization: 'Sports Wales',
        icon: '🏐'
      },
      'cwmbran-netball': {
        name: 'Cwmbran Netball',
        description: 'Local netball club serving the Cwmbran community',
        location: 'Cwmbran Stadium',
        schedule: 'Twice weekly',
        memberCount: 14,
        organization: 'Sports Wales',
        icon: '🏐'
      },
      'caerleon-rugby-boys': {
        name: 'Caerleon Rugby Boys',
        description: 'Youth and senior rugby club',
        location: 'Caerleon RFC',
        schedule: 'Saturday 9AM & Sunday 10AM',
        memberCount: 32,
        organization: 'Sports Wales',
        icon: '🏉'
      },
      'avu-diaspora-main': {
        name: 'Avu Diaspora Community',
        description: 'Main diaspora community group connecting people across the UK',
        location: 'Multiple Locations',
        schedule: 'Monthly meetings',
        memberCount: 45,
        organization: 'Avu Diaspora Community',
        icon: '🌍'
      }
    }
    return communities[slug as keyof typeof communities] || communities['free4all-bristol-wed']
  }

  const community = getCommunityData(slug)

  useEffect(() => {
    loadMeetingMinutes()
  }, [])

  const loadMeetingMinutes = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Mock data for demonstration - replace with real API call
      const mockMinutes: MeetingMinutes[] = [
        {
          id: '1',
          title: `${community.name} Weekly Meeting`,
          meetingDate: '2025-10-26T18:00:00Z',
          location: community.location,
          summary: `Regular weekly meeting with good attendance. Discussed upcoming events and ${getSportActivity(community.name)} activities.`,
          agenda: [
            'Welcome and roll call',
            'Review of previous meeting minutes',
            `Upcoming ${getSportActivity(community.name)} events`,
            'Equipment and facilities update',
            'Membership and participation',
            'Any other business'
          ],
          decisions: [
            `Approved new ${getSportActivity(community.name)} equipment purchase`,
            'Confirmed participation in upcoming local tournaments',
            'Approved budget for facility improvements'
          ],
          actionItems: [
            { item: 'Order new equipment', assignee: 'Equipment Manager', deadline: '2025-11-05' },
            { item: 'Register for tournaments', assignee: 'Team Captain', deadline: '2025-11-10' },
            { item: 'Contact facility management', assignee: 'Facilities Coordinator', deadline: '2025-11-01' }
          ],
          attendees: ['John Smith', 'Sarah Wilson', 'Mike Johnson', 'Emma Davis', 'Tom Brown'],
          absentees: ['Lisa Taylor (Holiday)', 'Mark Wilson (Work)'],
          documents: [`${getSportActivity(community.name)}-schedule-november.pdf`, 'equipment-list.pdf'],
          isApproved: true,
          creator: { firstName: 'Sarah', lastName: 'Wilson' },
          approver: { firstName: 'John', lastName: 'Smith' }
        },
        {
          id: '2',
          title: `${community.name} Monthly Committee Meeting`,
          meetingDate: '2025-10-19T19:00:00Z',
          location: 'Community Centre',
          summary: `Monthly planning meeting focusing on strategy and community development for ${community.name}.`,
          agenda: [
            'Chairman welcome and updates',
            'Financial report and budget review',
            'Seasonal planning and objectives',
            'Community outreach initiatives',
            'Volunteer coordination and support'
          ],
          decisions: [
            'Approved seasonal activity schedule',
            'Launched community outreach program',
            'Established new volunteer coordinator role'
          ],
          actionItems: [
            { item: 'Design promotional materials', assignee: 'Marketing Team', deadline: '2025-11-15' },
            { item: 'Contact local organizations', assignee: 'Community Liaison', deadline: '2025-11-20' }
          ],
          attendees: ['Committee Members (8 present)', 'John Smith', 'Sarah Wilson', 'Mike Johnson'],
          absentees: ['Treasurer (Conference)', 'Vice Chair (Travel)'],
          documents: ['financial-report-october.xlsx', 'outreach-proposal.docx'],
          isApproved: true,
          creator: { firstName: 'John', lastName: 'Smith' },
          approver: { firstName: 'John', lastName: 'Smith' }
        },
        {
          id: '3',
          title: `${community.name} Annual General Meeting 2025`,
          meetingDate: '2025-10-05T10:00:00Z',
          location: community.location,
          summary: `Annual General Meeting with excellent turnout. Celebrated achievements and set goals for the upcoming year.`,
          agenda: [
            'Annual Chairman report',
            'Financial accounts and approval',
            'Election of committee members',
            'Constitutional updates',
            'Strategic plan for 2025-2026',
            'Awards and recognition'
          ],
          decisions: [
            'Approved annual accounts showing positive balance',
            'Elected new committee for 2025-2026',
            'Approved constitutional amendments',
            'Adopted strategic development plan'
          ],
          actionItems: [
            { item: 'Implement new committee structure', assignee: 'Chairman', deadline: '2025-11-30' },
            { item: 'Update constitution documentation', assignee: 'Secretary', deadline: '2025-12-01' }
          ],
          attendees: [`${Math.floor(community.memberCount * 0.8)} members attended (excellent turnout)`],
          absentees: [`${community.memberCount - Math.floor(community.memberCount * 0.8)} members sent apologies`],
          documents: ['annual-report-2024-2025.pdf', 'audited-accounts.pdf', 'strategic-plan.pdf'],
          isApproved: true,
          creator: { firstName: 'Community', lastName: 'Secretary' },
          approver: { firstName: 'Community', lastName: 'Chairman' }
        }
      ]
      
      setMeetingMinutes(mockMinutes)
    } catch (err) {
      setError('Failed to load meeting minutes')
    } finally {
      setLoading(false)
    }
  }

  const getSportActivity = (communityName: string) => {
    if (communityName.toLowerCase().includes('football')) return 'football'
    if (communityName.toLowerCase().includes('netball')) return 'netball'  
    if (communityName.toLowerCase().includes('rugby')) return 'rugby'
    return 'community'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigation */}
          <div className="mb-6">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span>←</span> Back to Dashboard
            </Link>
          </div>
          
          {/* Community Header */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{community.icon}</span>
                  <h1 className="text-3xl font-bold text-white">{community.name}</h1>
                </div>
                <p className="text-slate-300 text-lg mb-4">{community.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>📍</span>
                    <span>{community.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>📅</span>
                    <span>{community.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>👥</span>
                    <span>{community.memberCount} active members</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>🏢</span>
                    <span>{community.organization}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                {user && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Community
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Meeting Minutes Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                📝 Meeting Minutes & Records
              </h2>
              {user && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Add Minutes
                </button>
              )}
            </div>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-slate-400 mt-2">Loading meeting minutes...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Minutes List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Recent Meetings</h3>
                  {meetingMinutes.map((minutes) => (
                    <div 
                      key={minutes.id}
                      className={`bg-slate-700/30 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                        selectedMinutes?.id === minutes.id 
                          ? 'ring-2 ring-blue-500 bg-slate-700/50' 
                          : 'hover:bg-slate-700/40'
                      }`}
                      onClick={() => setSelectedMinutes(minutes)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">{minutes.title}</h4>
                        {minutes.isApproved && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            Approved
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{formatDate(minutes.meetingDate)}</p>
                      {minutes.summary && (
                        <p className="text-slate-400 text-sm line-clamp-3">{minutes.summary}</p>
                      )}
                      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                        <span>👥 {minutes.attendees?.length || 0} attendees</span>
                        <span>📋 {minutes.agenda?.length || 0} agenda items</span>
                        {minutes.documents && <span>📎 {minutes.documents.length} documents</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Minutes Detail */}
                <div className="bg-slate-700/20 rounded-xl p-6">
                  {selectedMinutes ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{selectedMinutes.title}</h3>
                        <p className="text-slate-300">{formatDate(selectedMinutes.meetingDate)}</p>
                        {selectedMinutes.location && (
                          <p className="text-slate-400 text-sm">📍 {selectedMinutes.location}</p>
                        )}
                      </div>

                      {selectedMinutes.summary && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Meeting Summary</h4>
                          <p className="text-slate-400 text-sm">{selectedMinutes.summary}</p>
                        </div>
                      )}

                      {selectedMinutes.agenda && selectedMinutes.agenda.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Agenda Items</h4>
                          <ul className="space-y-1">
                            {selectedMinutes.agenda.map((item, index) => (
                              <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                                <span className="text-blue-400 mt-1">{index + 1}.</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedMinutes.decisions && selectedMinutes.decisions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Key Decisions</h4>
                          <ul className="space-y-1">
                            {selectedMinutes.decisions.map((decision, index) => (
                              <li key={index} className="text-slate-400 text-sm flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                {decision}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedMinutes.actionItems && selectedMinutes.actionItems.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Action Items</h4>
                          <div className="space-y-2">
                            {selectedMinutes.actionItems.map((action, index) => (
                              <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                                <p className="text-slate-300 text-sm font-medium">{action.item}</p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                                  <span>👤 {action.assignee}</span>
                                  <span>📅 {new Date(action.deadline).toLocaleDateString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedMinutes.attendees && selectedMinutes.attendees.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Attendees</h4>
                          <div className="text-slate-400 text-sm">
                            {selectedMinutes.attendees.join(', ')}
                          </div>
                        </div>
                      )}

                      {selectedMinutes.documents && selectedMinutes.documents.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-300 mb-2">Meeting Documents</h4>
                          <div className="space-y-1">
                            {selectedMinutes.documents.map((doc, index) => (
                              <button 
                                key={index}
                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors"
                              >
                                <span>📎</span>
                                {doc}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-slate-600 pt-4 text-xs text-slate-500">
                        <p>Created by: {selectedMinutes.creator.firstName} {selectedMinutes.creator.lastName}</p>
                        {selectedMinutes.approver && (
                          <p>Approved by: {selectedMinutes.approver.firstName} {selectedMinutes.approver.lastName}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500">
                      <span className="text-4xl mb-4 block">📝</span>
                      <h3 className="text-lg font-medium mb-2">Meeting Minutes</h3>
                      <p>Select a meeting from the left to view detailed minutes, decisions, and action items.</p>
                      <p className="text-sm mt-2">Stay informed about community activities and decisions.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}