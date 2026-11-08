import type { CollectionEntry } from "astro:content";
import { includeTestFixtures } from "./test-fixtures";

export type PubEntry = CollectionEntry<"publications">;

function isVerifiedPublicRecord(entry: PubEntry): boolean {
  return (
    entry.data.published &&
    entry.data.metadata_verified &&
    entry.data.verification_status === "verified" &&
    (entry.data.status === "published" || entry.data.status === "accepted")
  );
}

/** Public site listings and production/staging builds — excludes engineering fixtures. */
export function isPublicPublication(entry: PubEntry): boolean {
  return isVerifiedPublicRecord(entry) && !entry.data.test_fixture;
}

/** Static paths may include fixtures only when INCLUDE_TEST_FIXTURES=1. */
export function isRenderablePublication(entry: PubEntry): boolean {
  if (!isVerifiedPublicRecord(entry)) return false;
  if (entry.data.test_fixture) return includeTestFixtures();
  return true;
}

/**
 * Archive / Selected listing membership.
 * Fixtures appear only in INCLUDE_TEST_FIXTURES builds (Playwright dist-e2e).
 */
export function isListablePublication(entry: PubEntry): boolean {
  return isPublicPublication(entry) || isRenderablePublication(entry);
}

export function sortPubsNewestFirst(a: PubEntry, b: PubEntry): number {
  if (b.data.publication_year !== a.data.publication_year) {
    return b.data.publication_year - a.data.publication_year;
  }
  return a.data.title.localeCompare(b.data.title);
}

export function featuredPublications(entries: PubEntry[]): PubEntry[] {
  return entries
    .filter((entry) => isListablePublication(entry) && entry.data.featured)
    .sort((a, b) => (a.data.featured_rank ?? 99) - (b.data.featured_rank ?? 99));
}

/**
 * Faculty-approved Selected Research membership (I2 / M421 D6–D7).
 * Hard allowlist — marking another record `featured` cannot silently expand the module.
 */
export const SELECTED_RESEARCH_SLUGS = [
  "epistemic-social-learning",
  "predictive-asd-acoustic-linguistic",
  "trial-pupil-dynamics-adhd",
  "social-robots-autism-care-india",
  "vr-flat-screen-gaming-responses",
  "emotion-recognition-eda",
  "express-ear",
] as const;

export type SelectedResearchSlug = (typeof SELECTED_RESEARCH_SLUGS)[number];

/** Homepage Selected Research set: exactly the seven allowlisted papers on staging. */
export function selectedResearchPublications(entries: PubEntry[]): PubEntry[] {
  const listable = entries.filter(isListablePublication);
  const bySlug = new Map(listable.map((entry) => [entry.data.slug, entry]));
  const selected = SELECTED_RESEARCH_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (entry): entry is PubEntry => Boolean(entry),
  );

  // Fixture-enabled Playwright builds may inject the synthetic TL;DR fixture after ESL
  // for positive-path coverage. Staging/production never include fixtures.
  if (includeTestFixtures()) {
    const fixture = listable.find((entry) => entry.data.test_fixture && entry.data.featured);
    if (fixture && selected[0]) {
      return [selected[0], fixture, ...selected.slice(1)];
    }
  }

  return selected;
}

/** Verified public publications for a primary theme (includes accepted). */
export function publicationsForTheme(entries: PubEntry[], themeId: string): PubEntry[] {
  return entries
    .filter(
      (entry) =>
        isPublicPublication(entry) && (entry.data.research_areas ?? []).includes(themeId),
    )
    .sort(sortPubsNewestFirst);
}

export function publicationResourceLinks(data: PubEntry["data"]): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (data.doi) links.push({ label: "DOI", href: `https://doi.org/${data.doi}` });
  if (data.paper_url) links.push({ label: "Publisher", href: data.paper_url });
  if (data.pdf_url) links.push({ label: "PDF", href: data.pdf_url });
  if (data.code_url) links.push({ label: "Code", href: data.code_url });
  if (data.dataset_url) links.push({ label: "Dataset", href: data.dataset_url });
  if (data.video_url) links.push({ label: "Video", href: data.video_url });
  if (data.slides_url) links.push({ label: "Slides", href: data.slides_url });
  if (data.project_url) links.push({ label: "Project", href: data.project_url });
  return links;
}

export function doiUrl(doi?: string | null): string | null {
  if (!doi) return null;
  return `https://doi.org/${doi}`;
}
