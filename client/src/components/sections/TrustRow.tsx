/**
 * TrustRow — Section 9
 * Testimonials + trust signals
 * Wren: peek corner (bottom corner, small)
 */

import { WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "I've tried every journaling app. Continuary is the first one that doesn't make me feel bad for being inconsistent.",
    name: "Marissa T.",
    role: "Graphic designer, ADHD",
    initials: "MT",
  },
  {
    quote: "Wren remembered things I forgot I wrote. That moment when you see your own pattern — it's something.",
    name: "Jordan K.",
    role: "Freelance writer",
    initials: "JK",
  },
  {
    quote: "The re-entry prompt after a hard week is the most thoughtful UX I've ever experienced in a productivity app.",
    name: "Priya S.",
    role: "Product manager",
    initials: "PS",
  },
  {
    quote: "I bought the book. Then I downloaded the app. Three months later I'm still here. That's never happened before.",
    name: "Marcus W.",
    role: "Creative director",
    initials: "MW",
  },
  {
    quote: "It's the only app where I actually feel like something is looking out for me — not tracking me.",
    name: "Leah F.",
    role: "Therapist & journaling advocate",
    initials: "LF",
  },
  {
    quote: "Wren doing a little dance when I hit 30 days? I cried. I'm not ashamed.",
    name: "Devon A.",
    role: "Artist",
    initials: "DA",
  },
];

const TRUST_CHIPS = [
  "ADHD-friendly",
  "No streak pressure",
  "Private & encrypted",
  "Works offline",
  "Cancel anytime",
  "Built by creatives",
];

export default function TrustRow() {
  const ref = useScrollReveal();

  return (
    <section
      id="trust"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0 6rem",
        background: "oklch(0.18 0.045 255)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
            What people say
          </div>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 700,
              color: "oklch(0.96 0.02 80)",
              lineHeight: 1.1,
            }}
          >
            The thread holds.
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="testimonial-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          marginBottom: "4rem",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{
                background: "oklch(0.21 0.05 255)",
                border: "1px solid oklch(1 0 0 / 8%)",
                borderRadius: "0.875rem",
                padding: "1.75rem",
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: "1rem" }}>
                {[...Array(5)].map((_, si) => (
                  <span key={si} style={{ color: "oklch(0.78 0.16 65)", fontSize: "0.875rem" }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.9375rem",
                fontStyle: "italic",
                lineHeight: 1.7,
                color: "oklch(0.80 0.02 80)",
                marginBottom: "1.25rem",
              }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "oklch(0.78 0.16 65 / 20%)",
                  border: "1px solid oklch(0.78 0.16 65 / 30%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "oklch(0.78 0.16 65)",
                  flexShrink: 0,
                }}>{t.initials}</div>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "oklch(0.88 0.02 80)",
                  }}>{t.name}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(0.55 0.02 80)",
                  }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust chips row */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.625rem",
            position: "relative",
          }}
        >
          {TRUST_CHIPS.map((chip) => (
            <span key={chip} className="trust-chip">{chip}</span>
          ))}
        </div>
      </div>

      {/* Wren peeking from corner */}
      <img
        src={WREN_STILLS.peekCorner}
        alt=""
        aria-hidden
        className="wren-peek-corner"
        style={{
          position: "absolute",
          bottom: 0,
          right: "2rem",
          width: "180px",
          opacity: 0.85,
          filter: "drop-shadow(0 0 24px oklch(0.78 0.16 65 / 0.3))",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          #trust .testimonial-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #trust .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
          #trust .wren-peek-corner {
            width: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}
