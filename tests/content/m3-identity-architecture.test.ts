import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import {
  APPLICATION_TAG_IDS,
  HERO_INTRODUCTION,
  LAB_NAME,
  PUNCHLINE,
  PRIMARY_THEME_IDS,
  PRIMARY_THEME_TITLES,
  RESEARCH_IDENTITY,
} from "../../src/lib/identity";
import { validateContentBundle } from "../../src/lib/content/validate";
import type { ApplicationTag, PublicationDraft, ResearchTheme } from "../../src/lib/content/schemas";

const root = path.resolve(__dirname, "../..");

const APPROVED_BODY = `# Human–Machine Interaction Research Group

## Intelligence emerges through interaction.

At the Human–Machine Interaction (HMI) Research Group at IIIT-Delhi, we study **interactive intelligence**: how intelligent systems perceive and understand people and other agents, learn and reason through interaction, and adapt their behaviour in response.

Our research spans three closely connected themes: **perception and understanding**, **learning and coordination**, and **interaction and adaptation**. We develop multimodal methods for understanding human behaviour, affect, attention, physiology, and social signals; computational methods for learning about and coordinating with other agents; and interactive systems that translate these capabilities into adaptive interfaces, robots, assistive technologies, and intelligent physical systems.

Interaction is central to this view of intelligence. People and agents differ in their behaviours, preferences, capabilities, and responses, and these can change as interaction unfolds. Increasingly, our work asks how intelligent systems can learn in such settings, reason about what they observe, and decide how that knowledge should shape subsequent interaction and coordination.

We investigate these questions across human–AI interaction, multi-agent systems, affective and multimodal computing, pervasive sensing, social robotics, **neurodevelopment, accessibility, and health**. Our work ranges from fundamental computational models to novel interactive systems, real-world applications, and technology translation.

Across these directions, our broader goal is to build intelligent systems that can **understand, learn from, and adapt through interaction—with people, other intelligent agents, and the physical world.**
`;

function loadMdCollection<T>(dir: string): T[] {
  const abs = path.join(root, dir);
  return readdirSync(abs)
    .filter((f) => f.endsWith(".md"))
    .map((f) => matter(readFileSync(path.join(abs, f), "utf8")).data as T);
}

describe("M3 Interactive Intelligence architecture (ADR-003)", () => {
  it("keeps ADR-003 in the decisions log", () => {
    expect(
      existsSync(path.join(root, "docs/decisions/ADR-003-interactive-intelligence-identity.md")),
    ).toBe(true);
  });

  it("stores approved identity copy verbatim", () => {
    const file = path.join(root, "src/content/identity/approved-description.md");
    const raw = readFileSync(file, "utf8");
    const parsed = matter(raw);
    expect(parsed.data.punchline).toBe(PUNCHLINE);
    expect(parsed.data.research_identity).toBe(RESEARCH_IDENTITY);
    expect(parsed.data.lab_name).toBe(LAB_NAME);
    expect(parsed.content.replace(/\r\n/g, "\n").trim()).toBe(APPROVED_BODY.trim());
    expect(createHash("sha256").update(APPROVED_BODY.trim()).digest("hex")).toBe(
      "34453d48fa3490950fe1c852fc26916319419aa2444ab123b15fab677048803b",
    );
  });

  it("exposes approved punchline and hero introduction constants for M3.5", () => {
    expect(PUNCHLINE).toBe("Intelligence emerges through interaction.");
    expect(HERO_INTRODUCTION).toBe(
      "We study interactive intelligence: how intelligent systems perceive and understand people and other agents, learn and reason through interaction, and adapt their behaviour in response.",
    );
    expect(RESEARCH_IDENTITY).toBe("Interactive Intelligence");
  });

  it("publishes exactly three primary themes with stable ids and titles", () => {
    const themes = loadMdCollection<ResearchTheme>("src/content/research-areas").filter(
      (t) => t.published,
    );
    expect(themes).toHaveLength(3);
    expect(themes.map((t) => t.id).sort()).toEqual([...PRIMARY_THEME_IDS].sort());
    for (const id of PRIMARY_THEME_IDS) {
      const theme = themes.find((t) => t.id === id);
      expect(theme?.title).toBe(PRIMARY_THEME_TITLES[id]);
    }
  });

  it("keeps application tags independent of primary themes", () => {
    const tags = loadMdCollection<ApplicationTag>("src/content/application-tags").filter(
      (t) => t.published,
    );
    expect(tags.map((t) => t.id).sort()).toEqual([...APPLICATION_TAG_IDS].sort());
    for (const tag of tags) {
      expect((PRIMARY_THEME_IDS as readonly string[]).includes(tag.id)).toBe(false);
    }
  });

  it("resolves every publication theme and application tag without collisions", () => {
    const publications = loadMdCollection<PublicationDraft>("src/content/publications");
    const themes = loadMdCollection<ResearchTheme>("src/content/research-areas");
    const applicationTags = loadMdCollection<ApplicationTag>("src/content/application-tags");
    const issues = validateContentBundle({
      publications,
      people: [],
      themes,
      applicationTags,
      projects: [],
      news: [],
    });
    expect(issues).toEqual([]);

    const publicPubs = publications.filter(
      (p) => p.published && p.verification_status === "verified",
    );
    expect(publicPubs.length).toBeGreaterThan(10);
    for (const pub of publicPubs) {
      expect(pub.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      for (const area of pub.research_areas) {
        expect(PRIMARY_THEME_IDS).toContain(area);
      }
    }
  });
});

/**
 * M3.5 UI contract — written first (RED), skipped until the M3.5 PR implements surfaces.
 * Unskip in feat/m3.5-identity; do not implement homepage/About/logo redesign in M3.
 */
describe.skip("M3.5 identity UI contract (deferred)", () => {
  it("homepage hero uses approved punchline exactly", () => {
    expect(PUNCHLINE).toBe("Intelligence emerges through interaction.");
  });

  it("About page will render approved description body faithfully", () => {
    expect(APPROVED_BODY).toContain("## Intelligence emerges through interaction.");
  });

  it("will display exactly three primary research theme cards", () => {
    expect(PRIMARY_THEME_IDS).toHaveLength(3);
  });
});
