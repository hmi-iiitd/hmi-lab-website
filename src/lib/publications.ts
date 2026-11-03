import type { CollectionEntry } from "astro:content";

export type PubEntry = CollectionEntry<"publications">;

export function isPublicPublication(entry: PubEntry): boolean {
  return (
    entry.data.published &&
    entry.data.metadata_verified &&
    entry.data.verification_status === "verified"
  );
}

export function sortPubsNewestFirst(a: PubEntry, b: PubEntry): number {
  if (b.data.publication_year !== a.data.publication_year) {
    return b.data.publication_year - a.data.publication_year;
  }
  return a.data.title.localeCompare(b.data.title);
}

export function featuredPublications(entries: PubEntry[]): PubEntry[] {
  return entries
    .filter((entry) => isPublicPublication(entry) && entry.data.featured)
    .sort((a, b) => (a.data.featured_rank ?? 99) - (b.data.featured_rank ?? 99));
}

export function doiUrl(doi?: string | null): string | null {
  if (!doi) return null;
  return `https://doi.org/${doi}`;
}
