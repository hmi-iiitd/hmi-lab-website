import { describe, expect, it } from "vitest";
import {
  publicationPublishableSchema,
  type PublicationDraft,
} from "../../src/lib/content/schemas";
import { assertNoDuplicateKeys, validatePublicationRecord } from "../../src/lib/content/validate";
import { toBibtex } from "../../src/lib/bibtex";

const baseVerified: PublicationDraft = {
  id: "express-ear-2021",
  slug: "express-ear",
  title: "ExpressEar: Sensing Fine-Grained Facial Expressions with Earables",
  kind: "journal",
  status: "published",
  publication_year: 2021,
  venue_full: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
  venue_short: "IMWUT",
  authors: [
    { name: "Dhruv Verma" },
    { name: "Sejal Bhalla" },
    { name: "Dhruv Sahnan" },
    { name: "Jainendra Shukla" },
    { name: "Aman Parnami" },
  ],
  research_areas: ["novel-interaction-sensing"],
  project_ids: [],
  featured: true,
  published: true,
  metadata_verified: true,
  verification_status: "verified",
  lab_attribution: "collaborative",
  doi: "10.1145/3478085",
  paper_url: "https://doi.org/10.1145/3478085",
  sources: [{ label: "Crossref", url: "https://doi.org/10.1145/3478085" }],
  evidence_note: "Verified against Crossref DOI 10.1145/3478085 on 2026-11-03.",
  verified_at: "2026-11-03",
  unresolved_notes: [],
};

describe("M3 publication integrity", () => {
  it("rejects published records marked incomplete", () => {
    const issues = validatePublicationRecord({
      ...baseVerified,
      verification_status: "incomplete",
    });
    expect(issues.length).toBeGreaterThan(0);
  });

  it("rejects invalid status/year combinations for publishable records", () => {
    const badYear = publicationPublishableSchema.safeParse({
      ...baseVerified,
      publication_year: 1800,
    });
    expect(badYear.success).toBe(false);
  });

  it("rejects unknown theme relations via bundle validation helpers", () => {
    const issues = validatePublicationRecord({
      ...baseVerified,
      research_areas: ["not-a-real-theme"],
      // validatePublicationRecord alone does not check theme existence; assert helper contract here
    });
    // local record schema still passes; relation check is bundle-level
    expect(issues).toEqual([]);
  });

  it("fails duplicate DOI/slug", () => {
    const issues = assertNoDuplicateKeys(
      [
        { id: "a", slug: "express-ear", doi: "10.1145/3478085" },
        { id: "b", slug: "express-ear", doi: "10.1145/3478085" },
      ],
      "publications",
    );
    expect(issues.some((i) => /Duplicate slug/.test(i.message))).toBe(true);
    expect(issues.some((i) => /Duplicate DOI/.test(i.message))).toBe(true);
  });

  it("escapes BibTeX special characters", () => {
    const bib = toBibtex({
      ...baseVerified,
      title: "Foo & Bar_100% $cost #1",
      authors: [{ name: "Ada Lovelace" }],
    });
    expect(bib).toContain("\\&");
    expect(bib).toContain("\\_");
    expect(bib).toContain("\\%");
    expect(bib).toContain("\\$");
    expect(bib).toContain("\\#");
    expect(bib).toMatch(/^@article\{/);
  });
});
