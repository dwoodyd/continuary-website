/**
 * ThreadStrength — "Evidence, not evaluation."
 * Design: Three qualitative ways continuity can be experienced.
 * No numerical score, no progress bar — the record exists to support self-trust.
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const states = [
  {
    name: "Return",
    wren: "You’re here. Begin at the size today allows.",
    description: "Coming back starts with one small, reachable action.",
    active: false,
  },
  {
    name: "Action",
    wren: "You turned one intention into one action. Keep that evidence.",
    description: "A small completion is still a real deposit in self-trust.",
    active: true,
  },
  {
    name: "Record",
    wren: "Your thread remembers where you can continue.",
    description: "Your notes hold the context so a gap never requires a rebuild.",
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
            Evidence, not evaluation
          </p>
          <h2
            className="reveal-child font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            style={{ transitionDelay: "60ms" }}
          >
            Not a score.
            <br />
            <em className="text-amber-200/90">A record you can trust.</em>
          </h2>
          <p
            className="reveal-child font-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Continuary preserves the intentions you turn into action. The point is not to measure you; it is to leave you real evidence that you can come back, choose one thing, and move it.
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
          Wren helps you find the next reachable move. No number decides whether you are doing well.
        </p>

        <p
          className="reveal-child text-center font-sans text-sm text-white/35 max-w-lg mx-auto mt-4"
          style={{ transitionDelay: "520ms" }}
        >
          Every return is useful evidence. The thread does not disappear when life gets loud.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
