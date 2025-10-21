import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Implement surahs endpoint
  return NextResponse.json({
    message: 'Surahs endpoint - coming soon',
    surahs: []
  })
}
