import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const bookSectionSource = readFileSync(
  resolve(process.cwd(), "client/src/components/sections/BookSection.tsx"),
  "utf8"
);

describe("BookSection published-book contract", () => {
  it("keeps both public purchase paths available with safe new-tab attributes", () => {
    expect(bookSectionSource).toContain('href="https://www.soulengineer.online/books"');
    expect(bookSectionSource).toContain('href="https://a.co/d/0bvqj6jD"');
    expect(bookSectionSource).toContain('target="_blank"');
    expect(bookSectionSource).toContain('rel="noopener noreferrer"');
  });

  it("does not promise a founding-member PDF delivery path that is not implemented", () => {
    expect(bookSectionSource).not.toContain("Founding members receive a direct download PDF");
    expect(bookSectionSource).not.toContain("Releasing June 15th");
  });
});
