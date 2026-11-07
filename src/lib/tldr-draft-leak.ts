/** Statuses whose plain_language_tldr must never appear in staging/production HTML. */
export const UNPUBLISHED_TLDR_STATUSES = ["editorial_draft", "ai_assisted_draft"] as const;

export type DraftLeakPublication = {
  test_fixture?: boolean;
  tldr_status?: string | null;
  plain_language_tldr?: string | null;
};

/**
 * Stable multi-word windows used to detect draft TL;DR text leaking into dist/.
 * Derived from current draft strings so rewrites do not require a manual phrase list.
 */
export function leakWindowsFromText(
  text: string,
  windowSize = 8,
  step = 4,
): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  if (words.length <= windowSize) return [words.join(" ")];

  const markers: string[] = [];
  for (let i = 0; i + windowSize <= words.length; i += step) {
    markers.push(words.slice(i, i + windowSize).join(" "));
  }
  markers.push(words.slice(-windowSize).join(" "));
  return [...new Set(markers)];
}

/** Leak markers for every non-fixture publication still in an unpublished draft status. */
export function collectDraftTldrLeakMarkers(
  publications: DraftLeakPublication[],
): string[] {
  const markers: string[] = [];
  for (const pub of publications) {
    if (pub.test_fixture) continue;
    if (
      pub.tldr_status !== "editorial_draft" &&
      pub.tldr_status !== "ai_assisted_draft"
    ) {
      continue;
    }
    const text = pub.plain_language_tldr?.trim();
    if (!text) continue;
    markers.push(...leakWindowsFromText(text));
  }
  return [...new Set(markers)];
}
