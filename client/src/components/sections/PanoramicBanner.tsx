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
        className="reveal"
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

      <style>{`
        @media (max-width: 640px) {
          #panoramic-banner {
            padding: 3rem 0 !important;
          }
          #panoramic-banner img {
            border-radius: 0.5rem !important;
          }
          #panoramic-banner [aria-hidden="true"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
