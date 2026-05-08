/**
 * EvidenceLog — Section 4
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Text RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const ENTRIES = [
  { date: "Tuesday, 3:42pm", text: "Finished the chapter. Didn't think I would. Wren reminded me I said the same thing last month." },
  { date: "Friday, 8:11am", text: "Mood: 6/10. Tired but okay. The coffee helped. The quiet helped more." },
  { date: "Sunday, 9:55pm", text: "Grateful for: the call with Mom, the rain, finishing something small." },
];

export default function EvidenceLog() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="evidence"
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
        <WrenVideo src={WREN_VIDEOS.fliesHome} glow={true} flip={true} />
      </div>

      {/* TEXT — right side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginLeft: "auto", maxWidth: "480px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>Your evidence log</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            The record
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>that holds.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            On the days you feel like you've done nothing, Continuary shows you the receipts. The small wins. The hard moments you showed up for anyway. The ideas you caught before they vanished.
          </p>

          {/* Mock journal entries */}
          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
            {ENTRIES.map(({ date, text }) => (
              <div
                key={date}
                style={{
                  background: "rgba(17,28,66,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "2px solid rgba(232,160,48,0.4)",
                  borderRadius: "0 0.75rem 0.75rem 0",
                  padding: "1.125rem 1.375rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,160,48,0.7)", marginBottom: "0.5rem" }}>{date}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(240,232,216,0.85)", lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="reveal reveal-delay-4" style={{ display: "flex", gap: "3rem" }}>
            {[
              { num: "3", label: "captures per day, avg." },
              { num: "94%", label: "feel more grounded after 30 days" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", fontWeight: 700, color: "#e8a030", lineHeight: 1, marginBottom: "0.375rem" }}>{num}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(168,180,204,0.7)", lineHeight: 1.4, maxWidth: "100px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
