# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

All Things Agents is a Next.js 16 monorepo containing the main hub site and multiple product microsites (Client Keeper CRM, Atticus Social Media, Nicole Websites).

## Tech Stack

- **Framework:** Next.js 16.1.1 with App Router
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **Animation:** Motion (Framer Motion)
- **Database:** Supabase
- **Docs:** Fumadocs (MDX-based documentation)
- **Rich Text:** TipTap editor
- **UI Components:** Radix UI primitives

## Project Structure

```
app/
├── (hub)/                    # Main All Things Agents hub
│   ├── about/
│   ├── contact/
│   ├── support/
│   └── why/
├── (products)/               # Product microsites
│   ├── client-keeper-crm/    # CRM product (most developed)
│   │   ├── blog/
│   │   ├── mobile/
│   │   ├── support/          # Fumadocs support docs
│   │   ├── web-app/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── atticus-social-media/
│   └── nicole-websites/
├── admin/                    # Admin dashboard
│   ├── blog/                 # Blog CMS
│   ├── docs/                 # Docs CMS
│   ├── features/
│   ├── pricing/
│   ├── settings/
│   └── testimonials/
├── api/                      # API routes
│   ├── upload/
│   ├── upload-video/
│   ├── media/
│   └── revalidate/
└── login/                    # Auth pages

components/
├── layout/                   # Header, footer (shared)
├── sections/                 # Page sections (hero, pricing, etc.)
├── ui/                       # Animation components (blur-fade, marquee)
├── admin/                    # Admin dashboard components
├── products/                 # Product-specific components
├── hub/                      # Hub-specific components
├── support/                  # Support docs components
├── seo/                      # SEO components
├── shared/                   # Shared utilities
└── auth/                     # Auth components

lib/                          # Utilities and configurations
data/                         # Static data files
content/                      # MDX content for Fumadocs
public/                       # Static assets
```

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | All Things Agents hub homepage |
| `/client-keeper-crm` | Client Keeper homepage |
| `/client-keeper-crm/mobile` | Mobile app page |
| `/client-keeper-crm/web-app` | Web app page |
| `/client-keeper-crm/blog` | Blog listing |
| `/client-keeper-crm/support` | Support documentation |
| `/admin` | Admin dashboard |

## Important Files

- `components/layout/header.tsx` - Shared navigation header
- `components/layout/footer.tsx` - Shared footer
- `app/globals.css` - Global styles and Tailwind config
- `lib/supabase/` - Supabase client configuration
- `.env.local` - Environment variables (Supabase keys, etc.)

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
