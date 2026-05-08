/**
 * ThreadStrength — "Not productivity. Continuity."
 * Design: Centered hero visual (animated bar gauge at 74%), three tier cards below.
 * Inserted AFTER ReEntry ("She remembers everything"), BEFORE Stats section.
 * No Wren — metric visualization, not a character moment.
 */

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tiers = [
  {
    name: "Gathering",
    range: "0 – 25",
    description: "Just starting, or returning after a long gap.",
    active: false,
  },
  {
    name: "Weaving",
    range: "26 – 75",
    description: "Building rhythm, consistent check-ins.",
    active: true, // 74 falls here
  },
  {
    name: "Holding",
    range: "76 – 100",
    description: "Deep continuity, strong thread.",
    active: false,
  },
];

function ThreadStrengthBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
          // Count up from 0 to 74 over 1800ms
          const target = 74;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="w-full max-w-2xl mx-auto mb-14">
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-sm text-white/50 tracking-wide">
          Your Thread Strength
        </span>
        <span className="font-serif text-3xl text-amber-300 font-normal">{count}</span>
      </div>

      {/* Bar track */}
      <div className="relative h-3 w-full rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-[1800ms] ease-out"
          style={{
            width: filled ? "74%" : "0%",
            background: "linear-gradient(90deg, #b45309 0%, #f59e0b 60%, #fcd34d 100%)",
            boxShadow: filled ? "0 0 12px rgba(245,158,11,0.5)" : "none",
          }}
        />
      </div>

      {/* Status label */}
      <p className="mt-3 font-sans text-sm text-amber-400/80 italic">
        Weaving — strong momentum, consistent returns
      </p>
    </div>
  );
}

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
            Thread Strength doesn't measure how much you did. It measures how consistently you've stayed connected to your work — and how well you've returned after gaps.
          </p>
        </div>

        {/* Animated bar gauge */}
        <div
          className="reveal-child"
          style={{ transitionDelay: "200ms" }}
        >
          <ThreadStrengthBar />
        </div>

        {/* Three tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`reveal-child rounded-2xl border p-8 text-center transition-all duration-300 ${
                tier.active
                  ? "border-amber-400/40 bg-amber-400/[0.06]"
                  : "border-white/8 bg-white/[0.02]"
              }`}
              style={{ transitionDelay: `${280 + i * 80}ms` }}
            >
              <h3
                className={`font-serif text-3xl md:text-4xl mb-2 ${
                  tier.active ? "text-white" : "text-white/60"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`font-sans text-sm tracking-widest mb-4 ${
                  tier.active ? "text-amber-400" : "text-white/30"
                }`}
              >
                {tier.range}
              </p>
              <p
                className={`font-sans text-sm leading-relaxed ${
                  tier.active ? "text-white/65" : "text-white/35"
                }`}
              >
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="reveal-child text-center font-sans text-lg italic text-white/55 max-w-lg mx-auto"
          style={{ transitionDelay: "530ms" }}
        >
          Most members live in Weaving. Holding is rare. Both are honored.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
