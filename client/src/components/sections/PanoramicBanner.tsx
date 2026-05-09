/**
 * PanoramicBanner — 3-panel composite mockup
 *
 * Full-bleed on desktop. Seamless seam with dark background.
 * On mobile: single image, ~90vw centered, ~60vh tall.
 * Loads eagerly (above-the-fold-adjacent).
 * Background: #080f26 — invisible seam.
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
      <div className="reveal" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        <img
          src={PANORAMIC_URL}
          alt="Continuary marketing composite showing three app screens: morning check-in, weekly thread, and project health scores."
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
      </div>

      <style>{`
        @media (max-width: 640px) {
          #panoramic-banner {
            padding: 3rem 0 !important;
          }
          #panoramic-banner img {
            border-radius: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
