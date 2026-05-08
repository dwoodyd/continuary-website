/**
 * ReEntry — Section 5
 *
 * MERL-STYLE: Wren RIGHT side, massive, bleeds off right edge.
 * Text LEFT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ReEntry() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="re-entry"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Amber glow — right side, brighter for the sparkle moment */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.12) 0%, rgba(232,160,48,0.04) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — right half of viewport, full height. */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.concentration} glow={true} objectPosition="50% center" />
      </div>

      {/* TEXT — left side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "500px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>The return</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            She remembers
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>everything.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "1.5rem",
            }}
          >
            When you come back after a week, a month, or longer — Wren doesn't ask where you've been. She just shows you where you left off, what you were feeling, and what you said you wanted to do next.
          </p>

          <p
            className="reveal reveal-delay-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            The re-entry is gentle. The context is preserved. The story continues.
          </p>

          <div className="reveal reveal-delay-4" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { step: "01", label: "Wren greets you back", desc: "A warm, non-judgmental welcome. No streak broken. No shame." },
              { step: "02", label: "Your last thread", desc: "She shows you exactly where you left off — mood, entry, intention." },
              { step: "03", label: "One small step", desc: "She asks one gentle question to ease you back in." },
            ].map(({ step, label, desc }) => (
              <div key={step} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.875rem", fontWeight: 700, color: "rgba(232,160,48,0.5)", letterSpacing: "0.05em", marginTop: "0.1rem", flexShrink: 0, width: "2rem" }}>{step}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "#f0e8d8", marginBottom: "0.25rem" }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(168,180,204,0.8)", lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
