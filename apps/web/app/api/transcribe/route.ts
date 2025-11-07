import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

/**
 * Whisper API Transcription Endpoint
 * Handles audio file uploads and transcribes them using OpenAI Whisper
 * Supports bilingual meetings (English + Igbo/Yoruba code-switching)
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Check file size (max 25MB for Whisper API)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 25MB' },
        { status: 400 }
      )
    }

    console.log(`Transcribing ${audioFile.name} (${(audioFile.size / 1024 / 1024).toFixed(2)}MB)...`)

    // Convert File to format Whisper API expects
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en', // Primary language (will still detect Igbo/Yoruba)
      response_format: 'verbose_json', // Get timestamps
      timestamp_granularities: ['segment'], // Get segment-level timestamps
    })

    // Transform Whisper output to our transcript format
    const segments = transcription.segments?.map((segment: any, index: number) => ({
      timestamp: new Date(segment.start * 1000).toISOString().substr(11, 8),
      speaker: `Speaker ${(index % 3) + 1}`, // Simple speaker detection (upgrade later)
      text: segment.text.trim(),
      start: segment.start,
      end: segment.end,
    })) || []

    return NextResponse.json({
      success: true,
      transcript: segments,
      fullText: transcription.text,
      duration: transcription.duration,
      language: transcription.language,
      cost: (transcription.duration / 60 * 0.006).toFixed(3), // Estimate in USD
    })

  } catch (error: any) {
    console.error('Transcription error:', error)
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'OpenAI API quota exceeded. Please add credits to your account.' },
        { status: 402 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false, // Allow Next.js to handle file uploads
  },
}
