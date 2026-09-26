import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { shouldPlayWrenMotion, toggleWrenMotion } from "../client/src/components/wrenMotion";

const projectRoot = resolve(import.meta.dirname, "..");
const source = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("Wren looping-video motion behavior", () => {
  it("autoplays a looping Wren clip when motion is allowed", () => {
    expect(shouldPlayWrenMotion({
      autoplay: true,
      prefersReducedMotion: false,
      userPaused: false,
      userRequestedPlay: false,
    })).toBe(true);
  });

  it("keeps the poster still visible by default for reduced-motion visitors", () => {
    expect(shouldPlayWrenMotion({
      autoplay: true,
      prefersReducedMotion: true,
      userPaused: false,
      userRequestedPlay: false,
    })).toBe(false);
  });

  it("defers only below-fold media until it reaches the viewport", () => {
    expect(shouldPlayWrenMotion({
      autoplay: false,
      prefersReducedMotion: false,
      userPaused: false,
      userRequestedPlay: false,
    })).toBe(false);
  });

  it("supports a full play, pause, then play-again interaction cycle", () => {
    const paused = toggleWrenMotion({ isPlaying: true, prefersReducedMotion: false });
    expect(paused).toEqual({ userPaused: true, userRequestedPlay: false });
    expect(shouldPlayWrenMotion({ autoplay: true, prefersReducedMotion: false, ...paused })).toBe(false);

    const resumed = toggleWrenMotion({ isPlaying: false, prefersReducedMotion: false });
    expect(resumed).toEqual({ userPaused: false, userRequestedPlay: true });
    expect(shouldPlayWrenMotion({ autoplay: false, prefersReducedMotion: false, ...resumed })).toBe(true);
  });

  it("allows a reduced-motion visitor to opt into a single clip deliberately", () => {
    const explicitlyPlayed = toggleWrenMotion({ isPlaying: false, prefersReducedMotion: true });
    expect(explicitlyPlayed).toEqual({ userPaused: false, userRequestedPlay: true });
    expect(shouldPlayWrenMotion({ autoplay: true, prefersReducedMotion: true, ...explicitlyPlayed })).toBe(true);
  });

  it("autoplays eligible media while deferring lower-scene source assignment", () => {
    const componentSource = source("client/src/components/WrenVideo.tsx");
    expect(componentSource).toContain("autoplay = true");
    expect(componentSource).toContain("priorityMedia = false");
    expect(componentSource).toContain("setIsMediaEligible(true)");
    expect(componentSource).toContain('src={hasRequestedMedia ? src : undefined}');
    expect(componentSource).toContain("autoPlay={autoplay && isMediaEligible && !prefersReducedMotion}");
    expect(componentSource).toContain('preload="none"');
    expect(componentSource).toContain("muted");
    expect(componentSource).toContain("playsInline");
  });

  it("maps every active landing-page scene to the optimized CDN MP4 set", () => {
    const assetsSource = source("client/src/assets.ts");
    [
      "wren-hero-luminous_d6a61523.mp4",
      "wren-nothing-broken_f2f06651.mp4",
      "wren-reentry-thread_4a142e47.mp4",
      "wren-evidence-log_e0d6321f.mp4",
      "wren-adhd-guide_8d0338e1.mp4",
      "wren-book-companion_aeea218b.mp4",
      "wren-footer-thread_25f35d34.mp4",
    ].forEach((videoName) => expect(assetsSource).toContain(videoName));
  });

  it("keeps the shared control operable in every Wren media wrapper", () => {
    const sections = [
      "Hero.tsx",
      "NothingBroken.tsx",
      "ADHDSection.tsx",
      "BookSection.tsx",
      "EvidenceLog.tsx",
      "Footer.tsx",
      "Pricing.tsx",
      "ReEntry.tsx",
      "TrustRow.tsx",
    ];

    sections.forEach((section) => {
      const sectionSource = source(`client/src/components/sections/${section}`);
      expect(sectionSource).toContain("<WrenVideo");
      expect(sectionSource).toContain('pointerEvents: "auto"');
    });
  });
});
