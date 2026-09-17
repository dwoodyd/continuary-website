/**
 * RoadmapTeaser — "What's coming"
 *
 * Two time-horizon groups: Next 4 weeks / Later this year.
 * Only verified, genuinely upcoming features are shown.
 * Removed: Threshold Diagnosis (shipped), Idea Sanctuary (= Scratch Pad, shipped),
 *           Project Memory (= Projects, shipped), Distraction Insights (= Intelligence, shipped),
 *           Study Mode (not in any spec).
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Horizon = {
  label: string;
  items: { name: string; desc: string; tier?: string }[];
};

const HORIZONS: Horizon[] = [
  {
    label: "In Development · Next 4 Weeks",
    items: [
      {
        name: "Focus Sessions — book ahead",
        desc: "Schedule a session with Wren like an appointment. She'll be there when the time comes.",
        tier: "Pro",
      },
    ],
  },
  {
    label: "On the Roadmap · Later This Year",
    items: [
      {
        name: "Studios — Wren-hosted group focus sessions",
        desc: "Small group (3–8 people) work alongside Wren. She narrates the collective work at close.",
        tier: "Keeper",
      },
      {
        name: "Wren Voice Check-ins",
        desc: "Speak your check-in instead of typing. Wren transcribes, extracts the signal, and files it.",
        tier: "Keeper",
      },
    ],
  },
];

const TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  "Free+": {
    bg: "rgba(100,116,139,0.15)",
    text: "rgba(168,180,204,0.8)",
    border: "rgba(100,116,139,0.25)",
  },
  Pro: {
    bg: "rgba(59,130,246,0.12)",
    text: "#93c5fd",
    border: "rgba(59,130,246,0.25)",
  },
  Keeper: {
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
            Founding members shape what ships next. Here's what's already on the calendar — your feedback during beta determines order and depth.
          </p>
        </div>

        {/* Verified upcoming feature groups */}
        <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {HORIZONS.map(({ label, items }) => (
            <div key={label}>
              {/* Horizon label */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(232,160,48,0.6)",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {label}
              </div>

              {/* Items in this horizon */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "0.875rem",
                }}
              >
                {items.map(({ name, desc, tier }) => {
                  const tierStyle = tier ? TIER_STYLES[tier] : null;
                  return (
                    <div
                      key={name}
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.875rem",
                        padding: "1.25rem 1.375rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.625rem",
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
                      {/* Feature name + tier badge */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "#f0e8d8",
                            lineHeight: 1.35,
                            flex: 1,
                          }}
                        >
                          ✦ {name}
                        </div>
                        {tier && tierStyle && (
                          <span
                            style={{
                              fontSize: "0.625rem",
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              padding: "0.2rem 0.5rem",
                              borderRadius: "999px",
                              background: tierStyle.bg,
                              color: tierStyle.text,
                              border: `1px solid ${tierStyle.border}`,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              marginTop: "0.1rem",
                            }}
                          >
                            {tier}
                          </span>
                        )}
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
            </div>
          ))}
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
            href="https://app.continuary.app/apply"
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
            Claim a founding seat
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
