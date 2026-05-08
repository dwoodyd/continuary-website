/**
 * Rituals — Section 3
 *
 * MERL-STYLE: Wren RIGHT side, massive, bleeds off right edge.
 * Text LEFT. Alternating from Section 2.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
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
      }}
    >
      {/* Amber glow — right side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.09) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

            {/* WREN — right half of viewport, full height. */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.chirping} glow={true} objectPosition="25% center" fadeDir="right" />
      </div>

      {/* TEXT — left side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "500px" }}>
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
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            Not because you're more disciplined. Because Wren makes it genuinely easy to show up — even on the hard days.
          </p>

          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {RITUALS.map(({ name, desc }) => (
              <div
                key={name}
                style={{
                  background: "rgba(17,28,66,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.75rem",
                  padding: "1.125rem 1.375rem",
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,160,48,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e8a030", marginTop: "0.45rem", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "#f0e8d8", marginBottom: "0.25rem" }}>{name}</div>
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
