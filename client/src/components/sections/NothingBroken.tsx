/**
 * NothingBroken — Section 2
 * "Nothing broken here."
 * Wren: chirping / alive (right side, smaller)
 * Layout: Copy left, Wren right — emotional reframe section
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function NothingBroken() {
  const ref = useScrollReveal();

  return (
    <section
      id="how-it-works"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.18 0.045 255)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top edge fade */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "6rem",
        background: "linear-gradient(to bottom, oklch(0.16 0.04 255), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "5rem",
        }}>
          {/* Left — Copy */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
              The honest truth
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "oklch(0.96 0.02 80)",
                marginBottom: "1.5rem",
              }}
            >
              Nothing broken here.
              <br />
              <span style={{ color: "oklch(0.78 0.16 65)" }}>Just a lot going on.</span>
            </h2>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.72 0.02 80)",
                marginBottom: "1.5rem",
                maxWidth: "460px",
              }}
            >
              You don't need another app that judges your streaks. You need a
              place that holds your story without conditions — one that shows up
              the same whether you journaled every day this week or haven't
              opened it in three.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.72 0.02 80)",
                maxWidth: "460px",
              }}
            >
              Continuary doesn't track your consistency. It tracks your
              continuity — the thread that runs through all of it, even the
              gaps.
            </p>

            {/* Feature bullets */}
            <div className="reveal reveal-delay-4" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "✦", text: "No streaks. No shame. No score." },
                { icon: "✦", text: "Pick up exactly where you left off." },
                { icon: "✦", text: "Wren remembers even when you forget." },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <span style={{ color: "oklch(0.78 0.16 65)", fontSize: "0.875rem", marginTop: "0.2rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "oklch(0.80 0.02 80)", lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Wren chirping */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <WrenVideo
              src={WREN_VIDEOS.chirping}
              poster={WREN_STILLS.neutral}
              style={{ width: "min(420px, 100%)", aspectRatio: "1" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #how-it-works .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
