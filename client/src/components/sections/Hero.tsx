/**
 * Hero — Continuary's interactive re-entry thesis.
 * The scripted demo is intentionally front-end-only: it illustrates how
 * Continuary preserves context after an interruption without using user data.
 */

import { useState } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { trpc } from "../../lib/trpc";

type DemoStage = "opening" | "context" | "complete";

export default function Hero() {
  const [stage, setStage] = useState<DemoStage>("opening");
  const { data: slotCounts } = trpc.applications.slotCounts.useQuery(undefined, { refetchInterval: 60_000 });
  const claimed = slotCounts ? 100 - slotCounts.remaining : 37;

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
      <div
        aria-hidden
        className="hero-glow"
        style={{
          position: "absolute",
          top: "50%",
          right: "-6%",
          transform: "translateY(-50%)",
          width: "68vw",
          height: "85vh",
          background: "radial-gradient(ellipse at center, rgba(232,160,48,0.11) 0%, rgba(232,160,48,0.035) 48%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      <div
        id="hero-wren-container"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "52vw",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <WrenVideo
          src={WREN_VIDEOS.luminousFloats}
          glow
          objectPosition="44% center"
          fadeDir="right"
          poster={WREN_STILLS.neutral}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "7.5rem", paddingBottom: "5.5rem" }}>
        <div id="hero-text" style={{ maxWidth: "590px" }}>
          <div className="eyebrow" style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--amber)", opacity: 0.5 }} />
            Continuity for interrupted work
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 5.6vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#f0e8d8",
              marginBottom: "1.15rem",
              maxWidth: "580px",
            }}
          >
            The place that remembers <em style={{ color: "#e8a030", fontStyle: "italic" }}>where you were.</em>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.97rem, 1.25vw, 1.1rem)",
              lineHeight: 1.7,
              color: "rgba(168,180,204,0.88)",
              maxWidth: "500px",
              marginBottom: "1.75rem",
            }}
          >
            Continuary keeps the context of your work, so returning after a day, a month, or longer begins with what still matters — not a rebuild.
          </p>

          <div
            aria-live="polite"
            style={{
              width: "100%",
              maxWidth: "540px",
              border: "1px solid rgba(232,160,48,0.28)",
              background: "linear-gradient(145deg, rgba(17,28,66,0.92), rgba(9,18,42,0.92))",
              borderRadius: "1.25rem",
              padding: "clamp(1.25rem, 2.4vw, 2rem)",
              boxShadow: "0 20px 55px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
            }}
          >
            {stage === "opening" && (
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(232,160,48,0.72)", marginBottom: "0.85rem" }}>
                  Re-entry preview
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 2.6vw, 2.45rem)", lineHeight: 1.06, color: "#f0e8d8", marginBottom: "0.85rem" }}>
                  You haven't been here in <em style={{ color: "#e8a030" }}>11 days.</em>
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#f0e8d8", marginBottom: "0.75rem" }}>Nothing is broken.</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(168,180,204,0.8)", marginBottom: "1.35rem" }}>
                  We&apos;re not reopening every task. We&apos;re not reviewing everything you missed. We&apos;re starting with what still matters.
                </p>
                <button type="button" onClick={() => setStage("context")} className="btn-amber" style={{ border: 0, cursor: "pointer" }}>
                  Show me where I was →
                </button>
              </div>
            )}

            {stage === "context" && (
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(232,160,48,0.72)", marginBottom: "0.85rem" }}>
                  Re-entry card
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 2.6vw, 2.45rem)", lineHeight: 1.06, color: "#f0e8d8", marginBottom: "1.1rem" }}>
                  Here&apos;s where you left off.
                </h2>
                <div style={{ borderLeft: "2px solid #e8a030", paddingLeft: "1rem", marginBottom: "1.15rem" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,160,48,0.78)", marginBottom: "0.3rem" }}>The short story</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.94rem", color: "rgba(240,232,216,0.9)", lineHeight: 1.55, margin: 0 }}>You had decided to open with the argument, not the backstory.</p>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(168,180,204,0.85)", lineHeight: 1.62, marginBottom: "1.35rem" }}>
                  <strong style={{ color: "#f0e8d8" }}>Your next move:</strong> Open the draft and delete the first paragraph. Just that.
                </p>
                <button type="button" onClick={() => setStage("complete")} className="btn-amber" style={{ border: 0, cursor: "pointer" }}>
                  Continue →
                </button>
              </div>
            )}

            {stage === "complete" && (
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(232,160,48,0.72)", marginBottom: "0.85rem" }}>
                  The thread holds
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.7rem, 2.6vw, 2.45rem)", lineHeight: 1.06, color: "#f0e8d8", marginBottom: "0.85rem" }}>
                  That&apos;s <em style={{ color: "#e8a030" }}>Continuary.</em>
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.94rem", lineHeight: 1.65, color: "rgba(168,180,204,0.84)", marginBottom: "1.35rem" }}>
                  It remembers enough that coming back doesn&apos;t require rebuilding context.
                </p>
                <a href="https://app.continuary.app/signin" target="_blank" rel="noopener noreferrer" className="btn-amber">Claim your founding seat →</a>
              </div>
            )}
          </div>

          <div style={{ marginTop: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontStyle: "italic", color: "rgba(232,160,48,0.65)" }}>
            In closed beta · {claimed} of 100 founding member slots claimed
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero { min-height: auto !important; align-items: flex-start !important; }
          #hero > .container { padding-top: 5.5rem !important; padding-bottom: 3.5rem !important; }
          #hero-wren-container { width: 62vw !important; height: 12.5rem !important; top: 4rem !important; bottom: auto !important; right: -10vw !important; opacity: 0.9; }
          .hero-glow { width: 105vw !important; height: 24rem !important; top: 2rem !important; bottom: auto !important; right: -28% !important; transform: none !important; }
          #hero-text { max-width: 100% !important; padding-top: 11.25rem; }
        }
        @media (max-width: 480px) {
          #hero-wren-container { display: block !important; width: 62vw !important; height: 9rem !important; top: 3.25rem !important; right: -10vw !important; opacity: 0.94; }
          #hero > .container { padding-top: 4.5rem !important; padding-bottom: calc(7rem + env(safe-area-inset-bottom)) !important; }
          #hero-text { padding-top: 5rem !important; }
          #hero h1 { font-size: 2.38rem !important; }
          #hero p { line-height: 1.58 !important; }
          #hero [aria-live="polite"] { padding: 1rem !important; }
          #hero [aria-live="polite"] h2 { font-size: 1.55rem !important; }
        }
      `}</style>
    </section>
  );
}
