import { describe, expect, it } from "vitest";
import {
  assertNoDuplicateKeys,
  validatePublicationRecord,
} from "../../src/lib/content/validate";

describe("publication publishability", () => {
  it("fails when published:true but authors are missing (ordered author list required)", () => {
    const issues = validatePublicationRecord({
      id: "incomplete-pub",
      slug: "incomplete-pub",
      title: "Incomplete Example",
      kind: "conference",
      status: "accepted",
      publication_year: 2026,
      venue_full: "Example Venue",
      authors: [],
      published: true,
      metadata_verified: true,
      evidence_note: "should still fail without authors",
      verified_at: "2026-11-03",
    });
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.some((i) => /author/i.test(i.message))).toBe(true);
  });

  it("fails duplicate slug or DOI across records", () => {
    const issues = assertNoDuplicateKeys(
      [
        {
          id: "a",
          slug: "same-slug",
          doi: "10.1000/xyz",
        },
        {
          id: "b",
          slug: "same-slug",
          doi: "10.1000/XYZ",
        },
      ],
      "publications",
    );
    expect(issues.some((i) => i.message.includes("Duplicate slug"))).toBe(true);
    expect(issues.some((i) => i.message.includes("Duplicate DOI"))).toBe(true);
  });

  it("allows draft records that are intentionally incomplete", () => {
    const issues = validatePublicationRecord({
      id: "draft-seed",
      slug: "draft-seed",
      title: "Draft seed — not for public claims",
      kind: "conference",
      status: "draft",
      publication_year: 2026,
      authors: [],
      published: false,
      metadata_verified: false,
    });
    expect(issues).toEqual([]);
  });
});
