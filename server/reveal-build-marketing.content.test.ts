import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

const heroSource = readSource("client/src/components/sections/Hero.tsx");
const homeSource = readSource("client/src/pages/Home.tsx");
const metadataSource = readSource("client/index.html");
const appScreensSource = readSource("client/src/components/sections/AppScreensSection.tsx");
const roadmapSource = readSource("client/src/components/sections/RoadmapTeaser.tsx");
const nothingBrokenSource = readSource("client/src/components/sections/NothingBroken.tsx");
const threadStrengthSource = readSource("client/src/components/sections/ThreadStrength.tsx");
const footerSource = readSource("client/src/components/sections/Footer.tsx");

describe("RevealBuild marketing contract", () => {
  it("shows the scripted re-entry experience and routes its final CTA to OAuth sign-in", () => {
    expect(heroSource).toContain("You haven't been here in");
    expect(heroSource).toContain("Nothing is broken.");
    expect(heroSource).toContain("Show me where I was →");
    expect(heroSource).toContain("Here&apos;s where you left off.");
    expect(heroSource).toContain("The short story");
    expect(heroSource).toContain("You had decided to open with the argument, not the backstory.");
    expect(heroSource).toContain("Your next move:");
    expect(heroSource).toContain("Open the draft and delete the first paragraph. Just that.");
    expect(heroSource).toContain("That&apos;s <em");
    expect(heroSource).toContain('href="https://app.continuary.app/signin"');
  });

  it("positions continuity and re-entry ahead of product-depth sections", () => {
    expect(heroSource).toContain("The place that remembers");
    expect(metadataSource).toContain("The Place That Remembers Where You Were");
    expect(metadataSource).toContain("context of interrupted work");
    expect(homeSource.indexOf("<Hero />")).toBeLessThan(homeSource.indexOf("<NothingBroken />"));
    expect(homeSource.indexOf("<NothingBroken />")).toBeLessThan(homeSource.indexOf("<ReEntry />"));
    expect(homeSource.indexOf("<ReEntry />")).toBeLessThan(homeSource.indexOf("<PlatformStrip />"));
  });

  it("uses Quietly Waiting language and retains only verified roadmap items", () => {
    expect(appScreensSource).toContain("quietly waiting");
    expect(appScreensSource).not.toContain("needs attention");
    expect(appScreensSource).not.toContain("Marketing Campaign cold");
    expect(roadmapSource).toContain("Focus Sessions — book ahead");
    expect(roadmapSource).toContain("Studios — Wren-hosted group focus sessions");
    expect(roadmapSource).toContain("Wren Voice Check-ins");
    expect(roadmapSource).not.toContain("chat with Wren in-session");
    expect(roadmapSource).not.toContain("Wren-generated daily prompts");
  });

  it("frames continuity as self-trust evidence instead of a failable streak or score", () => {
    expect(heroSource).toContain("evidence you can rely on yourself again");
    expect(nothingBrokenSource).toContain("another system you can fail");
    expect(nothingBrokenSource).toContain("No pass/fail state. Your return still counts.");
    expect(nothingBrokenSource).toContain("Small completions become evidence you can trust.");
    expect(threadStrengthSource).toContain("Evidence, not evaluation");
    expect(threadStrengthSource).toContain("A record you can trust.");
    expect(threadStrengthSource).not.toContain("Most members live in Weaving");
  });

  it("states passive-support and clinical-care boundaries without claiming unbuilt ADHD tools", () => {
    expect(appScreensSource).toContain("trouble avoided is a problem solved");
    expect(footerSource).toContain("not clinical care or a substitute for it");
    expect(footerSource).toContain("life asks a lot from memory");
  });
});
