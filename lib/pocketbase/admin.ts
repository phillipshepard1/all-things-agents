import PocketBase from 'pocketbase'

// Server-side only — authenticates as superuser for admin operations
// WARNING: Never expose this client to the browser
export async function createAdminClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  await pb.collection('_superusers').authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL!,
    process.env.POCKETBASE_ADMIN_PASSWORD!
  )
  return pb
}
