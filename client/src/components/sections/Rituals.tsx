/**
 * Rituals — Section 3
 * "Rituals that actually stick."
 * Wren: eyes closing / concentration (left side)
 * Layout: Wren left, 3-column ritual cards right
 */

import WrenVideo from "../WrenVideo";
import { WREN_VIDEOS, WREN_STILLS } from "../../assets";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const RITUALS = [
  {
    icon: "🌅",
    title: "Morning Check-in",
    body: "Three questions. Two minutes. One anchor before the day takes over.",
  },
  {
    icon: "📎",
    title: "Capture Anything",
    body: "Voice note, photo, a single sentence. Wren holds it all without judgment.",
  },
  {
    icon: "🌙",
    title: "Evening Reflection",
    body: "What happened. What mattered. What you want to carry forward.",
  },
  {
    icon: "🔁",
    title: "Weekly Thread",
    body: "Wren weaves your week into a single thread you can actually read.",
  },
  {
    icon: "💛",
    title: "Gentle Reminders",
    body: "Not notifications. Invitations. Wren asks, never demands.",
  },
  {
    icon: "📖",
    title: "Your Archive",
    body: "Every entry, searchable, beautiful. Your story, always accessible.",
  },
];

export default function Rituals() {
  const ref = useScrollReveal();

  return (
    <section
      id="rituals"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "8rem 0",
        background: "oklch(0.16 0.04 255)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>
            How Continuary works
          </div>
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.25rem, 3.5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "oklch(0.96 0.02 80)",
              maxWidth: "600px",
              margin: "0 auto 1.25rem",
            }}
          >
            Rituals that{" "}
            <em style={{ color: "oklch(0.78 0.16 65)", fontStyle: "italic" }}>actually</em>{" "}
            stick.
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.0625rem",
              color: "oklch(0.68 0.02 80)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Not because you're more disciplined. Because Wren makes it
            genuinely easy to show up — even on the hard days.
          </p>
        </div>

        {/* Two-column: Wren + ritual grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Wren — eyes closing / concentration */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrenVideo
              src={WREN_VIDEOS.eyesClosed}
              poster={WREN_STILLS.eyesClosed}
              style={{ width: "min(340px, 100%)", aspectRatio: "1" }}
            />
          </div>

          {/* Ritual cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
          }}>
            {RITUALS.map((ritual, i) => (
              <div
                key={ritual.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{
                  background: "oklch(0.21 0.05 255)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  borderRadius: "0.875rem",
                  padding: "1.5rem",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.78 0.16 65 / 35%)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{ritual.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "oklch(0.96 0.02 80)",
                  marginBottom: "0.5rem",
                }}>{ritual.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: "oklch(0.65 0.02 80)",
                }}>{ritual.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #rituals .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #rituals .container > div:last-child > div:first-child {
            display: none !important;
          }
          #rituals .container > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
