/**
 * Footer — Section 10
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Final CTA + footer links RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { LOGOS, WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Amber glow — left side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.1) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — left half of viewport, full height. sparkleWings is symmetric/forward-facing. */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.tuggingThread} glow={true} objectPosition="center center" />
      </div>

      {/* FINAL CTA — right side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginLeft: "auto", maxWidth: "480px" }}>
          {/* Logo */}
          <img
            src={LOGOS.stackedDark}
            alt="Continuary"
            className="reveal"
            style={{ height: "3rem", marginBottom: "2.5rem", display: "block" }}
          />

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.5rem",
            }}
          >
            The thread
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>is still there.</em>
          </h2>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.75, color: "rgba(168,180,204,0.9)", marginBottom: "2.5rem",
            }}
          >
            Start free. Come back when you're ready. Wren will be here.
          </p>

          <div className="reveal reveal-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a href="#" className="btn-amber" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              Start for free
            </a>
            <a href="#pricing" className="btn-ghost" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              See pricing
            </a>
          </div>

          {/* Footer links */}
          <div
            className="reveal"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(168,180,204,0.4)" }}>
              © {new Date().getFullYear()} Continuary. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(168,180,204,0.5)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e8a030")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(168,180,204,0.5)")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        padding: "0.875rem 1.25rem",
        background: "rgba(8,15,38,0.92)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        zIndex: 40,
        display: "none",
      }} id="mobile-cta">
        <a href="#pricing" className="btn-amber" style={{ width: "100%", textAlign: "center", display: "block" }}>
          Start Free — No credit card
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #mobile-cta { display: block !important; }
          #footer { padding-bottom: 5rem; }
        }
      `}</style>
    </footer>
  );
}
