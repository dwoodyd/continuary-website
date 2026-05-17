/**
 * WhatsNew — launch month band (May 2026)
 *
 * Positioned between Rituals and EvidenceLog.
 * Retire after ~30 days — this is a launch announcement, not a permanent fixture.
 * To remove: delete this file, remove the import and <WhatsNew /> from Home.tsx.
 */

const ITEMS = [
  {
    label: "Focus Sessions with Wren",
    desc: "Book a session or start one anytime — she works alongside you, not watching you.",
  },
  {
    label: "Single Focus Mode",
    desc: "Lock the dashboard to one focus for as long as you commit to it. Days, weeks, months.",
  },
  {
    label: "All founding member tiers updated",
    desc: "Both new features are included at no additional cost for every founding member.",
  },
];

export default function WhatsNew() {
  return (
    <section
      style={{
        background: "oklch(0.16 0.04 255)",
        borderTop: "1px solid rgba(232,160,48,0.12)",
        borderBottom: "1px solid rgba(232,160,48,0.12)",
        padding: "3rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle amber shimmer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,160,48,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(232,160,48,0.7)",
              background: "rgba(232,160,48,0.08)",
              border: "1px solid rgba(232,160,48,0.18)",
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
            }}
          >
            What's new
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8125rem",
              color: "rgba(168,180,204,0.5)",
            }}
          >
            May 2026
          </span>
        </div>

        {/* Three items in a responsive row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {ITEMS.map(({ label, desc }) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: "#e8a030",
                  fontSize: "0.625rem",
                  marginTop: "0.3rem",
                  flexShrink: 0,
                }}
              >
                ✦
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#f0e8d8",
                    marginBottom: "0.25rem",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(168,180,204,0.7)",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
