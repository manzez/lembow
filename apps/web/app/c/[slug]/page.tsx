'use client'

import Link from 'next/link'
import { use, useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { apiService } from '../../../lib/api'
import PhotoGallery from '../../../components/PhotoGallery'
import MeetingTranscriber from '../../components/MeetingTranscriber'
import { getCommunityCoverPhoto, getEventPhoto } from '../../../lib/photos'
import { getCommunityBySlug } from '../../../lib/communities-data'
import { Users, Calendar, Heart, MapPin, Handshake, X, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'

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

interface Community {
  id: string
  name: string
  slug: string
  description: string | null
  region: string | null
  city: string | null
  country: string | null
  logoUrl: string | null
  bannerUrl: string | null
  howToPay: string | null
  meetingLocation: string | null
  meetingSchedule: string | null
  contactInfo: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  memberCount: number
  organization: {
    id: string
    name: string
  }
  events: Array<{
    id: string
    title: string
    description: string
    eventDate: string
    location: string | null
  }>
}

interface ApiCommunity extends Community {
  meetings: MeetingMinutes[]
}

export default function CommunityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params)
  const { user } = useAuth()
  const [community, setCommunity] = useState<ApiCommunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCollaborationModal, setShowCollaborationModal] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingMinutes | null>(null)
  const [collaborationForm, setCollaborationForm] = useState({
    partnerCommunityId: '',
    title: '',
    description: '',
    proposedDate: '',
    proposedLocation: '',
    objectives: ''
  })

  useEffect(() => {
    fetchCommunity()
  }, [unwrappedParams.slug])

  const fetchCommunity = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try fetching from API first
      try {
        const response = await apiService.getCommunityBySlug(unwrappedParams.slug)
        if (response.success && response.data) {
          const apiCommunity = response.data.community as any
          setCommunity({
            ...apiCommunity,
            meetings: apiCommunity.meetings || []
          })
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API call failed, falling back to local data:', apiError)
      }
      
      // Fallback to mock data if API fails
      const mockCommunity = getCommunityBySlug(unwrappedParams.slug)
      if (mockCommunity) {
        // Transform mock data to match API structure
        const transformedCommunity: ApiCommunity = {
          id: mockCommunity.id.toString(),
          name: mockCommunity.name,
          slug: mockCommunity.slug,
          description: mockCommunity.description,
          region: mockCommunity.region,
          city: mockCommunity.location,
          country: 'United Kingdom',
          logoUrl: mockCommunity.imageUrl,
          bannerUrl: mockCommunity.imageUrl,
          howToPay: 'Bank transfer or cash at meetings',
          meetingLocation: mockCommunity.meetingLocation || 'TBD',
          meetingSchedule: 'Monthly on the first Saturday',
          contactInfo: mockCommunity.contact?.email || 'Contact via WhatsApp',
          isActive: true,
          createdAt: mockCommunity.established || '2020',
          updatedAt: new Date().toISOString(),
          memberCount: mockCommunity.members,
          organization: {
            id: '1',
            name: 'Lembow Communities'
          },
          events: mockCommunity.nextEvent ? [{
            id: '1',
            title: mockCommunity.nextEvent,
            description: `Join us for ${mockCommunity.nextEvent}`,
            eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            location: mockCommunity.meetingLocation || 'TBD'
          }] : [],
          meetings: [
            {
              id: '1',
              title: 'Monthly General Meeting - October 2025',
              meetingDate: new Date('2025-10-05').toISOString(),
              location: mockCommunity.meetingLocation || 'Community Hall',
              summary: 'Discussion of upcoming cultural events, membership updates, and community initiatives for the coming months.',
              agenda: [
                'Welcome and introductions',
                'Financial report for Q3 2025',
                'Upcoming cultural festival planning',
                'Membership drive discussion',
                'Any other business'
              ],
              decisions: [
                'Approved budget for November cultural festival',
                'Agreed to increase membership outreach efforts',
                'Scheduled next meeting for November 2nd'
              ],
              actionItems: [
                {
                  item: 'Prepare festival venue bookings',
                  assignee: 'Events Committee',
                  deadline: new Date('2025-10-20').toISOString()
                },
                {
                  item: 'Design membership campaign materials',
                  assignee: 'Communications Team',
                  deadline: new Date('2025-10-15').toISOString()
                }
              ],
              attendees: ['Community Leaders', 'Committee Members', 'General Members'],
              absentees: [],
              documents: [],
              isApproved: true,
              creator: { firstName: 'Community', lastName: 'Secretary' },
              approver: { firstName: 'Community', lastName: 'Chair' }
            },
            {
              id: '2',
              title: 'Emergency Committee Meeting - September 2025',
              meetingDate: new Date('2025-09-15').toISOString(),
              location: mockCommunity.meetingLocation || 'Community Hall',
              summary: 'Special meeting to discuss community response to local issues and coordinate support services.',
              agenda: [
                'Current community challenges',
                'Support services coordination',
                'Partnership opportunities'
              ],
              decisions: [
                'Established support fund for members in need',
                'Partnered with local welfare organizations'
              ],
              actionItems: [
                {
                  item: 'Set up support fund account',
                  assignee: 'Treasurer',
                  deadline: new Date('2025-09-30').toISOString()
                }
              ],
              attendees: ['Executive Committee'],
              absentees: [],
              documents: [],
              isApproved: true,
              creator: { firstName: 'Community', lastName: 'Chair' },
              approver: { firstName: 'Community', lastName: 'Chair' }
            },
            {
              id: '3',
              title: 'Annual General Meeting - August 2025',
              meetingDate: new Date('2025-08-10').toISOString(),
              location: mockCommunity.meetingLocation || 'Main Community Hall',
              summary: 'Annual review of community activities, financial statements, and election of new committee members for 2025-2026.',
              agenda: [
                "Chair's annual report",
                "Treasurer's financial report",
                'Committee elections',
                'Strategic plan for next year',
                'Members Q&A'
              ],
              decisions: [
                'Approved annual financial statements',
                'Elected new committee members',
                'Ratified 2025-2026 strategic plan'
              ],
              actionItems: [
                {
                  item: 'Handover documents to new committee',
                  assignee: 'Outgoing Committee',
                  deadline: new Date('2025-08-31').toISOString()
                },
                {
                  item: 'Schedule committee orientation session',
                  assignee: 'Secretary',
                  deadline: new Date('2025-09-01').toISOString()
                }
              ],
              attendees: ['All Members', 'Committee', 'Special Guests'],
              absentees: [],
              documents: ['Annual Report 2024-2025', 'Financial Statements', 'Strategic Plan'],
              isApproved: true,
              creator: { firstName: 'Community', lastName: 'Secretary' },
              approver: { firstName: 'Community', lastName: 'Chair' }
            }
          ]
        }
        setCommunity(transformedCommunity)
      } else {
        setError('Community not found')
      }
    } catch (err: any) {
      console.error('Unexpected error loading community:', err)
      setError('Failed to load community data')
    } finally {
      setLoading(false)
    }
  }

  const handleCollaborationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!community) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001'}/communities/${community.id}/collaborations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(collaborationForm),
      })
      
      if (response.ok) {
        setShowCollaborationModal(false)
        setCollaborationForm({
          partnerCommunityId: '',
          title: '',
          description: '',
          proposedDate: '',
          proposedLocation: '',
          objectives: ''
        })
        alert('Collaboration proposal submitted successfully!')
      } else {
        throw new Error('Failed to submit collaboration')
      }
    } catch (error) {
      console.error('Error submitting collaboration:', error)
      alert('Failed to submit collaboration proposal')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mauve-600"></div>
      </div>
    )
  }

  if (error || !community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Not Found</h1>
          <p className="text-gray-600 mb-6">The community you're looking for doesn't exist.</p>
          <Link 
            href="/"
            className="inline-block bg-mauve-600 text-white px-6 py-2 rounded-lg hover:bg-mauve-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-mauve-600 to-purple-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: `url(${getCommunityCoverPhoto(community.slug)})` 
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl w-full">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {community.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {community.city}, {community.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {community.memberCount} members
                  </div>
                  {community.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Est. {new Date(community.createdAt).getFullYear()}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowCollaborationModal(true)}
                className="bg-mauve-600 text-white px-4 py-2 rounded-lg hover:bg-mauve-700 transition-colors flex items-center gap-2"
              >
                <Handshake className="h-5 w-5" />
                Propose Collaboration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-700 leading-relaxed">
                {community.description || 'Welcome to our community!'}
              </p>
            </div>

            {/* Executives Section */}
            {getCommunityBySlug(unwrappedParams.slug)?.executives && getCommunityBySlug(unwrappedParams.slug)?.executives!.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCommunityBySlug(unwrappedParams.slug)?.executives?.map((executive, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-mauve-300 hover:shadow-md transition-all"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={executive.imageUrl}
                          alt={executive.name}
                          className="w-full h-full rounded-full object-cover border-2 border-mauve-200"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{executive.name}</h3>
                        <p className="text-mauve-600 font-medium">{executive.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities Section */}
            {getCommunityBySlug(unwrappedParams.slug)?.activities && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Activities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getCommunityBySlug(unwrappedParams.slug)?.activities?.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-mauve-600 mt-1">✓</span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upcoming Events */}
            {community.events && community.events.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-mauve-600" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {community.events.map((event) => (
                    <div 
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-mauve-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                            {event.location && <span>📍 {event.location}</span>}
                          </div>
                        </div>
                        <img 
                          src={getEventPhoto(event.id)}
                          alt={event.title}
                          className="w-20 h-20 object-cover rounded-lg ml-4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Minutes */}
            {community.meetings && community.meetings.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Meeting Minutes</h2>
                <div className="space-y-3">
                  {community.meetings.map((meeting) => (
                    <div 
                      key={meeting.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-mauve-300 transition-colors cursor-pointer"
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(meeting.meetingDate).toLocaleDateString()}
                            {meeting.location && ` • ${meeting.location}`}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          meeting.isApproved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meeting.isApproved ? 'Approved' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            <PhotoGallery communitySlug={community.slug} />

            {/* Meeting Transcriber - Available to all visitors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Record Meeting Minutes</h2>
              <p className="text-sm text-gray-600 mb-4">
                Use voice or text to record meeting notes. The AI will help structure them into proper minutes.
              </p>
              <MeetingTranscriber communityId={community.id} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {getCommunityBySlug(unwrappedParams.slug)?.contact?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-mauve-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a 
                        href={`mailto:${getCommunityBySlug(unwrappedParams.slug)?.contact?.email}`}
                        className="text-sm text-mauve-600 hover:underline"
                      >
                        {getCommunityBySlug(unwrappedParams.slug)?.contact?.email}
                      </a>
                    </div>
                  </div>
                )}
                {getCommunityBySlug(unwrappedParams.slug)?.contact?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-mauve-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a 
                        href={`tel:${getCommunityBySlug(unwrappedParams.slug)?.contact?.phone}`}
                        className="text-sm text-mauve-600 hover:underline"
                      >
                        {getCommunityBySlug(unwrappedParams.slug)?.contact?.phone}
                      </a>
                    </div>
                  </div>
                )}
                {getCommunityBySlug(unwrappedParams.slug)?.contact?.whatsapp && (
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-mauve-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">WhatsApp</p>
                      <a 
                        href={`https://wa.me/${getCommunityBySlug(unwrappedParams.slug)?.contact?.whatsapp?.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-mauve-600 hover:underline flex items-center gap-1"
                      >
                        {getCommunityBySlug(unwrappedParams.slug)?.contact?.whatsapp}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Details</h3>
              <div className="space-y-3">
                {community.meetingLocation && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Location</p>
                    <p className="text-sm text-gray-600">{community.meetingLocation}</p>
                  </div>
                )}
                {community.meetingSchedule && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Schedule</p>
                    <p className="text-sm text-gray-600">{community.meetingSchedule}</p>
                  </div>
                )}
              </div>
            </div>

            {/* How to Pay */}
            {community.howToPay && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">How to Pay</h3>
                <p className="text-sm text-gray-600">{community.howToPay}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-mauve-600 text-white py-3 rounded-lg hover:bg-mauve-700 transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Join Community
              </button>
              <Link
                href={`/payments?communityId=${community.id}`}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                💳 Pay Membership Fees
              </Link>
              <Link
                href={`/c/${community.slug}/donate`}
                className="w-full bg-white text-mauve-600 border-2 border-mauve-600 py-3 rounded-lg hover:bg-mauve-50 transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="h-5 w-5" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration Modal */}
      {showCollaborationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Propose Collaboration</h2>
              <button
                onClick={() => setShowCollaborationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleCollaborationSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collaboration Title *
                </label>
                <input
                  type="text"
                  required
                  value={collaborationForm.title}
                  onChange={(e) => setCollaborationForm({...collaborationForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mauve-500 focus:border-transparent"
                  placeholder="e.g., Joint Cultural Festival"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={collaborationForm.description}
                  onChange={(e) => setCollaborationForm({...collaborationForm, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mauve-500 focus:border-transparent"
                  placeholder="Describe the collaboration opportunity..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Date
                </label>
                <input
                  type="date"
                  value={collaborationForm.proposedDate}
                  onChange={(e) => setCollaborationForm({...collaborationForm, proposedDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mauve-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Location
                </label>
                <input
                  type="text"
                  value={collaborationForm.proposedLocation}
                  onChange={(e) => setCollaborationForm({...collaborationForm, proposedLocation: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mauve-500 focus:border-transparent"
                  placeholder="e.g., Birmingham City Centre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objectives
                </label>
                <textarea
                  rows={3}
                  value={collaborationForm.objectives}
                  onChange={(e) => setCollaborationForm({...collaborationForm, objectives: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mauve-500 focus:border-transparent"
                  placeholder="What do you hope to achieve through this collaboration?"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCollaborationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-mauve-600 text-white rounded-lg hover:bg-mauve-700 transition-colors"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedMeeting.title}</h2>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(selectedMeeting.meetingDate).toLocaleDateString()}
                  </span>
                </div>
                {selectedMeeting.location && (
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-600">{selectedMeeting.location}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedMeeting.isApproved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedMeeting.isApproved ? 'Approved' : 'Draft'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created by:</span>
                  <span className="ml-2 text-gray-600">
                    {selectedMeeting.creator.firstName} {selectedMeeting.creator.lastName}
                  </span>
                </div>
              </div>

              {selectedMeeting.summary && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                  <p className="text-gray-700">{selectedMeeting.summary}</p>
                </div>
              )}

              {selectedMeeting.agenda && selectedMeeting.agenda.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Agenda</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedMeeting.agenda.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMeeting.decisions && selectedMeeting.decisions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Decisions Made</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedMeeting.decisions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Action Items</h3>
                  <div className="space-y-2">
                    {selectedMeeting.actionItems.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded p-3">
                        <p className="font-medium text-gray-900">{item.item}</p>
                        <div className="flex gap-4 mt-1 text-sm text-gray-600">
                          <span>Assignee: {item.assignee}</span>
                          <span>Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMeeting.attendees && selectedMeeting.attendees.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Attendees</h3>
                  <p className="text-gray-700">{selectedMeeting.attendees.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
