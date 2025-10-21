import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkConfig } from '@/config'

export async function POST(req: NextRequest) {
  if (!clerkConfig.webhookSecret) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.text()
  const body = JSON.parse(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(clerkConfig.webhookSecret)

  let evt: any

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data

    // TODO: Create user in Supabase
    console.log('User created:', { id, email_addresses, first_name, last_name })
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data

    // TODO: Update user in Supabase
    console.log('User updated:', { id, email_addresses, first_name, last_name })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    // TODO: Delete user from Supabase
    console.log('User deleted:', { id })
  }

  return NextResponse.json({ message: 'Webhook received' })
}
