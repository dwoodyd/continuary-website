/**
 * Rituals — Section 3
 *
 * Single centered column — no Wren image or video.
 * The copy stands on its own. Clean, focused.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const RITUALS = [
  { name: "Morning check-in", desc: "Set your intention. Protect your focus. Prime the day." },
  { name: "Midday pulse", desc: "Two-minute alignment check. On plan? Any blockers?" },
  { name: "Evening close", desc: "Close the loop. Acknowledge what moved. Prepare tomorrow." },
  { name: "Weekly Compass", desc: "One clear direction for the week. Not a schedule — a compass." },
];

export default function Rituals() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="rituals"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,160,48,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Centered copy */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "6rem",
          paddingBottom: "6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", width: "100%" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>Daily practice</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            Rituals that
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>actually stick.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "3rem",
            }}
          >
            Not because you're more disciplined. Because Wren makes it genuinely easy to show up — even on the hard days.
          </p>

          <div
            className="reveal reveal-delay-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
              textAlign: "left",
            }}
          >
            {RITUALS.map(({ name, desc }) => (
              <div
                key={name}
                style={{
                  background: "rgba(17,28,66,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.75rem",
                  padding: "1.25rem 1.5rem",
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,160,48,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e8a030", marginTop: "0.5rem", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "#f0e8d8", marginBottom: "0.3rem" }}>{name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(168,180,204,0.8)", lineHeight: 1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Fifth pillar — Focus Sessions: wider hero-style block, slightly different visual weight */}
          <div
            id="focus-sessions"
            className="reveal reveal-delay-4"
            style={{ marginTop: "1.5rem", width: "100%", scrollMarginTop: "5rem" }}
          >
            <div
              style={{
                background: "rgba(232,160,48,0.06)",
                border: "1px solid rgba(232,160,48,0.18)",
                borderRadius: "1rem",
                padding: "1.75rem 2rem",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,160,48,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(232,160,48,0.18)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e8a030", flexShrink: 0 }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f0e8d8", letterSpacing: "0.01em" }}>Focus Sessions with Wren</div>
                <span style={{ marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,160,48,0.7)", background: "rgba(232,160,48,0.1)", border: "1px solid rgba(232,160,48,0.2)", borderRadius: "999px", padding: "0.2rem 0.625rem" }}>When you're ready to work</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(168,180,204,0.85)", lineHeight: 1.65, margin: 0 }}>
                When you're ready to work, Wren shows up too. Reading, writing, weaving — alongside you, not watching you. Book ahead or start one whenever the moment is right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
