/**
 * PanoramicBanner — 3-panel composite mockup
 *
 * Full-bleed on desktop. Seamless seam with dark background.
 * On mobile: single image, ~90vw centered, ~60vh tall.
 * Loads eagerly (above-the-fold-adjacent).
 * Background: #080f26 — invisible seam.
 *
 * Fix 1: The first panel subhead "A daily system built for the ADHD mind."
 * is overridden with a positioned overlay showing the broader copy:
 * "A daily system for the way you actually think."
 * The overlay paints over the baked-in text and renders the new line.
 */

import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const PANORAMIC_URL = "/manus-storage/panoramic_banner_053f80c8.webp";

const MOBILE_PREVIEWS = [
  {
    src: "/manus-storage/screenshot_2_checkins_3535fc6e.webp",
    alt: "Continuary check-ins screen showing morning, midday, and evening rituals.",
    title: "Your brain isn’t broken.",
    description: "Start with the context you have, then take one small step.",
  },
  {
    src: "/manus-storage/screenshot_2_checkins_3535fc6e.webp",
    alt: "Continuary check-ins screen showing a connected daily thread.",
    title: "Three check-ins. One thread.",
    description: "Morning, midday, and evening stay connected without a streak to protect.",
  },
  {
    src: "/manus-storage/screenshot_3_projects_5577fa94.webp",
    alt: "Continuary projects screen showing active work and projects quietly waiting.",
    title: "Nothing important gets lost.",
    description: "Projects can wait quietly until you are ready to return.",
  },
];

export default function PanoramicBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="panoramic-banner"
      style={{
        background: "#080f26",
        padding: "5rem 0",
        overflow: "hidden",
      }}
    >
      <div
        className="desktop-composite reveal"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
        }}
      >
        <img
          src={PANORAMIC_URL}
          alt="Continuary app composite showing a morning check-in, weekly thread, and projects quietly waiting."
          loading="eager"
          decoding="async"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "1rem",
            boxShadow: "0 0 80px rgba(232,160,48,0.08), 0 40px 80px rgba(0,0,0,0.5)",
          }}
        />

        {/*
          Overlay to replace the first panel's subhead.
          Position is calibrated to the image's actual text position:
          - Horizontally: left panel occupies ~0–33% of the image width
          - Vertically: subhead sits at ~14–20% from the top
          The overlay paints the background color over the old text,
          then renders the new copy in the same style.
        */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            /* left panel: 0–33% of image width, with 1.5rem padding offset */
            left: "1.5rem",
            width: "calc(33% - 1.5rem)",
            /* vertical: cover the subhead area */
            top: "13%",
            height: "8%",
            background: "linear-gradient(180deg, #1a1035 0%, #160d2e 50%, #1a1035 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4%",
            borderRadius: "2px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.55rem, 1.1vw, 0.9rem)",
              color: "rgba(200,200,210,0.72)",
              textAlign: "center",
              lineHeight: 1.35,
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            A daily system for the way you actually think.
          </p>
        </div>
      </div>

      <div id="mobile-app-previews" aria-label="Continuary app preview cards">
        {MOBILE_PREVIEWS.map(({ src, alt, title, description }) => (
          <article key={title}>
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #panoramic-banner {
            padding: 2.75rem 0 !important;
          }
          #panoramic-banner .desktop-composite {
            display: none !important;
          }
          #panoramic-banner .desktop-composite img {
            border-radius: 0.5rem !important;
          }
          #panoramic-banner [aria-hidden="true"] {
            display: none !important;
          }
          #mobile-app-previews {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 1.25rem;
            padding: 0 1.5rem;
          }
          #mobile-app-previews article {
            display: grid;
            grid-template-columns: minmax(6.5rem, 30%) 1fr;
            gap: 1rem;
            align-items: center;
            padding: 0.9rem;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 0.9rem;
            background: rgba(17,28,66,0.55);
          }
          #mobile-app-previews img {
            width: 100%;
            aspect-ratio: 9 / 14;
            object-fit: cover;
            object-position: top center;
            border-radius: 0.6rem;
            box-shadow: 0 10px 24px rgba(0,0,0,0.32);
          }
          #mobile-app-previews h3 {
            margin: 0 0 0.35rem;
            color: #f0e8d8;
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 1.08rem;
            line-height: 1.18;
          }
          #mobile-app-previews p {
            margin: 0;
            color: rgba(168,180,204,0.78);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.82rem;
            line-height: 1.45;
          }
        }
        @media (min-width: 641px) {
          #mobile-app-previews { display: none; }
        }
      `}</style>
    </section>
  );
}
