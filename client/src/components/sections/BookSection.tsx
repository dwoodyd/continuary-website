/**
 * BookSection — Section 7
 * "Permission to Start" — companion book by DeWayne Woods
 * Wren: journaling book still (placeholder until Wren-with-book video is ready)
 * Layout: Book cover left (prominent), copy right
 */

import { BOOK, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function BookSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="book"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.15 0.045 257)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Warm amber wash behind book */}
      <div aria-hidden style={{
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        width: "50%",
        height: "120%",
        background: "radial-gradient(ellipse at left, oklch(0.78 0.16 65 / 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}>
          {/* Left — Book cover */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            {/* Wren peeking above book — placeholder still until video is ready */}
            <img
              src={WREN_STILLS.journalingBook}
              alt="Silicon Wren with journal"
              style={{
                position: "absolute",
                top: "-80px",
                right: "-20px",
                width: "140px",
                filter: "drop-shadow(0 0 24px oklch(0.78 0.16 65 / 0.5))",
                zIndex: 2,
              }}
            />
            {/* Book cover */}
            <div style={{
              position: "relative",
              borderRadius: "0.5rem",
              overflow: "hidden",
              boxShadow: "0 32px 80px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 8%)",
              maxWidth: "320px",
              width: "100%",
            }}>
              <img
                src={BOOK.cover}
                alt="Permission to Start — A Practice for Creatives Who Keep Almost Starting by DeWayne Woods"
                style={{ width: "100%", display: "block" }}
              />
              {/* Placeholder badge */}
              <div style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                right: "1rem",
                background: "oklch(0.78 0.16 65 / 90%)",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "oklch(0.16 0.04 255)",
                textAlign: "center",
                backdropFilter: "blur(8px)",
              }}>
                Available with Continuary Pro
              </div>
            </div>
          </div>

          {/* Right — Copy */}
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
              The companion book
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "oklch(0.96 0.02 80)",
                marginBottom: "0.75rem",
              }}
            >
              Permission to Start
            </h2>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.125rem",
                fontStyle: "italic",
                color: "oklch(0.78 0.16 65)",
                marginBottom: "1.5rem",
              }}
            >
              A Practice for Creatives Who Keep Almost Starting
            </p>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.70 0.02 80)",
                marginBottom: "1.25rem",
                maxWidth: "460px",
              }}
            >
              The book that started it all. DeWayne Woods wrote{" "}
              <em>Permission to Start</em> for the creatives who have everything
              they need — except the moment they actually begin.
            </p>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: 1.75,
                color: "oklch(0.70 0.02 80)",
                maxWidth: "460px",
                marginBottom: "2.5rem",
              }}
            >
              Continuary is the living practice that grows alongside the book.
              Wren keeps the thread while you do the work.
            </p>

            {/* Feature list */}
            <div className="reveal reveal-delay-4" style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
              {[
                "Guided prompts drawn directly from the book",
                "Wren tracks your practice alongside your reading",
                "Included with Continuary Pro — no separate purchase",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ color: "oklch(0.78 0.16 65)", marginTop: "0.15rem", flexShrink: 0 }}>✦</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9375rem",
                    color: "oklch(0.75 0.02 80)",
                    lineHeight: 1.5,
                  }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#pricing" className="btn-amber">Get the book + app</a>
              <a href="#" className="btn-ghost">Learn more about the book</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #book .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          #book .container > div > div:first-child {
            order: 2;
          }
          #book .container > div > div:last-child {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}
