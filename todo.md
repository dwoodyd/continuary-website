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

## Marketing Site Remaining Work (Brief)

### 🔴 Blockers
- [x] MB1: Form submission reaches admin queue via trpc.applications.submit (DB insert confirmed)
- [x] MB2: Confirmation email fires via Resend on submit (RESEND_API_KEY verified, domain verified)
- [x] MB3: Sign In link added to Nav — ghost button on desktop, link in mobile drawer → https://app.continuary.app
- [x] MB4: Slot counter is live DB query via getSlotCounts() with 60s refetchInterval polling

### 🟡 Polish
- [x] MP1: Removed both fake stats — replaced with on-brand italic copy
- [x] MP2: Removed McKinsey citation from ProblemSection and VaultSection — replaced with original copy
- [x] MP3: Footer links fixed — Privacy/Terms → continuary.app, Contact → hello@continuary.app
- [x] MP4: PWA install text is decorative (not interactive) — noted, no action needed for launch
- [x] MP5: BookSection updated — June 15th release date, direct download + Amazon + Apple Books delivery channels, founding member PDF benefit confirmed
- [x] MP6: "Apply for the bundle" CTA → https://www.soulengineer.online/shop
- [x] MP7: "See what's included" → #pricing anchor — FoundingMember has id="pricing", confirmed working

### 🟢 Deferred Post-launch Backlog (requires a real-world trigger or new brief)
- Deferred — MC1: Email capture for non-founders when 100 slots fill (waitlist)
- Deferred — MC2: Replace placeholder stats with real founding member quotes once cohort is active
- Deferred — MC3: Link to Lifewoven / Operator House sites once they launch
- Deferred — MC4: Add "Why I built this" founder section for trust signal

## 🔴 Urgent Fix
- [x] Fixed all Apply links → https://continuary.app/apply (7 links across Nav, Hero, BookSection, Footer)
- [x] Sign In link added to Nav → https://app.continuary.app
- [x] Book bundle link updated → https://www.soulengineer.online/shop

## MP5 — Book Section Copy Update
- [x] Update BookSection: June 15th release, PDF direct download for founding members, also on Amazon + Apple Books, cover confirmed accurate

## Apply / App Link Update
- [x] Update all Apply CTAs and app-pointing links to https://app.continuary.app (Nav, Hero, Footer, RoadmapTeaser — all 7 links)
- [x] Sign In link in Nav already points to https://app.continuary.app — confirmed unchanged

## Apply URL Fix
- [x] Fix all Apply CTAs: change https://app.continuary.app → https://app.continuary.app/apply (root redirects to login wall, /apply is the correct public page)

## Cleanup Brief Round 2 (from Continuary-Website-Builder-Cleanup.md)
- [x] Ritual descriptions updated to locked copy: "Set your intention..." / "Two-minute alignment check..." / "Close the loop..." / "One clear direction for the week. Not a schedule — a compass."
- [x] Verified all other cleanup brief items already completed in prior sessions (pricing, feature names, problem framing, Keeper tier, stats removed, heading softened)

## Video Performance & iOS/iPad Fix
- [x] Audit all video elements — find sources, attributes, iOS compatibility issues
- [x] Fix iOS/iPad autoplay: ensure all videos have muted + playsinline + autoplay attributes
- [x] Add poster images to all videos so they show a frame while loading (not blank)
- [x] Lazy-load videos that are off-screen (IntersectionObserver + preload=none)
- [x] Verify video formats include MP4 (H.264) which is required for iOS Safari — all .mp4 confirmed

## Focus Sessions / Single Focus Mode Website Updates (Part 1 & 3 spec)
- [x] 1.1 Hero: add "Now with Focus Sessions — Wren works alongside you." italic gold tagline band below hero
- [x] 1.2 Rituals: add fifth "Focus Sessions with Wren" pillar block after the four existing ritual tiles
- [x] 1.3 Wren character section: append fourth line "And when you're ready to work, she's there — reading, writing, weaving — while you do."
- [x] 1.4 Pricing: rebuild all three tier feature lists with full locked feature ladder from Part 3
- [x] 1.5 Apply form: add optional "What draws you to Continuary?" checkbox field, wire draws[] to POST payload (DB migrated, tRPC + Formspree wired)
- [x] 1.6 What's New band: WhatsNew.tsx created, inserted between Rituals and EvidenceLog in Home.tsx
- [x] Audit: confirmed no Stripe references in codebase (PayPal only) — clean

## Marketing Site Fix Spec (Continuary-Marketing-Site-Fix-Spec.md)

### Critical
- [x] Thread Strength: strip 0/100 numerical score and progress bar; replace with qualitative three-state Wren-voiced framing (Gathering / Weaving / Holding)
- [x] What's Coming (RoadmapTeaser): full rewrite — removed all contradictory/shipped entries; added real Phase 1.5 + Phase 2 roadmap in 3 time-horizon groups
- [x] Inside the App (AppScreensSection): replaced "Focus Blocks" with Single Focus Mode; replaced "Health scores" with non-gamification language; updated preamble

### Important
- [x] Footer: added "An app from Soul Engineer →" link (routes to soulengineer.online), right-aligned, small, gold on hover
- [x] Slot counter: confirmed live DB data (trpc.applications.slotCounts, 60s refetch, SLOT_SEED=5 offset)
- [x] Sign In link: updated to app.continuary.app/signin (both desktop and mobile drawer)
- [x] Nav: added "Focus Sessions" anchor (scrolls to #focus-sessions in Rituals); removed redundant "Apply" nav item; orange Apply button remains as primary CTA

### CTA Verification
- [x] All CTAs audited: all routes verified correct per spec table; #pricing anchor confirmed valid

## Post-publish Polish
- [x] Focus Sessions nav anchor: add scrollMarginTop: "5rem" so nav click lands at section heading, not bottom of block

## Marketing Update (verified live 2026-06-06)
- [x] Rename "Clarity Engine" → "Intelligence" everywhere on the marketing site (Pricing.tsx + FoundingMember.tsx Free tier feature list)
- [x] Add Emotional Cycle named feature beat (Worry → Neutral → Elation mood log, framed as context for the work, not a tracker) — added to EvidenceLog.tsx with three state pills
- [x] Confirm You & Wren relationship panel is represented — added "You & Wren" named callout block to NothingBroken.tsx

## Clarity Engine / Intelligence Naming Fix
- [x] Add Clarity Engine back as a named distinct feature (daily clarity-pass tool) in Pricing.tsx, FoundingMember.tsx tier cards, and AppScreensSection — separate from Intelligence (review/insight layer)

## GitHub Sync and Book Copy Verification
- [x] Synchronized with origin/main at f59d9f2 and verified BookSection shows “Available now” and “Get the book,” with no direct-download PDF promise or “Get the bundle” CTA

## Navigation Logo Repair
- [x] Restore the broken Continuary navigation logo asset and verify it renders correctly in preview

## Published Book Update
- [x] Update every Permission to Start marketing-site reference from future release language to "Available now"
- [x] Add digital and paperback purchase links with required new-tab security attributes
- [x] Verify no book-related metadata or site copy retains release-date, pre-order, or coming-soon language

## Founding-member Book Fulfillment
- [x] Audit whether a founding-member PDF or book-link delivery workflow exists across the marketing site, application flow, and transactional email — no member-specific PDF delivery path exists
- [x] Replace or remove the BookSection founding-member PDF promise so it reflects only the verified fulfillment path — public digital and paperback purchase links
- [x] Verify the final fulfillment wording, links, and related tests before checkpointing — BookSection contract test added; 13/13 tests pass

## Founding-member Pricing Contrast Repair
- [x] Audit and correct low-contrast text, borders, and hierarchy in the post-beta public-launch comparison
- [x] Verify readable desktop and mobile pricing comparison rendering, then run regression tests and type checks — desktop and mobile captures reviewed; 15/15 tests and TypeScript pass
