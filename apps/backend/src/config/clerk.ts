export const clerkConfig = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
  secretKey: process.env.CLERK_SECRET_KEY!,
  webhookSecret: process.env.CLERK_WEBHOOK_SECRET!,
}

// Helper functions for Clerk operations
export function validateClerkConfig() {
  const required = ['publishableKey', 'secretKey', 'webhookSecret']
  const missing = required.filter(key => !clerkConfig[key as keyof typeof clerkConfig])
  
  if (missing.length > 0) {
    throw new Error(`Missing Clerk configuration: ${missing.join(', ')}`)
  }
}

export function getClerkHeaders() {
  return {
    'Authorization': `Bearer ${clerkConfig.secretKey}`,
    'Content-Type': 'application/json',
  }
}
