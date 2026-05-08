/**
 * NothingBroken — Section 2
 *
 * MERL-STYLE: Wren is absolutely positioned LEFT side, massive, bleeds off left edge.
 * Text sits RIGHT. Alternating direction from Hero.
 * Background: #080f26 — Wren's world. No box.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
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
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "55vw",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <WrenVideo
          src={WREN_VIDEOS.premium3d}
          glow={true}
          objectPosition="center center"
          fadeDir="left"
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
            You don't need another app that judges your streaks. You need a place that holds your story without conditions — one that shows up the same whether you journaled every day this week or haven't opened it in three.
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
            Continuary doesn't track your consistency. It tracks your continuity — the thread that runs through all of it, even the gaps.
          </p>

          <div className="reveal reveal-delay-4" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "No streaks. No shame. No score." },
              { label: "Pick up exactly where you left off." },
              { label: "Wren remembers even when you forget." },
            ].map(({ label }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <span style={{ color: "#e8a030", fontSize: "0.6875rem", marginTop: "0.35rem", flexShrink: 0 }}>✦</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(240,232,216,0.85)", lineHeight: 1.6 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
