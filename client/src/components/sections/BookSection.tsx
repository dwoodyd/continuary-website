/**
 * BookSection — Section 7
 *
 * MERL-STYLE: Wren RIGHT side, massive, bleeds off right edge.
 * Text LEFT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { BOOK } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function BookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="book"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Warm amber glow — right side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)",
        width: "65vw", height: "85vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.14) 0%, rgba(200,120,30,0.05) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — right half of viewport, full height. */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={BOOK.wrenPerched} glow={true} objectPosition="left center" />
      </div>

      {/* TEXT — left side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "500px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>The companion book</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            Permission
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>to Start.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "1.5rem",
            }}
          >
            A practice guide for creatives who keep almost starting. Written by DeWayne Woods, designed to sit alongside your Continuary practice — not replace it.
          </p>

          <p
            className="reveal reveal-delay-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            The book gives you the philosophy. Continuary gives you the practice. Together, they hold the thread.
          </p>

          {/* Book cover + CTA */}
          <div className="reveal reveal-delay-4" style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "2rem" }}>
            <img
              src={BOOK.cover}
              alt="Permission to Start book cover"
              style={{
                width: "120px",
                borderRadius: "0.5rem",
                boxShadow: "0 8px 40px rgba(232,160,48,0.2), 0 2px 8px rgba(0,0,0,0.5)",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 600, color: "#f0e8d8", marginBottom: "0.25rem" }}>Permission to Start</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(168,180,204,0.7)", marginBottom: "0.375rem" }}>DeWayne Woods</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "rgba(232,160,48,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Included with Continuary Pro</div>
            </div>
          </div>

          <div className="reveal reveal-delay-4">
            <a href="#pricing" className="btn-amber">Get the book + app</a>
          </div>
        </div>
      </div>
    </section>
  );
}
