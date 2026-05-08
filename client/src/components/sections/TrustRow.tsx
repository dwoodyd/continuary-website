/**
 * TrustRow — Section 9
 *
 * MERL-STYLE: Wren RIGHT side, massive, bleeds off right edge.
 * Testimonials LEFT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "I've tried every journaling app. Continuary is the first one that doesn't make me feel bad for being inconsistent.",
    name: "Marissa T.",
    role: "Graphic designer, ADHD",
    initials: "MT",
  },
  {
    quote: "Wren remembered things I forgot I wrote. That moment when you see your own pattern — it's something.",
    name: "Jordan K.",
    role: "Freelance writer",
    initials: "JK",
  },
  {
    quote: "The re-entry prompt after a hard week is the most thoughtful UX I've ever experienced in a productivity app.",
    name: "Priya S.",
    role: "Product manager",
    initials: "PS",
  },
  {
    quote: "I bought the book. Then I downloaded the app. Three months later I'm still here. That's never happened before.",
    name: "Marcus W.",
    role: "Creative director",
    initials: "MW",
  },
  {
    quote: "It's the only app where I actually feel like something is looking out for me — not tracking me.",
    name: "Leah F.",
    role: "Therapist & journaling advocate",
    initials: "LF",
  },
  {
    quote: "Wren doing a little dance when I hit 30 days? I cried. I'm not ashamed.",
    name: "Devon A.",
    role: "Artist",
    initials: "DA",
  },
];

const TRUST_CHIPS = [
  "ADHD-friendly",
  "No streak pressure",
  "Private & encrypted",
  "Works offline",
  "Cancel anytime",
  "Built by creatives",
];

export default function TrustRow() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="trust"
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
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.08) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — right half of viewport, full height. */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.sparkleWingsNew} glow={true} objectPosition="center center" />
      </div>
      {/* TESTIMONIALS — left side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "500px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>What people are saying</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "2.5rem",
            }}
          >
            They came back.
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>That's the point.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {TESTIMONIALS.slice(0, 4).map(({ quote, name, role, initials }, i) => (
              <div
                key={name}
                className={`reveal reveal-delay-${Math.min(i + 2, 4)}`}
                style={{
                  background: "rgba(17,28,66,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  color: "rgba(240,232,216,0.85)",
                  marginBottom: "1rem",
                }}>
                  "{quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "50%",
                    background: "rgba(232,160,48,0.15)",
                    border: "1px solid rgba(232,160,48,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem",
                    fontWeight: 700, color: "#e8a030", flexShrink: 0,
                  }}>{initials}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#f0e8d8" }}>{name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(168,180,204,0.6)" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust chips */}
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "2rem" }}>
            {TRUST_CHIPS.map((chip) => (
              <span key={chip} className="trust-chip">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
