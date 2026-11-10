import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { publicationDraftSchema } from "../../src/lib/content/schemas";
import { getApprovedPlainLanguageTldr } from "../../src/lib/plain-language-tldr";
import { collectDraftTldrLeakMarkers } from "../../src/lib/tldr-draft-leak";
import { TC_BATCH1 } from "../fixtures/tc-batch1-drafts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pubDir = path.join(root, "src/content/publications");

/** Canonical seven from T-B — must remain owner_approved and byte-stable for evidence URLs. */
const TB_APPROVED_EVIDENCE = [
  {
    slug: "epistemic-social-learning",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368504",
    text: "When AI agents interact, their own choices affect what they learn about one another. This paper develops a way to update beliefs about other agents quickly while learning broader patterns more slowly, helping agents adapt when others change their behavior.",
  },
  {
    slug: "predictive-asd-acoustic-linguistic",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368523",
    text: "Researchers analysed conversations involving English- and Hindi-speaking children to identify speech patterns that could help distinguish children with and without autism in the study groups. The findings show promise for language-aware assessment research, but do not establish a stand-alone clinical diagnostic test.",
  },
  {
    slug: "trial-pupil-dynamics-adhd",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368530",
    text: "Researchers analysed pupil measurements from 50 children during a memory task. Patterns across repeated trials were related to task performance and medication conditions, although some group comparisons were uncertain after statistical correction. Pupil changes are not a direct measure of attention or medication effectiveness.",
  },
  {
    slug: "social-robots-autism-care-india",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368537",
    text: "Interviews and workshops with 25 special educators in India explored the use of social robots in autism care. Educators saw possible benefits but worried about being replaced and about limited resources. The study reports professional perspectives; it does not establish that robots improve clinical outcomes.",
  },
  {
    slug: "vr-flat-screen-gaming-responses",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368542",
    text: "Researchers compared how 33 participants responded while playing selected games in virtual reality and on flat screens. In this study, virtual reality produced stronger emotions, greater mental effort, and more physiological stress-related responses. The results may not generalize beyond the games and laboratory conditions studied.",
  },
  {
    slug: "emotion-recognition-eda",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368554",
    text: "Can changes in skin electrical activity help computers recognize emotions? Researchers compared 40 ways of analysing these signals. Some methods worked better than others, especially when trained separately for each participant. Recognizing emotions in people not used for training proved more difficult.",
  },
  {
    slug: "express-ear",
    evidence:
      "https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368561",
    text: "Could a small motion sensor worn at the ear recognize facial movements without a camera? In a study with 12 participants, ExpressEar distinguished many individual facial movements under controlled conditions. Performance and the range of recognizable movements were more limited during walking and train travel.",
  },
] as const;

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function wordCount(text: string): number {
  return normalize(text).split(/\s+/).filter(Boolean).length;
}

function loadPub(slug: string) {
  const data = matter(readFileSync(path.join(pubDir, `${slug}.md`), "utf8")).data;
  const parsed = publicationDraftSchema.safeParse(data);
  expect(parsed.success, slug).toBe(true);
  return parsed.success ? parsed.data : data;
}

function allNonFixturePubs() {
  return readdirSync(pubDir)
    .filter((f) => f.endsWith(".md"))
    .map((name) => {
      const data = matter(readFileSync(path.join(pubDir, name), "utf8")).data;
      return { name, data };
    })
    .filter((row) => !row.data.test_fixture);
}

describe("T-C Batch 1 — five ai_assisted_draft TL;DRs", () => {
  it("adds draft TL;DRs only to the five Batch 1 records", () => {
    for (const row of TC_BATCH1) {
      const pub = loadPub(row.slug);
      expect(pub.published, row.slug).toBe(true);
      expect(pub.verification_status, row.slug).toBe("verified");
      expect(pub.tldr_status, row.slug).toBe("ai_assisted_draft");
      expect(normalize(pub.plain_language_tldr ?? ""), row.slug).toBe(normalize(row.text));
      expect(pub.tldr_drafted_by?.trim().length, row.slug).toBeGreaterThan(0);
      expect(pub.tldr_source_note?.trim().length, row.slug).toBeGreaterThan(20);
    }

    const draftSlugs = allNonFixturePubs()
      .filter((row) => row.data.tldr_status === "ai_assisted_draft")
      .map((row) => String(row.data.slug))
      .sort();
    expect(draftSlugs).toEqual([...TC_BATCH1.map((r) => r.slug)].sort());
  });

  it("keeps drafts unpublished: no fabricated approval metadata and helper rejects them", () => {
    for (const row of TC_BATCH1) {
      const pub = loadPub(row.slug);
      expect(pub.tldr_status).not.toBe("owner_approved");
      expect(pub.tldr_reviewed_by ?? null).toBeFalsy();
      expect(pub.tldr_approved_at ?? null).toBeFalsy();
      expect(pub.tldr_review_evidence ?? null).toBeFalsy();
      expect(getApprovedPlainLanguageTldr(pub)).toBeUndefined();
      expect(wordCount(pub.plain_language_tldr ?? "")).toBeGreaterThanOrEqual(30);
      expect(wordCount(pub.plain_language_tldr ?? "")).toBeLessThanOrEqual(50);
    }
  });

  it("leaves the seven PI-approved TL;DRs and evidence URLs unchanged", () => {
    for (const row of TB_APPROVED_EVIDENCE) {
      const pub = loadPub(row.slug);
      expect(pub.tldr_status).toBe("owner_approved");
      expect(normalize(pub.plain_language_tldr ?? "")).toBe(normalize(row.text));
      expect(pub.tldr_review_evidence).toBe(row.evidence);
      expect(getApprovedPlainLanguageTldr(pub)).toBe(normalize(row.text));
    }
    const approved = allNonFixturePubs()
      .filter((row) => row.data.tldr_status === "owner_approved")
      .map((row) => String(row.data.slug))
      .sort();
    expect(approved).toEqual([...TB_APPROVED_EVIDENCE.map((r) => r.slug)].sort());
  });

  it("does not add TL;DR fields to any other non-fixture publication", () => {
    const protectedSlugs: Set<string> = new Set([
      ...TC_BATCH1.map((r) => r.slug),
      ...TB_APPROVED_EVIDENCE.map((r) => r.slug),
    ]);
    for (const row of allNonFixturePubs()) {
      const slug = String(row.data.slug);
      if (protectedSlugs.has(slug)) continue;
      expect(row.data.plain_language_tldr ?? null, slug).toBeFalsy();
      expect(
        row.data.tldr_status === undefined ||
          row.data.tldr_status === null ||
          row.data.tldr_status === "missing",
        slug,
      ).toBe(true);
    }
  });

  it("derives draft-leak markers dynamically from the five Batch 1 drafts", () => {
    const pubs = TC_BATCH1.map((r) => loadPub(r.slug));
    const markers = collectDraftTldrLeakMarkers(pubs);
    expect(markers.length).toBeGreaterThan(0);
    for (const row of TC_BATCH1) {
      const windows = normalize(row.text).split(/\s+/).slice(0, 8).join(" ");
      expect(markers.some((m) => m === windows || normalize(row.text).includes(m))).toBe(true);
    }
    // Approved records must not contribute draft leak markers.
    expect(
      collectDraftTldrLeakMarkers(TB_APPROVED_EVIDENCE.map((r) => loadPub(r.slug))),
    ).toEqual([]);
  });
});
