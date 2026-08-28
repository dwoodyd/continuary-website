/**
 * Nav — Sticky top navigation
 * Design: Frosted glass over deep navy, Continuary logo left, links center, amber CTA right
 * Mobile: hamburger menu with slide-down drawer
 */

import { useEffect, useState } from "react";
import { LOGOS } from "../assets";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "How it works", href: "#how-it-works", target: undefined as string | undefined },
    { label: "Rituals", href: "#rituals", target: undefined as string | undefined },
    { label: "Focus Sessions", href: "#focus-sessions", target: undefined as string | undefined },
    { label: "Book", href: "#book", target: undefined as string | undefined },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || menuOpen
            ? "oklch(0.16 0.04 255 / 92%)"
            : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
            {/* Logo */}
            <a href="#" aria-label="Continuary home" style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                width: "2.4rem",
                height: "2.4rem",
                display: "block",
                overflow: "hidden",
                borderRadius: "0.52rem",
              }}>
                <img
                  src={LOGOS.icon}
                  alt="Continuary"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    transform: "scale(1.16)",
                    transformOrigin: "center",
                  }}
                />
              </span>
            </a>

            {/* Nav links — desktop */}
            <div className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navLinks.map(({ label, href, target }) => (
                <a key={label} href={href} className="nav-link" target={target} rel={target ? "noopener noreferrer" : undefined}>{label}</a>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <a
                href="https://app.continuary.app/signin"
                className="desktop-cta"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  color: "oklch(0.75 0.02 80)",
                  textDecoration: "none",
                  border: "1px solid oklch(1 0 0 / 15%)",
                  borderRadius: "0.375rem",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "oklch(0.96 0.02 80)"; e.currentTarget.style.borderColor = "oklch(1 0 0 / 30%)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "oklch(0.75 0.02 80)"; e.currentTarget.style.borderColor = "oklch(1 0 0 / 15%)"; }}
              >
                Sign in
              </a>
              <a href="https://app.continuary.app/apply" className="btn-amber desktop-cta" target="_blank" rel="noopener noreferrer" style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}>
                Apply
              </a>
              {/* Hamburger — mobile only */}
              <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation-menu"
                style={{
                  background: "none",
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <span style={{
                  display: "block", width: "22px", height: "2px",
                  background: "oklch(0.96 0.02 80)",
                  transition: "all 0.2s ease",
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }} />
                <span style={{
                  display: "block", width: "22px", height: "2px",
                  background: "oklch(0.96 0.02 80)",
                  transition: "all 0.2s ease",
                  opacity: menuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: "block", width: "22px", height: "2px",
                  background: "oklch(0.96 0.02 80)",
                  transition: "all 0.2s ease",
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          id="mobile-navigation-menu"
          style={{
            position: menuOpen ? "fixed" : "static",
            top: menuOpen ? "4rem" : undefined,
            right: menuOpen ? 0 : undefined,
            bottom: menuOpen ? 0 : undefined,
            left: menuOpen ? 0 : undefined,
            overflowY: menuOpen ? "auto" : "hidden",
            overscrollBehavior: "contain",
            maxHeight: menuOpen ? "calc(100dvh - 4rem)" : "0",
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
            transition: "max-height 0.3s ease, opacity 0.2s ease",
            borderTop: menuOpen ? "1px solid oklch(1 0 0 / 8%)" : "none",
            background: "#080f26",
            zIndex: 55,
          }}
        >
          <div style={{ padding: "1.25rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 0", fontSize: "1rem", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
              >
                {label}
              </a>
            ))}
            <a
              href="https://app.continuary.app/signin"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "0.75rem 0", fontSize: "1rem", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
            >
              Sign in
            </a>
            <a
              href="https://app.continuary.app/apply"
              className="btn-amber"
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              Apply for a slot
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
