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
        <line x1="8" y1="16" x2="24" y2="16" />
        <line x1="16" y1="8" x2="16" y2="24" strokeDasharray="2 3" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    headline: "You step away",
    body: "Life happens. A meeting runs long. A family emergency. A bad week. You leave your work mid-thought.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <circle cx="16" cy="16" r="8" strokeDasharray="3 3" />
        <path d="M12 12 L20 20 M20 12 L12 20" strokeDasharray="2 2" />
      </svg>
    ),
    headline: "Context evaporates",
    body: "When you return, the thread is gone. You spend 40 minutes reconstructing what you were doing instead of doing it.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <path d="M8 20 Q12 8 16 16 Q20 24 24 12" />
        <polyline points="20,8 24,12 20,16" />
      </svg>
    ),
    headline: "The restart tax",
    body: "Every interruption costs more than the time lost. The cognitive overhead of re-entry compounds across weeks and months.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-amber-400">
        <polyline points="6,10 12,18 18,14 26,22" />
        <line x1="6" y1="26" x2="26" y2="26" strokeOpacity="0.4" />
      </svg>
    ),
    headline: "Momentum breaks",
    body: "Projects stall. Ideas go cold. The gap between who you are and what you're building quietly widens.",
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
