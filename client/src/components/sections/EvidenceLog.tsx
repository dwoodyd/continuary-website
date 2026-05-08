/**
 * EvidenceLog — Section 4
 * "The record that holds."
 * Wren: flies and returns home (right side)
 * Layout: Asymmetric — large copy left, Wren + mock journal entries right
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const MOCK_ENTRIES = [
  {
    date: "Tuesday, May 6",
    tag: "Morning",
    text: "Actually made coffee before opening my laptop. Small win. Wren noticed.",
    mood: "🌤",
  },
  {
    date: "Wednesday, May 7",
    tag: "Capture",
    text: "That idea about the newsletter structure — saved it before it disappeared.",
    mood: "💡",
  },
  {
    date: "Thursday, May 8",
    tag: "Evening",
    text: "Harder day. Wrote it down anyway. That's the whole point.",
    mood: "🌙",
  },
];

export default function EvidenceLog() {
  const ref = useScrollReveal();

  return (
    <section
      id="evidence"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.19 0.045 254)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative amber line */}
      <div aria-hidden style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "1px",
        height: "100%",
        background: "linear-gradient(to bottom, transparent, oklch(0.78 0.16 65 / 0.12), transparent)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}>
          {/* Left — Copy */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
              Your evidence log
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
              The record
              <br />
              that{" "}
              <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>holds.</em>
            </h2>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.72 0.02 80)",
                marginBottom: "1.25rem",
                maxWidth: "440px",
              }}
            >
              On the days you feel like you've done nothing, Continuary shows
              you the receipts. The small wins. The hard moments you showed up
              for anyway. The ideas you caught before they vanished.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.72 0.02 80)",
                maxWidth: "440px",
                marginBottom: "2.5rem",
              }}
            >
              This is your evidence log. Proof that you're still in it, even
              when it doesn't feel like it.
            </p>

            <div className="reveal reveal-delay-4" style={{ display: "flex", gap: "3rem" }}>
              {[
                { num: "3", label: "captures per day, avg." },
                { num: "94%", label: "feel more grounded after 30 days" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "oklch(0.78 0.16 65)",
                    lineHeight: 1,
                    marginBottom: "0.375rem",
                  }}>{num}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "oklch(0.60 0.02 80)",
                    lineHeight: 1.4,
                    maxWidth: "100px",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mock journal + Wren */}
          <div style={{ position: "relative" }}>
            {/* Wren floating above entries */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-2rem", position: "relative", zIndex: 2 }}>
              <WrenVideo
                src={WREN_VIDEOS.fliesHome}
                poster={WREN_STILLS.lookingDown}
                style={{ width: "200px", aspectRatio: "1" }}
              />
            </div>

            {/* Mock journal entries */}
            <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {MOCK_ENTRIES.map((entry, i) => (
                <div
                  key={entry.date}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{
                    background: "oklch(0.21 0.05 255)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    borderRadius: "0.75rem",
                    padding: "1.125rem 1.375rem",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <span style={{ fontSize: "1rem" }}>{entry.mood}</span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "oklch(0.78 0.16 65)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}>{entry.tag}</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "oklch(0.50 0.02 80)",
                    }}>{entry.date}</span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "oklch(0.80 0.02 80)",
                    margin: 0,
                  }}>{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #evidence .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
