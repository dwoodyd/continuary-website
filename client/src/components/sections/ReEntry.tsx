/**
 * ReEntry — Section 5
 * "The return is the practice."
 * Wren: sparkle wings spread (full-width cinematic moment)
 * Layout: Full-bleed dark section, centered copy, Wren large center
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ReEntry() {
  const ref = useScrollReveal();

  return (
    <section
      id="re-entry"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "10rem 0",
        background: "oklch(0.14 0.05 258)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Large ambient glow behind Wren */}
      <div aria-hidden style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.10) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ marginBottom: "1.25rem" }}>
          The re-entry ritual
        </div>

        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "oklch(0.96 0.02 80)",
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
          }}
        >
          The return{" "}
          <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>is</em>
          <br />
          the practice.
        </h2>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.125rem",
            lineHeight: 1.75,
            color: "oklch(0.68 0.02 80)",
            maxWidth: "520px",
            margin: "0 auto 4rem",
          }}
        >
          Every time you come back — after a week, a month, a hard season —
          Wren is already there. No catch-up required. No explanation needed.
          Just: welcome back. Let's continue.
        </p>

        {/* Wren — sparkle wings */}
        <div className="reveal reveal-delay-3" style={{ display: "flex", justifyContent: "center", marginBottom: "4rem" }}>
          <WrenVideo
            src={WREN_VIDEOS.sparkleWings}
            poster={WREN_STILLS.flyingFast}
            style={{ width: "min(480px, 90vw)", aspectRatio: "1" }}
          />
        </div>

        {/* Three-column promise */}
        <div
          className="reveal reveal-delay-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {[
            {
              title: "No guilt",
              body: "Wren never asks where you've been. Only: what's happening now?",
            },
            {
              title: "Instant context",
              body: "Your last entry, your last week, your last thread — all right there.",
            },
            {
              title: "Soft landing",
              body: "Re-entry is a one-question prompt. That's it. That's enough.",
            },
          ].map(({ title, body }) => (
            <div key={title} style={{
              background: "oklch(0.21 0.05 255 / 60%)",
              border: "1px solid oklch(1 0 0 / 10%)",
              borderRadius: "0.875rem",
              padding: "1.75rem 1.5rem",
              backdropFilter: "blur(8px)",
            }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "oklch(0.88 0.12 70)",
                marginBottom: "0.625rem",
              }}>{title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "oklch(0.65 0.02 80)",
                margin: 0,
              }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #re-entry .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
