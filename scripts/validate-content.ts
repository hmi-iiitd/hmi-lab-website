import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ApplicationTag,
  NewsItem,
  Person,
  Project,
  PublicationDraft,
  ResearchTheme,
} from "../src/lib/content/schemas";
import { validateContentBundle, type ContentBundle } from "../src/lib/content/validate";
import { collectDraftTldrLeakMarkers } from "../src/lib/tldr-draft-leak";

const root = path.resolve("src/content");

function loadCollection<T>(dirName: string): T[] {
  const dir = path.join(root, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(md|mdx|ya?ml)$/i.test(name))
    .map((name) => {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      if (/\.ya?ml$/i.test(name)) {
        return matter(`---\n${raw}\n---`).data as T;
      }
      return matter(raw).data as T;
    });
}

function assertDistExcludesDrafts(publications: PublicationDraft[]): void {
  const distRoots = [path.resolve("dist"), path.resolve("dist/hmi-lab-website")].filter((p) =>
    fs.existsSync(p),
  );
  if (distRoots.length === 0) {
    console.log("validate-content: dist/ not present yet; skipping draft leak scan");
    return;
  }

  // Staging/production dist only — never scan dist-e2e (fixture preview artifact).
  const banned = [
    "DRAFT_ONLY_DO_NOT_PUBLISH",
    "draft-seed-incomplete-authors",
    "TEST_ONLY_FICTIONAL",
    "TEST_ONLY_FICTIONAL summary:",
    "test-fixture-research-story",
    "test-fixture-synthetic-interaction",
    // Derived from every editorial_draft / ai_assisted_draft TL;DR (no manual phrase list).
    ...collectDraftTldrLeakMarkers(publications),
  ];
  const hits: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(html|js|css|json)$/.test(entry.name)) {
        const text = fs.readFileSync(full, "utf8");
        for (const marker of banned) {
          if (text.includes(marker)) hits.push(`${full} :: ${marker}`);
        }
      }
    }
  };

  for (const dist of distRoots) walk(dist);
  if (hits.length) {
    console.error("Draft/test-fixture markers found in staging dist:\n" + hits.join("\n"));
    process.exit(1);
  }
}

const bundle: ContentBundle = {
  publications: loadCollection<PublicationDraft>("publications"),
  people: loadCollection<Person>("people"),
  themes: loadCollection<ResearchTheme>("research-areas"),
  applicationTags: loadCollection<ApplicationTag>("application-tags"),
  projects: loadCollection<Project>("projects"),
  news: loadCollection<NewsItem>("news"),
};

const issues = validateContentBundle(bundle);

// Evidence media must be approved and present locally before a public story ships.
// This also prevents broken figures and transcripts from appearing on GitHub Pages.
const allowedResearchMedia = new Set<string>();
for (const project of bundle.projects) {
  if (!project.published || !project.artifact) continue;
  // Test fixtures must remain text-only in the repo; they cannot authorize public/research media.
  if (project.test_fixture) {
    issues.push({
      collection: "projects",
      id: project.id,
      message: "test_fixture research stories must not include artifacts (keep fixtures text-only)",
    });
    continue;
  }
  for (const rel of [project.artifact.path, project.artifact.transcript_path]) {
    if (!rel) continue;
    allowedResearchMedia.add(rel);
    if (!fs.existsSync(path.resolve("public", rel))) {
      issues.push({
        collection: "projects",
        id: project.id,
        message: `Approved media file missing from public/: ${rel}`,
      });
    }
  }
}

// Unapproved research media must not sit in public/research even as “draft assets”.
const researchMediaRoot = path.resolve("public/research");
if (fs.existsSync(researchMediaRoot)) {
  const walkResearch = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkResearch(full);
        continue;
      }
      const rel = path.relative(path.resolve("public"), full).split(path.sep).join("/");
      if (!allowedResearchMedia.has(rel)) {
        issues.push({
          collection: "projects",
          id: "public/research",
          message: `Unreferenced research media in public/ (commit only owner-approved, published artifacts): ${rel}`,
        });
      }
    }
  };
  walkResearch(researchMediaRoot);
}
if (issues.length) {
  console.error("Content validation failed:");
  for (const issue of issues) {
    console.error(`- [${issue.collection}] ${issue.id ?? "?"} ${issue.message}`);
  }
  process.exit(1);
}

assertDistExcludesDrafts(bundle.publications);
console.log(
  `Content OK: ${bundle.publications.length} pubs, ${bundle.people.length} people, ${bundle.themes.length} themes, ${bundle.applicationTags?.length ?? 0} application-tags, ${bundle.projects.length} projects, ${bundle.news.length} news`,
);
