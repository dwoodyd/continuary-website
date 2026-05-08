/**
 * Pricing — Section 8
 * Three tiers: Free, Pro ($9/mo), Keeper ($19/mo)
 * Wren: cartwheels above pricing cards (delight)
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
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
  const ref = useScrollReveal();

  return (
    <section
      id="pricing"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.16 0.04 255)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
            Simple, honest pricing
          </div>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "oklch(0.96 0.02 80)",
              marginBottom: "1rem",
            }}
          >
            Start free.{" "}
            <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>Stay</em>{" "}
            because it works.
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.0625rem",
              color: "oklch(0.65 0.02 80)",
              maxWidth: "440px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No annual lock-in. No hidden fees. Cancel any time — and your
            entries are always yours.
          </p>
        </div>

        {/* Wren cartwheels above cards */}
        <div className="reveal reveal-delay-2" style={{ display: "flex", justifyContent: "center", margin: "0 0 -2rem" }}>
          <WrenVideo
            src={WREN_VIDEOS.cartwheels}
            poster={WREN_STILLS.neutral}
            style={{ width: "160px", aspectRatio: "1" }}
          />
        </div>

        {/* Pricing cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          alignItems: "start",
        }}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.featured ? "featured" : ""} reveal reveal-delay-${i + 1}`}
            >
              {plan.badge && (
                <div style={{
                  position: "absolute",
                  top: "-1px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "oklch(0.78 0.16 65)",
                  color: "oklch(0.16 0.04 255)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.25rem 0.875rem",
                  borderRadius: "0 0 0.5rem 0.5rem",
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginTop: plan.badge ? "1rem" : 0 }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: plan.featured ? "oklch(0.78 0.16 65)" : "oklch(0.60 0.02 80)",
                  marginBottom: "0.75rem",
                }}>{plan.name}</div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.375rem" }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.75rem",
                    fontWeight: 700,
                    color: "oklch(0.96 0.02 80)",
                    lineHeight: 1,
                  }}>{plan.price}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "oklch(0.55 0.02 80)",
                  }}>/{plan.period}</span>
                </div>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "oklch(0.62 0.02 80)",
                  marginBottom: "1.75rem",
                  lineHeight: 1.5,
                }}>{plan.tagline}</p>

                <a
                  href={plan.ctaHref}
                  className={plan.featured ? "btn-amber" : "btn-ghost"}
                  style={{ width: "100%", marginBottom: "1.75rem" }}
                >
                  {plan.cta}
                </a>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                      <span style={{ color: "oklch(0.78 0.16 65)", fontSize: "0.75rem", marginTop: "0.2rem", flexShrink: 0 }}>✦</span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "oklch(0.72 0.02 80)",
                        lineHeight: 1.5,
                      }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee note */}
        <p
          className="reveal"
          style={{
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            color: "oklch(0.50 0.02 80)",
            marginTop: "2.5rem",
          }}
        >
          All plans include a 14-day free trial of Pro. No credit card required to start.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #pricing .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
