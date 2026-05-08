/**
 * Pricing — Section 8
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Pricing cards RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 */

import { useRef } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "Start here. No pressure.",
    features: [
      "Unlimited journal entries",
      "Morning & evening prompts",
      "7-day entry history",
      "Wren ambient companion",
      "Mobile + web",
    ],
    cta: "Start Free",
    ctaHref: "#",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    tagline: "For the practice that's becoming real.",
    features: [
      "Everything in Free",
      "Unlimited history & archive",
      "Weekly thread summaries",
      "Voice capture + transcription",
      "Pattern recognition insights",
      "Permission to Start book access",
      "Priority support",
    ],
    cta: "Start Pro Free",
    ctaHref: "#",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Keeper",
    price: "$19",
    period: "per month",
    tagline: "For the story that deserves to last.",
    features: [
      "Everything in Pro",
      "Lifetime export & backup",
      "Family sharing (up to 4)",
      "Custom ritual templates",
      "Early access to new features",
      "Wren milestone celebrations",
      "Annual printed memory book",
    ],
    cta: "Become a Keeper",
    ctaHref: "#",
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080f26",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Amber glow — left side */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "-5%", transform: "translateY(-50%)",
        width: "60vw", height: "80vh",
        background: "radial-gradient(ellipse at center, rgba(232,160,48,0.09) 0%, rgba(232,160,48,0.03) 45%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* WREN — left half of viewport, full height. Flipped so Wren faces right. */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.wipesScreen} glow={true} objectPosition="35% center" fadeDir="left" />
      </div>

      {/* PRICING — right side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginLeft: "auto", maxWidth: "520px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>Simple pricing</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "2.5rem",
            }}
          >
            Start free.
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>Stay as long as you like.</em>
          </h2>

          {/* Pricing cards — stacked vertically on right side */}
          <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PLANS.map(({ name, price, period, tagline, features, cta, ctaHref, featured, badge }) => (
              <div
                key={name}
                style={{
                  background: featured ? "rgba(232,160,48,0.08)" : "rgba(17,28,66,0.6)",
                  border: featured ? "1px solid rgba(232,160,48,0.35)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  backdropFilter: "blur(8px)",
                  position: "relative",
                }}
              >
                {badge && (
                  <div style={{
                    position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%) translateY(-50%)",
                    background: "#e8a030", color: "#080f26",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "0.25rem 0.875rem", borderRadius: "9999px",
                  }}>{badge}</div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: featured ? "#e8a030" : "rgba(168,180,204,0.8)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(168,180,204,0.6)" }}>{tagline}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "#f0e8d8", lineHeight: 1 }}>{price}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(168,180,204,0.5)" }}>/{period}</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#e8a030", fontSize: "0.625rem", marginTop: "0.3rem", flexShrink: 0 }}>✦</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(240,232,216,0.8)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={ctaHref}
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    background: featured ? "#e8a030" : "transparent",
                    color: featured ? "#080f26" : "#e8a030",
                    border: featured ? "none" : "1px solid rgba(232,160,48,0.35)",
                  }}
                >{cta}</a>
              </div>
            ))}
          </div>

          <p className="reveal" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", color: "rgba(168,180,204,0.4)", marginTop: "1.5rem", textAlign: "center" }}>
            14-day free trial on Pro. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
