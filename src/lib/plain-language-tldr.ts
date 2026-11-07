export type PlainLanguageTldrFields = {
  plain_language_tldr?: string | null;
  tldr_status?: string | null;
  tldr_reviewed_by?: string | null;
  tldr_approved_at?: string | null;
  tldr_source_note?: string | null;
  tldr_review_evidence?: string | null;
};

/**
 * Single source of truth for public TL;DR rendering.
 * Returns text only when status is owner_approved and structural approval fields are present.
 * A review-evidence string is required but is not independently verified proof of consent.
 */
export function getApprovedPlainLanguageTldr(
  publication: PlainLanguageTldrFields,
): string | undefined {
  if (publication.tldr_status !== "owner_approved") return undefined;
  const text = publication.plain_language_tldr?.trim() ?? "";
  if (!text) return undefined;
  if (!publication.tldr_reviewed_by?.trim()) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publication.tldr_approved_at?.trim() ?? "")) return undefined;
  if (!publication.tldr_source_note?.trim()) return undefined;
  if (!publication.tldr_review_evidence?.trim()) return undefined;
  return text;
}
