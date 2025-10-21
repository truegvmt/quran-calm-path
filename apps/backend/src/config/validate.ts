export function validateConfig() {
  const required = [
    'OPENAI_API_KEY',
    'OPENAI_MODEL',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'CLERK_WEBHOOK_SECRET',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

export function validateOpenAIConfig() {
  const required = ['OPENAI_API_KEY', 'OPENAI_MODEL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing OpenAI configuration: ${missing.join(', ')}`)
  }
}

export function validateSupabaseConfig() {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing Supabase configuration: ${missing.join(', ')}`)
  }
}

export function validateClerkEnvConfig() {
  const required = ['CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY', 'CLERK_WEBHOOK_SECRET']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing Clerk configuration: ${missing.join(', ')}`)
  }
}
