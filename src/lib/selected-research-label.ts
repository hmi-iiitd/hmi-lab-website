/** Fields needed for Selected Research status chrome (not full publication records). */
export type SelectedResearchLabelInput = {
  venue_short?: string | null;
  kind: string;
  publication_year: number;
  status: string;
};

/**
 * Venue · year · optional Accepted — year appears once even when already in venue_short.
 * Does not append award text (D9 promotional gate for Selected Research).
 */
export function selectedResearchStatusLabel(pub: SelectedResearchLabelInput): string {
  const venue = (pub.venue_short ?? pub.kind).trim();
  const year = String(pub.publication_year);
  const yearAlreadyPresent = new RegExp(`(?:^|\\D)${year}(?:\\D|$)`).test(venue);
  const bits = yearAlreadyPresent ? [venue] : [venue, year];
  if (pub.status === "accepted") bits.push("Accepted");
  return bits.join(" · ");
}
