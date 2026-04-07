# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

All Things Agents is a Next.js 16 monorepo containing the main hub site and multiple product microsites (Client Keeper CRM, Atticus Social Media, Nicole Websites).

## Tech Stack

- **Framework:** Next.js 16.1.1 with App Router
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **Animation:** Motion (Framer Motion)
- **Database:** PocketBase (self-hosted on Hetzner VPS)
- **Docs:** Fumadocs (MDX-based documentation)
- **Rich Text:** TipTap editor
- **UI Components:** Radix UI primitives
- **Hosting:** Vercel

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

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
│   │   ├── lp/               # Landing pages for ads
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
│   ├── hero-options/         # Multiple hero variants for testing
│   └── landing/              # Landing page specific components
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

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | All Things Agents hub homepage |
| `/client-keeper-crm` | Client Keeper homepage |
| `/client-keeper-crm/mobile` | Mobile app page |
| `/client-keeper-crm/web-app` | Web app page |
| `/client-keeper-crm/blog` | Blog listing |
| `/client-keeper-crm/support` | Support documentation |
| `/client-keeper-crm/lp/*` | Ad landing pages |
| `/admin` | Admin dashboard |

## Important Files

### Layout & Navigation
- `components/layout/header.tsx` - Shared navigation header with mobile menu
- `components/layout/footer.tsx` - Shared footer

### Hero Components
- `components/sections/hero-options/hero-strikethrough-split-reveal.tsx` - **Main Client Keeper homepage hero** (animated strikethrough with before/after panels)
- `components/sections/hero-options/hero-strikethrough.tsx` - Alternate hero variant
- Other hero variants in `hero-options/` for A/B testing

### Landing Pages
- `components/sections/landing/` - Components for ad landing pages
- `app/(products)/client-keeper-crm/lp/` - Landing page routes

### Styling & Config
- `app/globals.css` - Global styles and Tailwind config
- `lib/pocketbase/` - PocketBase client configuration (client, server, admin)

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_POCKETBASE_URL` - PocketBase instance URL
- `POCKETBASE_ADMIN_EMAIL` - PocketBase admin email (for server-side operations)
- `POCKETBASE_ADMIN_PASSWORD` - PocketBase admin password

Optional:
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata (default: https://allthingsagents.com)
- `MUX_TOKEN_ID` - Mux video token ID
- `MUX_TOKEN_SECRET` - Mux video token secret

## Deployment

### GitHub Actions (Auto-deploy on push to main)
- Workflow: `.github/workflows/deploy.yml`
- Deploys to Vercel on every push to `main` branch
- Can also be triggered manually via `gh workflow run deploy.yml`

### Required GitHub Secrets
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Manual Deploy
```bash
vercel --prod
```

## App Store Links

### iOS App Store
- **Correct link:** `https://apps.apple.com/us/app/client-keeper-crm/id6756403940`

### Google Play Store
- **Correct link:** `https://play.google.com/store/apps/details?id=com.clientkeeper.crm`

## Code Patterns

### External Links in Mobile Menu
Use plain `<a>` tags (not Next.js `Link`) for external URLs like App Store links to avoid white screen issues on mobile Safari:
```jsx
<a href="https://..." target="_blank" rel="noopener noreferrer">
```

### Hero Text with Spacing
Use inline span elements for visual spacing between words:
```jsx
Client<span className="inline-block w-3 md:w-4"></span>Keeper<span className="inline-block w-3 md:w-4"></span>CRM.
```

## Useful Links

- **Production:** https://www.allthingsagents.com
- **Client Keeper:** https://www.allthingsagents.com/client-keeper-crm
- **Vercel Dashboard:** https://vercel.com/client-keeper/all-things-agents-website
- **GitHub Repo:** https://github.com/phillipshepard1/all-things-agents
