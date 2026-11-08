import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { publicationDraftSchema, publicationPublishableSchema } from "../../src/lib/content/schemas";
import { getApprovedPlainLanguageTldr } from "../../src/lib/plain-language-tldr";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const baseVerified = {
  id: "express-ear-2021",
  slug: "express-ear",
  title: "ExpressEar: Sensing Fine-Grained Facial Expressions with Earables",
  kind: "journal" as const,
  status: "published" as const,
  publication_year: 2021,
  venue_full: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
  venue_short: "IMWUT",
  authors: [{ name: "Dhruv Verma" }],
  research_areas: ["interaction-adaptation"],
  application_tags: [],
  project_ids: [],
  featured: false,
  published: true,
  metadata_verified: true,
  verification_status: "verified" as const,
  lab_attribution: "collaborative" as const,
  doi: "10.1145/3478085",
  paper_url: "https://doi.org/10.1145/3478085",
  source_keys: ["ExpressEar"],
  sources: [{ label: "Crossref", url: "https://doi.org/10.1145/3478085" }],
  evidence_note: "Verified against Crossref DOI 10.1145/3478085 on 2026-11-03.",
  verified_at: "2026-11-03",
  unresolved_notes: [],
  test_fixture: false,
};

const approvedTldr = {
  plain_language_tldr:
    "TEST_ONLY_FICTIONAL summary: this study asks how wearable sensing can capture fine facial signals, contributes an earable method evaluated in lab settings, and does not claim clinical diagnosis.",
  tldr_status: "owner_approved" as const,
  tldr_drafted_by: "I1 test harness",
  tldr_reviewed_by: "Template Validation Owner (FICTIONAL)",
  tldr_approved_at: "2026-11-07",
  tldr_source_note: "Fictional abstract §1 for engineering validation only",
  tldr_review_evidence: "https://github.com/hmi-iiitd/hmi-lab-website/pull/0#discussion_r0",
};

describe("I1/T-A plain-language TL;DR schema", () => {
  it("keeps existing publications valid with no TL;DR fields", () => {
    expect(publicationDraftSchema.safeParse(baseVerified).success).toBe(true);
    expect(publicationPublishableSchema.safeParse(baseVerified).success).toBe(true);

    const pubDir = path.join(root, "src/content/publications");
    for (const name of readdirSync(pubDir).filter((f) => f.endsWith(".md"))) {
      const data = matter(readFileSync(path.join(pubDir, name), "utf8")).data;
      expect(publicationDraftSchema.safeParse(data).success, name).toBe(true);
    }
  });

  it("accepts a fully populated owner_approved summary", () => {
    expect(publicationDraftSchema.safeParse({ ...baseVerified, ...approvedTldr }).success).toBe(
      true,
    );
  });

  it("rejects owner_approved without review evidence or other required approval fields", () => {
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        tldr_review_evidence: undefined,
      }).success,
    ).toBe(false);
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        tldr_reviewed_by: "   ",
      }).success,
    ).toBe(false);
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        tldr_approved_at: undefined,
      }).success,
    ).toBe(false);
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        tldr_source_note: "",
      }).success,
    ).toBe(false);
  });

  it("rejects empty, whitespace-only, or malformed approved summaries", () => {
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        plain_language_tldr: "   ",
      }).success,
    ).toBe(false);
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        plain_language_tldr: undefined,
      }).success,
    ).toBe(false);
    expect(
      publicationDraftSchema.safeParse({
        ...baseVerified,
        ...approvedTldr,
        tldr_approved_at: "07-11-2026",
      }).success,
    ).toBe(false);
  });

  it("does not allow missing status to carry an approved-looking summary for public helper use", () => {
    const parsed = publicationDraftSchema.safeParse({
      ...baseVerified,
      plain_language_tldr: approvedTldr.plain_language_tldr,
      tldr_status: "missing",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(getApprovedPlainLanguageTldr(parsed.data)).toBeUndefined();
    }
  });
});

describe("I1/T-A getApprovedPlainLanguageTldr helper", () => {
  it("returns approved text only for a fully constrained owner_approved record", () => {
    const parsed = publicationDraftSchema.parse({ ...baseVerified, ...approvedTldr });
    expect(getApprovedPlainLanguageTldr(parsed)).toBe(approvedTldr.plain_language_tldr);
  });

  it("rejects each draft status and incomplete approval metadata", () => {
    for (const status of ["missing", "editorial_draft", "ai_assisted_draft"] as const) {
      const parsed = publicationDraftSchema.parse({
        ...baseVerified,
        plain_language_tldr: approvedTldr.plain_language_tldr,
        tldr_status: status,
      });
      expect(getApprovedPlainLanguageTldr(parsed), status).toBeUndefined();
    }

    expect(
      getApprovedPlainLanguageTldr({
        ...publicationDraftSchema.parse({ ...baseVerified, ...approvedTldr }),
        tldr_review_evidence: "   ",
      }),
    ).toBeUndefined();
  });

  it("never surfaces unapproved text from fixture or draft-shaped objects", () => {
    const fixtureDraft = publicationDraftSchema.parse({
      ...baseVerified,
      test_fixture: true,
      plain_language_tldr: "TEST_ONLY_FICTIONAL draft must stay hidden",
      tldr_status: "editorial_draft",
    });
    expect(getApprovedPlainLanguageTldr(fixtureDraft)).toBeUndefined();
  });
});

describe("I1/T-A UI surfaces omit empty TL;DR chrome", () => {
  it("templates only render TL;DR via the shared helper", () => {
    for (const rel of [
      "src/components/SelectedResearch.astro",
      "src/pages/publications/index.astro",
      "src/pages/papers/[slug].astro",
    ]) {
      const src = readFileSync(path.join(root, rel), "utf8");
      expect(src, rel).toMatch(/getApprovedPlainLanguageTldr/);
      expect(src, rel).not.toMatch(/tldr_status\s*===\s*["']owner_approved["']/);
    }
  });

  it("paper page heading exists only inside an approved-helper conditional", () => {
    const src = readFileSync(path.join(root, "src/pages/papers/[slug].astro"), "utf8");
    expect(src).toContain("TL;DR — In plain language");
    expect(src).toMatch(/getApprovedPlainLanguageTldr[\s\S]*TL;DR — In plain language/);
  });

  it("Selected Research uses the I2 seven-paper allowlist with fixture-safe e2e injection", () => {
    const src = readFileSync(path.join(root, "src/components/SelectedResearch.astro"), "utf8");
    const pubsSrc = readFileSync(path.join(root, "src/lib/publications.ts"), "utf8");
    expect(pubsSrc).toMatch(/SELECTED_RESEARCH_SLUGS/);
    expect(src).toMatch(/selectedResearchPublications/);
    expect(src).not.toMatch(/featured\.slice\(\s*1\s*,\s*4\s*\)/);

    const pubDir = path.join(root, "src/content/publications");
    const publicFeatured = readdirSync(pubDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => matter(readFileSync(path.join(pubDir, f), "utf8")).data)
      .filter((p) => p.featured && !p.test_fixture)
      .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99));
    expect(publicFeatured).toHaveLength(7);

    const fixture = matter(
      readFileSync(path.join(pubDir, "test-fixture-synthetic-interaction.md"), "utf8"),
    ).data;
    expect(fixture.test_fixture).toBe(true);
    expect(fixture.featured).toBe(true);
  });

  it("staging dist scanner bans synthetic TL;DR fixture markers", () => {
    const validator = readFileSync(path.join(root, "scripts/validate-content.ts"), "utf8");
    expect(validator).toContain("TEST_ONLY_FICTIONAL summary:");
    expect(validator).toContain("test-fixture-synthetic-interaction");
  });
});
