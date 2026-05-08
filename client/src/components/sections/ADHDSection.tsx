/**
 * ADHDSection — Section 6
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Text RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 *
 * Message: "Built for the way you actually think"
 * Wren: concentration — eyes closed, focused, present
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ADHDSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="adhd"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Amber glow — left side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.09) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — left half of viewport, full height. Flipped so Wren faces right. */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.premium3d} glow={true} objectPosition="center center" />
      </div>

      {/* TEXT — right side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginLeft: "auto", maxWidth: "480px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>For the creative brain</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            Built for the way
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>you actually think.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            ADHD, anxiety, creative chaos — Continuary was designed for minds that don't work in straight lines. No rigid templates. No daily minimums. Just a space that bends to your rhythm, not the other way around.
          </p>

          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Flexible entry formats", desc: "Text, voice, image, emoji. Whatever you have energy for." },
              { label: "No minimum viable entry", desc: "One word counts. One sentence counts. Showing up counts." },
              { label: "Gentle nudges, not alarms", desc: "Wren checks in. She doesn't demand. She invites." },
              { label: "Context on return", desc: "Can't remember where you were? Wren does." },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ color: "#e8a030", fontSize: "0.6875rem", marginTop: "0.35rem", flexShrink: 0 }}>✦</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "#f0e8d8", marginBottom: "0.2rem" }}>{label}</div>
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
