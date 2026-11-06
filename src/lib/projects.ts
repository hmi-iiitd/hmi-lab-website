import type { CollectionEntry } from "astro:content";
import { isPublicPublication, isRenderablePublication, type PubEntry } from "./publications";
import { includeTestFixtures } from "./test-fixtures";

export type ProjectEntry = CollectionEntry<"projects">;

/** A draft or engineering fixture is never a public route or visible project card. */
export function isPublicProject(entry: ProjectEntry): boolean {
  return entry.data.published && !entry.data.test_fixture;
}

/** Static paths may include fixtures only when INCLUDE_TEST_FIXTURES=1. */
export function isRenderableProject(entry: ProjectEntry): boolean {
  if (!entry.data.published) return false;
  if (entry.data.test_fixture) return includeTestFixtures();
  return true;
}

/** A public/fixture project inherits its bibliographic identity from one verified paper. */
export function canonicalPublicationForStory(
  project: ProjectEntry,
  publications: PubEntry[],
): PubEntry | undefined {
  const ids = project.data.publication_ids;
  if (!project.data.published || ids.length !== 1) return undefined;
  const publication = publications.find((entry) => entry.data.id === ids[0]);
  if (!publication) return undefined;
  if (project.data.test_fixture) {
    return publication.data.test_fixture && isRenderablePublication(publication)
      ? publication
      : undefined;
  }
  return isPublicPublication(publication) ? publication : undefined;
}
