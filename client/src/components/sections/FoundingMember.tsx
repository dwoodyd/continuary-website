/**
 * FoundingMember — replaces the Pricing section entirely during closed beta.
 * Design: Dark navy, three benefit columns, application form, scarcity counter,
 *         then muted "After Beta" reference tier cards below.
 * 
 * The scarcity counter (37 of 100) is a hard-coded number — update manually
 * as founding members are admitted, or hook to a live API endpoint later.
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trpc } from "@/lib/trpc";

const TOTAL_SLOTS = 100;

const benefits = [
  {
    headline: "Free during beta",
    body: "Full Pro access — voice capture, pattern recognition, weekly threads — for ninety days. No credit card. The thread is yours from day one.",
  },
  {
    headline: "Locked for life",
    body: (
      <>
        When the beta closes, founding members keep their rate forever.{" "}
        <strong className="text-white/90">$4.99/mo on Pro</strong> or{" "}
        <strong className="text-white/90">$9.99/mo on Keeper</strong> — for life, across every renewal. Almost half what the rest of the world will pay.
      </>
    ),
  },
  {
    headline: "A real seat at the table",
    body: "Direct line to the founder. One short feedback form per month. First access to Lifewoven and Operator House when they launch. A Founding Member badge in your app.",
  },
];

const afterBetaTiers = [
  {
    name: "Free",
    price: "$0",
    period: "/ forever",
    foundingMonthly: null,
    foundingAnnual: null,
    retailMonthly: null,
    retailAnnual: null,
    features: [
      "Daily check-ins (Morning · Midday · Evening · Weekly Compass)",
      "Projects, Clarity Engine (daily clarity-pass), Intelligence basics, Knowledge Vault",
      "Scratch Pad",
      "Single Focus Mode — 1 active focus, up to 60 days, manual prompts",
      "Focus Sessions — 1 session/week, chat with Wren, all session lengths",
      "Capacity Today, basic Compass",
    ],
  },
  {
    name: "Pro",
    price: "$7.99",
    period: "/ mo",
    annual: "$79.99 / year",
    foundingMonthly: "$4.99 / mo",
    foundingAnnual: "$39.99 / yr",
    retailMonthly: "$7.99 / mo",
    retailAnnual: "$79.99 / yr",
    features: [
      "Everything in Free",
      "Clarity Engine — full session history, Wren-guided clarity passes",
      "Focus Sessions — unlimited, pop-out & PiP",
      "Focus Sessions — export your \u201cweave\u201d to PDF or markdown",
      "Single Focus Mode — up to 2 active, Wren prompts, 365-day max, unlimited history",
      "Full Compass · Weekly Review · Re-Entry Card",
      "7-day chat history retention",
    ],
  },
  {
    name: "Keeper",
    price: "$14.99",
    period: "/ mo",
    annual: "$149.99 / year",
    foundingMonthly: "$9.99 / mo",
    foundingAnnual: "$79.99 / yr",
    retailMonthly: "$14.99 / mo",
    retailAnnual: "$149.99 / yr",
    features: [
      "Everything in Pro",
      "Single Focus Mode — unlimited active focuses, unlimited duration",
      "Focus Sessions — priority Studios access (Phase 2)",
      "Full chat history retention across all sessions",
      "Priority support during founding member period",
    ],
  },
];

export default function FoundingMember() {
  const sectionRef = useScrollReveal();
  const { data: slotCounts } = trpc.applications.slotCounts.useQuery(undefined, { refetchInterval: 60_000 });
  const slotsClaimed = slotCounts ? TOTAL_SLOTS - slotCounts.remaining : 37;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal-section relative w-full bg-[#080f26] py-24 md:py-32 overflow-hidden"
      id="pricing"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p
            className="reveal-child text-amber-400 text-xs tracking-[0.25em] uppercase font-sans mb-4"
            style={{ transitionDelay: "0ms" }}
          >
            Limited · Invitation-Only
          </p>
          <h2
            className="reveal-child font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{ transitionDelay: "60ms" }}
          >
            Apply for a
            <br />
            <em className="text-amber-200">founding seat.</em>
          </h2>
          <p
            className="reveal-child font-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Continuary is in closed beta. We're inviting one hundred people to help shape the product before public launch — and lock in a founding rate for life.
          </p>
          <p
            className="reveal-child font-sans text-white/35 text-sm max-w-xl mx-auto leading-relaxed mt-4"
            style={{ transitionDelay: "180ms" }}
          >
            Continuary is a Progressive Web App. Install on iOS or Android, or open it in any browser. No app store gatekeeping. Your data stays yours.
          </p>
        </div>

        {/* ── Three benefit columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {benefits.map((b, i) => (
            <div
              key={b.headline}
              className="reveal-child relative rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-8 hover:border-amber-400/40 hover:bg-amber-400/[0.07] transition-all duration-500"
              style={{ transitionDelay: `${180 + i * 80}ms` }}
            >
              {/* Amber accent dot */}
              <div className="w-2 h-2 rounded-full bg-amber-400 mb-6" />
              <h3 className="font-serif text-2xl text-white mb-4">{b.headline}</h3>
              <p className="font-sans text-white/55 text-base leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        {/* ── Instant founding access ── */}
        <div className="max-w-[560px] mx-auto mb-10">
          <div
            className="reveal-child text-center py-12 px-8 rounded-2xl border border-amber-400/30 bg-amber-400/[0.05]"
            style={{ transitionDelay: "0ms" }}
          >
            <p className="font-serif text-3xl text-white mb-4">
              <em>Claim your founding seat.</em>
            </p>
            <p className="font-sans text-white/60 text-base leading-relaxed max-w-md mx-auto mb-7">
              Access is instant while founding seats remain. Start in the Continuary app, sign in, and your founding rate is locked in.
            </p>
            <a
              href="https://app.continuary.app/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-[#080f26] font-sans font-semibold text-base px-7 py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]"
            >
              Claim your founding seat →
            </a>
            <p className="font-sans text-xs italic text-white/35 mt-5">
              When all 100 founding seats are claimed, you can join the waitlist for the next opening.
            </p>
          </div>
        </div>

        {/* ── Scarcity counter ── */}
        <p
          className="reveal-child text-center font-sans text-sm italic text-white/45 mb-24"
          style={{ transitionDelay: "400ms" }}
        >
          {slotsClaimed} of {TOTAL_SLOTS} founding member slots claimed.
        </p>

        {/* ── After Beta reference tiers ── */}
        <div className="border-t border-white/15 pt-16">
          <div className="text-center mb-10">
            <p
              className="reveal-child text-amber-300 text-xs tracking-[0.25em] uppercase font-sans mb-3"
              style={{ transitionDelay: "0ms" }}
            >
              After Beta · Public Launch
            </p>
            <p
              className="reveal-child font-sans text-sm italic text-white/80 max-w-lg mx-auto leading-relaxed"
              style={{ transitionDelay: "60ms" }}
            >
              This is what Continuary will cost when it launches publicly. Founding members never pay these prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {afterBetaTiers.map((tier, i) => (
              <div
                key={tier.name}
                className="reveal-child rounded-xl border border-white/15 bg-white/[0.055] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                <h4 className="font-serif text-xl text-white mb-3">{tier.name}</h4>

                {/* Pricing rows: founding (strikethrough anchor) vs retail */}
                {tier.foundingMonthly ? (
                  <div className="space-y-1 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-xs text-amber-300/90 line-through">{tier.foundingMonthly}</span>
                      <span className="font-sans text-[10px] text-amber-200/85 uppercase tracking-wider">founding</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl text-white">{tier.retailMonthly}</span>
                      <span className="font-sans text-[10px] text-white/65 uppercase tracking-wider">retail</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-sans text-xs text-amber-300/85 line-through">{tier.foundingAnnual}</span>
                      <span className="font-sans text-[10px] text-amber-200/75 uppercase tracking-wider">founding annual</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-xs text-white/80">{tier.retailAnnual}</span>
                      <span className="font-sans text-[10px] text-white/55 uppercase tracking-wider">retail annual</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="font-serif text-2xl text-white">{tier.price}</span>
                    <span className="font-sans text-xs text-white/65 ml-1">{tier.period}</span>
                  </div>
                )}

                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-sans text-xs text-white/80 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-300/80 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            className="reveal-child text-center font-sans text-xs italic text-white/75 mt-6 max-w-lg mx-auto"
            style={{ transitionDelay: "300ms" }}
          >
            Founding members lock in at $4.99 Pro / $9.99 Keeper monthly (or $39.99 / $79.99 annual) — for life, across every renewal.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
