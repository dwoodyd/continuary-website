/**
 * ProblemSection — "The thread breaks quietly."
 * Design: Dark navy, 2×2 card grid, amber accent icons (SVG monoline), McKinsey stat below.
 * Inserted AFTER Hero, BEFORE NothingBroken.
 * No Wren in this section — problem frame, not character moment.
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <path d="M8 22 L16 10 L24 22" />
        <line x1="12" y1="18" x2="20" y2="18" />
        <line x1="16" y1="22" x2="16" y2="28" />
      </svg>
    ),
    headline: "Restart Tax",
    body: "Every time you step away and come back, you pay a hidden tax — 20 to 40 minutes just to remember where you were. It compounds silently across every project.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <circle cx="16" cy="16" r="7" />
        <path d="M16 9 L16 6 M16 26 L16 23 M9 16 L6 16 M26 16 L23 16" strokeDasharray="1 2" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
    headline: "Burst Penalty",
    body: "ADHD, creative work, and life don't run on schedules. When your energy finally arrives, you lose the first hour just trying to re-enter the work — and the burst is gone.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <rect x="6" y="8" width="20" height="14" rx="2" />
        <line x1="6" y1="13" x2="26" y2="13" strokeDasharray="2 2" />
        <line x1="6" y1="18" x2="26" y2="18" strokeDasharray="2 2" />
        <line x1="13" y1="8" x2="13" y2="22" strokeDasharray="2 2" />
      </svg>
    ),
    headline: "Open Tab Spiral",
    body: "Forty browser tabs. Three half-finished notes. A voice memo you'll never find. Good ideas don't disappear — they just get buried under the weight of everything else.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <rect x="8" y="6" width="16" height="20" rx="2" />
        <line x1="12" y1="12" x2="20" y2="12" />
        <line x1="12" y1="16" x2="20" y2="16" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1="12" y1="20" x2="16" y2="20" strokeDasharray="2 2" strokeOpacity="0.3" />
      </svg>
    ),
    headline: "Lost Week",
    body: "Sunday night and you can't account for the week. You were busy — but doing what? The effort was real. The record isn't. That gap is where momentum goes to die.",
  },
];

export default function ProblemSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal-section relative w-full bg-[#080f26] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 reveal-child" style={{ transitionDelay: "0ms" }}>
          <p className="text-amber-400 text-xs tracking-[0.25em] uppercase font-sans mb-4">
            Why This Exists
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            The thread breaks
            <br />
            <em className="text-amber-200/90">quietly.</em>
          </h2>
          <p className="font-sans text-white/60 text-lg max-w-xl leading-relaxed">
            Most productivity apps are built for the days you show up. Continuary was built for everything that happens between them.
          </p>
        </div>

        {/* 2×2 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
          {cards.map((card, i) => (
            <div
              key={card.headline}
              className="reveal-child group relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-amber-400/30 hover:bg-white/[0.05] transition-all duration-500"
              style={{ transitionDelay: `${100 + i * 80}ms` }}
            >
              {/* Icon */}
              <div className="mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {card.icon}
              </div>
              {/* Headline */}
              <h3 className="font-serif text-xl md:text-2xl text-white mb-3">
                {card.headline}
              </h3>
              {/* Body */}
              <p className="font-sans text-white/55 text-base leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* McKinsey stat — quiet citation */}
        <p
          className="reveal-child text-center font-sans text-sm italic text-white/35 max-w-md mx-auto"
          style={{ transitionDelay: "420ms" }}
        >
          Knowledge workers lose 28% of their week to context-switching. (McKinsey)
        </p>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
