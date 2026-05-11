/**
 * VaultSection — "A knowledge base that's actually intelligent."
 * Design: Dark navy, four example Vault entry cards with category pill tags.
 * Inserted AFTER EvidenceLog, BEFORE ReEntry.
 * No Wren — this is a system moment, not a character moment.
 */

import { useScrollReveal } from "@/hooks/useScrollReveal";

const entries = [
  {
    category: "Idea",
    categoryColor: "bg-amber-400/15 text-amber-300 border-amber-400/30",
    text: "What if the second chapter opened with the scene from 2019 instead of the prologue?",
    project: "Writing",
    projectColor: "text-amber-200/50",
  },
  {
    category: "Research",
    categoryColor: "bg-blue-400/15 text-blue-300 border-blue-400/30",
    text: "Knowledge workers lose 28% of their week to context-switching. (McKinsey)",
    project: "Reference",
    projectColor: "text-blue-200/50",
  },
  {
    category: "Decision",
    categoryColor: "bg-purple-400/15 text-purple-300 border-purple-400/30",
    text: "Decided to cut the third service offering and focus entirely on the core product.",
    project: "Strategy",
    projectColor: "text-purple-200/50",
  },
  {
    category: "Draft",
    categoryColor: "bg-orange-400/15 text-orange-300 border-orange-400/30",
    text: "Opening paragraph for the investor update — needs tightening before Thursday.",
    project: "Writing",
    projectColor: "text-orange-200/50",
  },
];

export default function VaultSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal-section relative w-full bg-[#080f26] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="reveal-child text-amber-400 text-xs tracking-[0.25em] uppercase font-sans mb-4"
            style={{ transitionDelay: "0ms" }}
          >
            Knowledge Vault
          </p>
          <h2
            className="reveal-child font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
            style={{ transitionDelay: "60ms" }}
          >
            A knowledge base
            <br />
            <em className="text-amber-200/90">that's actually intelligent.</em>
          </h2>
          <p
            className="reveal-child font-sans text-white/60 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ transitionDelay: "120ms" }}
          >
            Not a note-taking app. A living intelligence layer that connects your ideas, drafts, research, and decisions to your active projects.
          </p>
        </div>

        {/* Vault entry cards */}
        <div className="space-y-3 max-w-3xl mx-auto mb-10">
          {entries.map((entry, i) => (
            <div
              key={entry.category + i}
              className="reveal-child group flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-6 py-5 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-400"
              style={{ transitionDelay: `${180 + i * 70}ms` }}
            >
              {/* Category pill */}
              <span
                className={`flex-shrink-0 mt-0.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.15em] uppercase font-sans font-medium border ${entry.categoryColor}`}
              >
                {entry.category}
              </span>

              {/* Entry text */}
              <p className="flex-1 font-serif text-white/80 text-base md:text-lg leading-relaxed">
                {entry.text}
              </p>

              {/* Project tag */}
              <span
                className={`flex-shrink-0 mt-1 text-[11px] tracking-[0.12em] uppercase font-sans italic ${entry.projectColor}`}
              >
                {entry.project}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="reveal-child text-center font-sans text-sm text-white/35 max-w-md mx-auto"
          style={{ transitionDelay: "470ms" }}
        >
          Items are automatically tagged, linked to projects, and surfaced when they're relevant.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
