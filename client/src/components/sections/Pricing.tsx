/**
 * Pricing — Section 8
 *
 * MERL-STYLE: Wren LEFT side, massive, bleeds off left edge.
 * Pricing cards RIGHT. Alternating.
 * Background: #080f26 — Wren's world.
 *
 * Feature ladder source of truth: Part 3 of the handoff spec.
 * Dollar amounts are LOCKED — do not change.
 */

import { useRef, useState } from "react";
import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Plan = {
  name: string;
  foundingMonthly: string;
  foundingAnnual: string;
  retailMonthly: string;
  retailAnnual: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    foundingMonthly: "$0",
    foundingAnnual: "$0",
    retailMonthly: "$0",
    retailAnnual: "$0",
    tagline: "Start here. No pressure.",
    features: [
      "Daily check-ins (Morning · Midday · Evening · Weekly Compass)",
      "Projects, Clarity Engine (daily clarity-pass), Intelligence basics, Knowledge Vault",
      "Scratch Pad",
      "Single Focus Mode — one active focus, up to 60 days, manual prompts",
      "Focus Sessions — 1 session per week, chat with Wren, all session lengths (25/50/90)",
      "Capacity Today, basic Compass",
    ],
    cta: "Claim a founding seat",
    ctaHref: "https://app.continuary.app/apply",
    featured: false,
  },
  {
    name: "Pro",
    foundingMonthly: "$4.99",
    foundingAnnual: "$39.99",
    retailMonthly: "$7.99",
    retailAnnual: "$79.99",
    tagline: "For the practice that's becoming real.",
    features: [
      "Everything in Free",
      "Clarity Engine — full session history, Wren-guided clarity passes",
      "Focus Sessions — unlimited sessions with Wren",
      "Focus Sessions — pop-out window & picture-in-picture for cross-app workflows",
      "Focus Sessions — export your \"weave\" to PDF or markdown",
      "Single Focus Mode — up to 2 active focuses, Wren-generated daily prompts",
      "Single Focus Mode — custom durations up to 365 days, unlimited focus history",
      "Full Compass · Weekly Review · Re-Entry Card",
      "7-day chat history retention",
    ],
    cta: "Claim a founding seat",
    ctaHref: "https://app.continuary.app/apply",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Keeper",
    foundingMonthly: "$9.99",
    foundingAnnual: "$79.99",
    retailMonthly: "$14.99",
    retailAnnual: "$149.99",
    tagline: "For the story that deserves to last.",
    features: [
      "Everything in Pro",
      "Single Focus Mode — unlimited active focuses, unlimited duration",
      "Focus Sessions — priority access to Studios (Wren-hosted group sessions, Phase 2)",
      "Full chat history retention across all sessions",
      "Priority support during founding member period",
    ],
    cta: "Claim a founding seat",
    ctaHref: "https://app.continuary.app/apply",
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const [annual, setAnnual] = useState(false);

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

      {/* WREN — left half of viewport, full height. */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "55vw", height: "100%", pointerEvents: "auto", overflow: "hidden",
      }}>
        <WrenVideo src={WREN_VIDEOS.wipesScreen} glow={true} objectPosition="35% center" fadeDir="left" poster={WREN_STILLS.flyingFast} />
      </div>

      {/* PRICING — right side */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "6rem", paddingBottom: "6rem" }}>
        <div style={{ marginLeft: "auto", maxWidth: "540px" }}>
          <div className="reveal eyebrow" style={{ marginBottom: "1.25rem" }}>Simple pricing</div>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em",
              color: "#f0e8d8", marginBottom: "1.75rem",
            }}
          >
            Start free.
            <br />
            <em style={{ color: "#e8a030", fontStyle: "italic" }}>Stay as long as you like.</em>
          </h2>

          {/* Monthly / Annual toggle */}
          <div className="reveal reveal-delay-2" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", fontWeight: 600,
                padding: "0.375rem 0.875rem", borderRadius: "999px",
                background: !annual ? "rgba(232,160,48,0.15)" : "transparent",
                border: !annual ? "1px solid rgba(232,160,48,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: !annual ? "#e8a030" : "rgba(168,180,204,0.6)",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.8125rem", fontWeight: 600,
                padding: "0.375rem 0.875rem", borderRadius: "999px",
                background: annual ? "rgba(232,160,48,0.15)" : "transparent",
                border: annual ? "1px solid rgba(232,160,48,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: annual ? "#e8a030" : "rgba(168,180,204,0.6)",
                cursor: "pointer", transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: "0.375rem",
              }}
            >
              Annual
              <span style={{
                fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                background: "rgba(232,160,48,0.2)", color: "#e8a030",
                padding: "0.1rem 0.4rem", borderRadius: "999px",
              }}>Save ~$20–40</span>
            </button>
          </div>

          {/* Pricing cards */}
          <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PLANS.map(({ name, foundingMonthly, foundingAnnual, retailMonthly, retailAnnual, tagline, features, cta, ctaHref, featured, badge }) => {
              const displayPrice = annual
                ? (name === "Free" ? "$0" : (name === "Pro" ? foundingAnnual : foundingAnnual))
                : foundingMonthly;
              const retailPrice = annual
                ? (name === "Free" ? "" : (name === "Pro" ? retailAnnual : retailAnnual))
                : (name === "Free" ? "" : (name === "Pro" ? retailMonthly : retailMonthly));
              const periodLabel = annual ? "/yr founding" : "/mo founding";

              return (
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
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "#f0e8d8", lineHeight: 1 }}>{displayPrice}</div>
                      {name !== "Free" && (
                        <>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", color: "rgba(168,180,204,0.5)" }}>{periodLabel}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", color: "rgba(168,180,204,0.35)", textDecoration: "line-through" }}>{retailPrice} retail</div>
                        </>
                      )}
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
              );
            })}
          </div>

          {/* Founding rate footnote */}
          <p className="reveal" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
            color: "rgba(168,180,204,0.45)", marginTop: "1.5rem",
            lineHeight: 1.65, textAlign: "center",
          }}>
            Founding members lock in at $4.99 Pro / $9.99 Keeper monthly (or $39.99 / $79.99 annual) — for life, across every renewal. As long as your subscription stays active without interruption, the rate you locked in today is the rate you'll pay in five years.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #pricing .container > div {
            margin-left: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
