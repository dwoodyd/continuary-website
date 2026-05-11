/**
 * RoadmapTeaser — "What's coming"
 *
 * A compact, centered section between AppScreensSection and FoundingMember.
 * Shows upcoming features as "In development" chips with a short description.
 * Designed to reinforce that the product is actively being built and give
 * Keeper-tier applicants a reason to choose the higher tier.
 *
 * Background: #060d1f — slightly darker than the rest to create a visual break.
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const UPCOMING = [
  {
    name: "Threshold Diagnosis",
    tier: "Keeper",
    desc: "A structured self-assessment that maps your personal patterns — when you work best, what derails you, and how to design around both.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      </svg>
    ),
  },
  {
    name: "Idea Sanctuary",
    tier: "Pro",
    desc: "A frictionless capture layer for half-formed thoughts, voice notes, and fleeting ideas — surfaced back to you when they're relevant.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: "Study Mode",
    tier: "Keeper",
    desc: "Deep-work sessions with Pomodoro-style Focus Blocks, ambient soundscapes, and a distraction log that shows you exactly where your attention went.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    name: "Project Memory",
    tier: "Pro",
    desc: "Every project keeps a living log of decisions, context, and open threads — so re-entry takes seconds, not an hour of archaeology.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
      </svg>
    ),
  },
  {
    name: "Distraction Insights",
    tier: "Pro",
    desc: "Weekly patterns showing when you lose focus, what triggers it, and how your attention compares week-over-week — without the shame spiral.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    name: "Wren Voice Check-ins",
    tier: "Keeper",
    desc: "Speak your check-in instead of typing it. Wren transcribes, extracts the signal, and files it — so the ritual fits wherever you are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
      </svg>
    ),
  },
];

const TIER_STYLES: Record<string, { label: string; bg: string; text: string; border: string }> = {
  Pro: {
    label: "Pro",
    bg: "rgba(59,130,246,0.12)",
    text: "#93c5fd",
    border: "rgba(59,130,246,0.25)",
  },
  Keeper: {
    label: "Keeper",
    bg: "rgba(232,160,48,0.12)",
    text: "#fbbf24",
    border: "rgba(232,160,48,0.3)",
  },
};

export default function RoadmapTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      style={{
        background: "#060d1f",
        padding: "6rem 0 7rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top border accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(232,160,48,0.2), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "50vw",
          maxWidth: "800px",
          maxHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1rem" }}>What's coming</div>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.25rem, 4vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#f0e8d8",
              marginBottom: "1rem",
            }}
          >
            The product is
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>actively being built.</em>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
              lineHeight: 1.7,
              color: "rgba(168,180,204,0.7)",
              maxWidth: "560px",
            }}
          >
            Founding members shape what ships next. These features are in active development — your feedback during beta determines the order and depth of each one.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className="reveal reveal-delay-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {UPCOMING.map(({ name, tier, desc, icon }) => {
            const tierStyle = TIER_STYLES[tier];
            return (
              <div
                key={name}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.875rem",
                  padding: "1.375rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                }}
              >
                {/* Top row: icon + badges */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(168,180,204,0.8)",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {/* In development badge */}
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(168,180,204,0.6)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      In development
                    </span>
                    {/* Tier badge */}
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        background: tierStyle.bg,
                        color: tierStyle.text,
                        border: `1px solid ${tierStyle.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tierStyle.label}
                    </span>
                  </div>
                </div>

                {/* Feature name */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#f0e8d8",
                    lineHeight: 1.3,
                  }}
                >
                  {name}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(168,180,204,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <div
          className="reveal reveal-delay-4"
          style={{
            marginTop: "3rem",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9375rem",
            color: "rgba(168,180,204,0.5)",
            lineHeight: 1.7,
          }}
        >
          Founding members vote on priority.{" "}
          <a
            href="https://app.continuary.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#e8a030",
              textDecoration: "none",
              borderBottom: "1px solid rgba(232,160,48,0.35)",
              paddingBottom: "1px",
              transition: "border-color 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,160,48,0.8)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,160,48,0.35)")}
          >
            Apply for a founding seat
          </a>{" "}
          to help shape what ships first.
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)",
        }}
      />

      <style>{`
        @media (max-width: 640px) {
          #roadmap { padding: 4rem 0 5rem !important; }
        }
      `}</style>
    </section>
  );
}
