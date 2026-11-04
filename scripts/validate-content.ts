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

function assertDistExcludesDrafts(): void {
  const distRoots = [path.resolve("dist"), path.resolve("dist/hmi-lab-website")].filter((p) =>
    fs.existsSync(p),
  );
  if (distRoots.length === 0) {
    console.log("validate-content: dist/ not present yet; skipping draft leak scan");
    return;
  }

  const banned = ["DRAFT_ONLY_DO_NOT_PUBLISH", "draft-seed-incomplete-authors"];
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
    console.error("Draft markers found in dist:\n" + hits.join("\n"));
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
if (issues.length) {
  console.error("Content validation failed:");
  for (const issue of issues) {
    console.error(`- [${issue.collection}] ${issue.id ?? "?"} ${issue.message}`);
  }
  process.exit(1);
}

assertDistExcludesDrafts();
console.log(
  `Content OK: ${bundle.publications.length} pubs, ${bundle.people.length} people, ${bundle.themes.length} themes, ${bundle.applicationTags?.length ?? 0} application-tags, ${bundle.projects.length} projects, ${bundle.news.length} news`,
);
