import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { publicationDraftSchema } from "../../src/lib/content/schemas";
import { getApprovedPlainLanguageTldr } from "../../src/lib/plain-language-tldr";
import {
  collectDraftTldrLeakMarkers,
  leakWindowsFromText,
} from "../../src/lib/tldr-draft-leak";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pubDir = path.join(root, "src/content/publications");

/** M421 §9 Phase B — seven Selected papers; PI-approved exact strings 2026-11-07. */
const TB_APPROVED = [
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

function loadPub(slug: string) {
  const data = matter(readFileSync(path.join(pubDir, `${slug}.md`), "utf8")).data;
  const parsed = publicationDraftSchema.safeParse(data);
  expect(parsed.success, slug).toBe(true);
  return parsed.success ? parsed.data : data;
}

describe("T-B seven Selected TL;DRs — owner_approved publication", () => {
  it("stores exact PI-approved wording with complete approval metadata for the seven papers", () => {
    for (const row of TB_APPROVED) {
      const pub = loadPub(row.slug);
      expect(pub.tldr_status, row.slug).toBe("owner_approved");
      expect(normalize(pub.plain_language_tldr ?? ""), row.slug).toBe(normalize(row.text));
      expect(pub.tldr_approved_at, row.slug).toBe("2026-11-07");
      expect(pub.tldr_review_evidence, row.slug).toBe(row.evidence);
      expect(pub.tldr_reviewed_by?.trim().length, row.slug).toBeGreaterThan(0);
      expect(pub.tldr_reviewed_by, row.slug).toMatch(/PI|faculty|Shukla/i);
      expect(pub.tldr_source_note?.trim().length, row.slug).toBeGreaterThan(0);
      expect(getApprovedPlainLanguageTldr(pub), row.slug).toBe(normalize(row.text));
    }
  });

  it("limits real (non-fixture) owner_approved TL;DRs to exactly the seven Phase B papers", () => {
    const approved: string[] = [];
    for (const name of readdirSync(pubDir).filter((f) => f.endsWith(".md"))) {
      const data = matter(readFileSync(path.join(pubDir, name), "utf8")).data;
      if (data.test_fixture) continue;
      if (data.tldr_status === "owner_approved") approved.push(String(data.slug));
    }
    expect(approved.sort()).toEqual([...TB_APPROVED.map((r) => r.slug)].sort());
  });

  it("keeps draft-leak marker derivation rewrite-safe for future unpublished drafts", () => {
    // Approved records must not contribute draft leak markers.
    expect(collectDraftTldrLeakMarkers(TB_APPROVED.map((r) => loadPub(r.slug)))).toEqual([]);

    const synthetic = {
      tldr_status: "ai_assisted_draft" as const,
      plain_language_tldr:
        "REVISED_DRAFT_ONLY unique wording used solely to prove leak markers track rewrites.",
    };
    const markers = collectDraftTldrLeakMarkers([synthetic]);
    expect(markers.some((m) => m.includes("REVISED_DRAFT_ONLY"))).toBe(true);
    expect(leakWindowsFromText(synthetic.plain_language_tldr).length).toBeGreaterThan(0);

    const validateSrc = readFileSync(path.join(root, "scripts/validate-content.ts"), "utf8");
    expect(validateSrc).toMatch(/collectDraftTldrLeakMarkers/);
  });
});
