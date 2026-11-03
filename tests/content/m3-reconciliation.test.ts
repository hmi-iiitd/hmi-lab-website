import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import {
  extractNumericYear,
  normalizeDoi,
  normalizeTitle,
  stripRankingNotes,
  titlesMatch,
} from "../../src/lib/publications/normalize";
import { toBibtex } from "../../src/lib/bibtex";
import {
  publicationPublishableSchema,
  type PublicationDraft,
} from "../../src/lib/content/schemas";
import { assertNoDuplicateKeys, validatePublicationRecord } from "../../src/lib/content/validate";

const root = path.resolve(__dirname, "../..");
const pubsDir = path.join(root, "src/content/publications");
const classificationPath = path.join(root, "docs/publications/m3-source-classification.json");

type ClassEntry = {
  key: string;
  bucket: string;
  record_slug?: string;
  year?: number | null;
  conflicts?: string[];
};

function loadPubs(): PublicationDraft[] {
  return readdirSync(pubsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = readFileSync(path.join(pubsDir, f), "utf8");
      return matter(raw).data as PublicationDraft;
    });
}

describe("M3 bibliography reconciliation", () => {
  const pubs = loadPubs();
  const classification = JSON.parse(readFileSync(classificationPath, "utf8")) as {
    raw_entry_count: number;
    source_sha256: string;
    entries: ClassEntry[];
  };

  it("records all 68 source keys exactly once", () => {
    expect(classification.raw_entry_count).toBe(68);
    expect(classification.entries).toHaveLength(68);
    const keys = classification.entries.map((e) => e.key);
    expect(new Set(keys).size).toBe(68);
    expect(classification.source_sha256).toMatch(/^[a-f0-9]{64}$/);
  });

  it("maps verified/accepted source keys to existing site records without DOI/slug collisions", () => {
    const publicPubs = pubs.filter((p) => p.published && p.verification_status === "verified");
    expect(assertNoDuplicateKeys(publicPubs, "publications")).toEqual([]);

    for (const entry of classification.entries) {
      if (!["verified_matched", "verified_new", "accepted_verified"].includes(entry.bucket)) {
        continue;
      }
      expect(entry.record_slug).toBeTruthy();
      const match = publicPubs.find((p) => p.slug === entry.record_slug);
      expect(match, entry.key).toBeTruthy();
      expect(match!.source_keys ?? []).toContain(entry.key);
    }
  });

  it("keeps draft/incomplete/patent buckets out of the public archive", () => {
    const publicSlugs = new Set(
      pubs.filter((p) => p.published && p.verification_status === "verified").map((p) => p.slug),
    );
    for (const entry of classification.entries) {
      if (
        ["excluded_draft", "patent", "incomplete_unpublished", "unresolved_candidate"].includes(
          entry.bucket,
        )
      ) {
        if (entry.record_slug) {
          expect(publicSlugs.has(entry.record_slug)).toBe(false);
        }
      }
    }
    const drafts = pubs.filter(
      (p) => !p.published || p.verification_status !== "verified" || p.status === "draft",
    );
    expect(drafts.length).toBeGreaterThan(0);
    for (const d of drafts) {
      expect(validatePublicationRecord({ ...d, published: false })).toEqual([]);
    }
  });

  it("normalizes malformed years and strips ranking annotations", () => {
    expect(extractNumericYear("May 11-16, 2024, Honolulu, Hawaii")).toBe(2024);
    expect(extractNumericYear("September 11-15, Atlanta, USA and Cambridge, UK, 2022")).toBe(2022);
    expect(extractNumericYear("")).toBeNull();
    expect(stripRankingNotes("\\textcolor{blue}{[CORE A*, Q1, IF = 6.20]}")).not.toMatch(/CORE|IF\s*=|Q1/);
  });

  it("matches source titles to Crossref titles after normalization", () => {
    expect(
      titlesMatch(
        "EngageMe: Assessing Student Engagement in Online Learning Environment Using Neuropsychological Tests",
        "EngageMe: Assessing Student Engagement in Online Learning Environment Using Neuropsychological Tests",
      ),
    ).toBe(true);
    const sourceMt = normalizeTitle(
      "MobiTangibles: Enabling Virtual Hand-Held Tools’ Miniature Control Interaction Experiences in VR",
    );
    const crossrefMt = normalizeTitle(
      "MobiTangibles: Enabling Physical Manipulation Experiences of Virtual Precision Hand-Held Tools' Miniature Control in VR",
    );
    expect(sourceMt.includes("mobitangibles")).toBe(true);
    expect(crossrefMt.includes("miniature control")).toBe(true);
    // Documented title conflict: related but not identical after normalization
    expect(sourceMt === crossrefMt).toBe(false);
    expect(normalizeTitle("Foo \\textbf{Bar}")).toBe("foo bar");
    expect(normalizeDoi("https://doi.org/10.1145/3478085")).toBe("10.1145/3478085");
  });

  it("preserves ESL accepted author order and allows accepted without DOI", () => {
    const esl = pubs.find((p) => p.slug === "epistemic-social-learning");
    expect(esl).toBeTruthy();
    expect(esl!.status).toBe("accepted");
    expect(esl!.published).toBe(true);
    expect(esl!.doi == null || esl!.doi === "").toBe(true);
    expect(esl!.authors.map((a) => a.name)).toEqual([
      "Jainendra Shukla",
      "Dhruv Jaiswal",
      "Divyanshi Beniwal",
      "Kiriti Kanjilal",
    ]);
    const parsed = publicationPublishableSchema.safeParse(esl);
    expect(parsed.success).toBe(true);
    const bib = toBibtex(esl!);
    expect(bib).toMatch(/year = \{2026\}/);
    expect(bib).toMatch(/note = \{Accepted\}/);
    expect(bib).not.toMatch(/CORE|IF\s*=/);
  });

  it("keeps CHI authors in Crossref order and does not invent Honorable Mention", () => {
    const chi = pubs.find((p) => p.slug === "social-robots-autism-care-india");
    expect(chi!.authors.map((a) => a.name)).toEqual([
      "B Ashwini",
      "Atmadeep Ghoshal",
      "Venkata Ratnadeep Suri",
      "Krishnaveni Achary",
      "Jainendra Shukla",
    ]);
    expect(chi!.award == null).toBe(true);
    expect(chi!.unresolved_notes.some((n) => /Honorable Mention/i.test(n))).toBe(true);
  });

  it("rejects status transitions that would publish incomplete records", () => {
    const incomplete = pubs.find((p) => p.slug === "magnetic-field-shielding-candidate");
    expect(incomplete).toBeTruthy();
    const forcedPublished = publicationPublishableSchema.safeParse({
      ...incomplete,
      status: "published",
      published: true,
      metadata_verified: true,
      verification_status: "verified",
      evidence_note: "x",
      verified_at: "2026-11-03",
      sources: [{ label: "x" }],
      doi: null,
      paper_url: null,
      pdf_url: null,
    });
    // Published status still requires DOI or official URL
    expect(forcedPublished.success).toBe(false);
  });

  it("emits numeric-year BibTeX only", () => {
    for (const pub of pubs.filter((p) => p.published && p.verification_status === "verified")) {
      const bib = toBibtex(pub);
      expect(bib).toMatch(/year = \{\d{4}\}/);
      expect(bib).not.toMatch(/year = \{[^}]*[A-Za-z][^}]*\}/);
    }
  });
});
