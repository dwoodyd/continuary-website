/**
 * EvidenceLog — Section 4
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Text RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
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
      {/* Amber glow — right side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.09) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — RIGHT side, concentration video has large Wren facing left */}
      <div id="evidence-wren" style={{
        position: "absolute", right: 0, top: 0,
        width: "60vw", height: "100%", pointerEvents: "auto", overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.blobJournal} glow={true} objectPosition="center center" fadeDir="right" poster={WREN_STILLS.journalingBook} />
      </div>

      {/* TEXT — left side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "480px" }}>
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
          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {ENTRIES.map(({ date, text }) => (
              <div
                key={date}
                style={{
                  background: "rgba(17,28,66,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "2px solid rgba(232,160,48,0.4)",
                  borderRadius: "0 0.75rem 0.75rem 0",
                  padding: "0.875rem 1.125rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,160,48,0.7)", marginBottom: "0.5rem" }}>{date}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", color: "rgba(240,232,216,0.85)", lineHeight: 1.65 }}>{text}</div>
              </div>
            ))}
          </div>

          {/* Emotional Cycle named beat */}
          <div className="reveal reveal-delay-4" style={{ marginBottom: "1.5rem" }}>
            <div style={{
              background: "rgba(17,28,66,0.6)",
              border: "1px solid rgba(232,160,48,0.18)",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(232,160,48,0.7)", marginBottom: "0.625rem" }}>Emotional Cycle</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(168,180,204,0.85)", lineHeight: 1.65, margin: 0 }}>
                Log where you are — Worry, Neutral, or Elation. Not to track your mood, but to give your work its context. Wren remembers the pattern so you don't have to explain it from scratch every time.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                {["Worry", "Neutral", "Elation"].map((state, i) => (
                  <div key={state} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
                    padding: "0.25rem 0.75rem", borderRadius: "999px",
                    background: i === 0 ? "rgba(168,100,80,0.18)" : i === 1 ? "rgba(168,180,204,0.12)" : "rgba(232,160,48,0.15)",
                    border: i === 0 ? "1px solid rgba(168,100,80,0.3)" : i === 1 ? "1px solid rgba(168,180,204,0.2)" : "1px solid rgba(232,160,48,0.3)",
                    color: i === 0 ? "rgba(220,140,120,0.9)" : i === 1 ? "rgba(168,180,204,0.8)" : "rgba(232,160,48,0.9)",
                  }}>{state}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing thought */}
          <div className="reveal reveal-delay-5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(168,180,204,0.55)", fontStyle: "italic", lineHeight: 1.6, maxWidth: "340px" }}>
            Every entry is a thread. Every thread is a story you don't have to re-explain to yourself.
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #evidence-wren {
            display: none !important;
          }
          #evidence .container > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
