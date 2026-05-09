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
