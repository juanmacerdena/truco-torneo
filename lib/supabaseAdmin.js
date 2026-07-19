import { createClient } from '@supabase/supabase-js'

class SupabaseConfigError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SupabaseConfigError'
    this.statusCode = 500
  }
}

let adminClient

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl) {
    throw new SupabaseConfigError('NEXT_PUBLIC_SUPABASE_URL is required')
  }

  if (!supabaseKey) {
    throw new SupabaseConfigError('SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) is required')
  }

  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseKey)
  }

  return adminClient
}
