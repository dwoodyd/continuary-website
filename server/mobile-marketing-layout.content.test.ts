import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const source = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("marketing mobile layout safeguards", () => {
  it("reserves safe-area-aware space for the fixed mobile Apply CTA", () => {
    const css = source("client/src/index.css");
    const footer = source("client/src/components/sections/Footer.tsx");

    expect(css).toContain("scroll-padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))");
    expect(css).toContain("padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))");
    expect(footer).toContain('padding: "0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom))"');
  });

  it("keeps the Wren visible in the phone hero and stacks app screens without horizontal clipping", () => {
    const hero = source("client/src/components/sections/Hero.tsx");
    const screens = source("client/src/components/sections/AppScreensSection.tsx");
    const panoramic = source("client/src/components/sections/PanoramicBanner.tsx");

    expect(hero).toContain("#hero-wren-container { display: block !important");
    expect(hero).toContain("#hero-text { padding-top: 5rem !important; }");
    expect(screens).toContain("grid-template-columns: 1fr !important");
    expect(screens).toContain("#app-screens-carousel { display: none !important; }");
    expect(panoramic).toContain("MOBILE_PREVIEWS");
    expect(panoramic).toContain("Nothing important gets lost.");
    expect(panoramic).toContain("#mobile-app-previews");
  });

  it("keeps a poster still beneath every mobile Wren video and removes desktop-size reserved scene space", () => {
    const video = source("client/src/components/WrenVideo.tsx");
    const css = source("client/src/index.css");

    expect(video).toContain("preload=\"metadata\"");
    expect(video).toContain("muted");
    expect(video).toContain("playsInline");
    expect(video).toContain("poster && (");
    expect(video).toContain("<img");
    expect(css).toContain("Every former desktop Wren scene becomes a compact, in-flow mobile media block.");
    expect(css).toContain("height: clamp(10rem, 46vw, 15rem) !important;");
  });

  it("uses an opaque, scroll-locked mobile navigation overlay and avoids legacy health-score wording", () => {
    const nav = source("client/src/components/Nav.tsx");
    const panoramic = source("client/src/components/sections/PanoramicBanner.tsx");

    expect(nav).toContain('document.body.style.overflow = "hidden"');
    expect(nav).toContain('background: "#080f26"');
    expect(nav).toContain('maxHeight: menuOpen ? "calc(100dvh - 4rem)" : "0"');
    expect(panoramic).not.toMatch(/health scores/i);
    expect(panoramic).toContain("projects quietly waiting");
  });
});
