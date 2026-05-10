/**
 * FoundingMember — replaces the Pricing section entirely during closed beta.
 * Design: Dark navy, three benefit columns, application form, scarcity counter,
 *         then muted "After Beta" reference tier cards below.
 * 
 * The scarcity counter (37 of 100) is a hard-coded number — update manually
 * as founding members are admitted, or hook to a live API endpoint later.
 */

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trpc } from "@/lib/trpc";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgodnnnk";
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
        <strong className="text-white/90">$5/mo on Pro</strong> or{" "}
        <strong className="text-white/90">$10/mo on Keeper</strong> — almost half the retail price the rest of the world will pay.
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
    features: [
      "Unlimited journal entries",
      "Morning & evening prompts",
      "7-day entry history",
      "Wren ambient companion",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ mo",
    annual: "$87 / year",
    features: [
      "Everything in Free",
      "Unlimited history & archive",
      "Weekly thread summaries",
      "Voice capture + transcription",
      "Pattern recognition insights",
      "Permission to Start book access",
    ],
  },
  {
    name: "Keeper",
    price: "$15",
    period: "/ mo",
    annual: "$149 / year",
    features: [
      "Everything in Pro",
      "Unlimited voice transcription",
      "Annual digital memory book",
      "Cross-app early access",
      "Monthly founder office hours",
      "Direct founder DM access",
      "Keeper-exclusive Wren",
    ],
  },
];

export default function FoundingMember() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", relationship: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formspreeOk, setFormspreeOk] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: slotCounts } = trpc.applications.slotCounts.useQuery();
  const slotsClaimed = slotCounts ? TOTAL_SLOTS - slotCounts.remaining : 37;
  const submitMutation = trpc.applications.submit.useMutation();

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email address is required.";
    if (form.relationship.trim().length < 200)
      e.relationship = `Please write at least 200 characters (${form.relationship.trim().length} so far).`;
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    // Submit to Formspree and CRM in parallel
    // Formspree is the primary — if it fails, we still save to CRM
    let formspreeId: string | undefined;

    try {
      const [formspreeRes] = await Promise.allSettled([
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            relationship: form.relationship,
          }),
        }),
      ]);

      const formspreeSucceeded = formspreeRes.status === "fulfilled" && formspreeRes.value.ok;
      if (formspreeSucceeded) {
        const formspreeData = await formspreeRes.value.json().catch(() => ({}));
        formspreeId = formspreeData?.submissionId ?? formspreeData?.id ?? undefined;
      }

      // Always save to CRM database regardless of Formspree result
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        relationship: form.relationship,
        formspreeId,
      });

      setFormspreeOk(formspreeSucceeded);
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ submit: message });
    }
  }

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
            Become a
            <br />
            <em className="text-amber-200">Founding Member.</em>
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

        {/* ── Application form ── */}
        <div className="max-w-[560px] mx-auto mb-10">
          {submitted ? (
            <div
              className="reveal-child text-center py-16 px-8 rounded-2xl border border-amber-400/30 bg-amber-400/[0.05]"
              style={{ transitionDelay: "0ms" }}
            >
              <p className="font-serif text-3xl text-white mb-4">
                <em>Application received.</em>
              </p>
              <p className="font-sans text-white/55 text-base leading-relaxed">
                We read every application personally. You'll hear from us within 48 hours.
              </p>
              {!formspreeOk && (
                <p className="font-sans text-amber-400/70 text-sm mt-4">
                  Your application has been saved. If you don't receive a confirmation email, that's okay — we have your details.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label className="block font-sans text-sm text-white/50 mb-2" htmlFor="fm-name">
                  Your name
                </label>
                <input
                  id="fm-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/12 rounded-xl px-5 py-3.5 font-sans text-white text-base placeholder-white/25 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all duration-200"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1.5 font-sans text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-sans text-sm text-white/50 mb-2" htmlFor="fm-email">
                  Email address
                </label>
                <input
                  id="fm-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/12 rounded-xl px-5 py-3.5 font-sans text-white text-base placeholder-white/25 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all duration-200"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 font-sans text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Relationship with consistency */}
              <div>
                <label className="block font-sans text-sm text-white/50 mb-2" htmlFor="fm-relationship">
                  What's your relationship with consistency?
                </label>
                <textarea
                  id="fm-relationship"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  rows={5}
                  className="w-full bg-white/[0.04] border border-white/12 rounded-xl px-5 py-3.5 font-sans text-white text-base placeholder-white/25 focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                  placeholder="One or two sentences. We're trying to understand whether Continuary is built for the way you actually work."
                  minLength={200}
                />
                <p className="mt-1.5 font-sans text-xs text-white/25 text-right">
                  {form.relationship.trim().length} / 200 minimum
                </p>
                {errors.relationship && (
                  <p className="mt-1 font-sans text-xs text-red-400">{errors.relationship}</p>
                )}
              </div>

              {/* Submit error */}
              {errors.submit && (
                <p className="font-sans text-sm text-red-400 text-center">{errors.submit}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-[#080f26] font-sans font-semibold text-base py-4 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]"
              >
                Apply for a slot →
              </button>

              {/* Disclaimer */}
              <p className="text-center font-sans text-xs italic text-white/35">
                We read every application personally. You'll hear from us within 48 hours.
              </p>
            </form>
          )}
        </div>

        {/* ── Scarcity counter ── */}
        <p
          className="reveal-child text-center font-sans text-sm italic text-white/45 mb-24"
          style={{ transitionDelay: "400ms" }}
        >
          {slotsClaimed} of {TOTAL_SLOTS} founding member slots claimed.
        </p>

        {/* ── After Beta reference tiers ── */}
        <div className="border-t border-white/8 pt-16">
          <div className="text-center mb-10">
            <p
              className="reveal-child text-white/30 text-xs tracking-[0.25em] uppercase font-sans mb-3"
              style={{ transitionDelay: "0ms" }}
            >
              After Beta · Public Launch
            </p>
            <p
              className="reveal-child font-sans text-sm italic text-white/30 max-w-lg mx-auto leading-relaxed"
              style={{ transitionDelay: "60ms" }}
            >
              This is what Continuary will cost when it launches publicly. Founding members never pay these prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {afterBetaTiers.map((tier, i) => (
              <div
                key={tier.name}
                className="reveal-child rounded-xl border border-white/6 bg-white/[0.02] p-6 opacity-60"
                style={{ transitionDelay: `${100 + i * 60}ms` }}
              >
                <h4 className="font-serif text-xl text-white/50 mb-1">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-serif text-2xl text-white/40">{tier.price}</span>
                  <span className="font-sans text-xs text-white/25">{tier.period}</span>
                </div>
                {tier.annual && (
                  <p className="font-sans text-xs text-white/20 mb-4">or {tier.annual}</p>
                )}
                {!tier.annual && <div className="mb-4" />}
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-sans text-xs text-white/25 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            className="reveal-child text-center font-sans text-xs italic text-white/25 mt-6 max-w-md mx-auto"
            style={{ transitionDelay: "300ms" }}
          >
            Founding members are locked at $5 Pro / $10 Keeper for as long as they remain subscribers — even at renewal.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
