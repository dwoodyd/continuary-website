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

  it("supports a full play, pause, then play-again interaction cycle", () => {
    const paused = toggleWrenMotion({ isPlaying: true, prefersReducedMotion: false });
    expect(paused).toEqual({ userPaused: true, userRequestedPlay: false });
    expect(shouldPlayWrenMotion({ autoplay: true, prefersReducedMotion: false, ...paused })).toBe(false);

    const resumed = toggleWrenMotion({ isPlaying: false, prefersReducedMotion: false });
    expect(resumed).toEqual({ userPaused: false, userRequestedPlay: false });
    expect(shouldPlayWrenMotion({ autoplay: true, prefersReducedMotion: false, ...resumed })).toBe(true);
  });

  it("allows a reduced-motion visitor to opt into a single clip deliberately", () => {
    const explicitlyPlayed = toggleWrenMotion({ isPlaying: false, prefersReducedMotion: true });
    expect(explicitlyPlayed).toEqual({ userPaused: false, userRequestedPlay: true });
    expect(shouldPlayWrenMotion({ autoplay: true, prefersReducedMotion: true, ...explicitlyPlayed })).toBe(true);
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
