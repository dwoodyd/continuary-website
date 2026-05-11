# Continuary — Project TODO

## Marketing Site (all complete)
- [x] Hero section with Apply CTA, beta pill, ADHD chip, PWA line
- [x] PlatformStrip (iOS/Android/Browser)
- [x] PanoramicBanner (3-panel composite mockup)
- [x] ProblemSection
- [x] NothingBroken
- [x] Rituals (centered single-column, no image)
- [x] EvidenceLog
- [x] VaultSection
- [x] ReEntry (Wren on left)
- [x] ThreadStrength (count-up animation, default 64)
- [x] ADHDSection (Wren 55vw left)
- [x] AppScreensSection (2x2 grid + mobile carousel)
- [x] BookSection
- [x] FoundingMember (Formspree form wired, PWA line, scarcity counter)
- [x] Footer (real SVG logo, wired links)
- [x] Nav (Apply CTA → #founding-member)

## Pre-deploy punch list (all complete)
- [x] CTAs changed to "Apply for a slot"
- [x] Fake testimonials removed
- [x] Closed beta pill added to Hero
- [x] Wren visual variety across sections
- [x] Thread Strength count-up animation
- [x] Favicon (arch + wren mark, dark navy, amber dot)
- [x] OG/Twitter meta tags (panoramic_banner.webp as social preview)
- [x] Footer links wired (Privacy, Terms, Contact)
- [x] Formspree form wired (endpoint mgodnnnk)

## CRM / Full-stack upgrade
- [x] Upgrade project to web-db-user (tRPC + Express + MySQL/Drizzle + Manus OAuth)
- [x] Resolve merge conflicts (Home.tsx preserved, useAuth injection removed)
- [x] Database schema: applications table (id, formspreeId, name, email, relationship, status, notes, submittedAt, updatedAt)
- [x] pnpm db:push — applications table created in DB
- [x] server/db.applications.ts — all query helpers (insert, list, get, updateStatus, updateNotes, getSlotCounts)
- [x] server/routers/applications.ts — all tRPC procedures (slotCounts, submit, list, get, updateStatus, updateNotes)
- [x] server/routers.ts — applicationsRouter registered
- [x] client/src/pages/Admin.tsx — CRM dashboard built (inbox, status badges, notes, slot counter, admin guard)
- [x] client/src/App.tsx — /admin route registered
- [x] Hero.tsx — live slot counter wired via trpc.applications.slotCounts
- [x] FoundingMember.tsx — live slot counter wired via trpc.applications.slotCounts
- [x] Vitest tests written and passing (11/11)

## Mobile Layout Audit & Fixes
- [x] Audit all sections at 375px/430px — catalogue issues
- [x] Nav mobile menu — hamburger + slide-down drawer already implemented
- [x] Hero mobile layout — text, pill, CTAs all correct; Wren peeks from bottom-right
- [x] PlatformStrip mobile — stacks vertically at 640px
- [x] PanoramicBanner mobile — 3 panels readable
- [x] ProblemSection mobile — single column
- [x] NothingBroken mobile — Wren hidden, full-width text via CSS ID selector
- [x] Rituals mobile — cards stack vertically, centered heading
- [x] EvidenceLog mobile — Wren hidden, full-width text
- [x] VaultSection mobile — cards stack, full-width
- [x] ReEntry mobile — Wren hidden, text full-width
- [x] ThreadStrength mobile — observer threshold lowered to 0.1
- [x] ADHDSection mobile — Wren hidden, full-width text
- [x] AppScreensSection mobile — uses useScrollReveal with updated threshold
- [x] BookSection mobile — Wren hidden, stacked layout
- [x] FoundingMember mobile — form fields full-width, benefit cards stack
- [x] Footer mobile — Wren hidden, stacked links
- [x] Global: min-height: auto on all Wren sections at ≤768px
- [x] Global: prefers-reduced-motion — all reveal elements immediately visible
- [x] Global: IntersectionObserver thresholds lowered (0.4→0.1, 0.12→0.05) + rootMargin added
- [x] Global: useScrollReveal hook updated with threshold 0.05 + rootMargin

## Apply Link Update
- [x] Update all Apply CTA links to https://continuary.soulengineer.online/apply (Nav, Hero, BookSection, Footer — 6 links total)

## Round 3 Improvements
- [x] Add target=_blank rel=noopener to all Apply CTA links (Nav, Hero, BookSection, Footer — 7 links)
- [x] Wire FoundingMember form to submit via trpc.applications.submit in addition to Formspree
- [x] Save checkpoint and publish

## Cleanup Brief (Continuary-Website-Builder-Cleanup.md)

### P0 — Pricing reconciliation
- [x] Replace pricing block with locked tier structure (Free $0 / Pro $4.99mo·$39.99yr founding, $7.99mo·$79.99yr retail / Keeper $9.99mo·$79.99yr founding, $14.99mo·$149.99yr retail)
- [x] Fix founding-rate copy line: "$4.99 Pro / $9.99 Keeper monthly (or $39.99 / $79.99 annual) — for life, across every renewal"
- [x] Show all four retail tiers in "After beta" comparison with founding rates as strikethrough anchors
- [x] Fix "Locked for life" callout to use real numbers $4.99/$9.99 not $5/$10

### P1 — Copy grafts from /landing
- [x] Replace problem-framing block with: Restart Tax / Burst Penalty / Open Tab Spiral / Lost Week
- [x] Lock four ritual names: Morning check-in / Midday pulse / Evening close / Weekly Compass

### P2 — Feature name reconciliation
- [x] "The Vault" eyebrow → "Knowledge Vault"
- [x] "The return" eyebrow → "Re-Entry Card"
- [x] AppScreensSection summary copy updated to use canonical names (Weekly Compass, Focus Blocks)
- [x] Focus Blocks alt text and subhead updated (was "Clarity mode")
- [x] Distraction Insights added to Pro tier features in after-beta comparison

### P3 — Keeper tier fix
- [x] Replace "Keeper-exclusive Wren" with actual Keeper features: Wren voice check-ins / Weekly Compass deep-dive / Threshold Diagnosis tool / Study Mode & Focus Blocks

### P6 — Tone pass
- [x] FoundingMember heading changed from "Become a Founding Member" to "Apply for a founding seat"

## Roadmap Teaser Section
- [x] Create RoadmapTeaser.tsx section with "In development" chips for upcoming features
- [x] Insert between AppScreensSection and FoundingMember in Home.tsx

## Round 4 Improvements
- [x] Create RoadmapTeaser.tsx section with "In development" chips and insert between AppScreensSection and FoundingMember
- [x] Add refetchInterval: 60_000 to slotCounts query in Hero and FoundingMember for live counter
- [x] Set up Resend transactional email and send applicant confirmation on trpc.applications.submit success (sends from hello@continuary.app)

## Resend Setup
- [x] RESEND_API_KEY provided and confirmed present in environment
- [x] continuary.app domain verified in Resend dashboard
- [x] Test email delivered successfully to Resend sink (ID: a846ca06-d7f3-4d8c-b296-366feb062d13)

## Confirmation Email Copy Update
- [x] Update server/email.ts with approved subject, HTML body, and plain-text copy
- [x] Fix Home.tsx unterminated comment / stale Vite parse error
