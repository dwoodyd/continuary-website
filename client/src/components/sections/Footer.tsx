/**
 * Footer — Section 10
 * Final CTA: "Your story is already happening."
 * Wren: trail of checkpoints (full center, large)
 * Footer: minimal links + logo
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS, LOGOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Footer() {
  const ref = useScrollReveal();

  return (
    <>
      {/* Final CTA section */}
      <section
        id="cta-final"
        ref={ref as React.RefObject<HTMLElement>}
        style={{
          padding: "10rem 0 6rem",
          background: "linear-gradient(180deg, oklch(0.18 0.045 255) 0%, oklch(0.13 0.05 258) 100%)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Ambient glow */}
        <div aria-hidden style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.78 0.16 65 / 0.09) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Wren — trail of checkpoints */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <WrenVideo
              src={WREN_VIDEOS.amberGold}
              poster={WREN_STILLS.trailCheckpoints}
              style={{ width: "min(380px, 80vw)", aspectRatio: "1" }}
            />
          </div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "oklch(0.96 0.02 80)",
              maxWidth: "700px",
              margin: "0 auto 1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            Your story is
            <br />
            <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>already happening.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "oklch(0.65 0.02 80)",
              maxWidth: "480px",
              margin: "0 auto 3rem",
            }}
          >
            Wren is ready when you are. No setup. No pressure. Just a quiet
            place to begin — or continue.
          </p>

          <div
            className="reveal reveal-delay-3"
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="#" className="btn-amber" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>
              Start Free — No credit card
            </a>
            <a href="#book" className="btn-ghost" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>
              Get the book
            </a>
          </div>

          <p
            className="reveal reveal-delay-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8125rem",
              color: "oklch(0.45 0.02 80)",
              marginTop: "1.5rem",
            }}
          >
            Free forever. Upgrade when you're ready.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "oklch(0.12 0.04 258)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
        padding: "3rem 0",
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}>
            {/* Logo */}
            <img
              src={LOGOS.stackedDark}
              alt="Continuary"
              style={{ height: "1.75rem", width: "auto" }}
            />

            {/* Links */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Support", href: "#" },
                { label: "About", href: "#" },
                { label: "Book", href: "#book" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "oklch(0.50 0.02 80)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.02 80)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(0.50 0.02 80)"; }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8125rem",
              color: "oklch(0.40 0.02 80)",
            }}>
              © {new Date().getFullYear()} Continuary. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0.875rem 1.25rem",
        background: "oklch(0.16 0.04 255 / 92%)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid oklch(1 0 0 / 10%)",
        zIndex: 40,
        display: "none",
      }} id="mobile-cta">
        <a href="#pricing" className="btn-amber" style={{ width: "100%", justifyContent: "center" }}>
          Start Free — No credit card
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #mobile-cta { display: block !important; }
          footer { padding-bottom: 5rem; }
        }
        @media (max-width: 768px) {
          footer .container > div {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
