import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { projectSchema, researchArtifactSchema } from "../../src/lib/content/schemas";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const publishable = {
  id: "test-project",
  slug: "test-project",
  title: "Verified research-story example",
  summary: "A source-grounded, text-first scientific description.",
  published: true,
  research_areas: ["learning-coordination"],
  publication_ids: ["esl-neurips-2026"],
  problem: "How does interaction affect inference?",
  contribution: "A source-grounded statement approved by the paper owner.",
  methodology: "An explanation of the method and its experimental scope.",
  findings: ["A finding supported by the linked publication."],
  limitations: "The claim does not extend beyond the evaluated settings.",
  programme_interpretation: "A clearly labeled interpretation, not an experimental result.",
  scientific_owner: "Test reviewer",
  scientific_owner_approved_at: "2026-11-04",
};

describe("M4.2 HMI Research Story gates", () => {
  it("permits an approved, fully text-only research story", () => {
    expect(projectSchema.safeParse(publishable).success).toBe(true);
  });

  it("requires mandatory scientific sections and actual owner sign-off before publication", () => {
    const incomplete = {
      ...publishable,
      problem: undefined,
      findings: [],
      limitations: undefined,
      scientific_owner_approved_at: undefined,
    };
    expect(projectSchema.safeParse(incomplete).success).toBe(false);
  });

  it("requires a single canonical publication for a public story", () => {
    expect(projectSchema.safeParse({ ...publishable, publication_ids: [] }).success).toBe(false);
    expect(
      projectSchema.safeParse({
        ...publishable,
        publication_ids: ["esl-neurips-2026", "trial-pupil-adhd-2026"],
      }).success,
    ).toBe(false);
  });

  it("accepts only approved, locally hosted research images with provenance", () => {
    const artifact = {
      path: "research/verified-figure.webp",
      type: "image",
      kind: "empirical",
      permission: "approved",
      owner: "Paper owner",
      source: "Verified publication, Figure 1",
      caption: "A complete scientific caption.",
      alt: "A useful text alternative for the figure.",
    };
    expect(researchArtifactSchema.safeParse(artifact).success).toBe(true);
    expect(researchArtifactSchema.safeParse({ ...artifact, permission: "pending" }).success).toBe(false);
    expect(researchArtifactSchema.safeParse({ ...artifact, path: "../secret.png" }).success).toBe(false);
    expect(researchArtifactSchema.safeParse({ ...artifact, alt: "" }).success).toBe(false);
  });

  it("retains a linked ESL draft without public claims, media or publication", () => {
    const text = readFileSync(path.join(root, "src/content/projects/esl-research-story.md"), "utf8");
    const draft = matter(text).data;
    expect(draft.published).toBe(false);
    expect(draft.publication_ids).toEqual(["esl-neurips-2026"]);
    expect(draft.artifact).toBeUndefined();
    expect(projectSchema.safeParse(draft).success).toBe(true);
  });

  it("keeps publication and About data outside the project draft", () => {
    const story = readFileSync(path.join(root, "src/pages/projects/[slug].astro"), "utf8");
    expect(story).toMatch(/isPublicProject/);
    const helper = readFileSync(path.join(root, "src/lib/projects.ts"), "utf8");
    expect(story).toMatch(/canonicalPublicationForStory/);
    expect(helper).toMatch(/isPublicPublication/);
    expect(story).toMatch(/ResearchStory/);
  });

  it("rejects placeholder claims on a published research story", () => {
    expect(
      projectSchema.safeParse({
        ...publishable,
        findings: ["TODO_FINDING: invent a result"],
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        ...publishable,
        methodology: "Lorem ipsum dolor sit amet.",
      }).success,
    ).toBe(false);
  });

  it("implements Appendix A section landmarks in the Research Story template", () => {
    const template = readFileSync(path.join(root, "src/components/ResearchStory.astro"), "utf8");
    for (const marker of [
      "Scientific question",
      "Contribution",
      "Method",
      "Principal findings",
      "Limitations and scope",
      "Programme interpretation · Not a separate empirical finding",
      "What this contributes to Interactive Intelligence",
      "Research resources and citation",
      'paper.status === "accepted"',
      "publicationResourceLinks",
      "toBibtex",
      "controls",
      'preload="none"',
    ]) {
      expect(template).toContain(marker);
    }
  });

  it("blocks unreferenced public/research media via the content validator", () => {
    const validator = readFileSync(path.join(root, "scripts/validate-content.ts"), "utf8");
    expect(validator).toMatch(/Unreferenced research media/);
    expect(validator).toMatch(/allowedResearchMedia/);
  });
});
