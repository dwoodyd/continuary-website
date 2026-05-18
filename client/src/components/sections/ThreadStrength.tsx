/**
 * ThreadStrength — "Not productivity. Continuity."
 * Design: Three qualitative state cards with Wren-voiced descriptions.
 * No numerical score, no progress bar — per voice doctrine: "She remembers, doesn't measure."
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const states = [
  {
    name: "Gathering",
    wren: "You're here. That's the whole thing.",
    description: "Just starting, or coming back after time away.",
    active: false,
  },
  {
    name: "Weaving",
    wren: "You're finding the cadence. The thread is alive.",
    description: "Building rhythm, consistent returns.",
    active: true,
  },
  {
    name: "Holding",
    wren: "You've been with this for a while. Let it carry.",
    description: "Deep continuity, the thread is taut.",
    active: false,
  },
];

export default function ThreadStrength() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal-section relative w-full bg-[#080f26] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="reveal-child text-amber-400 text-xs tracking-[0.25em] uppercase font-sans mb-4"
            style={{ transitionDelay: "0ms" }}
          >
            The Metric That Matters
          </p>
          <h2
            className="reveal-child font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            style={{ transitionDelay: "60ms" }}
          >
            Not productivity.
            <br />
            <em className="text-amber-200/90">Continuity.</em>
          </h2>
          <p
            className="reveal-child font-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Thread Strength isn't a score. It's a read on where you are in your relationship with your work — and Wren names it in plain language, not digits.
          </p>
        </div>

        {/* Three qualitative state cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {states.map((state, i) => (
            <div
              key={state.name}
              className={`reveal-child rounded-2xl border p-8 text-center transition-all duration-300 ${
                state.active
                  ? "border-amber-400/40 bg-amber-400/[0.06]"
                  : "border-white/8 bg-white/[0.02]"
              }`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <h3
                className={`font-serif text-3xl md:text-4xl mb-4 ${
                  state.active ? "text-white" : "text-white/60"
                }`}
              >
                {state.name}
              </h3>
              <p
                className={`font-sans text-sm leading-relaxed mb-4 ${
                  state.active ? "text-white/65" : "text-white/35"
                }`}
              >
                {state.description}
              </p>
              {/* Wren-voiced quote */}
              <p
                className={`font-sans text-sm italic leading-relaxed ${
                  state.active ? "text-amber-300/80" : "text-white/25"
                }`}
              >
                "{state.wren}" — Wren
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="reveal-child text-center font-sans text-lg italic text-white/55 max-w-lg mx-auto"
          style={{ transitionDelay: "460ms" }}
        >
          Wren reads your thread state and names it. You'll never see a number.
        </p>

        <p
          className="reveal-child text-center font-sans text-sm text-white/35 max-w-lg mx-auto mt-4"
          style={{ transitionDelay: "520ms" }}
        >
          Most members live in Weaving. Holding is rare. Both are honored.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
