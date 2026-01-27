import { createClient } from '@supabase/supabase-js'

// Server-side only - uses service role key for admin operations
// WARNING: Never expose this client to the browser
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
