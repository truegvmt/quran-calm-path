import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const userId = await requireAuth()
    
    return NextResponse.json({
      userId,
      message: 'User profile endpoint - authenticated'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
}
