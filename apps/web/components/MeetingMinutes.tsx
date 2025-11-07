'use client'
import React, { useState, useEffect } from 'react'
import { Save, Clock, Users, FileText, Volume2, CheckCircle, Eye, EyeOff } from 'lucide-react'
import VoiceRecorder from './VoiceRecorder'
import MeetingAgenda from './MeetingAgenda'

interface MeetingMinutesProps {
  eventId?: string
  eventDetails?: {
    id: string
    name: string
    startAt: string
    venue?: string
  }
  initialMinutes?: any
  onSave?: (minutesData: any) => Promise<void>
  className?: string
}

interface AttendeeInfo {
  id: string
  name: string
  email: string
  status: 'present' | 'absent'
}

export default function MeetingMinutes({
  eventId,
  eventDetails,
  initialMinutes,
  onSave,
  className = ''
}: MeetingMinutesProps) {
  const [minutes, setMinutes] = useState({
    title: initialMinutes?.title || eventDetails?.name || '',
    summary: initialMinutes?.summary || '',
    decisions: initialMinutes?.decisions || '',
    actionItems: initialMinutes?.actionItems || [],
    voiceNotes: initialMinutes?.voiceNotes || '',
    isPublicOnCommunity: initialMinutes?.isPublicOnCommunity || false,
    isSharedWithMembers: initialMinutes?.isSharedWithMembers || true
  })

  const [attendees, setAttendees] = useState<AttendeeInfo[]>(
    initialMinutes?.attendees || []
  )

  const [agenda, setAgenda] = useState(initialMinutes?.agenda || [])
  const [voiceRecordings, setVoiceRecordings] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [activeTab, setActiveTab] = useState<'agenda' | 'notes' | 'recordings'>('agenda')

  const addActionItem = () => {
    setMinutes(prev => ({
      ...prev,
      actionItems: [
        ...prev.actionItems,
        { id: Date.now().toString(), task: '', assignee: '', dueDate: '', completed: false }
      ]
    }))
  }

  const updateActionItem = (id: string, updates: any) => {
    setMinutes(prev => ({
      ...prev,
      actionItems: prev.actionItems.map((item: any) => 
        item.id === id ? { ...item, ...updates } : item
      )
    }))
  }

  const removeActionItem = (id: string) => {
    setMinutes(prev => ({
      ...prev,
      actionItems: prev.actionItems.filter((item: any) => item.id !== id)
    }))
  }

  const handleVoiceRecordingComplete = (audioBlob: Blob, duration: number) => {
    console.log('Voice recording completed:', { size: audioBlob.size, duration })
  }

  const handleVoiceUpload = async (file: File, duration: number) => {
    if (!eventId) return

    const formData = new FormData()
    formData.append('voiceFile', file)
    formData.append('duration', duration.toString())

    try {
      const response = await fetch(`/api/minutes/${eventId}/voice-recording`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setVoiceRecordings(prev => [...prev, result.data])
        alert('Voice recording uploaded successfully!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Voice upload error:', error)
      throw error
    }
  }

  const handleSave = async () => {
    if (!onSave) return

    setIsSaving(true)
    try {
      const minutesData = {
        ...minutes,
        attendees: attendees.filter(a => a.status === 'present').map(a => a.id),
        absentees: attendees.filter(a => a.status === 'absent').map(a => a.id),
        agenda
      }

      await onSave(minutesData)
      alert('Meeting minutes saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save meeting minutes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={`meeting-minutes bg-white rounded-lg border ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Meeting Minutes</h2>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Minutes'}
          </button>
        </div>

        {/* Event Details */}
        {eventDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{eventDetails.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(eventDetails.startAt).toLocaleString()}
              </div>
              {eventDetails.venue && (
                <div className="flex items-center gap-1">
                  <FileText size={14} />
                  {eventDetails.venue}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              value={minutes.title}
              onChange={(e) => setMinutes(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter meeting title"
            />
          </div>

          {/* Visibility Settings */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={minutes.isSharedWithMembers}
                onChange={(e) => setMinutes(prev => ({ ...prev, isSharedWithMembers: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Share with community members</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={minutes.isPublicOnCommunity}
                onChange={(e) => setMinutes(prev => ({ ...prev, isPublicOnCommunity: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show on community page</span>
            </label>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('agenda')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'agenda' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Agenda
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'notes' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Notes & Decisions
          </button>
          <button
            onClick={() => setActiveTab('recordings')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'recordings' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Volume2 size={16} className="inline mr-1" />
            Voice Recordings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'agenda' && (
          <MeetingAgenda
            eventId={eventId || ''}
            initialAgenda={agenda}
            onAgendaUpdate={setAgenda}
            className="border-0 bg-transparent p-0"
          />
        )}

        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Meeting Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Summary
              </label>
              <textarea
                value={minutes.summary}
                onChange={(e) => setMinutes(prev => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Summarize the key points discussed in the meeting..."
              />
            </div>

            {/* Key Decisions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Decisions Made
              </label>
              <textarea
                value={minutes.decisions}
                onChange={(e) => setMinutes(prev => ({ ...prev, decisions: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List important decisions made during the meeting..."
              />
            </div>

            {/* Action Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">
                  Action Items
                </label>
                <button
                  onClick={addActionItem}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Action Item
                </button>
              </div>

              <div className="space-y-3">
                {minutes.actionItems.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={(e) => updateActionItem(item.id, { completed: e.target.checked })}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.task}
                        onChange={(e) => updateActionItem(item.id, { task: e.target.value })}
                        placeholder="Action item description"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.assignee}
                          onChange={(e) => updateActionItem(item.id, { assignee: e.target.value })}
                          placeholder="Assigned to"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="date"
                          value={item.dueDate}
                          onChange={(e) => updateActionItem(item.id, { dueDate: e.target.value })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeActionItem(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {minutes.actionItems.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No action items yet. Click "Add Action Item" to get started.
                  </div>
                )}
              </div>
            </div>

            {/* Voice Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Notes (Transcribed)
              </label>
              <textarea
                value={minutes.voiceNotes}
                onChange={(e) => setMinutes(prev => ({ ...prev, voiceNotes: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Transcribed voice notes will appear here, or you can type additional notes..."
              />
            </div>
          </div>
        )}

        {activeTab === 'recordings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Voice Recordings</h3>
              <button
                onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Volume2 size={16} />
                {showVoiceRecorder ? 'Hide' : 'New'} Recording
              </button>
            </div>

            {showVoiceRecorder && (
              <VoiceRecorder
                onRecordingComplete={handleVoiceRecordingComplete}
                onUpload={handleVoiceUpload}
                maxDuration={1800} // 30 minutes
                className="mb-6"
              />
            )}

            {/* Existing Recordings */}
            <div className="space-y-3">
              {voiceRecordings.map((recording: any) => (
                <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="font-medium text-gray-900">{recording.fileName}</div>
                    <div className="text-sm text-gray-600">
                      {recording.duration && `${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')}`}
                      {recording.transcription && ' • Transcribed'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <audio controls className="h-8">
                      <source src={recording.fileUrl} />
                    </audio>
                  </div>
                </div>
              ))}

              {voiceRecordings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Volume2 size={48} className="mx-auto mb-3 opacity-30" />
                  <div>No voice recordings yet</div>
                  <div className="text-sm">Click "New Recording" to add voice notes</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}