/**
 * PlatformStrip — "How you'll use it"
 *
 * Thin 3-column row: iOS · Android · Browser
 * Sits directly below the Hero, before feature sections.
 * Under 200px tall on desktop. Stacks vertically on mobile.
 * Background: same #080f26 — invisible seam with Hero.
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const PLATFORMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        {/* iPhone outline */}
        <rect x="7" y="2" width="14" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <rect x="11" y="4.5" width="6" height="1" rx="0.5" fill="currentColor" opacity="0.5"/>
        <circle cx="14" cy="23" r="1" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    label: "iPhone",
    caption: "Install to your iOS home screen.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        {/* Android outline */}
        <rect x="6" y="5" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="6" y1="8.5" x2="22" y2="8.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="6" y1="21.5" x2="22" y2="21.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <circle cx="14" cy="23.5" r="0.8" fill="currentColor" opacity="0.4"/>
        {/* Antenna bumps */}
        <line x1="10" y1="3.5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <line x1="18" y1="3.5" x2="19" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    label: "Android",
    caption: "Install to your Android home screen.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        {/* Browser / globe */}
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <ellipse cx="14" cy="14" rx="4.5" ry="10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
        <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="5.5" y1="9.5" x2="22.5" y2="9.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <line x1="5.5" y1="18.5" x2="22.5" y2="18.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
    label: "Browser",
    caption: "Or open it in any browser, anywhere.",
  },
];

export default function PlatformStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="platform-strip"
      style={{
        background: "#080f26",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "2rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
        }}
      >
        {PLATFORMS.map(({ icon, label, caption }, i) => (
          <div
            key={label}
            className="reveal"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "0.75rem 1.5rem",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <div style={{ color: "rgba(232,160,48,0.7)", flexShrink: 0 }}>{icon}</div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#f0e8d8",
                  marginBottom: "0.15rem",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: "rgba(168,180,204,0.55)",
                  lineHeight: 1.4,
                }}
              >
                {caption}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #platform-strip .container {
            grid-template-columns: 1fr !important;
          }
          #platform-strip .container > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 0.875rem 1rem !important;
          }
          #platform-strip .container > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
