# Merl.ai Design Analysis — Reference for Continuary Rebuild

## Key observations

### Mascot treatment
- Merl's mascot (wizard character) is NOT a full-bleed video background
- The mascot appears as a large illustration/PNG that bleeds off the right edge of the hero
- No black box issue because it's a PNG with transparent background, not a video
- The mascot is HUGE — takes up roughly 40% of the viewport width, partially off-screen
- Character bleeds off the edge — intentionally cropped, creating mystery/scale
- On the agent cards, the mascot fills the entire card background (card IS the character's scene)

### Layout philosophy
- Cream/warm beige background (#f5ede0 range) — NOT dark
- Massive editorial typography (Neue Haas Grotesk or similar condensed grotesque)
- Text is LEFT-ALIGNED and LARGE — takes up 60% of viewport width
- Mascot occupies the right 40-50% — bleeds off screen
- NO side-by-side equal columns — it's an asymmetric split

### What "mascot as scene element" actually means on Merl
- The mascot FILLS the card entirely — the card background IS the character
- On the hero: character is so large it's partially off-screen, creating immersion
- The character is not placed IN the UI — the UI text is placed BESIDE the character's world
- Agent cards: full-bleed character image fills the card, text overlays at bottom

### Color system
- Background: warm cream (#f5ede0 / #faf3e8)
- Accent: orange (#f5a623) and red (#e84c3d)
- Text: near-black (#1a1a1a)
- Card backgrounds: varied (purple, orange, dark green, cream)

### Typography
- Headlines: massive, condensed, heavy weight — Neue Haas Grotesk Display or similar
- Very large font sizes — hero headline is ~80-100px
- Mixed color highlights on key words (orange, red)
- Body: smaller, lighter weight

### Section structure
1. Hero: text left, massive mascot right (bleeds off edge)
2. Agent grid: masonry-style cards, each card IS the agent's scene
3. Comparison section: dark background, tabbed interface
4. Pricing: clean cards
5. FAQ: accordion
6. Final CTA: full-width orange background, mascot floating with app screenshots
7. Footer: dark

## What this means for Continuary

The user wants Wren to feel like Merl's mascot — not a video in a box, but:
1. MASSIVE presence — Wren should be so large she bleeds off the edge
2. Each section: Wren fills the section visually, text is placed IN her world
3. The video background approach IS correct for sections where Wren is the environment
4. For the hero: Wren should be enormous, right-side, partially off-screen
5. The dark navy background of the video BECOMES the section background — no mismatch

## Architecture decision
- Use dark navy (#080f26) as the global background — matches Wren's video background exactly
- This eliminates the "box" entirely because the video bg color = page bg color
- Wren's video fills a large portion of the viewport, positioned to bleed off edges
- Text floats in the remaining space with no competing background
- For full-bleed sections: video fills 100vw/100vh with text overlay
- For split sections: video fills 55-60% of width, bleeds off the right edge
