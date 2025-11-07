'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Mic, Square, Play, Pause, Upload, Trash2 } from 'lucide-react'

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, duration: number) => void
  onUpload?: (file: File, duration: number) => Promise<void>
  maxDuration?: number // in seconds
  className?: string
}

export default function VoiceRecorder({ 
  onRecordingComplete, 
  onUpload, 
  maxDuration = 600, // 10 minutes default
  className = '' 
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        onRecordingComplete(blob, duration)
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1
          if (newDuration >= maxDuration) {
            stopRecording()
          }
          return newDuration
        })
      }, 1000)

    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const deleteRecording = () => {
    setAudioBlob(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioUrl(null)
    setDuration(0)
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const uploadRecording = async () => {
    if (audioBlob && onUpload) {
      setIsUploading(true)
      try {
        const file = new File([audioBlob], `voice-recording-${Date.now()}.webm`, {
          type: 'audio/webm'
        })
        await onUpload(file, duration)
        deleteRecording() // Clear after successful upload
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Upload failed. Please try again.')
      } finally {
        setIsUploading(false)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime))
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <div className={`voice-recorder bg-white rounded-lg border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Voice Recording</h3>
        <div className="text-sm text-gray-500">
          {formatTime(duration)} {maxDuration && `/ ${formatTime(maxDuration)}`}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex items-center gap-3 mb-4">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Mic size={18} />
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors animate-pulse"
          >
            <Square size={18} />
            Stop Recording
          </button>
        )}

        {audioBlob && !isPlaying && (
          <button
            onClick={playRecording}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Play size={16} />
            Play
          </button>
        )}

        {audioBlob && isPlaying && (
          <button
            onClick={pauseRecording}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Pause size={16} />
            Pause
          </button>
        )}

        {audioBlob && (
          <>
            <button
              onClick={deleteRecording}
              className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>

            {onUpload && (
              <button
                onClick={uploadRecording}
                disabled={isUploading}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={16} />
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            )}
          </>
        )}
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          Recording in progress...
        </div>
      )}

      {/* Audio Playback */}
      {audioUrl && (
        <div className="border rounded-md p-3 bg-gray-50">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            className="hidden"
          />
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Playback: {formatTime(currentTime)} / {formatTime(duration)}</span>
            <span className="text-xs">
              {audioBlob && `${Math.round(audioBlob.size / 1024)}KB`}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-200"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Recording Tips */}
      {!audioBlob && !isRecording && (
        <div className="text-xs text-gray-500 mt-3 space-y-1">
          <p>• Click "Start Recording" to begin voice notes</p>
          <p>• Speak clearly and ensure good audio quality</p>
          <p>• Recording will auto-stop at {formatTime(maxDuration)}</p>
        </div>
      )}
    </div>
  )
}