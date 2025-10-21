import { createClient } from '@supabase/supabase-js'

export const supabaseConfig = {
  url: process.env.SUPABASE_URL!,
  anonKey: process.env.SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
}

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(
  supabaseConfig.url || 'https://dummy.supabase.co',
  supabaseConfig.serviceRoleKey || 'dummy-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Client for user operations (respects RLS)
export const supabaseClient = createClient(
  supabaseConfig.url || 'https://dummy.supabase.co',
  supabaseConfig.anonKey || 'dummy-key'
)

// Helper functions for common operations
export async function getUserById(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('auth_users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function createUser(userData: {
  clerk_id: string
  email: string
  first_name?: string
  last_name?: string
}) {
  const { data, error } = await supabaseAdmin
    .from('auth_users')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data
}
