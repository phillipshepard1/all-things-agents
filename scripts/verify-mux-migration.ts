/**
 * Verify that all support doc videos have been migrated from Supabase to Mux.
 *
 * Usage:
 *   npx tsx scripts/verify-mux-migration.ts
 *
 * Checks:
 *   - No video_url contains supabase.co/storage
 *   - No TipTap content contains supabase.co/storage video nodes
 *   - All Mux playback IDs resolve to valid assets
 */

import { createClient } from '@supabase/supabase-js'
import Mux from '@mux/mux-node'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local
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

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})

interface JSONContent {
  type?: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  text?: string
}

function findSupabaseVideoUrls(node: JSONContent, urls: string[] = []): string[] {
  if (
    node.type === 'video' &&
    node.attrs?.isDirectVideo === true &&
    typeof node.attrs?.src === 'string' &&
    node.attrs.src.includes('supabase.co/storage')
  ) {
    urls.push(node.attrs.src)
  }
  if (node.content) {
    for (const child of node.content) {
      findSupabaseVideoUrls(child, urls)
    }
  }
  return urls
}

function findMuxPlaybackIds(node: JSONContent, ids: string[] = []): string[] {
  if (
    node.type === 'video' &&
    typeof node.attrs?.src === 'string' &&
    node.attrs.src.includes('stream.mux.com')
  ) {
    const match = node.attrs.src.match(/stream\.mux\.com\/([a-zA-Z0-9]+)/)
    if (match) ids.push(match[1])
  }
  if (node.content) {
    for (const child of node.content) {
      findMuxPlaybackIds(child, ids)
    }
  }
  return ids
}

async function main() {
  console.log('\n=== Mux Migration Verification ===\n')

  const { data: docs, error } = await supabase
    .from('support_docs')
    .select('id, title, video_url, content')
    .order('sort_order')

  if (error) {
    console.error('Failed to fetch docs:', error)
    process.exit(1)
  }

  console.log(`Checking ${docs.length} support docs...\n`)

  let totalDocs = docs.length
  let remainingSupabaseVideoUrls: { docTitle: string; url: string }[] = []
  let remainingSupabaseContentUrls: { docTitle: string; urls: string[] }[] = []
  let muxPlaybackIds = new Set<string>()
  let muxVideoUrlCount = 0

  for (const doc of docs) {
    // Check video_url
    if (doc.video_url) {
      if (doc.video_url.includes('supabase.co/storage')) {
        remainingSupabaseVideoUrls.push({ docTitle: doc.title, url: doc.video_url })
      }
      if (doc.video_url.includes('stream.mux.com')) {
        muxVideoUrlCount++
        const match = doc.video_url.match(/stream\.mux\.com\/([a-zA-Z0-9]+)/)
        if (match) muxPlaybackIds.add(match[1])
      }
    }

    // Check content
    if (doc.content) {
      const supabaseUrls = findSupabaseVideoUrls(doc.content as JSONContent)
      if (supabaseUrls.length > 0) {
        remainingSupabaseContentUrls.push({ docTitle: doc.title, urls: supabaseUrls })
      }
      const contentMuxIds = findMuxPlaybackIds(doc.content as JSONContent)
      for (const id of contentMuxIds) {
        muxPlaybackIds.add(id)
      }
    }
  }

  // Report remaining Supabase URLs
  if (remainingSupabaseVideoUrls.length > 0) {
    console.log('❌ REMAINING Supabase video_url entries:')
    for (const { docTitle, url } of remainingSupabaseVideoUrls) {
      console.log(`   - "${docTitle}": ${url.slice(0, 80)}...`)
    }
    console.log()
  }

  if (remainingSupabaseContentUrls.length > 0) {
    console.log('❌ REMAINING Supabase videos in content:')
    for (const { docTitle, urls } of remainingSupabaseContentUrls) {
      for (const url of urls) {
        console.log(`   - "${docTitle}": ${url.slice(0, 80)}...`)
      }
    }
    console.log()
  }

  // Verify Mux assets exist
  console.log(`Verifying ${muxPlaybackIds.size} Mux playback IDs...`)
  let validAssets = 0
  let invalidAssets = 0

  for (const playbackId of muxPlaybackIds) {
    try {
      // Look up asset by playback ID
      const assets = await mux.video.assets.list({ live_stream_id: undefined })
      // Use playback ID endpoint directly
      const response = await fetch(`https://api.mux.com/video/v1/playback-ids/${playbackId}`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`).toString('base64')}`,
        },
      })
      if (response.ok) {
        validAssets++
      } else {
        console.log(`   ⚠ Playback ID ${playbackId}: HTTP ${response.status}`)
        invalidAssets++
      }
    } catch (err: any) {
      console.log(`   ⚠ Playback ID ${playbackId}: ${err.message}`)
      invalidAssets++
    }
  }

  // Summary
  console.log('\n=== Summary ===')
  console.log(`Total docs checked: ${totalDocs}`)
  console.log(`Mux video_url entries: ${muxVideoUrlCount}`)
  console.log(`Unique Mux playback IDs: ${muxPlaybackIds.size}`)
  console.log(`Valid Mux assets: ${validAssets}`)
  console.log(`Invalid Mux assets: ${invalidAssets}`)
  console.log(`Remaining Supabase video_url: ${remainingSupabaseVideoUrls.length}`)
  console.log(`Remaining Supabase content videos: ${remainingSupabaseContentUrls.length}`)

  const allClear = remainingSupabaseVideoUrls.length === 0 && remainingSupabaseContentUrls.length === 0 && invalidAssets === 0
  console.log(`\n${allClear ? '✅ Migration fully verified!' : '❌ Issues found — see above'}`)

  process.exit(allClear ? 0 : 1)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
