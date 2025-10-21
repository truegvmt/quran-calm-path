import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { generateText, openaiConfig } from '@/config'

export async function POST(req: NextRequest) {
  try {
    const userId = await requireAuth()
    const body = await req.json()
    
    // Generate insight using OpenAI
    const prompt = `Generate a meaningful insight from the Quran based on: ${JSON.stringify(body)}`
    
    const insight = await generateText(prompt, {
      model: openaiConfig.model,
      maxTokens: openaiConfig.maxTokens,
      temperature: openaiConfig.temperature,
    })
    
    return NextResponse.json({
      message: 'Insight generated successfully',
      userId,
      insight,
      model: openaiConfig.model,
      data: body
    })
  } catch (error) {
    console.error('Insight generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Authentication required' },
      { status: 401 }
    )
  }
}
