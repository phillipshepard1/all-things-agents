/**
 * Clean up Supabase Storage video files after Mux migration is verified.
 *
 * Usage:
 *   npx tsx scripts/cleanup-supabase-videos.ts              # live run
 *   npx tsx scripts/cleanup-supabase-videos.ts --dry-run    # preview only
 *
 * Only deletes files in support-docs-media/videos/. Images in uploads/ are not affected.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '..', '.env.local')
    const lines = readFileSync(envPath, 'utf-8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let value = trimmed.slice(eqIdx + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch {
    console.log('No .env.local found, using existing env vars')
  }
}
loadEnv()

const DRY_RUN = process.argv.includes('--dry-run')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function main() {
  console.log(`\n=== Supabase Video Cleanup ${DRY_RUN ? '(DRY RUN)' : '(LIVE)'} ===\n`)

  const { data: files, error } = await supabase.storage
    .from('support-docs-media')
    .list('videos', { sortBy: { column: 'created_at', order: 'desc' } })

  if (error) {
    console.error('Failed to list files:', error)
    process.exit(1)
  }

  const videoFiles = (files || []).filter(
    (f) => f.id !== null && f.name !== '.emptyFolderPlaceholder'
  )

  if (videoFiles.length === 0) {
    console.log('No video files found in support-docs-media/videos/')
    return
  }

  console.log(`Found ${videoFiles.length} video files to delete:\n`)

  for (const file of videoFiles) {
    const path = `videos/${file.name}`
    console.log(`  ${path} (${file.metadata?.size ? (file.metadata.size / 1024 / 1024).toFixed(1) + 'MB' : 'unknown size'})`)

    if (!DRY_RUN) {
      const { error: deleteError } = await supabase.storage
        .from('support-docs-media')
        .remove([path])

      if (deleteError) {
        console.error(`    ✗ Failed to delete: ${deleteError.message}`)
      } else {
        console.log(`    ✓ Deleted`)
      }
    }
  }

  console.log(`\n${DRY_RUN ? 'Would delete' : 'Deleted'} ${videoFiles.length} files`)
  console.log('Note: Images in uploads/ are not affected')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
