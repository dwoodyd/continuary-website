/**
 * AppScreensSection — "What you'll see when you open it."
 *
 * Desktop: 2×2 grid, each mockup max ~28vw wide, portrait 9:16
 * Mobile: horizontal scroll carousel, each card ~70vw
 * All mockups lazy-load. Alt text describes screen contents.
 * Background: #080f26 — consistent with the rest of the site.
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const MOCKUPS = [
  {
    src: "/manus-storage/screenshot_2_checkins_3535fc6e.webp",
    alt: "Continuary app screen showing morning, midday, and evening check-ins with a weekly thread bar chart.",
    headline: "Three check-ins. One thread.",
    subhead: "Morning. Midday. Evening. Keep the day connected.",
  },
  {
    src: "/manus-storage/screenshot_3_projects_5577fa94.webp",
    alt: "Continuary app screen showing project threads with attention signals — Website Redesign active, Mobile App Launch needs attention, Marketing Campaign cold.",
    headline: "Never lose a project to silence.",
    subhead: "Continuary surfaces the threads that need attention — without shame, without scoring.",
  },
  {
    src: "/manus-storage/screenshot_4_compass_aa95f72c.webp",
    alt: "Continuary Weekly Compass screen showing primary focus 'Ship the iOS beta', must-move task 'Finish onboarding screens', and can-wait task 'Marketing copy'.",
    headline: "One direction. Every week.",
    subhead: "Your Weekly Compass cuts through the noise.",
  },
  {
    src: "/manus-storage/screenshot_5_focus_ffd17e66.webp",
    alt: "Continuary Single Focus Mode screen showing one task 'Write the intro section' with a 25-minute timer — nothing else visible.",
    headline: "One focus when you need to commit.",
    subhead: "Single Focus Mode locks the dashboard to one stretch — learning, training, drafting, anything.",
  },
];

export default function AppScreensSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="app-screens"
      style={{
        background: "#080f26",
        padding: "6rem 0 7rem",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        className="container"
        style={{ marginBottom: "3.5rem", maxWidth: "700px" }}
      >
        <div className="reveal eyebrow" style={{ marginBottom: "1rem" }}>Inside the app</div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.25rem, 4vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#f0e8d8",
            marginBottom: "1rem",
          }}
        >
          What you'll see
          <br />
          <em style={{ color: "#e8a030", fontStyle: "italic" }}>when you open it.</em>
        </h2>
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
            lineHeight: 1.7,
            color: "rgba(168,180,204,0.7)",
          }}
        >
          Four daily rituals. A Weekly Compass. Clarity Engine for your daily clarity-pass. Focus Sessions with Wren. Single Focus Mode when you want to go deep on one thing. A view of every project that might be slipping. That's the whole system.
        </p>
      </div>

      {/* Desktop 2×2 grid */}
      <div
        id="app-screens-grid"
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "2rem",
          maxWidth: "900px",
        }}
      >
        {MOCKUPS.map(({ src, alt, headline, subhead }, i) => (
          <div
            key={src}
            className={`reveal reveal-delay-${i + 1}`}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                aspectRatio: "9/16",
                objectFit: "cover",
                borderRadius: "1.25rem",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(232,160,48,0.06)",
                display: "block",
                marginBottom: "1.25rem",
              }}
            />
            <div style={{ textAlign: "center", maxWidth: "280px" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "#f0e8d8",
                  marginBottom: "0.3rem",
                  lineHeight: 1.3,
                }}
              >
                {headline}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(168,180,204,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {subhead}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel (hidden on desktop via CSS) */}
      <div id="app-screens-carousel" style={{ display: "none" }}>
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            overflowX: "auto",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingBottom: "1.5rem",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {MOCKUPS.map(({ src, alt, headline, subhead }) => (
            <div
              key={src}
              style={{
                flex: "0 0 70vw",
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "9/16",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  display: "block",
                  marginBottom: "1rem",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#f0e8d8",
                    marginBottom: "0.25rem",
                    lineHeight: 1.3,
                  }}
                >
                  {headline}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(168,180,204,0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {subhead}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #app-screens-carousel::-webkit-scrollbar { display: none; }

        @media (max-width: 640px) {
          #app-screens-grid { display: none !important; }
          #app-screens-carousel { display: block !important; }
          #app-screens { padding: 4rem 0 5rem !important; }
        }
      `}</style>
    </section>
  );
}
