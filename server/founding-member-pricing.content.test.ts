import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const foundingMemberSource = readFileSync(
  resolve(process.cwd(), "client/src/components/sections/FoundingMember.tsx"),
  "utf8"
);

describe("FoundingMember post-beta pricing contrast", () => {
  it("does not compound card opacity over already-muted pricing text", () => {
    expect(foundingMemberSource).not.toContain("p-6 opacity-60");
    expect(foundingMemberSource).toContain("border-white/15 bg-white/[0.055]");
  });

  it("uses readable hierarchy for pricing, feature copy, and the founding-rate callout", () => {
    expect(foundingMemberSource).toContain("font-serif text-xl text-white");
    expect(foundingMemberSource).toContain("text-xs text-white/80 leading-relaxed");
    expect(foundingMemberSource).toContain("text-xs italic text-white/75 mt-6");
  });
});
