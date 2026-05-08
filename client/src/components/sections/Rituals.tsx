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
  { name: "Morning Check-in", desc: "Three questions. Two minutes. One anchor before the day takes over." },
  { name: "Capture Anything", desc: "Voice note, photo, a single sentence. Wren holds it all without judgment." },
  { name: "Evening Reflection", desc: "What happened. What mattered. What you want to carry forward." },
  { name: "Weekly Thread", desc: "Wren weaves your week into a single thread you can actually read." },
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
        </div>
      </div>
    </section>
  );
}
