/**
 * ADHDSection — Section 6
 * "Built for the brain that lives in flashes."
 * Wren: peek from side (peeking, curious)
 * Layout: Wren peeking left edge, copy right — playful asymmetric
 */

import { WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const FEATURES = [
  {
    label: "Voice capture",
    desc: "Speak it. Wren transcribes and files it. Done.",
    icon: "🎙",
  },
  {
    label: "One-tap capture",
    desc: "The idea is there for 8 seconds. Wren makes those 8 seconds count.",
    icon: "⚡",
  },
  {
    label: "No blank page",
    desc: "Wren always gives you a prompt. You never have to start from nothing.",
    icon: "✍",
  },
  {
    label: "Flexible structure",
    desc: "Rigid templates break. Wren bends to how you actually think.",
    icon: "🌊",
  },
  {
    label: "Pattern recognition",
    desc: "Wren notices what you can't — the recurring themes, the cycles.",
    icon: "🔍",
  },
  {
    label: "Celebration mode",
    desc: "Wren does a little dance when you hit a milestone. Yes, really.",
    icon: "🎉",
  },
];

export default function ADHDSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="adhd"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.17 0.045 256)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "5rem",
          alignItems: "flex-start",
        }}>
          {/* Left — Wren peeking */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <img
              src={WREN_STILLS.peekSide}
              alt="Silicon Wren peeking"
              style={{
                width: "100%",
                filter: "drop-shadow(0 0 40px oklch(0.78 0.16 65 / 0.4))",
                borderRadius: "1rem",
              }}
            />
          </div>

          {/* Right — Copy + features */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
              ADHD-friendly by design
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.25rem, 3.5vw, 3.25rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "oklch(0.96 0.02 80)",
                marginBottom: "1.25rem",
              }}
            >
              Built for the brain
              <br />
              that lives in{" "}
              <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>flashes.</em>
            </h2>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.70 0.02 80)",
                maxWidth: "520px",
                marginBottom: "3rem",
              }}
            >
              Continuary was designed with ADHD, anxiety, and creative chaos in
              mind. Not as an afterthought — as the whole point. Because the
              people who need continuity most are often the ones most likely to
              lose the thread.
            </p>

            {/* Feature grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}>
              {FEATURES.map((f, i) => (
                <div
                  key={f.label}
                  className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                  style={{
                    background: "oklch(0.21 0.05 255)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.78 0.16 65 / 30%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
                  }}
                >
                  <div style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "oklch(0.88 0.02 80)",
                    marginBottom: "0.375rem",
                  }}>{f.label}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    lineHeight: 1.6,
                    color: "oklch(0.60 0.02 80)",
                  }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #adhd .container > div {
            grid-template-columns: 1fr !important;
          }
          #adhd .container > div > div:first-child {
            position: static !important;
            max-width: 200px;
            margin: 0 auto;
          }
          #adhd .container > div > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
