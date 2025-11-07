/**
 * AI Meeting Transcriber Component
 * 
 * MODES:
 * 1. Live Recording (Free) - Uses Web Speech API, limited African language support
 * 2. Upload Audio (Better for Igbo/Yoruba) - Uses OpenAI Whisper API (requires implementation)
 * 
 * TO ENABLE WHISPER API FOR BILINGUAL MEETINGS:
 * 1. Get OpenAI API key: https://platform.openai.com/api-keys
 * 2. Add to .env: OPENAI_API_KEY=sk-...
 * 3. Create API endpoint: /api/transcribe that:
 *    - Accepts audio file upload
 *    - Calls OpenAI Whisper API: https://platform.openai.com/docs/guides/speech-to-text
 *    - Returns transcript with timestamps
 * 4. Update the onChange handler in the upload section to call your endpoint
 * 
 * COST: ~$0.006 per minute of audio (~£0.10 per hour)
 * SUPPORTS: Igbo, Yoruba, Hausa, English code-switching with good accuracy
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, Square, FileText, Sparkles, Users, CheckCircle, Clock, Download, Save } from 'lucide-react'

interface TranscriptSegment {
  timestamp: string
  speaker?: string
  text: string
}

interface MeetingMinutes {
  title: string
  date: string
  location: string
  attendees: string[]
  summary: string
  keyPoints: string[]
  decisions: string[]
  actionItems: { item: string, assignee: string, deadline: string }[]
  fullTranscript: TranscriptSegment[]
}

export default function MeetingTranscriber({ communityId, communityName }: { communityId?: string, communityName?: string }) {
  const [transcriptionMode, setTranscriptionMode] = useState<'live' | 'upload'>('live')
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([])
  const [currentSpeaker, setCurrentSpeaker] = useState('Speaker 1')
  const [attendees, setAttendees] = useState<string[]>(['Speaker 1'])
  const [newAttendee, setNewAttendee] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMinutes, setGeneratedMinutes] = useState<MeetingMinutes | null>(null)
  const [meetingTitle, setMeetingTitle] = useState('')
  const [meetingLocation, setMeetingLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('en-GB')
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Supported languages for diaspora communities
  const languages = [
    { code: 'en-GB', name: 'English (UK)', note: '✓ Best accuracy' },
    { code: 'en-US', name: 'English (US)', note: '✓ Best accuracy' },
    { code: 'en-NG', name: 'English (Nigeria)', note: '✓ Good for Nigerian accent' },
    { code: 'yo-NG', name: 'Yoruba', note: '⚠️ Limited support' },
    { code: 'ha-NG', name: 'Hausa', note: '⚠️ Limited support' },
    { code: 'sw-KE', name: 'Swahili', note: '⚠️ Limited support' },
    { code: 'so-SO', name: 'Somali', note: '⚠️ Limited support' },
    { code: 'am-ET', name: 'Amharic', note: '⚠️ Limited support' },
    { code: 'bn-BD', name: 'Bengali', note: '✓ Good accuracy' },
    { code: 'ur-PK', name: 'Urdu', note: '✓ Good accuracy' },
    { code: 'ar-SA', name: 'Arabic', note: '✓ Good accuracy' },
    { code: 'fr-FR', name: 'French', note: '✓ Excellent accuracy' },
    { code: 'pt-PT', name: 'Portuguese', note: '✓ Good accuracy' },
    { code: 'es-ES', name: 'Spanish', note: '✓ Excellent accuracy' },
    { code: 'pl-PL', name: 'Polish', note: '✓ Good accuracy' },
    { code: 'ro-RO', name: 'Romanian', note: '✓ Good accuracy' },
  ]

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = language

        recognitionRef.current.onresult = (event: any) => {
          const last = event.results.length - 1
          const text = event.results[last][0].transcript

          if (event.results[last].isFinal) {
            setIsListening(true)
            const timestamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            setTranscript(prev => [...prev, { timestamp, speaker: currentSpeaker, text }])
            setError(null) // Clear any errors when speech is detected
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          // Ignore "aborted" errors - these are normal when stopping/restarting
          if (event.error === 'aborted') {
            return
          }
          
          console.error('Speech recognition error:', event.error)
          
          if (event.error === 'not-allowed') {
            setError('Microphone access denied. Please allow microphone access in your browser settings.')
            setIsRecording(false)
          } else if (event.error === 'no-speech') {
            // Don't show error for no-speech, just quietly restart
            if (isRecording) {
              setTimeout(() => {
                if (recognitionRef.current && isRecording) {
                  try {
                    recognitionRef.current.start()
                  } catch (e) {
                    // Ignore if already started
                  }
                }
              }, 1000)
            }
          } else if (event.error === 'audio-capture') {
            setError('No microphone found. Please connect a microphone and try again.')
            setIsRecording(false)
          } else if (event.error === 'network') {
            setError('Network error. Speech recognition requires an internet connection.')
            setIsRecording(false)
          } else {
            // Only show non-trivial errors
            setError(`Speech recognition error: ${event.error}`)
          }
        }

        recognitionRef.current.onstart = () => {
          setError(null)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          if (isRecording) {
            try {
              recognitionRef.current?.start() // Keep it running
            } catch (e) {
              console.error('Error restarting recognition:', e)
            }
          }
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [currentSpeaker, isRecording, language])

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  const startRecording = async () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    try {
      // Request microphone access explicitly
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop()) // Stop the stream, we just needed permission
      
      setTranscript([])
      setIsRecording(true)
      setError(null)
      setIsListening(false)
      recognitionRef.current.start()
    } catch (err: any) {
      console.error('Microphone access error:', err)
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone access and try again.')
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.')
      } else {
        setError('Error accessing microphone. Please check your browser settings.')
      }
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const addAttendee = () => {
    if (newAttendee.trim() && !attendees.includes(newAttendee.trim())) {
      setAttendees([...attendees, newAttendee.trim()])
      setNewAttendee('')
    }
  }

  const generateMinutes = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing (in production, call OpenAI API)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Extract key information from transcript
    const fullText = transcript.map(t => `${t.speaker}: ${t.text}`).join('\n')
    
    // Simple keyword extraction for decisions and action items
    const decisions: string[] = []
    const actionItems: { item: string, assignee: string, deadline: string }[] = []
    const keyPoints: string[] = []

    transcript.forEach(segment => {
      const text = segment.text.toLowerCase()
      
      // Look for decisions
      if (text.includes('approve') || text.includes('decided') || text.includes('agreed')) {
        decisions.push(segment.text)
      }
      
      // Look for action items
      if (text.includes('will') || text.includes('should') || text.includes('need to') || text.includes('action')) {
        actionItems.push({
          item: segment.text,
          assignee: segment.speaker || 'Unassigned',
          deadline: 'To be determined'
        })
      }
      
      // Key points (longer segments)
      if (segment.text.split(' ').length > 10) {
        keyPoints.push(segment.text)
      }
    })

    const minutes: MeetingMinutes = {
      title: meetingTitle || `${communityName || 'Community'} Meeting`,
      date: new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      location: meetingLocation || 'Online Meeting',
      attendees: attendees,
      summary: transcript.length > 0 
        ? `Meeting held with ${attendees.length} attendees. Total discussion time: approximately ${Math.ceil(transcript.length / 2)} minutes. ${decisions.length} decisions made and ${actionItems.length} action items identified.`
        : 'No transcript available.',
      keyPoints: keyPoints.slice(0, 5),
      decisions: decisions.length > 0 ? decisions : ['No formal decisions recorded'],
      actionItems: actionItems.slice(0, 10),
      fullTranscript: transcript
    }

    setGeneratedMinutes(minutes)
    setIsGenerating(false)
  }

  const handleAudioUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress('Uploading audio file...')
    setError(null)

    try {
      const formData = new FormData()
      formData.append('audio', file)

      setUploadProgress('Transcribing with AI (this may take a minute)...')
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to transcribe audio')
      }

      const data = await response.json()
      
      // Set the transcript from Whisper API
      setTranscript(data.transcript)
      setUploadProgress(`Success! Transcribed ${data.duration?.toFixed(1)}s of audio (Cost: $${data.cost})`)
      
      // Auto-generate minutes after upload
      setTimeout(() => {
        setUploadProgress(null)
      }, 5000)

    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to transcribe audio file')
      setUploadProgress(null)
    } finally {
      setIsUploading(false)
    }
  }

  const downloadTranscript = () => {
    const text = transcript.map(t => `[${t.timestamp}] ${t.speaker}: ${t.text}`).join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const saveMinutes = () => {
    if (!generatedMinutes) return
    
    // TODO: Send to API endpoint
    console.log('Saving meeting minutes:', generatedMinutes)
    alert('Meeting minutes saved successfully! (This would save to your database in production)')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">AI Meeting Transcriber</h2>
            <p className="text-purple-100">Real-time speech-to-text with automatic minute generation</p>
          </div>
        </div>

        {/* Transcription Mode Selector */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setTranscriptionMode('live')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              transcriptionMode === 'live'
                ? 'bg-white text-purple-600'
                : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            🎙️ Live Recording (Free)
          </button>
          <button
            onClick={() => setTranscriptionMode('upload')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              transcriptionMode === 'upload'
                ? 'bg-white text-purple-600'
                : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            📁 Upload Audio (Better for Igbo/Yoruba)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input
            type="text"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            placeholder="Meeting Title (e.g., Monthly General Meeting)"
            className="px-4 py-2 rounded-lg text-gray-900"
          />
          <input
            type="text"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            placeholder="Location (e.g., Community Centre)"
            className="px-4 py-2 rounded-lg text-gray-900"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isRecording}
            className="px-4 py-2 rounded-lg text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} {lang.note}
              </option>
            ))}
          </select>
        </div>
        
        {/* Language Warning for Live Mode */}
        {transcriptionMode === 'live' && !language.startsWith('en-') && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Google's speech recognition has limited support for African languages like Igbo, Yoruba, and Hausa. 
              For best results, we recommend using <strong>English (Nigeria)</strong> which is optimized for Nigerian accents and will 
              understand code-switching between English and local languages.
            </p>
          </div>
        )}

        {/* Upload Mode Info */}
        {transcriptionMode === 'upload' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">✅ Better for Bilingual Meetings (English + Igbo/Yoruba)</h4>
            <p className="text-sm text-green-800 mb-2">
              Upload your recorded meeting audio and we'll transcribe it using AI that understands code-switching between 
              English and African languages much better than live recognition.
            </p>
            <ul className="text-sm text-green-700 space-y-1 ml-4">
              <li>• Supports Igbo, Yoruba, Hausa mixed with English</li>
              <li>• Better accuracy for Nigerian accents</li>
              <li>• Processes MP3, WAV, M4A files up to 25MB</li>
              <li>• Small cost per meeting (~£0.10 per hour of audio)</li>
            </ul>
          </div>
        )}
      </div>

      {transcriptionMode === 'upload' ? (
        /* Upload Audio Mode */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="mb-6">
              <FileText className="w-16 h-16 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Meeting Recording</h3>
              <p className="text-gray-600">
                Record your meeting on your phone/computer, then upload the audio file here for transcription
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-purple-400 transition-colors cursor-pointer">
              <input
                type="file"
                accept="audio/*,video/*"
                className="hidden"
                id="audio-upload"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleAudioUpload(file)
                  }
                }}
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  {isUploading ? (
                    <>
                      <div className="w-12 h-12 mx-auto mb-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-lg font-medium text-purple-600">{uploadProgress}</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-lg font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm mt-1">MP3, WAV, M4A, MP4 up to 25MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>

            {uploadProgress && !isUploading && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">✅ {uploadProgress}</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
              <h4 className="font-semibold text-blue-900 mb-2">📱 How to Record Your Meeting:</h4>
              <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
                <li>Use your phone's Voice Recorder app during the meeting</li>
                <li>Or use Zoom/Teams and download the recording after</li>
                <li>Transfer the audio file to your computer</li>
                <li>Upload it here - we'll transcribe English + Igbo/Yoruba speech</li>
                <li>Get meeting minutes generated automatically</li>
              </ol>
            </div>
          </div>

          {/* Show transcript if uploaded */}
          {transcript.length > 0 && (
            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-gray-900 mb-3">📝 Transcript:</h4>
                <div className="space-y-3">
                  {transcript.map((segment, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">{segment.timestamp}</span>
                        {segment.speaker && <span className="text-sm font-semibold text-purple-600">{segment.speaker}</span>}
                      </div>
                      <p className="text-gray-900">{segment.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={downloadTranscript}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Transcript
                </button>
                <button
                  onClick={generateMinutes}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate Meeting Minutes'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Live Recording Mode */
        <>
      {/* Attendees Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          Attendees
        </h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newAttendee}
            onChange={(e) => setNewAttendee(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
            placeholder="Add attendee name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addAttendee}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {attendees.map((attendee, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSpeaker(attendee)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentSpeaker === attendee
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {attendee} {currentSpeaker === attendee && '(Speaking)'}
            </button>
          ))}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Live Transcription</h3>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
              {languages.find(l => l.code === language)?.name}
            </span>
            {isRecording && isListening && (
              <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Listening...
              </span>
            )}
            {isRecording && !isListening && (
              <span className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                <Mic className="w-3 h-3" />
                Waiting for speech...
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-lg"
              >
                <Square className="w-5 h-5" />
                Stop Recording
              </button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 text-red-600">⚠️</div>
              <div>
                <p className="text-sm font-medium text-red-800">{error}</p>
                <p className="text-xs text-red-600 mt-1">
                  Make sure you're using Chrome or Edge browser and have granted microphone permissions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transcript Display */}
        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
          {transcript.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {isRecording ? 'Listening... Start speaking!' : 'Click "Start Recording" to begin transcription'}
            </p>
          ) : (
            <div className="space-y-3">
              {transcript.map((segment, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{segment.timestamp}</span>
                    <span className="text-sm font-semibold text-purple-600">{segment.speaker}</span>
                  </div>
                  <p className="text-gray-900">{segment.text}</p>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          )}
        </div>

        {transcript.length > 0 && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={generateMinutes}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? 'Generating...' : 'Generate Meeting Minutes'}
            </button>
            <button
              onClick={downloadTranscript}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        )}
      </div>

      {/* Generated Minutes */}
      {generatedMinutes && (
        <div className="bg-white rounded-lg shadow-lg border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Generated Meeting Minutes
            </h3>
            <button
              onClick={saveMinutes}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save & Publish
            </button>
          </div>

          <div className="space-y-6">
            {/* Meeting Header */}
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{generatedMinutes.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {generatedMinutes.date}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {generatedMinutes.location}
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Attendees ({generatedMinutes.attendees.length})</h5>
              <div className="flex flex-wrap gap-2">
                {generatedMinutes.attendees.map((attendee, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {attendee}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Summary</h5>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{generatedMinutes.summary}</p>
            </div>

            {/* Key Points */}
            {generatedMinutes.keyPoints.length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Key Discussion Points</h5>
                <ul className="space-y-2">
                  {generatedMinutes.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Decisions */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Decisions Made
              </h5>
              <ul className="space-y-2">
                {generatedMinutes.decisions.map((decision, idx) => (
                  <li key={idx} className="flex gap-2 bg-green-50 p-3 rounded-lg">
                    <span className="text-green-600 font-bold">{idx + 1}.</span>
                    <span className="text-gray-700">{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            {generatedMinutes.actionItems.length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Action Items</h5>
                <div className="space-y-2">
                  {generatedMinutes.actionItems.map((item, idx) => (
                    <div key={idx} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <p className="text-gray-900 font-medium">{item.item}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Assignee: <strong>{item.assignee}</strong></span>
                        <span>Deadline: <strong>{item.deadline}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
    )}
    </div>
  )
}
