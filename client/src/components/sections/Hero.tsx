/**
 * Hero — Section 1
 *
 * MERL-STYLE ARCHITECTURE:
 * - Background: #080f26 — matches Wren's video bg exactly → zero box visible
 * - Wren is ABSOLUTELY POSITIONED, right side, massive (58vw), bleeds off edge
 * - Text is LEFT-ALIGNED, takes up left 45% of viewport
 * - No grid columns — Wren is a scene element, not a layout element
 * - Amber radial glow anchors Wren to the space
 *
 * MOBILE:
 * - Wren shrinks to 80vw, anchors bottom-right at 50% opacity (decorative)
 * - Text takes full width, headline + CTAs are immediately above the fold
 */

import { useEffect, useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { trpc } from "../../lib/trpc";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const { data: slotCounts } = trpc.applications.slotCounts.useQuery(undefined, { refetchInterval: 60_000 });
  const claimed = slotCounts ? 100 - slotCounts.remaining : 37;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const children = el.querySelectorAll<HTMLElement>("[data-reveal]");
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      setTimeout(() => {
        child.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, 180 + i * 110);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Amber atmospheric glow — right side, behind Wren */}
      <div
        aria-hidden
        className="hero-glow"
        style={{
          position: "absolute",
          top: "50%",
          right: "-5%",
          transform: "translateY(-50%)",
          width: "65vw",
          height: "80vh",
          background: "radial-gradient(ellipse at center, rgba(232,160,48,0.10) 0%, rgba(232,160,48,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* WREN — right half of viewport, full height. objectFit:cover crops to Wren's body. */}
      <div
        id="hero-wren-container"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "58vw",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <WrenVideo
          src={WREN_VIDEOS.luminousFloats}
          glow={true}
          objectPosition="40% center"
          fadeDir="right"
          poster={WREN_STILLS.neutral}
        />
      </div>

      {/* TEXT — left side, in front of glow */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div id="hero-text" ref={textRef} style={{ maxWidth: "500px" }}>
          <div
            data-reveal
            className="eyebrow"
            style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--amber)", opacity: 0.5 }} />
            Silicon Wren · Your memory companion
          </div>

          <h1
            data-reveal
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#f0e8d8",
              marginBottom: "0.2rem",
            }}
          >
            Your story,
          </h1>
          <h1
            data-reveal
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 7.5rem)",
              fontWeight: 700,
              fontStyle: "italic",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#e8a030",
              marginBottom: "2.25rem",
            }}
          >
            kept.
          </h1>

          <p
            data-reveal
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.9375rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75,
              color: "rgba(168,180,204,0.9)",
              maxWidth: "400px",
              marginBottom: "2.5rem",
            }}
          >
            Continuary is the quiet companion that remembers what matters — your rituals, your wins, your almost-moments — so nothing important gets lost between the days.
          </p>

          <div data-reveal style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a href="https://app.continuary.app/apply" className="btn-amber" target="_blank" rel="noopener noreferrer">Apply for a slot</a>
            <a href="#how-it-works" className="btn-ghost">See how it works</a>
          </div>

          {/* Closed beta pill — sets expectation before trust chips */}
          <div
            data-reveal
            style={{
              marginBottom: "1.25rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontStyle: "italic",
              color: "rgba(232,160,48,0.65)",
              whiteSpace: "normal",
            }}
          >
            In Closed Beta · {claimed} of 100 founding member slots claimed
          </div>

          <div data-reveal style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {["No shame spirals", "ADHD & anxiety friendly", "Built for real life"].map((label) => (
              <span key={label} className="chip">{label}</span>
            ))}
          </div>

          {/* PWA clarity line */}
          <p
            data-reveal
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "rgba(168,180,204,0.55)",
              maxWidth: "380px",
              margin: 0,
            }}
          >
            A daily thread — in your pocket or on the web. Install on iOS, Android, or open in any browser.
          </p>

          {/* Focus Sessions "what's new" tagline — retire after launch month */}
          <div
            data-reveal
            style={{
              marginTop: "1.75rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9375rem",
              fontStyle: "italic",
              color: "rgba(232,160,48,0.8)",
              letterSpacing: "0.01em",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ display: "inline-block", width: "16px", height: "1px", background: "rgba(232,160,48,0.5)", flexShrink: 0 }} />
            Now with Focus Sessions — Wren works alongside you.
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        opacity: 0.35, zIndex: 2,
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a8b4cc" }}>Scroll</span>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(168,180,204,0.6), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          /* Wren: shrink, anchor bottom-right, reduce opacity so text reads clearly */
          #hero-wren-container {
            width: 85vw !important;
            height: 50vh !important;
            top: auto !important;
            bottom: 0 !important;
            right: -15vw !important;
            opacity: 0.45;
          }
          /* Text: full width, tighter top padding so headline is above the fold */
          #hero-text {
            max-width: 100% !important;
          }
          .hero-glow {
            width: 100vw !important;
            right: -20% !important;
            bottom: 0 !important;
            top: auto !important;
            transform: none !important;
            height: 60vh !important;
          }
          /* CTAs: stack vertically on small screens */
          #hero-text > div[data-reveal] a {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          #hero-wren-container {
            width: 100vw !important;
            height: 45vh !important;
            right: -20vw !important;
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
}
