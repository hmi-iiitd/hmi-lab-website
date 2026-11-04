import type { CollectionEntry } from "astro:content";
import { isPublicPublication, type PubEntry } from "./publications";

export type ProjectEntry = CollectionEntry<"projects">;

/** A draft project is never a public route or a visible project card. */
export function isPublicProject(entry: ProjectEntry): boolean {
  return entry.data.published;
}

/** A public project inherits its bibliographic identity from one verified paper. */
export function canonicalPublicationForStory(
  project: ProjectEntry,
  publications: PubEntry[],
): PubEntry | undefined {
  const ids = project.data.publication_ids;
  if (!isPublicProject(project) || ids.length !== 1) return undefined;
  return publications.find(
    (entry) => entry.data.id === ids[0] && isPublicPublication(entry),
  );
}
