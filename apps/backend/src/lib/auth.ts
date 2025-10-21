import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

export async function getAuthenticatedUser() {
  const { userId } = await auth()
  return userId
}

export async function requireAuth() {
  const userId = await getAuthenticatedUser()
  
  if (!userId) {
    throw new Error('Authentication required')
  }
  
  return userId
}

export function getAuthHeaders(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  return {
    'Content-Type': 'application/json',
    ...(authHeader && { 'Authorization': authHeader })
  }
}
