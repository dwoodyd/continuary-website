/**
 * NothingBroken — Section 2
 *
 * MERL-STYLE: Wren is absolutely positioned LEFT side, massive, bleeds off left edge.
 * Text sits RIGHT. Alternating direction from Hero.
 * Background: #080f26 — Wren's world. No box.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function NothingBroken() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Amber glow — left side, behind Wren */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          width: "60vw",
          height: "80vh",
          background: "radial-gradient(ellipse at center, rgba(232,160,48,0.09) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* WREN — left half of viewport, full height. Flipped so Wren faces right. */}
      <div
        id="nothing-broken-wren"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "55vw",
          height: "100%",
          pointerEvents: "auto",
          overflow: "hidden",
        }}
      >
        <WrenVideo
          src={WREN_VIDEOS.premium3d}
          glow={true}
          objectPosition="center center"
          fadeDir="left"
          poster={WREN_STILLS.lookingDown}
          posterAlt="Wren looking down thoughtfully in a warm amber glow."
        />
      </div>

      {/* TEXT — right side */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div style={{ marginLeft: "auto", maxWidth: "480px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>The honest truth</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#f0e8d8",
              marginBottom: "1.5rem",
            }}
          >
            Nothing broken here.
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>Just a gap.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75,
              color: "rgba(168,180,204,0.9)",
              marginBottom: "1.5rem",
            }}
          >
            You don&apos;t need another system you can fail. You need a place that holds your story without conditions — one that meets you the same way whether you return tomorrow or after a long gap.
          </p>

          <p
            className="reveal reveal-delay-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75,
              color: "rgba(168,180,204,0.9)",
              marginBottom: "2.5rem",
            }}
          >
            Continuary keeps the thread through the gaps. Each intention you turn into action becomes evidence that you can return, begin again, and keep going at the size today allows.
          </p>

          <div className="reveal reveal-delay-4" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "No pass/fail state. Your return still counts." },
              { label: "Pick up exactly where you left off." },
              { label: "Small completions become evidence you can trust." },
              { label: "And when you're ready to work, she's there — reading, writing, weaving — while you do." },
            ].map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <span style={{ color: "#e8a030", fontSize: "0.6875rem", marginTop: "0.35rem", flexShrink: 0 }}>✦</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(240,232,216,0.85)", lineHeight: 1.6 }}>{label}</span>
              </div>
            ))}
          </div>

          {/* You & Wren relationship beat */}
          <div className="reveal reveal-delay-5" style={{
            marginTop: "2rem",
            background: "rgba(17,28,66,0.5)",
            border: "1px solid rgba(232,160,48,0.2)",
            borderRadius: "0.875rem",
            padding: "1.25rem 1.5rem",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,160,48,0.7)", marginBottom: "0.625rem" }}>You &amp; Wren</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(168,180,204,0.85)", lineHeight: 1.7, margin: 0 }}>
              Wren isn't a chatbot. She's your memory companion — she learns your voice, holds your history, and meets you where you are. The longer you use Continuary, the more she understands what you actually mean.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #nothing-broken-wren {
            display: none !important;
          }
          #how-it-works .container > div {
            margin-left: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
