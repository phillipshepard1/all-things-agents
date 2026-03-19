/**
 * Migrate support doc videos from Supabase Storage to Mux.
 *
 * Usage:
 *   npx tsx scripts/migrate-videos-to-mux.ts              # live run
 *   npx tsx scripts/migrate-videos-to-mux.ts --dry-run    # preview only
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *   MUX_TOKEN_ID, MUX_TOKEN_SECRET,
 *   NEXT_PUBLIC_SITE_URL (for revalidation)
 */

import { createClient } from '@supabase/supabase-js'
import Mux from '@mux/mux-node'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
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
      // Strip surrounding quotes
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

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DRY_RUN = process.argv.includes('--dry-run')
const POLL_INTERVAL_MS = 3000
const POLL_TIMEOUT_MS = 300_000 // 5 minutes per asset

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})

interface MigrationLogEntry {
  docId: string
  title: string
  field: 'video_url' | 'content'
  oldUrl: string
  newUrl: string
  status: 'success' | 'skipped' | 'error'
  error?: string
}

const log: MigrationLogEntry[] = []
// Dedup map: supabaseUrl → muxStreamUrl
const urlMap = new Map<string, string>()

// ---------------------------------------------------------------------------
// Mux asset creation with polling
// ---------------------------------------------------------------------------
async function createMuxAsset(supabaseUrl: string): Promise<string> {
  // Check dedup map first
  const existing = urlMap.get(supabaseUrl)
  if (existing) return existing

  console.log(`  Creating Mux asset for: ${supabaseUrl.slice(0, 80)}...`)

  const asset = await mux.video.assets.create({
    inputs: [{ url: supabaseUrl }],
    playback_policies: ['public'],
  })

  // Poll until ready
  const start = Date.now()
  let current = asset
  while (current.status !== 'ready') {
    if (Date.now() - start > POLL_TIMEOUT_MS) {
      throw new Error(`Timeout waiting for asset ${current.id} to be ready (status: ${current.status})`)
    }
    if (current.status === 'errored') {
      throw new Error(`Asset ${current.id} errored during ingest`)
    }
    await sleep(POLL_INTERVAL_MS)
    current = await mux.video.assets.retrieve(current.id)
  }

  const playbackId = current.playback_ids?.[0]?.id
  if (!playbackId) {
    throw new Error(`Asset ${current.id} is ready but has no playback ID`)
  }

  const streamUrl = `https://stream.mux.com/${playbackId}`
  urlMap.set(supabaseUrl, streamUrl)
  console.log(`  ✓ Ready: ${streamUrl}`)
  return streamUrl
}

// ---------------------------------------------------------------------------
// TipTap content JSON walker
// ---------------------------------------------------------------------------
interface JSONContent {
  type?: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  text?: string
  marks?: any[]
}

async function walkAndMigrate(node: JSONContent): Promise<{ node: JSONContent; changed: boolean }> {
  // Check if this is a direct video node with a Supabase URL
  if (
    node.type === 'video' &&
    node.attrs?.isDirectVideo === true &&
    typeof node.attrs?.src === 'string' &&
    node.attrs.src.includes('supabase.co/storage')
  ) {
    const oldUrl = node.attrs.src

    if (DRY_RUN) {
      console.log(`  [DRY-RUN] Would migrate content video: ${oldUrl.slice(0, 80)}...`)
      return { node, changed: true } // Report it would change
    }

    const newUrl = await createMuxAsset(oldUrl)
    return {
      node: {
        ...node,
        attrs: { ...node.attrs, src: newUrl },
      },
      changed: true,
    }
  }

  // Recurse into children
  if (node.content && node.content.length > 0) {
    let anyChildChanged = false
    const newContent: JSONContent[] = []

    for (const child of node.content) {
      const result = await walkAndMigrate(child)
      newContent.push(result.node)
      if (result.changed) anyChildChanged = true
    }

    if (anyChildChanged) {
      return { node: { ...node, content: newContent }, changed: true }
    }
  }

  return { node, changed: false }
}

// ---------------------------------------------------------------------------
// Main migration
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`  Mux Video Migration ${DRY_RUN ? '(DRY RUN)' : '(LIVE)'}`)
  console.log(`${'='.repeat(60)}\n`)

  // 1. Fetch all support docs
  const { data: docs, error } = await supabase
    .from('support_docs')
    .select('id, title, slug, video_url, content')
    .order('sort_order')

  if (error) {
    console.error('Failed to fetch docs:', error)
    process.exit(1)
  }

  console.log(`Found ${docs.length} support docs\n`)

  for (const doc of docs) {
    console.log(`\n--- ${doc.title} (${doc.id}) ---`)

    const updates: Record<string, any> = {}

    // --- video_url field ---
    if (doc.video_url) {
      if (doc.video_url.includes('stream.mux.com')) {
        console.log('  video_url: Already Mux, skipping')
        log.push({ docId: doc.id, title: doc.title, field: 'video_url', oldUrl: doc.video_url, newUrl: doc.video_url, status: 'skipped' })
      } else if (doc.video_url.includes('supabase.co/storage')) {
        try {
          if (DRY_RUN) {
            console.log(`  [DRY-RUN] Would migrate video_url: ${doc.video_url.slice(0, 80)}...`)
            log.push({ docId: doc.id, title: doc.title, field: 'video_url', oldUrl: doc.video_url, newUrl: '(dry-run)', status: 'skipped' })
          } else {
            const newUrl = await createMuxAsset(doc.video_url)
            updates.video_url = newUrl
            log.push({ docId: doc.id, title: doc.title, field: 'video_url', oldUrl: doc.video_url, newUrl, status: 'success' })
          }
        } catch (err: any) {
          console.error(`  ✗ video_url migration failed: ${err.message}`)
          log.push({ docId: doc.id, title: doc.title, field: 'video_url', oldUrl: doc.video_url, newUrl: '', status: 'error', error: err.message })
        }
      } else {
        console.log('  video_url: Not Supabase (YouTube/Vimeo/Loom), skipping')
        log.push({ docId: doc.id, title: doc.title, field: 'video_url', oldUrl: doc.video_url, newUrl: doc.video_url, status: 'skipped' })
      }
    }

    // --- content JSON ---
    if (doc.content) {
      try {
        const { node: newContent, changed } = await walkAndMigrate(doc.content as JSONContent)
        if (changed && !DRY_RUN) {
          updates.content = newContent
          log.push({ docId: doc.id, title: doc.title, field: 'content', oldUrl: '(tiptap json)', newUrl: '(migrated)', status: 'success' })
        } else if (changed) {
          log.push({ docId: doc.id, title: doc.title, field: 'content', oldUrl: '(tiptap json)', newUrl: '(dry-run)', status: 'skipped' })
        }
      } catch (err: any) {
        console.error(`  ✗ content migration failed: ${err.message}`)
        log.push({ docId: doc.id, title: doc.title, field: 'content', oldUrl: '(tiptap json)', newUrl: '', status: 'error', error: err.message })
      }
    }

    // --- Update DB ---
    if (Object.keys(updates).length > 0 && !DRY_RUN) {
      const { error: updateError } = await supabase
        .from('support_docs')
        .update(updates)
        .eq('id', doc.id)

      if (updateError) {
        console.error(`  ✗ DB update failed: ${updateError.message}`)
      } else {
        console.log(`  ✓ DB updated (${Object.keys(updates).join(', ')})`)
      }
    }
  }

  // 2. Trigger revalidation
  if (!DRY_RUN && log.some((l) => l.status === 'success')) {
    console.log('\nTriggering page revalidation...')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allthingsagents.com'
    try {
      const res = await fetch(`${siteUrl}/api/revalidate/support`, { method: 'POST' })
      if (res.ok) {
        console.log('✓ Revalidation triggered')
      } else {
        console.log(`⚠ Revalidation returned ${res.status}: ${await res.text()}`)
      }
    } catch (err: any) {
      console.log(`⚠ Revalidation failed: ${err.message}`)
    }
  }

  // 3. Write log
  const logPath = resolve(__dirname, 'migration-log.json')
  writeFileSync(logPath, JSON.stringify(log, null, 2))
  console.log(`\nMigration log written to: ${logPath}`)

  // Summary
  const successes = log.filter((l) => l.status === 'success').length
  const errors = log.filter((l) => l.status === 'error').length
  const skipped = log.filter((l) => l.status === 'skipped').length
  console.log(`\nSummary: ${successes} migrated, ${skipped} skipped, ${errors} errors`)
  console.log(`Unique Mux assets created: ${urlMap.size}`)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
