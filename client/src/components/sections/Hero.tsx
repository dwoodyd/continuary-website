/**
 * Hero — Section 1
 * Layout: Full-viewport dark navy. Wren floats right (60% width), copy left.
 * Wren video: Bird_floating_through_air (ambient idle loop)
 * Headline: "Your story, kept."
 * Sub: "Continuary is the quiet companion that remembers what matters..."
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, oklch(0.14 0.05 258) 0%, oklch(0.18 0.04 252) 50%, oklch(0.16 0.04 255) 100%)",
        paddingTop: "5rem",
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "3rem",
            minHeight: "80vh",
          }}
        >
          {/* Left — Copy */}
          <div style={{ paddingRight: "2rem" }}>
            <div className="eyebrow reveal" style={{ marginBottom: "1.25rem" }}>
              Silicon Wren · Your memory companion
            </div>

            <h1
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 5vw, 5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "oklch(0.96 0.02 80)",
                marginBottom: "1.5rem",
              }}
            >
              Your story,
              <br />
              <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>kept.</em>
            </h1>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.125rem",
                lineHeight: 1.7,
                color: "oklch(0.75 0.02 80)",
                maxWidth: "480px",
                marginBottom: "2.5rem",
              }}
            >
              Continuary is the quiet companion that remembers what matters —
              your rituals, your wins, your almost-moments — so nothing important
              gets lost between the days.
            </p>

            {/* Trust chips */}
            <div
              className="reveal reveal-delay-3"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "2.5rem" }}
            >
              {["No shame spirals", "ADHD-friendly", "Built for real life"].map((chip) => (
                <span key={chip} className="trust-chip">{chip}</span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="reveal reveal-delay-4"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a href="#pricing" className="btn-amber">
                Start Free — No credit card
              </a>
              <a href="#how-it-works" className="btn-ghost">
                See how it works
              </a>
            </div>
          </div>

          {/* Right — Wren */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <WrenVideo
              src={WREN_VIDEOS.floating}
              poster={WREN_STILLS.neutral}
              className="float-anim"
              style={{
                width: "min(520px, 100%)",
                aspectRatio: "1",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", color: "oklch(0.75 0.02 80)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "2.5rem", background: "linear-gradient(to bottom, oklch(0.75 0.02 80), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero > .container > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero > .container > div > div:first-child {
            padding-right: 0 !important;
            order: 2;
          }
          #hero > .container > div > div:last-child {
            order: 1;
          }
          #hero .reveal { display: flex; flex-direction: column; align-items: center; }
        }
      `}</style>
    </section>
  );
}
